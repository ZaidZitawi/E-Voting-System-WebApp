// src/components/PostsSection/AddComment.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AddComment.css';

const AddComment = ({ onAdd }) => {
  const [commentText, setCommentText] = useState('');

  const handleAddComment = () => {
    if (commentText.trim()) {
      onAdd(commentText.trim());
      setCommentText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };

  return (
    <div className="add-comment">
      <input
        type="text"
        placeholder="Add a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button className="button" onClick={handleAddComment}>
        Post
      </button>
    </div>
  );
};

AddComment.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddComment;
