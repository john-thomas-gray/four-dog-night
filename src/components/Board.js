import React from 'react';
import Space from './Space';
import Piece from './Piece';

function Board({ board, onPlacePiece }) {
  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((col, colIndex) => (
          <Space key={`${rowIndex}-${colIndex}`} onClick={() => onPlacePiece(rowIndex, colIndex)}>
            {board[rowIndex][colIndex] && <Piece team={board[rowIndex][colIndex]} />}
          </Space>
        ))
      )}
    </div>
  );
}

export default Board;
