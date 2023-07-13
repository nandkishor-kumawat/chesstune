import React, { useState, useEffect } from 'react';
import Chessboard from 'react-chessboard';
import Chess from 'chess.js';

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());

  const handleMove = (from, to) => {
    const move = game.move({ from, to });

    if (move === null) return; // Invalid move

    setGame(new Chess(game.fen()));
  };

  useEffect(() => {
    // Clean up the chess instance when the component unmounts
    return () => {
      game.clear();
    };
  }, []);

  return (
    <Chessboard
      position={game.fen()}
      onMovePiece={({ sourceSquare, targetSquare }) =>
        handleMove(sourceSquare, targetSquare)
      }
    />
  );
};

export default ChessGame;
