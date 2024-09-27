import React from 'react';
import Space from './Space';
import Slot from './Slot';
import Piece from './Piece';
import Corner from './Corner';

function Board({ board, onPlacePiece, onCornerClick, isCurrentTurnSlot, gameMode, heldPiece, turn }) {
  // Function to determine if a slot is blocked
  const isSlotBlocked = (rowIndex, colIndex) => {
    if (rowIndex === 0) {
      // Top slot: blocked if the space below is occupied
      return board[1][colIndex] !== null;
    } else if (rowIndex === board.length - 1) {
      // Bottom slot: blocked if the space above is occupied
      return board[board.length - 2][colIndex] !== null;
    } else if (colIndex === 0) {
      // Left slot: blocked if the space to the right is occupied
      return board[rowIndex][1] !== null;
    } else if (colIndex === board[rowIndex].length - 1) {
      // Right slot: blocked if the space to the left is occupied
      return board[rowIndex][board[rowIndex].length - 2] !== null;
    }
    return false;
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`board-row ${row.length === 7 ? 'centered-row' : ''}`}
        >
          {row.map((col, colIndex) => {
            const isSlot =
              rowIndex === 0 ||
              rowIndex === board.length - 1 ||
              (rowIndex >= 1 &&
                rowIndex <= 7 &&
                (colIndex === 0 || colIndex === row.length - 1));

            const isCorner =
              (rowIndex === 0 || rowIndex === board.length - 1) &&
              (colIndex === 0 || colIndex === row.length - 1);

            let cornerPosition = '';
            if (rowIndex === 0 && colIndex === 0) {
              cornerPosition = 'NW';
            } else if (rowIndex === 0 && colIndex === row.length - 1) {
              cornerPosition = 'NE';
            } else if (rowIndex === board.length - 1 && colIndex === 0) {
              cornerPosition = 'SW';
            } else if (rowIndex === board.length - 1 && colIndex === row.length - 1) {
              cornerPosition = 'SE';
            }

            let slotPosition = 'west';
            if (rowIndex === 0) {
              slotPosition = 'north';
            } else if (rowIndex === board.length - 1) {
              slotPosition = 'south';
            } else if (colIndex === row.length - 1) {
              slotPosition = 'east';
            }

            const isValid = isSlot && isCurrentTurnSlot(rowIndex, colIndex);

            // Determine if the slot is blocked
            const isBlocked = isSlot && isSlotBlocked(rowIndex, colIndex);

            return isCorner ? (
              <Corner
                key={`${rowIndex}-${colIndex}`}
                onClick={() => onCornerClick(rowIndex, colIndex)}
                cornerPosition={cornerPosition}
                isActive={gameMode === 'fourPlayer'} // Set isActive based on gameMode
              />
            ) : isSlot ? (
              <Slot
                key={`${rowIndex}-${colIndex}`}
                onClick={() => onPlacePiece(rowIndex, colIndex)}
                position={slotPosition}
                isValid={isValid}
                isBlocked={isBlocked}
                heldPiece={heldPiece}
                gameMode={gameMode}
                turn={turn}
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
