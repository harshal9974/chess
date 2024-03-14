
import { app, server, io } from './run_express';
import { v4 as uuidv4 } from 'uuid';
import { Game, Move, TrashTalkMessage } from '../shared/types';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE games (
    id TEXT PRIMARY KEY,
    player1 TEXT,
    player2 TEXT,
    fen TEXT,
    turn TEXT,
    winner TEXT
  )`);

  db.run(`CREATE TABLE trash_talk (
    gameId TEXT,
    player TEXT,
    message TEXT
  )`);
});

app.post('/api/games', (req, res) => {
  const gameId = uuidv4();
  const { player1 } = req.body;

  db.run(`INSERT INTO games (id, player1, fen, turn) VALUES (?, ?, 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', 'w')`, [gameId, player1], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create game' });
    } else {
      res.json({ gameId });
    }
  });
});

app.post('/api/games/:gameId/join', (req, res) => {
  const { gameId } = req.params;
  const { player2 } = req.body;

  db.run(`UPDATE games SET player2 = ? WHERE id = ?`, [player2, gameId], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to join game' });
    } else {
      res.json({ success: true });
    }
  });
});

app.post('/api/games/:gameId/move', (req, res) => {
  const { gameId } = req.params;
  const { from, to, promotion } = req.body as Move;

  // TODO: Validate move and update game state

  res.json({ success: true });
});

app.post('/api/games/:gameId/trash-talk', (req, res) => {
  const { gameId } = req.params;
  const { player, message } = req.body as TrashTalkMessage;

  db.run(`INSERT INTO trash_talk (gameId, player, message) VALUES (?, ?, ?)`, [gameId, player, message], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to send trash talk' });
    } else {
      io.to(gameId).emit('trash-talk', { player, message });
      res.json({ success: true });
    }
  });
});

io.on('connection', (socket) => {
  socket.on('join-game', (gameId) => {
    socket.join(gameId);
  });
});

