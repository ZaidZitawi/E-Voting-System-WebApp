import React from "react";
import "./post.css";

// Helper function to format the "time ago" display
const timeAgo = (timestamp) => {
  const now = new Date();
  const postDate = new Date(timestamp);
  const seconds = Math.floor((now - postDate) / 1000);

  if (seconds >= 31536000) return `${Math.floor(seconds / 31536000)}y ago`; // Years
  if (seconds >= 2592000) return `${Math.floor(seconds / 2592000)}mo ago`; // Months
  if (seconds >= 86400) return `${Math.floor(seconds / 86400)}d ago`; // Days
  if (seconds >= 3600) return `${Math.floor(seconds / 3600)}h ago`; // Hours
  if (seconds >= 60) return `${Math.floor(seconds / 60)}m ago`; // Minutes
  return `${seconds}s ago`; // Seconds
};

const UserPostData = ({ profilePic, username = "Unknown User", date }) => {
  const imageUrl = profilePic ;
  const formattedDate = date ? timeAgo(date) : "Unknown time";

  return (
    <div className="user-post-data">
      <img className="profile-pic" src={imageUrl} alt={`${username}'s profile`} />
      <div className="user-info">
        <h4>{username}</h4>
        <p>{formattedDate}</p>
      </div>
    </div>
  );
};

export default UserPostData;
