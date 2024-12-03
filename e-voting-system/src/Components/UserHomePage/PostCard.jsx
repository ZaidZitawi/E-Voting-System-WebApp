// src/components/UserHomePage/PostCard.jsx

import React, { useState } from 'react';
import './PostCard.css';

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount((prevCount) => prevCount + (liked ? -1 : 1));
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleShare = () => {
    // Implement share functionality
    alert('Post shared!');
  };

  return (
    <div className="post-card" tabIndex="0">
      <div className="author-info">
        <img src={post.authorImage} alt={`${post.author}'s profile`} />
        <div>
          <h4>{post.author}</h4>
          <span>{post.timestamp}</span>
        </div>
      </div>
      <p className="post-content">{post.content}</p>
      {post.media && (
        <div className="post-media">
          <img src={post.media} alt="Post media content" />
          {/* For videos, use a <video> tag */}
        </div>
      )}
      <div className="post-actions">
        <button className={`action-button ${liked ? 'liked' : ''}`} onClick={handleLike}>
          <i className="fa fa-thumbs-up"></i> Like ({likesCount})
        </button>
        <button className="action-button" onClick={() => alert('Open comments')}>
          <i className="fa fa-comment"></i> Comment ({post.comments})
        </button>
        <button className="action-button" onClick={handleShare}>
          <i className="fa fa-share"></i> Share ({post.shares})
        </button>
        <button
          className={`action-button bookmark-button ${bookmarked ? 'bookmarked' : ''}`}
          onClick={handleBookmark}
        >
          <i className={`fa ${bookmarked ? 'fa-bookmark' : 'fa-bookmark-o'}`}></i>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
