// src/Components/PostComponent/Comment.jsx
import React from "react";
import "./post.css";
import defaultImage from "../../assets/User.png";

const Comment = ({ userImage, userName, commentTime, text }) => {
  const BASE_PROFILE_IMAGE_URL = "http://localhost:8080/uploads/";

  // Build the full image URL if a value is provided; otherwise, use the default image.
  const imageUrl = userImage
    ? `${BASE_PROFILE_IMAGE_URL}${userImage}`
    : defaultImage;

  // Helper function to format the timestamp as relative time.
  const timeAgo = (timestamp) => {
    if (!timestamp) return "Unknown time";
    const now = new Date();
    const date = new Date(timestamp);
    const seconds = Math.floor((now - date) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
    if (seconds < 31536000) return `${Math.floor(seconds / 2592000)}mo ago`;
    return `${Math.floor(seconds / 31536000)}y ago`;
  };

  return (
    <div className="comment">
      <img src={imageUrl} alt="User" className="comment-user-image" />
      <div className="comment-details">
        <div className="comment-header">
          <span className="comment-user-name">{userName}</span>
          <span className="comment-time">{timeAgo(commentTime)}</span>
        </div>
        <p className="comment-text">{text}</p>
      </div>
    </div>
  );
};

export default Comment;
