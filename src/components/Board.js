import React from 'react';
import Space from './Space';
import Slot from './Slot';
import Piece from './Piece';
import Corner from './Corner';

function Board({ board, onPlacePiece }) {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`board-row ${row.length === 7 ? 'centered-row' : ''}`} // Centered rows
        >
          {row.map((col, colIndex) => {
            // Determine if the current space is a Slot
            const isSlot =
              rowIndex === 0 || rowIndex === board.length - 1 || // First or last row
              (rowIndex >= 1 && rowIndex <= 7 && (colIndex === 0 || colIndex === row.length - 1)); // First and last spaces of rows 2-8

            // Determine if the current space is a Corner
            const isCorner =
              (rowIndex === 0 || rowIndex === board.length - 1) && (colIndex === 0 || colIndex === row.length - 1);

            // Render Corner if it's a corner, Slot if it's a slot, otherwise render Space
            return isCorner ? (
              <Corner key={`${rowIndex}-${colIndex}`} />
            ) : isSlot ? (
              <Slot key={`${rowIndex}-${colIndex}`} onClick={() => onPlacePiece(rowIndex, colIndex)}>
                {board[rowIndex][colIndex] && <Piece team={board[rowIndex][colIndex]} />}
              </Slot>
            ) : (
              <Space key={`${rowIndex}-${colIndex}`}>
                {board[rowIndex][colIndex] && <Piece team={board[rowIndex][colIndex]} />}
              </Space>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Board;
