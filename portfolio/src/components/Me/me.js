import React from 'react';
import './me.css';
import { Link } from 'react-router-dom';
import Header from '../Header/header';
import Me from '../../img/1109233.jpg';

function AboutMe() {
return (
    <div className='container'>
      <header>
        <Header />
      </header>
      <main>
        <div className="title">
          <div className="title-text">
            <h1>About Me </h1>
            <div className="title-underline"></div>
            <p></p>
            <p></p>
            <button className="showme">Show me more</button>
          </div>
          <div className="bgimg">
            {/* <img src={Me} className="Me" /> */}
            <div className="number">02</div>
          </div>

          
        </div>
      </main>

      <footer>
      </footer>
    </div>
  );
};
export default AboutMe;