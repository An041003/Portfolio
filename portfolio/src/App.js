import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import LP from './components/LP/LP';
import Me from './components/Me/me';
import Contact from './components/Contact/contact';
import Blog from './components/Blog/blog';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  // const [previousScrollTop, setPreviousScrollTop] = useState(0);

  const handleScroll = () => {
    // window.location.reload(); 
    const scrollTop = window.scrollY;
    console.log('s1', scrollTop);
    // console.log('pre1', previousScrollTop);
    if (scrollTop > 100) {
      console.log('Down');
      console.log('Current Path 1:', location.pathname);
      handleScrollDown(location.pathname);
    } else if (scrollTop < 0) {
      console.log('Up');
      console.log('Current Path 1:', location.pathname);
      handleScrollUp(location.pathname);
      
    }
    // console.log('s2', scrollTop);
    //     setPreviousScrollTop((prev) => {
    //   console.log('pre2', prev);
    //   return scrollTop;
    // });
     
  };

  const handleScrollDown = (currentPath) => {
    switch (currentPath) {
      case '/':
        navigate('/blog');
        break;
      case '/blog':
        navigate('/about');
        break;
      case '/about':
        navigate('/contact');
        break;
      default:
        break;
    }
    console.log('Current Path 2:',currentPath);
  };

  const handleScrollUp = (currentPath) => {
    switch (currentPath) {
      case '/contact':
        navigate('/about');
        break;
      case '/about':
        navigate('/blog');
        break;
      case '/blog':
        navigate('/');
        break;
      default:
        break;
    }
    console.log(currentPath);
  };

  useEffect(() => {
    // Cuộn trang xuống 10 pixel khi trang được tải
    window.scrollTo(0, 10); 
  }, []);

    useEffect(() => {
    console.log('Current Path 3:', location.pathname); // In ra đường dẫn hiện tại
  }, []);  

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <div>
      <Routes>
        <Route path='/' element={<LP />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/about' element={<Me />} />
        <Route path='/contact' element={<Contact />} />
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