import React from 'react';
import { SPACE } from '../config.js/space';

function Space({ children }) {
  return (
    <div
      className="space"
      style={{
        width: SPACE.size,
        height: SPACE.size,
        border: SPACE.border,
        }}>
      {children}
    </div>
  );
}

export default Space;
