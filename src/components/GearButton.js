import React from 'react'

function GearButton({ onClick }) {
  return (
    <div className="gear-button" onClick={onClick} style={gearButtonStyle}>
      <i className="fas fa-cog"></i>
    </div>
  );
}

const gearButtonStyle = {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    fontSize: '30px',
    cursor: 'pointer',
    color: 'white',
    borderRadius: '50%',
    padding: '10px',
    zIndex: 1001,
};

export default GearButton
