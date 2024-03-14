
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';

interface GameListProps {
  socket: Socket;
}

export const GameList: React.FC<GameListProps> = ({ socket }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleCreateGame = async () => {
    const response = await fetch('/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ player1: username }),
    });
    const { gameId } = await response.json();
    navigate(`/game/${gameId}`);
  };

  return (
    <div>
      <h1>Chess App</h1>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleCreateGame}>Create Game</button>
    </div>
  );
};

/* FILE: ./client/components/ChessGame.tsx */