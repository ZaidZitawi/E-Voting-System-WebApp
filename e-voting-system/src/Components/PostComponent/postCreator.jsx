// src/PostComponent/PostCreator.jsx
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaImage, FaVideo, FaTimes } from 'react-icons/fa';
import './PostCreator.css';

const PostCreator = ({ electionId, onPostCreated }) => {
  const [postContent, setPostContent] = useState('');
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState('');
  const [profileImage, setProfileImage] = useState('/images/default-profile.png');
  const [name, setName] = useState('');
  // New state variables to store the specific candidate or party id
  const [candidateId, setCandidateId] = useState(null);
  const [partyId, setPartyId] = useState(null);

  // On mount, load profile image and name from localStorage.
  useEffect(() => {
    const storedProfileImage = localStorage.getItem('profileImage');
    const storedName = localStorage.getItem('name');
    setProfileImage(`/uploads/${storedProfileImage}`);
    setName(storedName);
  }, []);

  // On mount, fetch candidate data based on the logged-in user's id.
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const authToken = localStorage.getItem("authToken");
    if (!userId || !authToken) return;

    // First try to fetch candidate details.
    axios.get(`http://localhost:8080/candidates/user/${userId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    })
      .then((response) => {
        if (response.data && response.data.candidateId) {
          // If candidate data is found, store candidateId.
          setCandidateId(response.data.candidateId);
          // Ensure partyId remains null.
          setPartyId(null);
        }
      })
      .catch((error) => {
        // If candidate fetch fails (or returns 404), try fetching party data.
        axios.get(`http://localhost:8080/parties/user/${userId}`, {
          headers: { Authorization: `Bearer ${authToken}` }
        })
          .then((response) => {
            if (response.data && response.data.partyId) {
              setPartyId(response.data.partyId);
              setCandidateId(null);
            }
          })
          .catch((err) => {
            console.error("Error fetching candidate/party data:", err);
          });
      });
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('content', postContent);
    formData.append('electionId', electionId);
    // Append the correct field based on whether the user is a candidate or party manager.
    if (candidateId) {
      formData.append('candidate', candidateId);
      // Optionally, you can leave out the "party" field or set it to null.
    } else if (partyId) {
      formData.append('party', partyId);
      // Optionally, you can leave out the "candidate" field or set it to null.
    }
    if (media) {
      formData.append('media', media);
    }

    try {
      await axios.post('http://localhost:8080/posts/createPost', formData, {
        headers: {
          // Do not manually set Content-Type; let Axios do it.
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      // Refresh the posts list after a successful post.
      if (onPostCreated) {
        onPostCreated();
      }
      
      // Clear the input fields.
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
