const express = require('express');
const http = require('http');
const path = require('path');
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

app.use(express.static(__dirname));

function sanitizeText(value, fallback, maxLength) {
	const text = String(value || '').trim().replace(/[^a-zA-Z0-9 _-]/g, '');
	return (text || fallback).slice(0, maxLength);
}

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
		.slice(0, 10)
		.map(profile => ({ name: profile.name, netWorth: profile.netWorth }));
}

function broadcastLeaderboard() {
	io.emit('leaderboard-updated', getLeaderboard());
}

function profileKey(name) {
	return name.toLocaleLowerCase('de-DE');
}

function getOrCreateProfile(name) {
	const key = profileKey(name);
	if (!profiles.has(key)) profiles.set(key, { name, friends: [], lastSeen: Date.now(), netWorth: 0 });
	return profiles.get(key);
}

function serializeProfile(profile) {
	return {
		name: profile.name,
		online: (profileSockets.get(profileKey(profile.name))?.size || 0) > 0,
		lastSeen: profile.lastSeen,
		friends: profile.friends.map(friendKey => {
			const friend = profiles.get(friendKey);
			return friend
				? { name: friend.name, online: (profileSockets.get(friendKey)?.size || 0) > 0, lastSeen: friend.lastSeen }
				: { name: friendKey, online: false, lastSeen: null };
		})
	};
}

function registerProfile(socket, rawName) {
	const name = sanitizeText(rawName, 'Spieler', 16);
	if (socket.profileKey === profileKey(name)) return getOrCreateProfile(name);
	if (socket.profileKey) unregisterProfile(socket);
	const profile = getOrCreateProfile(name);
	const key = profileKey(profile.name);
	if (!profileSockets.has(key)) profileSockets.set(key, new Set());
	profileSockets.get(key).add(socket.id);
	socket.profileKey = key;
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
	}
	socket.profileKey = null;
	io.emit('profiles-updated');
}

io.on('connection', socket => {
	let roomCode = null;
	socket.emit('rooms-updated', getLiveRooms());
	socket.on('get-rooms', () => socket.emit('rooms-updated', getLiveRooms()));
	socket.on('register-profile', data => {
		const profile = registerProfile(socket, data?.playerName);
		socket.emit('profile-data', { profile: serializeProfile(profile), own: true });
		socket.emit('leaderboard-updated', getLeaderboard());
	});
	socket.on('update-wealth', data => {
		if (!socket.profileKey) return;
		const netWorth = Number(data?.netWorth);
		if (!Number.isFinite(netWorth) || netWorth < 0 || netWorth > 1000000000000) return;
		const profile = profiles.get(socket.profileKey);
		if (!profile) return;
		profile.netWorth = Math.floor(netWorth);
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
		registerProfile(socket, playerName);
		if (!requestedRoom) {
			socket.emit('room-error', 'Bitte gib einen Raumcode ein.');
			return;
		}

		const room = rooms.get(requestedRoom) || [];
		if (room.length >= maxPlayersPerRoom) {
			socket.emit('room-full');
			return;
		}

		const player = { id: socket.id, name: playerName, x: 0, z: 0, rotation: 0 };
		room.push(player);
		rooms.set(requestedRoom, room);
		roomCode = requestedRoom;
		socket.join(roomCode);
		socket.emit('room-joined', { roomCode, players: room });
		socket.to(roomCode).emit('player-joined', { player });
		io.to(roomCode).emit('room-count', room.length);
		broadcastLiveRooms();
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
			if (playerIndex !== -1) room.splice(playerIndex, 1);
			io.to(roomCode).emit('player-left', { id: socket.id });
			if (room.length === 0) rooms.delete(roomCode);
			else io.to(roomCode).emit('room-count', room.length);
			broadcastLiveRooms();
		}
		unregisterProfile(socket);
	});
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Ree City is running at http://localhost:${port}`));