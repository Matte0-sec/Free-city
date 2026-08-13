const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const rooms = new Map();
const maxPlayersPerRoom = 2;

app.use(express.static(__dirname));

function sanitizeText(value, fallback, maxLength) {
	const text = String(value || '').trim().replace(/[^a-zA-Z0-9 _-]/g, '');
	return (text || fallback).slice(0, maxLength);
}

io.on('connection', socket => {
	let roomCode = null;

	socket.on('join-room', data => {
		const requestedRoom = sanitizeText(data?.roomCode, '', 12).toUpperCase();
		const playerName = sanitizeText(data?.playerName, 'Spieler', 16);
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

	socket.on('disconnect', () => {
		if (!roomCode || !rooms.has(roomCode)) return;
		const room = rooms.get(roomCode);
		const playerIndex = room.findIndex(player => player.id === socket.id);
		if (playerIndex !== -1) room.splice(playerIndex, 1);
		io.to(roomCode).emit('player-left', { id: socket.id });
		if (room.length === 0) rooms.delete(roomCode);
		else io.to(roomCode).emit('room-count', room.length);
	});
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Ree City is running at http://localhost:${port}`));