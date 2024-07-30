import React, { useState } from 'react';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBars, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
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
          <ul className="nav-list">
            <li>
              <a href="https://web.facebook.com/Andesu04/"><FontAwesomeIcon icon={faFacebookF} className="icon" /></a>
            </li>
            <li>
              <a href="https://github.com/An041003"><FontAwesomeIcon icon={faGithub} className='icon' /></a>
            </li>
            <li>
              <Link to="/my-blog" className='icon'>My Blog</Link>
            </li>
            <li>
              <button className="menu-toggle" onClick={toggleNav}>
                <FontAwesomeIcon icon={faBars} className='icon' />
              </button>
            </li>
            {showNav && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/blog" className='icon'>Blog</Link>
                </li>
                <li>
                  <Link to="/about" className='icon'>About Me</Link>
                </li>
                <li>
                  <Link to="/contact" className='icon'>Contact</Link>
                </li>
              </ul>
            )}
          </ul>
        </nav>
      </header>
      <main>
        {/* ... Nội dung trang ... */}
      </main>
      <footer>
        {/* ... Nội dung footer ... */}
      </footer>
    </>
  );
};
export default Header;