import React from 'react';
import Piece from './Piece';

function Pile({ team, turn, onSelect }) {
  const handleClick = () => {
    if ((turn === 1 || turn === 3) && team === 'teamOne') {
      onSelect();
    } else if ((turn === 2 || turn === 4) && team === 'teamTwo') {
      onSelect();
    }
  };

  return (
    <div className="pile" onClick={handleClick}>
      <Piece team={team} />
      <h2>{team === 'teamOne' ? 'Dog Pile One' : 'Dog Pile Two'}</h2>
    </div>
  );
}

export default Pile;
