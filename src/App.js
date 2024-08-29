import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useGesture } from '@use-gesture/react';
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

  const bind = useGesture({
    onDrag: ({ movement: [mx, my] }) => {
      if (Math.abs(mx) > Math.abs(my)) {
        // Horizontal movement is not used
        return;
      }
      if (my > 50) {
        // Swipe down
        setCurrentPageIndex((prevIndex) => {
          const prevIndexUpdated = Math.max(prevIndex - 1, 0);
          if (prevIndexUpdated !== prevIndex) {
            navigate(pages[prevIndexUpdated]);
          }
          return prevIndexUpdated;
        });
      } else if (my < -50) {
        // Swipe up
        setCurrentPageIndex((prevIndex) => {
          const nextIndex = Math.min(prevIndex + 1, pages.length - 1);
          if (nextIndex !== prevIndex) {
            navigate(pages[nextIndex]);
          }
          return nextIndex;
        });
      }
    }
  });

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    window.addEventListener('scroll', handleScroll); // Add scroll event for touchpad

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    // Update currentPageIndex based on the current URL path
    const index = pages.indexOf(location.pathname);
    if (index !== -1) {
      setCurrentPageIndex(index);
    }
  }, [location.pathname, pages]);

  return (
    <div {...bind()} style={{ height: '100vh', overflow: 'hidden' }}>
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
