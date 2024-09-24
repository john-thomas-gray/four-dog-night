import React, { useState, useEffect } from 'react';
import Board from './Board';
import Pile from './Pile';
import Piece from './Piece';
import Toast from './Toast';
import Corner from './Corner';
import GearButton from './GearButton';
import Menu from './Menu';

function Game({ gameMode, scroll }) {
  const rows = [9, 9, 9, 9, 9, 9, 9, 9, 9];

  const [board, setBoard] = useState(
    rows.map((cols) => Array(cols).fill(null))
  );
  const [selectedTeam, setSelectedTeam] = useState(null); // The team currently "holding" the piece
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [winner, setWinner] = useState(null);
  const [turn, setTurn] = useState('teamOne');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const resetGame = () => {
    setBoard(rows.map((cols) => Array(cols).fill(null)));
    setSelectedTeam(null);
    setCursorPosition({ x: 0, y: 0 });
    setWinner(null);
    setTurn('teamOne');
    setToastMessage('');
    setShowToast(false);
    setIsMenuOpen(false);
  };

  const handleQuit = () => {
    resetGame();
    scroll('landing');
  }

  const handleSelectPiece = (team) => {
    if (selectedTeam) {
      setSelectedTeam(null);
    } else {
      setSelectedTeam(team)
    }
  };

  const handleTurnChange = (turn) => {
    if (turn === 'teamOne') {
      setTurn('teamTwo');
    } else {
      setTurn('teamOne');
    }
  };

  // Helper function to determine if a given cell is a Slot
  const isSlot = (rowIndex, colIndex) => {
    const isCorner =
      (rowIndex === 0 || rowIndex === board.length - 1) &&
      (colIndex === 0 || colIndex === board[rowIndex].length - 1);

    return (
      !isCorner && (
        rowIndex === 0 || // Top row (excluding corners)
        rowIndex === board.length - 1 || // Bottom row (excluding corners)
        (rowIndex >= 1 && rowIndex <= 7 && (colIndex === 0 || colIndex === board[rowIndex].length - 1)) // First and last columns of rows 2-8
      )
    );
  };

  // Prevent pieces from being placed in invisible slots or corners
  const isValidSlotForPlacement = (rowIndex, colIndex) => {
    const isCorner = (rowIndex === 0 || rowIndex === board.length - 1) && (colIndex === 0 || colIndex === board[rowIndex].length - 1);
    return !isCorner;
  };

  // Calculate the final destination for a piece placed in a slot, stopping at slots or occupied spaces
  const getFinalDestination = (rowIndex, colIndex) => {
    let destinationRow = rowIndex;
    let destinationCol = colIndex;

    // Handle movement based on slot position
    if (rowIndex === 0) {
      // Top slot: Move straight down
      if (board[destinationRow + 1][destinationCol] !== null) {
        triggerToast("Row blocked!"); // Show toast if row is blocked
        return { destinationRow: null, destinationCol: null }; // Invalid destination
      }

      // Move down until an empty space or another slot is found
      while (destinationRow < board.length - 1 && board[destinationRow + 1][destinationCol] === null && !isSlot(destinationRow + 1, destinationCol)) {
        destinationRow++;
      }
    } else if (rowIndex === board.length - 1) {
      // Bottom slot: Move straight up
      if (board[destinationRow - 1][destinationCol] !== null) {
        triggerToast("Row blocked!"); // Show toast if row is blocked
        return { destinationRow: null, destinationCol: null }; // Invalid destination
      }

      // Move up until an empty space or another slot is found
      while (destinationRow > 0 && board[destinationRow - 1][destinationCol] === null && !isSlot(destinationRow - 1, destinationCol)) {
        destinationRow--;
      }
    } else if (colIndex === 0) {
      // Left slot: Move right
      if (board[rowIndex][destinationCol + 1] !== null) {
        triggerToast("Row blocked!"); // Show toast if row is blocked
        return { destinationRow: null, destinationCol: null }; // Invalid destination
      }

      while (destinationCol < board[rowIndex].length - 1 && board[rowIndex][destinationCol + 1] === null && !isSlot(rowIndex, destinationCol + 1)) {
        destinationCol++;
      }
    } else if (colIndex === board[rowIndex].length - 1) {
      // Right slot: Move left
      if (board[rowIndex][destinationCol - 1] !== null) {
        triggerToast("Row blocked!"); // Show toast if row is blocked
        return { destinationRow: null, destinationCol: null }; // Invalid destination
      }

      while (destinationCol > 0 && board[rowIndex][destinationCol - 1] === null && !isSlot(rowIndex, destinationCol - 1)) {
        destinationCol--;
      }
    }

    return { destinationRow, destinationCol };
  };

  const shiftGravity = (direction) => {
    const newBoard = [...board];
    const positionsToCheck = []; // To track the positions of moved pieces

    if (direction === 'up') {
      for (let col = 0; col < newBoard[0].length; col++) {
        for (let row = 1; row < newBoard.length; row++) {
          if (newBoard[row][col] !== null && !isSlot(row, col)) {
            let destRow = row;
            while (destRow > 0 && newBoard[destRow - 1][col] === null && !isSlot(destRow - 1, col)) {
              newBoard[destRow - 1][col] = newBoard[destRow][col];
              newBoard[destRow][col] = null;
              destRow--;
            }
            // Add the final destination of the moved piece
            positionsToCheck.push({ row: destRow, col });
          }
        }
      }
    } else if (direction === 'down') {
      for (let col = 0; col < newBoard[0].length; col++) {
        for (let row = newBoard.length - 2; row >= 0; row--) {
          if (newBoard[row][col] !== null && !isSlot(row, col)) {
            let destRow = row;
            while (destRow < newBoard.length - 1 && newBoard[destRow + 1][col] === null && !isSlot(destRow + 1, col)) {
              newBoard[destRow + 1][col] = newBoard[destRow][col];
              newBoard[destRow][col] = null;
              destRow++;
            }
            // Add the final destination of the moved piece
            positionsToCheck.push({ row: destRow, col });
          }
        }
      }
    } else if (direction === 'left') {
      for (let row = 0; row < newBoard.length; row++) {
        for (let col = 1; col < newBoard[row].length; col++) {
          if (newBoard[row][col] !== null && !isSlot(row, col)) {
            let destCol = col;
            while (destCol > 0 && newBoard[row][destCol - 1] === null && !isSlot(row, destCol - 1)) {
              newBoard[row][destCol - 1] = newBoard[row][destCol];
              newBoard[row][destCol] = null;
              destCol--;
            }
            // Add the final destination of the moved piece
            positionsToCheck.push({ row, col: destCol });
          }
        }
      }
    } else if (direction === 'right') {
      for (let row = 0; row < newBoard.length; row++) {
        for (let col = newBoard[row].length - 2; col >= 0; col--) {
          if (newBoard[row][col] !== null && !isSlot(row, col)) {
            let destCol = col;
            while (destCol < newBoard[row].length - 1 && newBoard[row][destCol + 1] === null && !isSlot(row, destCol + 1)) {
              newBoard[row][destCol + 1] = newBoard[row][destCol];
              newBoard[row][destCol] = null;
              destCol++;
            }
            // Add the final destination of the moved piece
            positionsToCheck.push({ row, col: destCol });
          }
        }
      }
    }

    setBoard(newBoard);

    // Check for winners at the positions where pieces were moved
    positionsToCheck.forEach(({ row, col }) => {
      checkForWinner(newBoard, row, col);
    });

    handleTurnChange(turn);
  };


  // Trigger a toast notification
  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000); // Toast disappears after 2 seconds
  };

  // Handle placing a piece on the board
  const handlePlacePiece = (rowIndex, colIndex) => {
    if (selectedTeam && !winner) {
      if (!isValidSlotForPlacement(rowIndex, colIndex)) {
        return;
      }

      const { destinationRow, destinationCol } = getFinalDestination(rowIndex, colIndex);

      // Prevent placement if destination is invalid
      if (destinationRow === null || destinationCol === null) return;

      // Check if the final destination is unoccupied
      if (board[destinationRow][destinationCol] === null) {
        const newBoard = board.map((row, rIdx) =>
          row.map((col, cIdx) =>
            rIdx === destinationRow && cIdx === destinationCol ? selectedTeam : col
          )
        );
        setBoard(newBoard);
        checkForWinner(newBoard, destinationRow, destinationCol);
        setSelectedTeam(null); // Remove the "held" piece after placing it
        handleTurnChange(turn);
      }
    }
  };

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
        return;
      }
    }
  };

  const checkDirection = (board, row, col, dx, dy) => {
    if (!board[row] || !board[row][col]) {
      return false;  // Exit early if the starting position is invalid
    }

    let count = 0;
    let team = board[row][col];

    // Move in the positive direction (dx, dy)
    for (let i = 0; i < 4; i++) {
      const newRow = row + i * dx;
      const newCol = col + i * dy;

      // Ensure newRow and newCol are within bounds
      if (newRow >= 0 && newRow < board.length && newCol >= 0 && newCol < board[newRow].length && board[newRow][newCol] === team) {
        count++;
      } else {
        break;  // Stop if out of bounds or different team
      }
    }

    // Move in the negative direction (-dx, -dy)
    for (let i = 1; i < 4; i++) {
      const newRow = row - i * dx;
      const newCol = col - i * dy;

      // Ensure newRow and newCol are within bounds
      if (newRow >= 0 && newRow < board.length && newCol >= 0 && newCol < board[newRow].length && board[newRow][newCol] === team) {
        count++;
      } else {
        break;  // Stop if out of bounds or different team
      }
    }

    return count >= 4;  // Return true if there are 4 or more in a row
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
        <div className="fieldOfPlay" style={isMenuOpen ? { filter: 'brightness(50%)' } : {}}>
            <div className='pile'>
              <Pile team="teamOne" turn={turn} onSelect={() => handleSelectPiece('teamOne')} />
            </div>
            <div className="board">
              <div className="top-gravity-button">
                <button onClick={() => shiftGravity('up')}>Move Up</button>
              </div>
              <div className="boardMiddle">
                <div className='left-gravity-button'>
                  <button onClick={() => shiftGravity('left')}>Move Left</button>
                </div>
                <Board
                  board={board.map((row, rowIndex) =>
                    row.map((col, colIndex) => {
                      const isCorner = (rowIndex === 0 || rowIndex === board.length - 1) && (colIndex === 0 || colIndex === board[rowIndex].length - 1);
                      // Render Corner for corners, otherwise allow normal slots/spaces
                      return isCorner ? <Corner key={`${rowIndex}-${colIndex}`} /> : col;
                    })
                  )}
                  onPlacePiece={handlePlacePiece}
                />
                <div className='right-gravity-button'>
                  <button onClick={() => shiftGravity('right')}>Move Right</button>
                </div>
              </div>
              <div className='bottom-gravity-button'>
                <button onClick={() => shiftGravity('down')}>Move Down</button>
              </div>
            </div>
            <div className='pile'>
              <Pile team="teamTwo" turn={turn} onSelect={() => handleSelectPiece('teamTwo')} />
            </div>

          {winner && <div className="winner-message">{winner} wins!</div>}
          {/* Display Toast */}
          <Toast message={toastMessage} show={showToast} />

      </div>
      <GearButton onClick={toggleMenu} />

      {isMenuOpen && <Menu onClose={toggleMenu} onQuit={handleQuit} onRestart={resetGame} />}

      {/* Piece following the cursor when picked */}
      {selectedTeam && (
        <div
          className="floating-piece"
          style={{
            position: 'fixed',
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
