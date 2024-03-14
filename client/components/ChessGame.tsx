
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { Game, Move, TrashTalkMessage } from '../../shared/types';
import { Chessboard } from 'chessboardjsx';

interface ChessGameProps {
  socket: Socket;
}

export const ChessGame: React.FC<ChessGameProps> = ({ socket }) => {
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [trashTalk, setTrashTalk] = useState<TrashTalkMessage[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.emit('join-game', gameId);

    socket.on('game-update', (updatedGame: Game) => {
      setGame(updatedGame);
    });

    socket.on('trash-talk', (message: TrashTalkMessage) => {
      setTrashTalk((prevMessages) => [...prevMessages, message]);
    });

    // Fetch initial game state
    // ...

    return () => {
      socket.off('game-update');
      socket.off('trash-talk');
    };
  }, [gameId, socket]);

  const handleMove = (move: Move) => {
    // Send move to server
    // ...
  };

  const handleTrashTalk = () => {
    if (message.trim() !== '') {
      const trashTalkMessage: TrashTalkMessage = {
        gameId: gameId!,
        player: game!.turn === 'w' ? game!.player1 : game!.player2!,
        message,
      };
      socket.emit('trash-talk', trashTalkMessage);
      setMessage('');
    }
  };

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Chessboard position={game.fen} onDrop={handleMove} />
      <div>
        <h2>Trash Talk</h2>
        <ul>
          {trashTalk.map((message, index) => (
            <li key={index}>
              {message.player}: {message.message}
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Enter trash talk"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleTrashTalk}>Send</button>
      </div>
    </div>
  );
};

/* FILE: ./client/index.css */