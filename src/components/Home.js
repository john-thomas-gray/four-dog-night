import React, { useState, useEffect } from 'react'
import Game from './Game'
import Landing from './Landing'
import Sunset from './Sunset'

function Home() {
  const [gameMode, setGameMode] = useState(null);
  const [fadeButtons, setFadeButtons] = useState(false);
  const [fadeTitle, setFadeTitle] = useState(false);
  const [firstTimeTwoPlayer, setFirstTimeTwoPlayer] = useState(false);

  const scroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 3500;
      let start = null;

      window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;

        const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        const scrollY = easeInOutQuad(progress / duration) * distance + startPosition;
        window.scrollTo(0, scrollY);

        if (progress < duration) {
          window.requestAnimationFrame(step);
        }
      });
    }
  };

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    const landingSection = document.getElementById('landing');
    if (landingSection) {
      window.scrollTo({
        top: landingSection.offsetTop,
        behavior: 'auto'
      });
    }
  }, []);

  useEffect(() => {
    // Check if it's the user's first time playing two-player mode
    if (gameMode === 'twoPlayer') {
      const hasPlayedTwoPlayerBefore = localStorage.getItem('hasPlayedTwoPlayer');
      if (!hasPlayedTwoPlayerBefore) {
        setFirstTimeTwoPlayer(true);
        // Set flag in localStorage so it doesn't show again
        localStorage.setItem('hasPlayedTwoPlayer', 'true');
      }
    }
  }, [gameMode]);

  return (
    <main className='main'>
        <div>
            <section id="landing">
                <Landing
                  scroll={scroll}
                  setGameMode={setGameMode}
                  setFadeButtons={setFadeButtons}
                  setFadeTitle={setFadeTitle}
                  fadeButtons={fadeButtons}
                  fadeTitle={fadeTitle}
                  />
            </section>
            <section id="sunset">
                <Sunset/>
            </section>
            <section id="game">
                <Game
                  gameMode={gameMode}
                  scroll={scroll}
                  setFadeButtons={setFadeButtons}
                  setFadeTitle={setFadeTitle}
                  />
            </section>
            {firstTimeTwoPlayer && (
          <div className="first-time-message">
            <p>Welcome to two-player mode! This is your first time playing.</p>
            <button onClick={() => setFirstTimeTwoPlayer(false)}>Got it!</button>
          </div>
        )}

        </div>
    </main>
  )
}

export default Home
