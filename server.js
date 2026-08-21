const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://matte0-sec.github.io',
    methods: ['GET', 'POST']
  }
});
const rooms = new Map();
const profiles = new Map();
const profileSockets = new Map();
const maxPlayersPerRoom = 2;
const adminObserverCode = process.env.ADMIN_OBSERVER_CODE || 'FREECITY-ADMIN';
const bansFilePath = path.join(__dirname, 'bans.json');
const profilesFilePath = path.join(__dirname, 'profiles.json');
const bans = new Map();

app.use(express.static(__dirname));

function sanitizeText(value, fallback, maxLength) {
	const text = String(value || '').trim().replace(/[^a-zA-Z0-9 _-]/g, '');
	return (text || fallback).slice(0, maxLength);
}

function loadBans() {
	try {
		if (!fs.existsSync(bansFilePath)) return;
		const savedBans = JSON.parse(fs.readFileSync(bansFilePath, 'utf8'));
		if (Array.isArray(savedBans)) bans.set(savedBans);
	} catch (error) {
		console.error('Sperrliste konnte nicht geladen werden.', error);
	}
}

function saveBans() {
	try {
		fs.writeFileSync(bansFilePath, JSON.stringify([...bans.entries()], null, 2));
	} catch (error) {
		console.error('Sperrliste konnte nicht gespeichert werden.', error);
	}
}

function loadProfiles() {
	try {
		if (!fs.existsSync(profilesFilePath)) return;
		const savedProfiles = JSON.parse(fs.readFileSync(profilesFilePath, 'utf8'));
		if (Array.isArray(savedProfiles)) profiles.set(savedProfiles);
	} catch (error) {
		console.error('Profile konnten nicht geladen werden.', error);
	}
}

function saveProfiles() {
	try {
		fs.writeFileSync(profilesFilePath, JSON.stringify([...profiles.entries()], null, 2));
	} catch (error) {
		console.error('Profile konnten nicht gespeichert werden.', error);
	}
}

function getBan(name) {
	return bans.get(profileKey(name));
}

function getBanList() {
	return [...bans.values()].sort((first, second) => second.bannedAt - first.bannedAt);
}

loadBans();
loadProfiles();

function getLiveRooms() {
	return [...rooms.entries()].map(([code, players]) => ({
		code,
		players: players.length,
		maxPlayers: maxPlayersPerRoom
	}));
}

function broadcastLiveRooms() {
	io.emit('rooms-updated', getLiveRooms());
}

function getLeaderboard() {
	return [...profiles.values()]
		.sort((first, second) => second.netWorth - first.netWorth || first.name.localeCompare(second.name, 'de'))
		.map(profile => ({ name: profile.name, level: profile.level || 1, netWorth: profile.netWorth }));
}

function broadcastLeaderboard() {
	io.emit('leaderboard-updated', getLeaderboard());
}

function profileKey(name) {
	return name.toLocaleLowerCase('de-DE');
}

function getOrCreateProfile(name, ownerId = '') {
	const key = profileKey(name);
	if (!profiles.has(key)) profiles.set(key, { name, ownerId, friends: [], lastSeen: Date.now(), netWorth: 0, level: 1 });
	return profiles.get(key);
}

function serializeProfile(profile) {
	return {
		name: profile.name,
		level: profile.level || 1,
		online: (profileSockets.get(profileKey(profile.name))?.size || 0) > 0,
		lastSeen: profile.lastSeen,
		friends: profile.friends.map(friendKey => {
			const friend = profiles.get(friendKey);
			return friend
				? { name: friend.name, level: friend.level || 1, online: (profileSockets.get(friendKey)?.size || 0) > 0, lastSeen: friend.lastSeen }
				: { name: friendKey, level: 1, online: false, lastSeen: null };
		})
	};
}

function registerProfile(socket, rawName, rawLevel, rawPlayerId) {
	const name = sanitizeText(rawName, 'Spieler', 16);
	const level = Math.max(1, Math.min(999, Math.floor(Number(rawLevel) || 1)));
	const playerId = String(rawPlayerId || '').slice(0, 80);
	if (!playerId) return null;
	if (socket.profileKey === profileKey(name)) {
		const profile = getOrCreateProfile(name, playerId);
		profile.level = level;
		saveProfiles();
		return profile;
	}
	const existingProfile = profiles.get(profileKey(name));
	if (existingProfile && existingProfile.ownerId && existingProfile.ownerId !== playerId) return null;
	if (socket.profileKey) unregisterProfile(socket);
	const profile = getOrCreateProfile(name, playerId);
	profile.ownerId = playerId;
	profile.level = level;
	const key = profileKey(profile.name);
	if (!profileSockets.has(key)) profileSockets.set(key, new Set());
	profileSockets.get(key).add(socket.id);
	socket.profileKey = key;
	saveProfiles();
	io.emit('profiles-updated');
	return profile;
}

function unregisterProfile(socket) {
	if (!socket.profileKey) return;
	const connections = profileSockets.get(socket.profileKey);
	connections?.delete(socket.id);
	if (!connections?.size) {
		profileSockets.delete(socket.profileKey);
		const profile = profiles.get(socket.profileKey);
		if (profile) profile.lastSeen = Date.now();
		saveProfiles();
	}
	socket.profileKey = null;
	io.emit('profiles-updated');
}

io.on('connection', socket => {
	let roomCode = null;
	socket.emit('rooms-updated', getLiveRooms());
	socket.on('get-rooms', () => socket.emit('rooms-updated', getLiveRooms()));
	socket.on('verify-admin', data => {
		if (String(data?.code || '') !== adminObserverCode) {
			socket.emit('admin-error', 'Admin-Code ist nicht korrekt.');
			return;
		}
		socket.isAdminObserver = true;
		socket.emit('admin-verified');
	});
	socket.on('register-profile', data => {
		const playerName = sanitizeText(data?.playerName, 'Spieler', 16);
		const ban = getBan(playerName);
		if (ban) {
			socket.emit('profile-error', `Du bist gesperrt${ban.reason ? `: ${ban.reason}` : '.'}`);
			return;
		}
		const profile = registerProfile(socket, playerName, data?.level, data?.playerId);
		if (!profile) {
			socket.emit('name-availability', { playerName, available: false, message: 'Dieser Name ist bereits vergeben.' });
			return;
		}
		socket.emit('name-availability', { playerName, available: true, message: 'Name ist verfuegbar.' });
		socket.emit('profile-data', { profile: serializeProfile(profile), own: true });
		broadcastLeaderboard();
	});
	socket.on('check-name-availability', data => {
		const playerName = sanitizeText(data?.playerName, '', 16);
		const playerId = String(data?.playerId || '').slice(0, 80);
		const profile = playerName ? profiles.get(profileKey(playerName)) : null;
		const available = Boolean(playerName && playerId && (!profile || !profile.ownerId || profile.ownerId === playerId));
		socket.emit('name-availability', {
			playerName,
			available,
			message: available ? 'Name ist verfuegbar.' : 'Dieser Name ist bereits vergeben.'
		});
	});
	socket.on('update-wealth', data => {
		if (!socket.profileKey) return;
		const netWorth = Number(data?.netWorth);
		if (!Number.isFinite(netWorth) || netWorth < 0 || netWorth > 1000000000000) return;
		const profile = profiles.get(socket.profileKey);
		if (!profile) return;
		profile.netWorth = Math.floor(netWorth);
		saveProfiles();
		broadcastLeaderboard();
	});
	socket.on('get-leaderboard', () => socket.emit('leaderboard-updated', getLeaderboard()));
	socket.on('get-profile', data => {
		const name = sanitizeText(data?.playerName, '', 16);
		const profile = profiles.get(profileKey(name));
		if (profile) socket.emit('profile-data', { profile: serializeProfile(profile), own: socket.profileKey === profileKey(profile.name) });
		else socket.emit('profile-error', 'Dieses Profil wurde noch nicht erstellt.');
	});
	socket.on('add-friend', data => {
		if (!socket.profileKey) {
			socket.emit('profile-error', 'Bitte lege zuerst dein Profil an.');
			return;
		}
		const friendName = sanitizeText(data?.playerName, '', 16);
		const friend = profiles.get(profileKey(friendName));
		const profile = profiles.get(socket.profileKey);
		if (!friend) {
			socket.emit('profile-error', 'Dieser Spieler hat noch kein Profil.');
			return;
		}
		if (profileKey(friend.name) === socket.profileKey) {
			socket.emit('profile-error', 'Du kannst dich nicht selbst hinzufuegen.');
			return;
		}
		if (!profile.friends.includes(profileKey(friend.name))) profile.friends.push(profileKey(friend.name));
		socket.emit('profile-data', { profile: serializeProfile(profile), own: true });
	});

	socket.on('join-room', data => {
		const requestedRoom = sanitizeText(data?.roomCode, '', 12).toUpperCase();
		const playerName = sanitizeText(data?.playerName, 'Spieler', 16);
		const ban = getBan(playerName);
		if (ban) {
			socket.emit('room-error', `Du bist gesperrt${ban.reason ? `: ${ban.reason}` : '.'}`);
			return;
		}
		const profile = registerProfile(socket, playerName, data?.level, data?.playerId);
		if (!profile) {
			socket.emit('room-error', 'Dieser Name ist bereits vergeben.');
			return;
		}
		if (!requestedRoom) {
			socket.emit('room-error', 'Bitte gib einen Raumcode ein.');
			return;
		}

		const room = rooms.get(requestedRoom) || [];
		if (room.length >= maxPlayersPerRoom) {
			socket.emit('room-full');
			return;
		}

		const player = { id: socket.id, name: playerName, level: Math.max(1, Math.floor(Number(data?.level) || 1)), x: 0, z: 0, rotation: 0 };
		room.push(player);
		rooms.set(requestedRoom, room);
		roomCode = requestedRoom;
		socket.join(roomCode);
		socket.emit('room-joined', { roomCode, players: room });
		socket.to(roomCode).emit('player-joined', { player });
		io.to(roomCode).emit('room-count', room.length);
		broadcastLiveRooms();
	});

	socket.on('join-room-observer', data => {
		if (!socket.isAdminObserver) {
			socket.emit('room-error', 'Admin-Verifikation erforderlich.');
			return;
		}
		const requestedRoom = sanitizeText(data?.roomCode, '', 12).toUpperCase();
		const room = rooms.get(requestedRoom);
		if (!requestedRoom || !room) {
			socket.emit('room-error', 'Dieser Raum ist nicht mehr online.');
			return;
		}
		roomCode = requestedRoom;
		socket.isRoomObserver = true;
		socket.join(roomCode);
		socket.emit('room-joined-observer', { roomCode, players: room });
	});

	socket.on('admin-list-bans', () => {
		if (!socket.isAdminObserver) return;
		socket.emit('admin-ban-list', getBanList());
	});

	socket.on('admin-ban-player', data => {
		if (!socket.isAdminObserver) {
			socket.emit('admin-error', 'Admin-Verifikation erforderlich.');
			return;
		}
		const playerName = sanitizeText(data?.playerName, '', 16);
		const reason = sanitizeText(data?.reason, '', 80);
		if (!playerName) {
			socket.emit('admin-error', 'Bitte waehle einen Spieler aus.');
			return;
		}
		const ban = { name: playerName, reason, bannedAt: Date.now() };
		bans.set(profileKey(playerName), ban);
		saveBans();
		for (const room of rooms.values()) {
			for (const player of room) {
				if (profileKey(player.name) === profileKey(playerName)) {
					io.to(player.id).emit('player-banned', { reason });
					io.to(player.id).emit('room-error', `Du wurdest gesperrt${reason ? `: ${reason}` : '.'}`);
					io.sockets.sockets.get(player.id)?.disconnect(true);
				}
			}
		}
		socket.emit('admin-success', `${playerName} wurde gesperrt.`);
		socket.emit('admin-ban-list', getBanList());
	});

	socket.on('admin-unban-player', data => {
		if (!socket.isAdminObserver) {
			socket.emit('admin-error', 'Admin-Verifikation erforderlich.');
			return;
		}
		const playerName = sanitizeText(data?.playerName, '', 16);
		if (!playerName || !bans.delete(profileKey(playerName))) {
			socket.emit('admin-error', 'Dieser Spieler ist nicht gesperrt.');
			return;
		}
		saveBans();
		socket.emit('admin-success', `${playerName} wurde entsperrt.`);
		socket.emit('admin-ban-list', getBanList());
	});

	socket.on('player-move', state => {
		if (!roomCode || !rooms.has(roomCode)) return;
		const player = rooms.get(roomCode).find(entry => entry.id === socket.id);
		if (!player) return;
		player.x = Number.isFinite(state?.x) ? state.x : player.x;
		player.z = Number.isFinite(state?.z) ? state.z : player.z;
		player.rotation = Number.isFinite(state?.rotation) ? state.rotation : player.rotation;
		socket.to(roomCode).emit('player-moved', player);
	});

	socket.on('chat-message', data => {
		if (!roomCode || !rooms.has(roomCode)) return;
		const text = sanitizeText(data?.text, '', 160);
		if (!text) return;
		const player = rooms.get(roomCode).find(entry => entry.id === socket.id);
		if (!player) return;
		io.to(roomCode).emit('chat-message', { playerName: player.name, text });
	});

	socket.on('disconnect', () => {
		if (roomCode && rooms.has(roomCode)) {
			const room = rooms.get(roomCode);
			const playerIndex = room.findIndex(player => player.id === socket.id);
			if (playerIndex !== -1) {
				room.splice(playerIndex, 1);
				io.to(roomCode).emit('player-left', { id: socket.id });
				if (room.length === 0) rooms.delete(roomCode);
				else io.to(roomCode).emit('room-count', room.length);
				broadcastLiveRooms();
			}
		}
		unregisterProfile(socket);
	});
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Ree City is running at http://localhost:${port}`));