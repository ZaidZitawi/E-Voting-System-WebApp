// src/components/PostsSection/Comment.jsx

import React from 'react';
import PropTypes from 'prop-types';
import './CommentLike.css'; // Shared styles for Comment and Like

const Comment = ({ comment }) => {
  const formattedTime = new Date(comment.time).toLocaleString();

  return (
    <div className="comment-like-card">
      <img src={comment.commenter.imageUrl} alt={`${comment.commenter.name}'s profile`} />
      <div>
        <p className="comment-text">{comment.text}</p>
        <p className="comment-time">{formattedTime}</p>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    commenter: PropTypes.shape({
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    }).isRequired,
    text: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
