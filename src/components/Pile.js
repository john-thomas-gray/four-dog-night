import React from 'react';
import Piece from './Piece';

function Pile({ team, onSelect }) {
  return (
    <div className="pile" onClick={onSelect}>
      <Piece team={team} />
      <p>{team} Pile</p>
    </div>
  );
}

export default Pile;
