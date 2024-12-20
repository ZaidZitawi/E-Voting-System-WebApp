// src/components/PostsSection/LikeSection.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './LikeSection.css';
import LikeDialog from './LikeDialog';

const LikeSection = ({ likeCount, commentCount, onLikeClick, onCommentClick, likes }) => {
  const [isLikeDialogOpen, setIsLikeDialogOpen] = useState(false);

  const handleLikeDialogOpen = () => {
    setIsLikeDialogOpen(true);
  };

  const handleLikeDialogClose = () => {
    setIsLikeDialogOpen(false);
  };

  return (
    <div className="like-section">
      <button className="button like-button" onClick={() => { onLikeClick(); handleLikeDialogOpen(); }}>
        👍 Like
      </button>
      <span className="like-counter" onClick={handleLikeDialogOpen} style={{ cursor: 'pointer' }}>
        {likeCount} Likes
      </span>
      <span className="comment-counter">{commentCount} Comments</span>
      <button className="button comment-button" onClick={onCommentClick}>
        💬 Comment
      </button>

      {/* Like Dialog */}
      {isLikeDialogOpen && (
        <LikeDialog
          isOpen={isLikeDialogOpen}
          onRequestClose={handleLikeDialogClose}
          likes={likes}
        />
      )}
    </div>
  );
};

LikeSection.propTypes = {
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  onLikeClick: PropTypes.func.isRequired,
  onCommentClick: PropTypes.func.isRequired,
  likes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default LikeSection;
