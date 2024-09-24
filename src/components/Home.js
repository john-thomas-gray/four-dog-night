import React, { useState } from 'react'
import Game from './Game'
import Landing from './Landing'
import Sunset from './Sunset'

function Home() {
  const [gameMode, setGameMode] = useState(null);
  const [fadeButtons, setFadeButtons] = useState(false);
  const [fadeTitle, setFadeTitle] = useState(false);

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

        </div>
    </main>
  )
}

export default Home
