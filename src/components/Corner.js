import React from 'react';
import { SPACE } from '../config.js/space';
import cornerArrowNE from '../images/corner-arrow-NE.png';
import cornerArrowNW from '../images/corner-arrow-NW.png';
import cornerArrowSE from '../images/corner-arrow-SE.png';
import cornerArrowSW from '../images/corner-arrow-SW.png';

function Corner({ onClick, cornerPosition, isActive }) {
  let arrowImage = cornerArrowNW;
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
      className={`corner ${isActive ? '' : 'inactive'}`}
      onClick={isActive ? onClick : null}
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
    </div>
  );
}

export default Corner;
