import React from 'react';

function Piece({ team }) {
  const getStyle = () => {
    if (team === 'teamOne') return { backgroundColor: 'blue' };
    if (team === 'teamTwo') return { backgroundColor: 'red' };
    return {};
  };

  return (
    <div
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        ...getStyle()
      }}
    />
  );
}

export default Piece;
