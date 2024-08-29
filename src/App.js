import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import LP from './components/LP/LP';
import Me from './components/Me/me';
import Contact from './components/Contact/contact';
import Blog from './components/Blog/blog';
import Introduction from './components/Introduction/Introduction';
import MyBlog from './components/My-Blog/myblog';
import Daily from './components/My-Blog/daily';
import Technology from './components/My-Blog/technology';
import Project from './components/My-Blog/project';
import Ad from './components/Admin/admin';
import Test from './test';
import debounce from 'lodash.debounce';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [startY, setStartY] = useState(null);

  const pages = ['/', '/blog', '/about', '/contact'];

  const handleScroll = useCallback(debounce((event) => {
    if (pages.includes(location.pathname)) {
      const delta = event.deltaY || event.detail || event.wheelDelta;

      if (delta > 0) {
        // Scroll down
        setCurrentPageIndex((prevIndex) => {
          const nextIndex = Math.min(prevIndex + 1, pages.length - 1);
          if (nextIndex !== prevIndex) {
            navigate(pages[nextIndex]);
          }
          return nextIndex;
        });
      } else {
        // Scroll up
        setCurrentPageIndex((prevIndex) => {
          const prevIndexUpdated = Math.max(prevIndex - 1, 0);
          if (prevIndexUpdated !== prevIndex) {
            navigate(pages[prevIndexUpdated]);
          }
          return prevIndexUpdated;
        });
      }
    }
  }, 300), [location.pathname, navigate]);

  const handleTouchMove = (event) => {
    if (startY !== null) {
      const touch = event.touches[0];
      const deltaY = touch.clientY - startY;
      if (deltaY > 0) {
        // Swipe down
        setCurrentPageIndex((prevIndex) => {
          const prevIndexUpdated = Math.max(prevIndex - 1, 0);
          if (prevIndexUpdated !== prevIndex) {
            navigate(pages[prevIndexUpdated]);
          }
          return prevIndexUpdated;
        });
      } else if (deltaY < 0) {
        // Swipe up
        setCurrentPageIndex((prevIndex) => {
          const nextIndex = Math.min(prevIndex + 1, pages.length - 1);
          if (nextIndex !== prevIndex) {
            navigate(pages[nextIndex]);
          }
          return nextIndex;
        });
      }
      setStartY(null);
    }
  };

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    setStartY(touch.clientY);
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    window.addEventListener('scroll', handleScroll); // Add scroll event for touchpad
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleScroll, handleTouchMove, handleTouchStart]);

  useEffect(() => {
    // Update currentPageIndex based on the current URL path
    const index = pages.indexOf(location.pathname);
    if (index !== -1) {
      setCurrentPageIndex(index);
    }
  }, [location.pathname, pages]);

  return (
    <div>
      <Routes>
        <Route path='/' element={<LP />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/about' element={<Me />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/introduction' element={<Introduction />} />
        <Route path='/my-blog' element={<MyBlog />} />
        <Route path='/my-blog-daily' element={<Daily />} />
        <Route path='/my-blog-technology' element={<Technology />} />
        <Route path='/my-blog-project' element={<Project />} />
        <Route path='/ad' element={<Ad />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </div>
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
