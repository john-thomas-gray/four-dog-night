import React from 'react';
import teamOneDog from '../images/teamOneDog.png';
import teamTwoDog from '../images/teamTwoDog.png';
// import defaultDog from '../images/defaultDog.png';



function Piece({ team }) {
  const getImageSrc = () => {
    if (team === 'teamOne') return teamOneDog;
    if (team === 'teamTwo') return teamTwoDog;

  };

  return (
    <div
      style={{
        width: '50px',
        height: '50px',
        // borderRadius: '50%',
        backgroundImage: `url(${getImageSrc()})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  );
}

export default Piece;
