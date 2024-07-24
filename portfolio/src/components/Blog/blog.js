import React from 'react';
import './blog.css';
import { Link } from 'react-router-dom';
import Header from '../Header/header';

function Contact() {
return (
    <div className='container'>
      <header>
        <Header />
      </header>
      <main>
        <div className="title">
          <div className="title-text">
            <h1>My Blog</h1>
            <div className="title-underline"></div>
            <p></p>
            <p></p>
            <button className="showme">Show me more</button>
          </div>
          <div className="bgimg">
            {/* <img src={Me} className="Me" /> */}
            <div className="number">01</div>
          </div>

          
        </div>
      </main>

      <footer>
      </footer>
    </div>
  );
};
export default Contact;