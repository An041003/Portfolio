import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
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
function App() {


  return (
    <div>
      <Routes>
        <Route path='/portfolio' element={<LP />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/about' element={<Me />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/introduction' element={<Introduction />} />
        <Route path='/my-blog' element={<MyBlog />} />
        <Route path='/my-blog-daily' element={<Daily/>} />
        <Route path='/my-blog-technology' element={<Technology/>} />
        <Route path='/my-blog-project' element={<Project/>} />
        <Route path='/ad' element={<Ad />} />
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