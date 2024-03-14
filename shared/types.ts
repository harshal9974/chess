
export interface Game {
  id: string;
  player1: string;
  player2: string | null;
  fen: string;
  turn: 'w' | 'b';
  winner: 'w' | 'b' | null;
}

export interface Move {
  from: string;
  to: string;
  promotion?: string;
}

export interface TrashTalkMessage {
  gameId: string;
  player: string;
  message: string;
}
