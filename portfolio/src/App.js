import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import LP from './components/LP/LP';
import Me from './components/Me/me';
import Contact from './components/Contact/contact';
import Blog from './components/Blog/blog';

function App() {


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