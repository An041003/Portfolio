import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';
import Header from '../Navigation/header';
import { Editor, EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor as WysiwygEditor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function AdminPage() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', type: '', img: '' });
  const [editingBlog, setEditingBlog] = useState(null);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

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

  const addBlog = async () => {
    try {
      const response = await axios.post('https://66aefdacb05db47acc58c359.mockapi.io/api/articles', newBlog);
      setBlogs([...blogs, response.data]);
      await axios.post('https://66aefdacb05db47acc58c359.mockapi.io/api/Backup', newBlog);
    } catch (error) {
      console.error(error);
    }
    setNewBlog({ title: '', content: '', type: '', img: '' });
    setEditorState(EditorState.createEmpty());
  };

  const updateBlog = (id, updatedBlog) => {
    axios.put(`https://66aefdacb05db47acc58c359.mockapi.io/api/articles/${id}`, updatedBlog)
      .then(response => {
        const updatedBlogs = blogs.map(blog => blog.id === id ? response.data : blog);
        setBlogs(updatedBlogs);
        setEditingBlog(null);
        setNewBlog({ title: '', content: '', type: '', img: '' });
        setEditorState(EditorState.createEmpty());
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
    setNewBlog({ title: blog.title, content: blog.content, type: blog.type, img: blog.img });
    const contentBlock = htmlToDraft(blog.content);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      setEditorState(EditorState.createWithContent(contentState));
    }
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
    const isTitleMatch = searchTerm.trim() === '' || blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const isDateMatch = selectedDate === '' || new Date(blog.createAt * 1000).getDate() === new Date(selectedDate).getDate();
    const isTypeMatch = selectedType === 'All Types' || blog.type === selectedType;
    return isTitleMatch && isDateMatch && isTypeMatch;
  });

const handleEditorChange = (state) => {
    setEditorState(state);
    let htmlContent = draftToHtml(convertToRaw(state.getCurrentContent()));

    // Loại bỏ thẻ <p></p>
    htmlContent = htmlContent.replace(/<p>/g, '').replace(/<\/p>/g, '');
    
    setNewBlog({ ...newBlog, content: htmlContent });
};


  return (
    <>
      <Header />
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
            <button onClick={handleLogin}>Login</button>
          </div>
        ) : (
          <div className='admin'>
            <h1>Admin Page</h1>
            <button onClick={handleLogout} className='logout'>Logout</button>

            <div className='add-blog'>
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
                <input
                  type="text"
                  placeholder="ImgUrl"
                  value={newBlog.img}
                  onChange={e => setNewBlog({ ...newBlog, img: e.target.value })}
                />
                {/* Sử dụng rich-text editor thay thế cho textarea */}
                <WysiwygEditor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={handleEditorChange}
                  placeholder="Start writing..."
                />
                <button onClick={addBlog}>Add Blog</button>
                {editingBlog && (
                  <button onClick={() => updateBlog(editingBlog.id, newBlog)}>Update Blog</button>
                )}
                <ul>
                  Note types:
                  <li>1. Daily</li>
                  <li>2. Technology</li>
                  <li>3. Project</li>
                </ul>
              </div>
            </div>

            <div className='blog-list'>
              <h3>Articles List</h3>
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
              </div>

              <table className="blog-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBlogs.map(blog => (
                    <tr key={blog.id}>
                      <td>{blog.title}</td>
                      <td>{blog.type}</td>
                      <td>{formatDate(blog.createAt)}</td>
                      <td>
                        <button onClick={() => handleEdit(blog)}>Edit</button>
                        <button onClick={() => deleteBlog(blog.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={deleteAllBlogs}>Delete all</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminPage;
