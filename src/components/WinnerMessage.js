import React from 'react';

function WinnerMessage({ onClose, onQuit, onRestart, winner }) {
  return (
    <div style={messageOverlayStyle}>
      <div style={messageContentStyle}>
        <button onClick={onClose} style={closeButtonStyle}>✕</button> {/* "X" button */}
        <h2>{winner === 'Tie' ? "It's a Tie!" : `${winner} wins!`}</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
        </div>
      </div>
    </div>
  );
}

const messageOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
};

const messageContentStyle = {
  position: 'absolute',
  top: '14%', // Adjust to position it in the top third of the page
  left: '50%',
  transform: 'translate(-50%, -30%)', // Center the message horizontally and vertically
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

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: 'none',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',
};

export default WinnerMessage;
