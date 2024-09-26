import React from 'react';
import { SPACE } from '../config.js/space';
import slotArrowNorth from '../images/slot-arrow-north.png';
import slotArrowSouth from '../images/slot-arrow-south.png';
import slotArrowEast from '../images/slot-arrow-east.png';
import slotArrowWest from '../images/slot-arrow-west.png';
import blocked from '../images/blocked.png';

function Slot({ onClick, children, position, isValid, isBlocked }) {
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

  // Combine class names: keep inactive or active and add blocked if necessary
  const className = `${isValid ? 'slot active' : 'slot inactive'} ${isBlocked ? 'blocked' : ''}`;

  return (
    <div
      className={className} // Apply the dynamic className
      onClick={isBlocked ? null : onClick} // Disable click when blocked
      style={{
        width: SPACE.size,
        height: SPACE.size,
        border: '1px solid transparent',
        backgroundImage: `url(${arrowImage})`,
        backgroundSize: '65%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent',
      }}
    >
      {children}
    </div>
  );
}

export default Slot;
