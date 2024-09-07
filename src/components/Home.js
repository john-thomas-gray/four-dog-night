import React from 'react'
import Game from './Game'
import Landing from './Landing'
import Sunset from './Sunset'

function Home() {
  const scroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth"});
    }
  };

  return (
    <main>
        <div>
            <section id="landing">
                <Landing scroll={scroll}/>
            </section>
            <section id="sunset">
                <Sunset/>
            </section>
            <section id="game">
                <Game/>
            </section>

        </div>
    </main>
  )
}

export default Home
