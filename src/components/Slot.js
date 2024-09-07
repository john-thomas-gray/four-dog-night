import React from 'react'
import { SPACE } from '../config.js/space'

function Slot({ onClick, children }) {
    return (
        <div
            className="slot"
            onClick={onClick}
            style={{
                width: SPACE.size,
                height: SPACE.size,
                border: SPACE.border,
            }}
        >
            {children}
        </div>
    )
}

export default Slot
