import React, { useState, useEffect } from 'react';
import Board from './Board';
import Pile from './Pile';
import Piece from './Piece';
import Toast from './Toast';
import GearButton from './GearButton';
import Menu from './Menu';
import WinnerMessage from './WinnerMessage';
import tutorialSteps2P from '../data/TutorialSteps2P';

function Game({ gameMode, scroll, setFadeButtons, setFadeTitle}) {
  const rows = [9, 9, 9, 9, 9, 9, 9, 9, 9];

  const [board, setBoard] = useState(
    rows.map((cols) => Array(cols).fill(null))
  );
  const [heldPiece, setHeldPiece] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [winner, setWinner] = useState(null);
  const [turn, setTurn] = useState(1);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);


  const playerSides = gameMode === 'fourPlayer' ? {
    1: 'south',
    2: 'west',
    3: 'north',
    4: 'east',
  } : {
    1: 'any',
    2: 'any',
  };

  const isCurrentPlayerTurn = (side) => {
    if (gameMode === 'twoPlayer') {
      return true;
    }
    return playerSides[turn] === side;
  }
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const resetGame = () => {
    toggleMenu();
    setBoard(rows.map((cols) => Array(cols).fill(null)));
    setHeldPiece(null);
    setCursorPosition({ x: 0, y: 0 });
    setWinner(null);
    setTurn(1);
    setToastMessage('');
    setShowToast(false);
    setIsMenuOpen(false);
  };

  const handleQuit = () => {

    toggleMenu();
    scroll('landing');

    setTimeout(() => {
      setFadeButtons(false);
      setFadeTitle(false);
      setTimeout(() => {
        resetGame();
      }, 1000);
    }, 3500);
  };

  const rotateBoard = (direction) => {
    setHeldPiece(null);
    const newBoard =
      direction === 'clockwise'
        ? board[0].map((_, colIndex) =>
            board.map((row) => row[colIndex]).reverse()
          )
        : board[0].map((_, colIndex) =>
            board.map((row) => row[row.length - 1 - colIndex])
          );
    setBoard(newBoard);
  };

  const rotateAction = (direction) => {

    rotateBoard(direction);
    handleTurnChange(turn);

  };

  const handleCornerClick = (rowIndex, colIndex) => {
    if (gameMode === 'fourPlayer') {
      const isTopLeftCorner = rowIndex === 0 && colIndex === 0;
      const isTopRightCorner = rowIndex === 0 && colIndex === board[rowIndex].length - 1;
      const isBottomLeftCorner = rowIndex === board.length - 1 && colIndex === 0;
      const isBottomRightCorner = rowIndex === board.length - 1 && colIndex === board[rowIndex].length - 1;

      if (isTopLeftCorner || isBottomRightCorner) {
        rotateAction('counterclockwise');
      } else if (isTopRightCorner || isBottomLeftCorner) {
        rotateAction('clockwise');
      }
    } else {
      triggerToast('Rotation is only available in four-player mode.');
    }
  };

  const handleSelectPiece = (team) => {
    if (heldPiece) {
      setHeldPiece(null);
    } else {
      setHeldPiece(team)
    }
  };

  const handleTurnChange = () => {
    if (gameMode === 'fourPlayer') {
      setTurn((prevTurn) => (prevTurn === 4 ? 1 : prevTurn + 1));
    } else {
      setTurn((prevTurn) => (prevTurn === 2 ? 1 : prevTurn + 1));
    }
  };

  const isSlot = (rowIndex, colIndex) => {
    const isCorner =
      (rowIndex === 0 || rowIndex === board.length - 1) &&
      (colIndex === 0 || colIndex === board[rowIndex].length - 1);

    return (
      !isCorner && (
        rowIndex === 0 ||
        rowIndex === board.length - 1 ||
        (rowIndex >= 1 && rowIndex <= 7 && (colIndex === 0 || colIndex === board[rowIndex].length - 1))
      )
    );
  };

  const isCurrentTurnSlot = (rowIndex, colIndex) => {
    const side = playerSides[turn];

    if (side === 'any') {
      return isSlot(rowIndex, colIndex);
    }

    if (side === 'north' && rowIndex === 0) {
      return true;
    } else if (side === 'south' && rowIndex === board.length - 1) {
      return true;
    } else if (side === 'west' && colIndex === 0) {
      return true;
    } else if (side === 'east' && colIndex === board[0].length - 1) {
      return true;
    }
    return false;
  };

  const getFinalDestination = (rowIndex, colIndex) => {
    let destinationRow = rowIndex;
    let destinationCol = colIndex;

    if (rowIndex === 0) {
      if (board[destinationRow + 1][destinationCol] !== null) {
        triggerToast("Row blocked!");
        return { destinationRow: null, destinationCol: null };
      }

      while (destinationRow < board.length - 1 && board[destinationRow + 1][destinationCol] === null && !isSlot(destinationRow + 1, destinationCol)) {
        destinationRow++;
      }
    } else if (rowIndex === board.length - 1) {
      if (board[destinationRow - 1][destinationCol] !== null) {
        triggerToast("Row blocked!");
        return { destinationRow: null, destinationCol: null };
      }

      while (destinationRow > 0 && board[destinationRow - 1][destinationCol] === null && !isSlot(destinationRow - 1, destinationCol)) {
        destinationRow--;
      }
    } else if (colIndex === 0) {
      if (board[rowIndex][destinationCol + 1] !== null) {
        triggerToast("Row blocked!");
        return { destinationRow: null, destinationCol: null };
      }

      while (destinationCol < board[rowIndex].length - 1 && board[rowIndex][destinationCol + 1] === null && !isSlot(rowIndex, destinationCol + 1)) {
        destinationCol++;
      }
    } else if (colIndex === board[rowIndex].length - 1) {
      if (board[rowIndex][destinationCol - 1] !== null) {
        triggerToast("Row blocked!");
        return { destinationRow: null, destinationCol: null };
      }

      while (destinationCol > 0 && board[rowIndex][destinationCol - 1] === null && !isSlot(rowIndex, destinationCol - 1)) {
        destinationCol--;
      }
    }

    return { destinationRow, destinationCol };
  };

  const shiftGravity = (direction) => {

    const newBoard = [...board];
    const positionsToCheck = [];
    const side = playerSides[turn];

    if (gameMode === 'fourPlayer') {
      const allowedDirection = {
        north: 'up',
        south: 'down',
        west: 'left',
        east: 'right',
      }[side];

      if (direction !== allowedDirection) {
        triggerToast('You can only shift gravity towards your own side!');
        return;
      }
    }


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
            positionsToCheck.push({ row, col: destCol });
          }
        }
      }
    }
    setHeldPiece(null);
    setBoard(newBoard);

    positionsToCheck.forEach(({ row, col }) => {
      checkForWinner(newBoard, row, col);
    });

    handleTurnChange(turn);
  };

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const handlePlacePiece = (rowIndex, colIndex) => {
    if (heldPiece && !winner) {
      if (!isCurrentTurnSlot(rowIndex, colIndex)) {
        triggerToast('You can only place pieces from your side!');
        return;
      }

      const { destinationRow, destinationCol } = getFinalDestination(rowIndex, colIndex);

      if (destinationRow === null || destinationCol === null) return;

      if (board[destinationRow][destinationCol] === null) {
        const newBoard = board.map((row, rIdx) =>
          row.map((col, cIdx) =>
            rIdx === destinationRow && cIdx === destinationCol ? heldPiece : col
          )
        );
        setBoard(newBoard);
        checkForWinner(newBoard, destinationRow, destinationCol);
        setHeldPiece(null);
        handleTurnChange(turn);
      }
    }
  };

  const checkForWinner = (board) => {
    const directions = [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: -1 }
    ];

    let player1HasWon = false;
    let player2HasWon = false;

    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        for (let direction of directions) {
          if (checkDirection(board, row, col, direction.x, direction.y, 'teamOne')) {
            player1HasWon = true;
          }
          if (checkDirection(board, row, col, direction.x, direction.y, 'teamTwo')) {
            player2HasWon = true;
          }

          if (player1HasWon && player2HasWon) {
            setWinner('Tie');
            return;
          }
        }
      }
    }

    if (player1HasWon) {
      setWinner('Team One');
    } else if (player2HasWon) {
      setWinner('Team Two');
    }
  };

  const checkDirection = (board, row, col, dx, dy, team) => {
    if (!board[row] || !board[row][col] || board[row][col] !== team) {
      return false;
    }

    let count = 0;

    for (let i = 0; i < 4; i++) {
      const newRow = row + i * dx;
      const newCol = col + i * dy;

      if (
        newRow >= 0 &&
        newRow < board.length &&
        newCol >= 0 &&
        newCol < board[newRow].length &&
        board[newRow][newCol] === team
      ) {
        count++;
      } else {
        break;
      }
    }

    for (let i = 1; i < 4; i++) {
      const newRow = row - i * dx;
      const newCol = col - i * dy;

      if (
        newRow >= 0 &&
        newRow < board.length &&
        newCol >= 0 &&
        newCol < board[newRow].length &&
        board[newRow][newCol] === team
      ) {
        count++;
      } else {
        break;
      }
    }

    return count >= 4;
  };


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
              <Pile
                team="teamOne"
                turn={turn}
                onSelect={() => handleSelectPiece('teamOne')} />
            </div>
            <div className="board">
              <div className="north-gravity-button" style={{ visibility: isCurrentPlayerTurn('north') ? 'visible' : 'hidden' }}>
                <button onClick={() => shiftGravity('up')}>Pull</button>
              </div>
              <div className="boardMiddle">
                <div className='west-gravity-button' style={{ visibility: isCurrentPlayerTurn('west') ? 'visible' : 'hidden' }}>
                  <button onClick={() => shiftGravity('left')}>Pull</button>
                </div>
                <Board
                  board={board}
                  onPlacePiece={handlePlacePiece}
                  onCornerClick={handleCornerClick}
                  isCurrentTurnSlot={isCurrentTurnSlot}
                  gameMode={gameMode}
                  heldPiece={heldPiece}
                  turn={turn}
                />
                <div className='east-gravity-button' style={{ visibility: isCurrentPlayerTurn('east') ? 'visible' : 'hidden'}}>
                  <button onClick={() => shiftGravity('right')}>Pull</button>
                </div>
              </div>
              <div className='south-gravity-button' style={{ visibility: isCurrentPlayerTurn('south') ? 'visible' : 'hidden'}}>
                <button onClick={() => shiftGravity('down')}>Pull</button>
              </div>
            </div>
            <div className='pile'>
              <Pile
                team="teamTwo"
                turn={turn}
                onSelect={() => handleSelectPiece('teamTwo')} />
            </div>

          <Toast message={toastMessage} show={showToast} />


      </div>

      {isMenuOpen && <Menu onClose={toggleMenu} onQuit={handleQuit} onRestart={resetGame} />}

      {winner && (
        <WinnerMessage
          onClose={() => setWinner(null)}
          onQuit={handleQuit}
          onRestart={resetGame}
          winner={winner}
        />
      )}

      {heldPiece && (
        <div
        className="floating-piece"
        style={{
          position: 'fixed',
          left: cursorPosition.x,
          top: cursorPosition.y,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)'
        }}
        >
          <Piece team={heldPiece} />
        </div>
      )}
      <GearButton onClick={toggleMenu} />
    </>
  );
}

export default Game;
