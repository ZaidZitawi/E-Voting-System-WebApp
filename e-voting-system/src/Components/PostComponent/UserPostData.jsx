import React, { useState } from "react";
import "./post.css";
import User from "../../assets/User.png"; // Default user image

const BASE_PROFILE_URL = "http://localhost:8080/uploads/";

// Helper function to format timestamps into "time ago" format
const timeAgo = (timestamp) => {
  if (!timestamp) return "Unknown time";
  
  const now = new Date();
  const postDate = new Date(timestamp);
  const seconds = Math.floor((now - postDate) / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)}mo ago`;
  
  return `${Math.floor(seconds / 31536000)}y ago`;
};

const UserPostData = ({ profilePic, username = "Unknown User", date }) => {
  const [isBroken, setIsBroken] = useState(false);

  // If profilePic is a static import, use it directly; otherwise, prepend backend URL.
  const isLocalAsset = profilePic && (profilePic.startsWith("/") || profilePic.startsWith("data:"));
  const imageUrl = isLocalAsset ? profilePic : `${BASE_PROFILE_URL}${profilePic}`;

  const formattedDate = timeAgo(date);

  return (
    <div className="user-post-data">
      <img
        className="profile-pic"
        src={isBroken ? User : imageUrl} // Use default image if broken
        alt={`${username}'s profile`}
        onError={() => setIsBroken(true)} // Handle broken image gracefully
      />
      <div className="user-info">
        <h4>{username}</h4>
        <p>{formattedDate}</p>
      </div>
    </div>
  );
};

export default UserPostData;
