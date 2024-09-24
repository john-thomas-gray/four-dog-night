import React from 'react';
import Space from './Space';
import Slot from './Slot';
import Piece from './Piece';
import Corner from './Corner';

function Board({ board, onPlacePiece, onCornerClick }) {
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
              rowIndex === 0 ||
              rowIndex === board.length - 1 ||
              (rowIndex >= 1 &&
                rowIndex <= 7 &&
                (colIndex === 0 || colIndex === row.length - 1));

            // Determine if the current space is a Corner
            const isCorner =
              (rowIndex === 0 || rowIndex === board.length - 1) &&
              (colIndex === 0 || colIndex === row.length - 1);

            // Determine the rotation for the slot based on its position
            let slotRotation = '0deg'; // Default is no rotation (west side)
            if (rowIndex === 0) {
              slotRotation = '90deg'; // Rotate slots in the north (top) 90 degrees
            } else if (rowIndex === board.length - 1) {
              slotRotation = '-90deg'; // Rotate slots in the south (bottom) -90 degrees
            } else if (colIndex === row.length - 1) {
              slotRotation = '180deg'; // Rotate slots on the east (right side) 180 degrees
            }

            // Determine the transformation for corner
            let cornerTransform = 'none';
            if (rowIndex === 0 && colIndex === 0) {
              cornerTransform = 'scale(-1,1)'; // Invert top-left corner vertically
            } else if (rowIndex === board.length - 1 && colIndex === 0) {
              cornerTransform = 'rotate(180deg)'; // Rotate bottom-left corner 180 degrees
            } else if (rowIndex === board.length - 1 && colIndex === row.length - 1) {
              cornerTransform = 'scaleX(-1) rotate(180deg)'; // Invert bottom-right corner horizontally
            }

            // Render Corner if it's a corner, Slot if it's a slot, otherwise render Space
            return isCorner ? (
              <Corner
                key={`${rowIndex}-${colIndex}`}
                onClick={() => onCornerClick(rowIndex, colIndex)}
                transform={cornerTransform} // Pass the transformation to Corner
              />
            ) : isSlot ? (
              <Slot
                key={`${rowIndex}-${colIndex}`}
                onClick={() => onPlacePiece(rowIndex, colIndex)}
                rotation={slotRotation} // Pass rotation value to Slot
              >
                {board[rowIndex][colIndex] && (
                  <Piece team={board[rowIndex][colIndex]} />
                )}
              </Slot>
            ) : (
              <Space key={`${rowIndex}-${colIndex}`}>
                {board[rowIndex][colIndex] && (
                  <Piece team={board[rowIndex][colIndex]} />
                )}
              </Space>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Board;
