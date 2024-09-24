import React from 'react';
import { SPACE } from '../config.js/space';
import cornerArrow from '../images/corner-arrow.png';  // Import the corner arrow image

function Corner({ onClick, transform }) {
  return (
    <div
      className="corner"
      onClick={onClick}
      style={{
        width: SPACE.size,
        height: SPACE.size,
        border: '1px solid transparent',  // Transparent border
        cursor: 'pointer',
        backgroundImage: `url(${cornerArrow})`,  // Set the corner arrow image
        backgroundSize: '50%',  // Adjust size of the image as needed
        backgroundPosition: 'center',  // Center the image
        backgroundRepeat: 'no-repeat',  // Ensure the image doesn't repeat
        backgroundColor: 'transparent',  // Keep background transparent
        transform: transform,  // Apply the transformation
      }}
    >
    </div>
  );
}

export default Corner;
