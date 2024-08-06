import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Navigation/header';
import { Link } from 'react-router-dom';
import './myblog.css';
import Sky from '../../img/sky.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faGlobe, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import ReadMore from './readmore';

function Daily() {
  const [blogs, setBlogs] = useState([]);
  const [recentPosts, setRecentPosts] = useState({ daily: null, technology: null, project: null });

  useEffect(() => {
    axios.get('https://66aefdacb05db47acc58c359.mockapi.io/api/articles')
      .then(response => {
        const sortedBlogs = response.data.sort((a, b) => b.createAt - a.createAt);
        const dailyBlogs = sortedBlogs.filter(blog => blog.type === '1');
        setBlogs(dailyBlogs); 
        setRecentPosts(getRecentPostsByType(response.data));
      })
      .catch(error => console.error(error));
    const header = document.querySelector('header');
    header.classList.add('blog-header');
  }, []);

  const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000); 
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });
};

 const getRecentPostsByType = (blogs) => {
    const types = ['1', '2', '3']; // '1' for Daily, '2' for Technology, '3' for Project
    const recentPosts = {};

    types.forEach(type => {
      const filteredBlogs = blogs.filter(blog => blog.type === type);
    if (filteredBlogs.length > 0) {
      const sortedBlogs = filteredBlogs.sort((a, b) => b.createAt - a.createAt);
      if (type === '1') recentPosts.daily = sortedBlogs[0];
      if (type === '2') recentPosts.technology = sortedBlogs[0];
      if (type === '3') recentPosts.project = sortedBlogs[0];
    }
    });

    return recentPosts;
  };

    const convertNewLinesToBreaks = (text) => {
    return text.split('\n').map((item, key) => {
      return <span key={key}>{item}<br /></span>
    });
  };

  return (
    <>
    <Header/>
    <main>
      <div className='blog'>
      <nav className='blog-menu'>
        <ul>
          <li className='fill'><Link to="/my-blog"><FontAwesomeIcon icon={faSun} className='blog-icon'/>Daily</Link></li>
          <li><Link to="/my-blog-technology"><FontAwesomeIcon icon={faGlobe} className='blog-icon'/>Technology</Link></li>
          <li><Link to="/my-blog-project"><FontAwesomeIcon icon={faLightbulb} className='blog-icon'/>Project</Link></li>
        </ul>
        <div className='blog-recent'>
         <h3>Recent Posts</h3>
              {recentPosts.daily && (
                <div className='recent'>
                  <h4>Daily</h4>
                  <p className='recent-title'>{recentPosts.daily.title}</p>
                  <p className='recent-date'>{formatDate(recentPosts.daily.createAt)}</p>
                </div>
              )}
              {recentPosts.technology && (
                <div className='recent'>
                  <h4>Technology</h4>
                  <p className='recent-title'>{recentPosts.technology.title}</p>
                  <p className='recent-date'>{formatDate(recentPosts.technology.createAt)}</p>
                </div>
              )}
              {recentPosts.project && (
                <div className='recent'>
                  <h4>Project</h4>
                  <p className='recent-title'>{recentPosts.project.title}</p>
                  <p className='recent-date'>{formatDate(recentPosts.project.createAt)}</p>
                </div>
              )}
        </div>  
      </nav>
      <div className='blog-container'>
      {blogs.map(blog => (
        <div key={blog.id} className='container-format'>
          <h2>{blog.title}</h2>
          <p className='container-date'>{formatDate(blog.createAt)}</p> 
          <p className='container-content'>
            <ReadMore>
            {convertNewLinesToBreaks(blog.content)}
            </ReadMore>
          </p>
          {blog.img && <img className={blog.img ? '' : 'hidden-img'} src={blog.img} alt='/' />}
          
        </div>
      ))}
    </div>
      <nav className='blog-infor'>
        <div className='blog-aboutme'>
          <img src={Sky} className="blog-img" />
          <p>Hi there, my name is An. Welcome to my Blog where I tell my own stories, the journey I've taken and my memories over years.</p>
        </div>
        <div className='blog-contact'>
          <h3>Keep in touch </h3>
        <span>binhan214981@gmail.com</span>
        <span>0784073629</span>
        </div>
      </nav>
      
    </div>
    </main>
    
    </>
    
  );
  

};

export default Daily;
