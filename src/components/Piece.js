import React from 'react';
import teamOneDog from '../images/teamOneDog.png';
import teamTwoDog from '../images/teamTwoDog.png';




function Piece({ team }) {
  const getImageSrc = () => {
    if (team === 'teamOne') return teamOneDog;
    if (team === 'teamTwo') return teamTwoDog;

  };

  return (
    <div
      style={{
        width: '70px',
        height: '70px',
        backgroundImage: `url(${getImageSrc()})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  );
}

export default Piece;
