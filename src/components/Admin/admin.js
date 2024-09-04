import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';
import Header from '../Navigation/header';
import { Editor, EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor as WysiwygEditor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Modal from 'react-modal';
import Markdown from 'react-markdown';

Modal.setAppElement('#root');

function AdminPage() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', type: '', img: '' });
  const [editingBlog, setEditingBlog] = useState(null);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedType, setSelectedType] = useState('All Types');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null); 
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  // const [isBlogListOpen, setIsBlogListOpen] = useState(false);
  const [showNav, setShowNav] = useState(false); 
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
        setSearchTerm('');
        setSelectedDate('');
        setSelectedType('All Types');
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
    setIsFormModalOpen(false);
  };

  const updateBlog = (id, updatedBlog) => {
    axios.put(`https://66aefdacb05db47acc58c359.mockapi.io/api/articles/${id}`, updatedBlog)
      .then(response => {
        const updatedBlogs = blogs.map(blog => blog.id === id ? response.data : blog);
        setBlogs(updatedBlogs);
        setEditingBlog(null);
        setNewBlog({ title: '', content: '', type: '', img: '' });
        setEditorState(EditorState.createEmpty());
        setIsFormModalOpen(false);
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
      const contentState = ContentState.createFromText(blog.content); 
      setEditorState(EditorState.createWithContent(contentState));
    setIsFormModalOpen(true);
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

  const handleViewDetail = (blog) => {
    setCurrentBlog(blog);
    setIsModalOpen(true); // Mở modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Đóng modal
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false); 
    setEditingBlog(null); 
    setNewBlog({ title: '', content: '', type: '', img: '' }); 
    setEditorState(EditorState.createEmpty());
  };

  // const handleOpenBlogList = () => {
  //   setIsBlogListOpen(true);
  // };

  // const handleCloseBlogList = () => {
  //   setIsBlogListOpen(false);
  // };

  const filteredBlogs = blogs.filter(blog => {
    const isTitleMatch = searchTerm.trim() === '' || blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const isDateMatch = selectedDate === '' || new Date(blog.createAt * 1000).getDate() === new Date(selectedDate).getDate();
    const isTypeMatch = selectedType === 'All Types' || blog.type === selectedType;
    return isTitleMatch && isDateMatch && isTypeMatch;
  });

  const toggleNav = () => {
    setShowNav(!showNav);
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
            <button onClick={() => setIsFormModalOpen(true)} className='open-form-modal'>Add new article</button>
            <button onClick={toggleNav} className='open-blog-list'>Filters</button>
            {showNav && (
              <div className='blog-list'>
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
                {/* <button onClick={handleCloseBlogList}>Close</button> */}
              </div>
              </div>
            )} 
            <h3>Articles List</h3>
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
                      <td className='blog-title'>{blog.title}</td>
                      <td>{blog.type}</td>
                      <td>{formatDate(blog.createAt)}</td>
                      <td>
                        <button onClick={() => handleEdit(blog)}>Edit</button>
                        <button onClick={() => deleteBlog(blog.id)}>Delete</button>
                        <button onClick={() => handleViewDetail(blog)}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
            <button onClick={deleteAllBlogs}>Delete all</button>            
                         
            <Modal
        isOpen={isFormModalOpen}
        onRequestClose={closeFormModal}
        contentLabel="Add/Edit Blog"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className='add-blog'>
          <h3>{editingBlog ? 'Edit Article' : 'Add new article'}</h3>
          <div>
            <ul>
              Note types:
              <li>1. Daily</li>
              <li>2. Technology</li>
              <li>3. Project</li>
            </ul>
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
            <WysiwygEditor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={state => {
                setEditorState(state);
                let htmlContent = draftToMarkdown(convertToRaw(state.getCurrentContent()), {breaks: true});
                htmlContent = htmlContent.replace(/<p>/g, '').replace(/<\/p>/g, '');
                setNewBlog({ ...newBlog, content: htmlContent });
              }}
              placeholder="Start writing..."
            />
            <button onClick={editingBlog ? () => updateBlog(editingBlog.id, newBlog) : addBlog}>
              {editingBlog ? 'Update Blog' : 'Add Blog'}
            </button>
            <button onClick={closeFormModal}>Close</button>
          </div>
        </div>
            </Modal>
            <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="View Blog Detail"
        className="modal"
        overlayClassName="modal-overlay"
      >
        {currentBlog && (
          <>
            <h2>{currentBlog.title}</h2>
            <Markdown breaks={true}>{currentBlog.content}</Markdown> 
            <button onClick={closeModal}>Close</button>
          </>
        )}
            </Modal>             
          </div>
        )}
       
      </div>

    </>
  );
}

export default AdminPage;
