import React from 'react';
import './contact.css';
import { Link } from 'react-router-dom';
import Header from '../Header/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import Come from '../../img/comehere.jpg';

function Contact() {
return (
    <div className='container'>
      <header>
        <Header />
      </header>
      <main>
        <div className="title">
          <div className="title-text">
            <h1>Get In Touch </h1>
            <div className="title-underline"></div>
            <p><FontAwesomeIcon icon={faEnvelope} className='icon'/>binhan214981@gmail.com</p>
            <p><FontAwesomeIcon icon={faPhone} className='icon'/>0784073629</p>
          </div>
          <div className="bgimg">
            <img src={Come} className="Come" />
            <div className="number">03</div>
          </div>

          
        </div>
      </main>

      <footer>
      </footer>
    </div>
  );
};
export default Contact;