import React from 'react';
import { SPACE } from '../config.js/space';
import cornerArrowNE from '../images/corner-arrow-NE.png'; // Import corner images
import cornerArrowNW from '../images/corner-arrow-NW.png';
import cornerArrowSE from '../images/corner-arrow-SE.png';
import cornerArrowSW from '../images/corner-arrow-SW.png';

function Corner({ onClick, cornerPosition, isActive }) {
  // Determine which corner arrow image to use based on the corner position
  let arrowImage = cornerArrowNW; // Default to northwest (NW)
  switch (cornerPosition) {
    case 'NE':
      arrowImage = cornerArrowNE;
      break;
    case 'SE':
      arrowImage = cornerArrowSE;
      break;
    case 'SW':
      arrowImage = cornerArrowSW;
      break;
    case 'NW':
    default:
      arrowImage = cornerArrowNW;
      break;
  }

  return (
    <div
      className={`corner ${isActive ? 'active' : 'inactive'}`}
      onClick={isActive ? onClick : null} // Disable onClick if inactive
      style={{
        width: SPACE.size,
        height: SPACE.size,
        border: '1px solid transparent',
        backgroundImage: `url(${arrowImage})`,  // Use the determined corner image
        backgroundSize: '65%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent',
      }}
    >
      {/* Additional content (if any) can be placed here */}
    </div>
  );
}

export default Corner;
