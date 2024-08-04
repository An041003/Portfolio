import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPage() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', type: '',});
  const [editingBlog, setEditingBlog] = useState(null); 
  const [isLoggedin, setIsLoggedIn] = useState(false); 
  const [password, setPassword] = useState(''); 

  useEffect(() => {
    axios.get('https://66aefdacb05db47acc58c359.mockapi.io/api/articles')
      .then(response => setBlogs(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleLogin = () => { //Login
    const correctPassword = 'Binhan04'; 
    if (password === correctPassword) {
      setIsLoggedIn(true);
      setPassword(''); 
    } else {
      alert('You are not my master!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const addBlog = () => { // Create a new blog
    axios.post('https://66aefdacb05db47acc58c359.mockapi.io/api/articles', newBlog)
      .then(response =>{ 
        console.log(response.data);
        setBlogs([...blogs, response.data])})
      .catch(error => console.error(error));
    setNewBlog({ title: '', content: '', type:'' }); // Reset input
  };

  const updateBlog = (id, updatedBlog) => { //Update blog
    axios.put(`https://66aefdacb05db47acc58c359.mockapi.io/api/articles/${id}`, updatedBlog)
      .then(response => {
        const updatedBlogs = blogs.map(blog => blog.id === id ? response.data : blog);
        setBlogs(updatedBlogs);
        setEditingBlog(null); // Reset editingBlog 
      })
      .catch(error => console.error(error));
  };

  const deleteBlog = (id) => { // Delete blog
    axios.delete(`https://66aefdacb05db47acc58c359.mockapi.io/api/articles/${id}`)
      .then(() => setBlogs(blogs.filter(blog => blog.id !== id)))
      .catch(error => console.error(error));
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog); 
    setNewBlog({ title: blog.title, content: blog.content, type: blog.type }); 
  };

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

const deleteAllBlogs = async () => { //Delete all
    if (window.confirm("Are you sure you want to delete all posts?")) {
      try {
        await Promise.all(blogs.map(blog => axios.delete(`https://66aefdacb05db47acc58c359.mockapi.io/api/articles/${blog.id}`)));
        setBlogs([]); 
        alert("All posts have been deleted!");
      } catch (error) {
        console.error(error);
        alert("Error!");
      }
    }
  };

  return (
     <div>
      {!isLoggedin ? ( 
        <div>
          <h2>Enter Password</h2>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h1>Admin Page</h1>
          <div>
            <input
              type="text"
              placeholder="Title"
              value={newBlog.title}
              onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Type"
              value={newBlog.type}
              onChange={e => setNewBlog({ ...newBlog, type: e.target.value })}
            />
            <textarea
              placeholder="Content"
              value={newBlog.content}
              onChange={e => setNewBlog({ ...newBlog, content: e.target.value })}
            ></textarea>
            <button onClick={addBlog}>Add Blog</button>
            {editingBlog && (
              <button onClick={() => updateBlog(editingBlog.id, newBlog)}>Update Blog</button>
            )}
            <button onClick={deleteAllBlogs}>Delete all</button>
            <ul>
                <li>Note:</li>
                <li>1.Dayly</li>
                <li>2.Technology</li>
                <li>3.Project</li>
                <li>4.My job</li>
                {/* <li></li> */}

            </ul>
          </div>
          {blogs.map(blog => (
            <div key={blog.id}>
              <h2>{blog.title}</h2>
              <p>{blog.content}</p>
              <p>{blog.type}</p>
              <p>Post date: {formatDate(blog.createAt)}</p>
              <button onClick={() => deleteBlog(blog.id)}>Delete</button>
              <button onClick={() => handleEdit(blog)}>Edit</button> 
            </div>
          ))}
          <button onClick={handleLogout}>Logout</button> 
        </div>
      )}
    </div>
  );
};

export default AdminPage;