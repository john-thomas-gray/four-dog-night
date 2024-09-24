import React from 'react'
import { SPACE } from '../config.js/space'

function Corner({ onClick }) {
  return (
    <div
    className="corner"
    onClick={onClick}
    style={{
      width: SPACE.size,
      height: SPACE.size,
      cursor: 'pointer',
    }}> </div>
  )
}

export default Corner
