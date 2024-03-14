
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { io } from 'socket.io-client';
import './index.css';
import { GameList } from './components/GameList';
import { ChessGame } from './components/ChessGame';

const socket = io();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<GameList socket={socket} />} />
        <Route path="/game/:gameId" element={<ChessGame socket={socket} />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

/* FILE: ./client/components/GameList.tsx */