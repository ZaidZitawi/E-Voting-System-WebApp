import React, { useState } from 'react';
import './post.css';
import LikesDialog from './LikesDialog.jsx';

const ActionButtons = ({ likes = [], commentsCount = 0, onCommentClick }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleLikeClick = () => {
    // Toggle like state locally
    setLiked(!liked);
    setLikeCount((prevCount) => (liked ? Math.max(prevCount - 1, 0) : prevCount + 1));
  };

  const handleLikeCountClick = () => {
    setDialogOpen(true);
  };

  return (
    <div className="action-buttons-container">
      <div className="action-buttons">
        <button onClick={handleLikeClick} className="action-button">
          {liked ? 'Unlike👎' : 'Like👍'}
        </button>
        <button onClick={onCommentClick} className="action-button">
          💬 {commentsCount} {commentsCount === 1 ? 'Comment' : 'Comments'}
        </button>
      </div>
      <span className="likes-count" onClick={handleLikeCountClick}>
        {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
      </span>
      {dialogOpen && <LikesDialog users={likes} onClose={() => setDialogOpen(false)} />}
    </div>
  );
};

export default ActionButtons;
