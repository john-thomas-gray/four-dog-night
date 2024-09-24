import React, { useState } from 'react'

function Landing({ scroll, setGameMode, setFadeButtons, setFadeTitle, fadeButtons, fadeTitle }) {
  const handleClickStart = (mode) => {
    setTimeout(() => {
      setFadeButtons(true);
      setFadeTitle(true);
      setTimeout(() => {
        setGameMode(mode);
        scroll("game");
      }, 500);

    }, 100);

  };

  const handleTwoPlayerStart = () => handleClickStart("twoPlayer");
  const handleFourPlayerStart = () => handleClickStart("fourPlayer");


  return (
    <div className="landing-section">
      <div className="moon">
        <div className="moon-background"></div>
        <div className="moon-content">
          <h1 className={`main-title ${fadeTitle ? 'fade-out' : ''}`}>Four Dog Night</h1>
          <h2 className={`start ${fadeButtons ? 'fade-out' : ''}`} onClick={handleTwoPlayerStart}>
            Two Player
          </h2>
          <h2 className={`start ${fadeButtons ? 'fade-out' : ''}`} onClick={handleFourPlayerStart}>
            Four Player
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Landing
