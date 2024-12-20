// src/components/PostsSection/Like.jsx

import React from 'react';
import PropTypes from 'prop-types';
import './CommentLike.css'; // Shared styles for Comment and Like

const Like = ({ user }) => {
  return (
    <div className="comment-like-card">
      <img src={user.imageUrl} alt={`${user.name}'s profile`} />
      <p>{user.name}</p>
    </div>
  );
};

Like.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default Like;
