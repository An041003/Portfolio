import React from 'react';
import './LP.css';
import Avt from '../../img/me.jpg';
import Header from '../Navigation/header';

function LandingPage() {
  return (
    <div className="container">
      <header>
        <Header />
      </header>

      <main>
        
        <nav className='horizontal'>
          <p>SCROLLDOWN—————</p>
        </nav>
        <div className="name">
          <div className="name-text">
            <h2>Portfolio</h2>
            <h1>Nguyen Binh An </h1>
            <div className="name-underline"></div>
            <p>Front-End Developer</p>
          </div>
          <div className="avt">
            <img src={Avt} className="Myavatar" />
          </div>
          
        </div>
      </main>
    </div>
  );
}

export default LandingPage;