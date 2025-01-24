import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaImage, FaVideo, FaTimes } from 'react-icons/fa';
import './PostCreator.css';

const PostCreator = ({ onPostCreated }) => {
  const [postContent, setPostContent] = useState('');
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState('');
  const [profileImage, setProfileImage] = useState('/images/default-profile.png');
  const [name, setName] = useState('');

  useEffect(() => {
    
    
    const storedProfileImage = localStorage.getItem('profileImage');
    const storedName = localStorage.getItem('name');
          
    setProfileImage(`/uploads/${storedProfileImage}`);
    setName(storedName);

  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('content', postContent);

    if (media) {
      formData.append('files', media);
    }

    try {
      await axios.post('http://localhost:8080/v0/post/AddPost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Call onPostCreated to refresh the posts list
      if (onPostCreated) {
        onPostCreated();
      }
      
      setPostContent('');
      setMedia(null);
      setMediaPreview('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setMedia(file);
      setMediaPreview(fileUrl);
    }
  };

  const handleMediaRemove = () => {
    setMedia(null);
    setMediaPreview('');
  };

  return (
    <div className="post-creator">
      <div className="post-creator-header">
        <img src={profileImage} alt="User profile" className="post-creator-profile-image" />
        <div className="post-creator-user-info">
          <span className="post-creator-username">{name}</span>
        </div>
      </div>
      <form onSubmit={handlePostSubmit} className="post-creator-form">
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="What's on your mind?"
          rows="4"
          className="post-creator-textarea"
        />
        {mediaPreview && (
          <div className="post-creator-media-preview">
            <button
              type="button"
              className="post-creator-media-remove-button"
              onClick={handleMediaRemove}
            >
              <FaTimes />
            </button>
            {media.type.startsWith('image/') ? (
              <img src={mediaPreview} alt="Media preview" className="post-creator-media-image" />
            ) : (
              <video src={mediaPreview} controls className="post-creator-media-video" />
            )}
          </div>
        )}
        <div className="post-creator-buttons">
          <label htmlFor="media-upload" className="post-creator-upload-button">
            <FaImage /> Photo/Video
            <input
              type="file"
              id="media-upload"
              accept="image/*,video/*"
              onChange={handleMediaChange}
              style={{ display: 'none' }}
            />
          </label>
          <button type="submit" className="post-creator-submit-button">Post</button>
        </div>
      </form>
    </div>
  );
};

export default PostCreator;