import React from 'react';

function Space({ onClick, children }) {
  return (
    <div className="space" onClick={onClick} style={{ width: '50px', height: '50px', border: '1px solid black' }}>
      {children}
    </div>
  );
}

export default Space;
