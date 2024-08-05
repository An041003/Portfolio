import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css'
import Header from '../Navigation/header';


function AdminPage() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', type: '' });
  const [editingBlog, setEditingBlog] = useState(null);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedType, setSelectedType] = useState(null); 

  useEffect(() => {
    axios.get('https://66aefdacb05db47acc58c359.mockapi.io/api/articles')
      .then(response => {
        const sortedBlogs = response.data.sort((a, b) => b.createAt - a.createAt);
        setBlogs(sortedBlogs);
      })
      .catch(error => console.error(error));
  }, []);

    useEffect(() => {
    if (isLoggedin) { 
      axios.get('https://66aefdacb05db47acc58c359.mockapi.io/api/articles')
        .then(response => {
          const sortedBlogs = response.data.sort((a, b) => b.createAt - a.createAt);
          setBlogs(sortedBlogs);
        })
        .catch(error => console.error(error));
    }
  }, [isLoggedin]); 

  const handleLogin = () => {
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

  const addBlog = () => {
    axios.post('https://66aefdacb05db47acc58c359.mockapi.io/api/articles', newBlog)
      .then(response => {
        console.log(response.data);
        setBlogs([...blogs, response.data])
      })
      .catch(error => console.error(error));
    setNewBlog({ title: '', content: '', type: '' });
  };

  const updateBlog = (id, updatedBlog) => {
    axios.put(`https://66aefdacb05db47acc58c359.mockapi.io/api/articles/${id}`, updatedBlog)
      .then(response => {
        const updatedBlogs = blogs.map(blog => blog.id === id ? response.data : blog);
        setBlogs(updatedBlogs);
        setEditingBlog(null);
        setNewBlog({ title: '', content: '', type: '' });
      })
      .catch(error => console.error(error));
  };

  const deleteBlog = (id) => {
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

  const deleteAllBlogs = async () => {
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const resetFilters = () => { 
    setSearchTerm('');
    setSelectedDate('');
    setSelectedType('All Types');
  };

  const filteredBlogs = blogs.filter(blog => {
    // search by title
    const isTitleMatch = searchTerm.trim() === '' || blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    // search by time
    const isDateMatch = selectedDate === '' || new Date(blog.createAt * 1000).getDate() === new Date(selectedDate).getDate();
    // search by type
    const isTypeMatch = selectedType === 'All Types' || blog.type === selectedType;
    return isTitleMatch && isDateMatch && isTypeMatch;
  });

  return (
    <><Header />
    <div>
      {!isLoggedin ? (
        <div className='login'>
          <h2>Enter Password</h2>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} >Login</button>
        </div>
      ) : (
        <div className='admin'>
          <h1>Admin Page</h1>
          <button onClick={handleLogout} className='logout'>Logout</button>
          <h3>Add new article</h3>
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
              Note types:
              <li>1.Daily</li>
              <li>2.Technology</li>
              <li>3.Project</li>
            </ul>
            <h3 className='search'>Search</h3>
            <div>
              <input
                type="text"
                placeholder="Search by title"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
              />
              <select value={selectedType} onChange={handleTypeChange}>
                <option value={null}>All Types</option>
                <option value="1">Daily</option>
                <option value="2">Technology</option>
                <option value="3">Project</option>
              </select>
              <button onClick={resetFilters}>Reset Filters</button>
              <button onClick={resetFilters}>Open List Articles</button>
            </div>
          </div>
          {filteredBlogs.map(blog => (
            <div key={blog.id}>
              <h2>Title: {blog.title}</h2>
              <p>Post date: {formatDate(blog.createAt)}</p>
              <p>Type: {blog.type}</p>
              <p>{blog.content}</p>
              <button onClick={() => deleteBlog(blog.id)}>Delete</button>
              <button onClick={() => handleEdit(blog)}>Edit</button>
            </div>
          ))}
          
        </div>
      )}
    </div></>
  );
};

export default AdminPage;