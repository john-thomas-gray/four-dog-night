import React, { useState } from 'react';
import slotArrowNorth from '../images/slot-arrow-north.png';
import slotArrowSouth from '../images/slot-arrow-south.png';
import slotArrowEast from '../images/slot-arrow-east.png';
import slotArrowWest from '../images/slot-arrow-west.png';
import blocked from '../images/blocked.png';

function Slot({ onClick, children, position, isValid, isBlocked }) {
  const [isHovered, setIsHovered] = useState(false);

  let arrowImage;

  if (isBlocked) {
    arrowImage = blocked; // Use blocked image if the slot is blocked
  } else {
    // Use the arrow image based on the position
    switch (position) {
      case 'north':
        arrowImage = slotArrowNorth;
        break;
      case 'south':
        arrowImage = slotArrowSouth;
        break;
      case 'east':
        arrowImage = slotArrowEast;
        break;
      case 'west':
      default:
        arrowImage = slotArrowWest;
        break;
    }
  }

  // Handle mouse enter and leave to highlight the arrow
  const handleMouseEnter = () => {
    if (!isBlocked && isValid) {
      setIsHovered(true); // Set hover state to true
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // Set hover state to false
  };

  return (
    <div
      className={`slot ${isValid ? 'active' : 'inactive'} ${isBlocked ? 'blocked' : ''}`}
      onClick={isBlocked ? null : onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '60px', // Example size
        height: '60px', // Example size
        border: '1px solid transparent',
        backgroundImage: `url(${arrowImage})`,
        backgroundSize: '65%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: isHovered ? 'rgba(255, 255, 0, 0.5)' : 'transparent', // Highlight color when hovered
        cursor: isValid && !isBlocked ? 'pointer' : 'not-allowed',
      }}
    >
      {children}
    </div>
  );
}

export default Slot;
