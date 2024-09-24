import React from 'react'

function Landing({ scroll, setGameMode }) {


  const handleClickStart = (mode) => {
    setGameMode(mode);
    scroll("game");
  }

  const handleTwoPlayerStart = () => handleClickStart("twoPlayer");
  const handleFourPlayerStart = () => handleClickStart("fourPlayer");


  return (
    <div className="landing-section">
      <div className='moon'>
        <div className='moon-background'></div>
        <div className='moon-content'>
          <h1 className='main-title'>Four Dog Night</h1>
          <h2 className='start' onClick={handleTwoPlayerStart}>Two Player</h2>
          <h2 className='start' onClick={handleFourPlayerStart}>Four Player</h2>
        </div>
      </div>
    </div>
  );
}

export default Landing
