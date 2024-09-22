import React from 'react';
import Piece from './Piece'

function Pile({ team, turn, onSelect }) {
  const handleClick = () => {
    if (turn === team) {
      onSelect()
    }
  }
  return (
    <div className="pile" onClick={handleClick}>
      <Piece team={team} />
      <p>{team}</p>
    </div>
  );
}

export default Pile;
