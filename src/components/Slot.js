import React from 'react';
import { SPACE } from '../config.js/space';
import slotArrow from '../images/slot-arrow.png';  // Import the image

function Slot({ onClick, children, rotation }) {
  return (
    <div
      className="slot"
      onClick={onClick}
      style={{
        width: SPACE.size,
        height: SPACE.size,
        border: '1px solid transparent',
        backgroundImage: `url(${slotArrow})`,
        backgroundSize: '65%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent',
        transform: `rotate(${rotation})`,  // Apply the rotation
      }}
    >
      {children}
    </div>
  );
}

export default Slot;
