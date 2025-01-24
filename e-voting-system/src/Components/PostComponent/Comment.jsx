import React, { useState } from 'react';
import './post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import CommentLikesDialog from './CommentLikesDialog.jsx';

const Comment = ({
  userImage,
  userName,
  commentTime,
  text,
  initialLikesCount = 0,
  initialUserLiked = false,
}) => {
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [userLiked, setUserLiked] = useState(initialUserLiked);
  const [showLikesDialog, setShowLikesDialog] = useState(false);

  const handleLikeComment = () => {
    setUserLiked(!userLiked);
    setLikesCount((prevCount) => (userLiked ? Math.max(prevCount - 1, 0) : prevCount + 1));
  };

  const handleViewLikes = () => {
    setShowLikesDialog(true);
  };

  return (
    <div className="comment">
      <img src={userImage} alt="User" className="comment-user-image" />
      <div className="comment-details">
        <span className="comment-user-name">{userName}</span>
        <span className="comment-time">{commentTime}</span>
        <p className="comment-text">{text}</p>
        <div className="comment-actions">
          <button className="comment-love-btn" onClick={handleLikeComment}>
            <FontAwesomeIcon
              icon={faHeart}
              className={`heart-icon ${userLiked ? 'liked' : ''}`}
            />
          </button>
          <span className="likes-count" onClick={handleViewLikes}>
            {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
          </span>
        </div>
      </div>
      {showLikesDialog && <CommentLikesDialog likes={[]} onClose={() => setShowLikesDialog(false)} />}
    </div>
  );
};

export default Comment;
