import React from 'react'

function Slot({ onClick, children }) {
    return (
        <div
            className="slot"
            onClick={onClick}
        >
            {children}
        </div>
    )
}

export default Slot
