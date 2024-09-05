import React from 'react';

function Space({ children }) {
  return (
    <div
      className="space"
      style={{
        width: '50px',
        height: '50px',
        border: '1px solid black' }}>
      {children}
    </div>
  );
}

export default Space;
