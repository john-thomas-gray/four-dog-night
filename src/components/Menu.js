import React from 'react';

function Menu({ onClose, onQuit, onRestart }) {
  return (
    <div style={menuOverlayStyle}>
      <div style={menuContentStyle}>
        <h2>Paws</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <button onClick={onRestart} style={buttonStyle}>Start Over</button>
          <button onClick={onQuit} style={buttonStyle}>Main Menu</button>
          <button onClick={onClose} style={buttonStyle}>Close</button>
        </div>

      </div>
    </div>
  );
}

const menuOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
};

const menuContentStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '10px',
  width: '300px',
  textAlign: 'center',
};

const buttonStyle = {
  marginTop: '10px',
  padding: '10px 20px',
  fontSize: '16px',
};

export default Menu;
