import React, { useState, useEffect } from 'react';
import slotArrowNorth from '../images/slot-arrow-north.png';
import slotArrowSouth from '../images/slot-arrow-south.png';
import slotArrowEast from '../images/slot-arrow-east.png';
import slotArrowWest from '../images/slot-arrow-west.png';
import slotArrowNorthBlack from '../images/slot-arrow-north-black.png';
import slotArrowSouthBlack from '../images/slot-arrow-south-black.png';
import slotArrowEastBlack from '../images/slot-arrow-east-black.png';
import slotArrowWestBlack from '../images/slot-arrow-west-black.png';
import blocked from '../images/blocked.png';
import { SPACE } from '../config.js/space';

function Slot({ onClick, children, position, isValid, isBlocked, heldPiece, turn, gameMode }) {
  const [isHovered, setIsHovered] = useState(false);

  let arrowImage;

  const isTeamTwoTurn = gameMode === 'twoPlayer' && turn === 2;

  if (isBlocked) {
    arrowImage = blocked;
  } else {
    switch (position) {
      case 'north':
        arrowImage = isTeamTwoTurn ? slotArrowNorthBlack : slotArrowNorth;
        break;
      case 'south':
        arrowImage = isTeamTwoTurn ? slotArrowSouthBlack : slotArrowSouth;
        break;
      case 'east':
        arrowImage = gameMode === 'fourPlayer' || isTeamTwoTurn ? slotArrowEastBlack : slotArrowEast;
        break;
      case 'west':
        arrowImage = gameMode === 'fourPlayer' || isTeamTwoTurn ? slotArrowWestBlack : slotArrowWest;
        break;
      default:
        arrowImage = slotArrowWest;
    }
  }

  const handleMouseEnter = () => {
    if (!isBlocked && isValid && heldPiece) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if(!heldPiece) {
      setIsHovered(false);
    }
  }, [heldPiece]);

  return (
    <div
      className={`slot ${isValid ? 'active' : 'inactive'} ${isBlocked ? 'blocked' : ''}`}
      onClick={isBlocked ? null : onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: SPACE.size,
        height: SPACE.size,
        border: '1px solid transparent',
        backgroundImage: `url(${arrowImage})`,
        backgroundSize: '65%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: isHovered ? 'rgba(255, 255, 0, 0.5)' : 'transparent',
        // cursor: isValid && !isBlocked ? 'pointer' : 'not-allowed',
      }}
    >
      {children}
    </div>
  );
}

export default Slot;
