import React from 'react'

function Landing({ scroll, setGameMode }) {
  const handleClickStart = (mode) => {
    setGameMode(mode);
    scroll("game");
  }
  return (
    <div className="landing-section">
      <div className='moon'>
        <div className='moon-background'></div>
        <div className='moon-content'>
          <h1 className='main-title'>Four Dog Night</h1>
          <h2 className='start' onClick={() => handleClickStart("twoPlayer")}>Two Player</h2>
          <h2 className='start' onClick={() => handleClickStart("fourPlayer")}>Four Player</h2>
        </div>
      </div>
    </div>
  );
}

export default Landing
