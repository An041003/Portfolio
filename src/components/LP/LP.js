import React from 'react';
import './LP.css';
import { Link } from 'react-router-dom';
import Avt from '../../img/me.jpg';
import Header from '../Navigation/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

function LandingPage() {
  return (
    <div className="container">
      <header>
        <Header />
      </header>

      <main>
        
        <nav className='horizontal'>
          <p>S e e  M o r e</p>
          <Link to="/blog" className='seemore'><FontAwesomeIcon icon ={faChevronDown}/></Link>
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