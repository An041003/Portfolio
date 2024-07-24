import React, { useState } from 'react';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBars} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const Header = (props) => {
  const [showNav, setShowNav] = useState(false);
  const toggleNav = () => {
    setShowNav(!showNav);
  };


  return (
    <>
      <header>
        <div className="logo">
          <div>Binh An</div>
        </div>
        <nav>
          <ul>
            <li><a href="https://web.facebook.com/Andesu04/"><FontAwesomeIcon icon={faFacebookF} className="icon" /></a></li>
            <li><a href="https://github.com/An041003"><FontAwesomeIcon icon={faGithub} className='icon' /></a></li>
            <li><Link to="/blog" className='icon'>Blog</Link></li>
            <li><button className="menu-toggle"><FontAwesomeIcon icon={faBars} className='icon' /></button></li>
          </ul>
          
        </nav>
      </header>
      <main>
      </main>
      <footer>
      </footer>
    </>
  );
};
export default Header;