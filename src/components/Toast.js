import React from 'react';

function Toast({ message, show }) {
  return show ? (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px'
    }}>
      {message}
    </div>
  ) : null;
}

export default Toast;
