import React from 'react';
import './LP.css';
import { Link } from 'react-router-dom';
import Avt from '../../img/1304839.jpg';
import Header from '../Header/header';


function LandingPage() {
  return (
    <div className="container">
      <header>
        <Header />
      </header>

      <main>
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

      <footer>
      </footer>
    </div>
  );
}

export default LandingPage;