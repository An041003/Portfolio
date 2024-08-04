import React from 'react';
import './me.css';
import { Link } from 'react-router-dom';
import Header from '../Navigation/header';
import Me from '../../img/1109233.jpg';
import Sider from '../Navigation/sider';

function AboutMe() {
return (
    <div className='container'>
      <header>
        <Header />
      </header>
      <Sider />
      <main>
        <div className="title">
          <div className="title-text">
            <h1>About Me </h1>
            <div className="title-underline"></div>
            <p></p>
            <p></p>
            <button className="showme"><Link to = "/introduction">Show me more</Link></button>
          </div>
          <div className="bgimg">
            <img src={Me} className="bgimg-child" />
            <div className="number">02</div>
          </div>

          
        </div>
      </main>
    </div>
  );
};
export default AboutMe;