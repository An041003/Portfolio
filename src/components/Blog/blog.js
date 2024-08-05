import React from 'react';
import './blog.css';
import { Link } from 'react-router-dom';
import Header from '../Navigation/header';
import Sider from '../Navigation/sider';
import Blog from '../../img/blog.jpg';

function Contact() {
return (
    <div className='container'>
      <header>
        <Header />
      </header>  
      <Sider/>
      <main>
        <div className="title">
          <div className="title-text">
            <h1>My Blog</h1>
            <div className="title-underline"></div>
            <p></p>
            <p></p>
            <button className="showme"><Link to = "/my-blog">Show me more</Link></button>
          </div>
          <div className="bgimg">
            <img src={Blog} className="bgimg-child" />
            <div className="number">01</div>
          </div>

          
        </div>
      </main>

    </div>
  );
};
export default Contact;