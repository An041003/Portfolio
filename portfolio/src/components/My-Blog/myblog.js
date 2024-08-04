import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyBlog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('https://66aefdacb05db47acc58c359.mockapi.io/api/articles')
      .then(response => setBlogs(response.data))
      .catch(error => console.error(error));
  }, []);

  const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000); // Nhân timestamp với 1000 để chuyển đổi thành mili giây
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });
};

  return (
    <div>
      <h1>Blog</h1>
      {blogs.map(blog => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          <p>Post date: {formatDate(blog.createAt)}</p> 
        </div>
      ))}
    </div>
  );
};

export default MyBlog;
