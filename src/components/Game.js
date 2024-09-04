import React, { useState, useEffect } from 'react';
import Board from './Board';
import Pile from './Pile';
import Piece from './Piece';

function Game() {
  const rows = 7;
  const cols = 7;

  const [board, setBoard] = useState(
    Array(rows).fill().map(() => Array(cols).fill(null))
  );
  const [selectedTeam, setSelectedTeam] = useState(null); // The team currently "holding" the piece
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [winner, setWinner] = useState(null);

  // Handle selecting a piece from the pile
  const handleSelectPiece = (team) => {
    setSelectedTeam(team);
  };

  // Handle placing a piece on the board
  const handlePlacePiece = (rowIndex, colIndex) => {
    if (selectedTeam && board[rowIndex][colIndex] === null && !winner) {
      const newBoard = board.map((row, rIdx) =>
        row.map((col, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex ? selectedTeam : col
        )
      );
      setBoard(newBoard);
      checkForWinner(newBoard, rowIndex, colIndex);
      setSelectedTeam(null); // Remove the "held" piece after placing it
    }
  };

  // Function to check for a winner
  const checkForWinner = (board, row, col) => {
    const directions = [
      { x: 0, y: 1 },  // Horizontal
      { x: 1, y: 0 },  // Vertical
      { x: 1, y: 1 },  // Diagonal (down-right)
      { x: 1, y: -1 }  // Diagonal (down-left)
    ];

    for (let direction of directions) {
      if (checkDirection(board, row, col, direction.x, direction.y)) {
        setWinner(board[row][col]);
        alert(`${board[row][col]} wins!`);
        return;
      }
    }
  };

  // Check in the given direction for a winner
  const checkDirection = (board, row, col, dx, dy) => {
    let count = 0;
    let team = board[row][col];

    for (let i = 0; i < 4; i++) {
      const newRow = row + i * dx;
      const newCol = col + i * dy;
      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && board[newRow][newCol] === team) {
        count++;
      } else {
        break;
      }
    }

    for (let i = 1; i < 4; i++) {
      const newRow = row - i * dx;
      const newCol = col - i * dy;
      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && board[newRow][newCol] === team) {
        count++;
      } else {
        break;
      }
    }

    return count >= 4;
  };

  // Update cursor position
  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="title">Four Dog Night</div>

      <Pile team="teamOne" onSelect={() => handleSelectPiece('teamOne')} />
      <Pile team="teamTwo" onSelect={() => handleSelectPiece('teamTwo')} />

      <Board board={board} onPlacePiece={handlePlacePiece} />

      {winner && <div className="winner-message">{winner} wins!</div>}

      {/* Piece following the cursor when picked */}
      {selectedTeam && (
        <div
          className="floating-piece"
          style={{
            position: 'absolute',
            left: cursorPosition.x,
            top: cursorPosition.y,
            pointerEvents: 'none', // Prevents interference with other elements
            transform: 'translate(-50%, -50%)' // Center the piece on the cursor
          }}
        >
          <Piece team={selectedTeam} />
        </div>
      )}
    </>
  );
}

export default Game;
