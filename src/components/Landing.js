import React from 'react'

function Landing(props) {
  const handleClickStart = (section) => {
    props.scroll(section);
  }
  return (
    <div className="landing-section">
      <div className='moon'>
        <div className='moon-background'></div>
        <div className='moon-content'>
          <h1 className='main-title'>FOUR DOG NIGHT</h1>
          <h2 className='start' onClick={() => handleClickStart("game")}>Two Player</h2>
          <h2 className='start' onClick={() => handleClickStart("game")}>Four Player</h2>
        </div>
      </div>
    </div>
  );
}

export default Landing
