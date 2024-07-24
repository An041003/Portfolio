import React, { useState, useEffect } from 'react';
import './sider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';

export const Sider = () => {
  const navigate = useNavigate();
   const location = useLocation();
  const [currentPageIndex, setCurrentPageIndex] = useState(-1); 
  const pages = ['/', '/blog', '/about', '/contact']; 

  const handleNavClick = (direction) => {
    console.log('handleNavClick', direction);
    setCurrentPageIndex((currentIndex) => {
      if (direction === 'up') {
        const prevIndex = currentIndex - 1;
        return prevIndex < 0 ? pages.length - 1 : prevIndex;
      } else {
        const nextIndex = currentIndex + 1;
        return nextIndex >= pages.length ? 0 : nextIndex;
      }
    });
  };

  useEffect(() => {
    const newIndex = pages.findIndex((page) => page === location.pathname);
    if (newIndex !== -1) {
      console.log(newIndex);
      setCurrentPageIndex(newIndex);
    }
  }, [location.pathname]);

useEffect(() => {
if (currentPageIndex >= -1 && currentPageIndex < pages.length) {
navigate(pages[currentPageIndex]);
}
}, [currentPageIndex, navigate]);

  return (
    <nav className='sider'>
      <FontAwesomeIcon icon={faChevronUp} onClick={() => handleNavClick('up')} />
      <FontAwesomeIcon icon={faChevronDown} onClick={() => handleNavClick('down')} />
    </nav>
  );
};

export default Sider;
