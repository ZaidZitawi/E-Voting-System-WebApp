// src/Components/PostComponent/LikesDialog.jsx
import React from "react";
import "./Dialog.css";

const LikesDialog = ({ users = [], onClose }) => {
  // Base URL for profile images hosted by Spring Boot
  const BASE_PROFILE_IMAGE_URL = "http://localhost:8080/uploads/";

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <p>WELCOME TO THE LIKERS Zone, CHECK WHO LIKES YOU</p>
        <button className="close-dialog-btn" onClick={onClose}>
          Close
        </button>
        <div className="dialog-list">
          {users.map((user) => {
            // Use the fields from LikeResponseDTO
            const profilePicture = user?.userProfilePicture;
            const userName = user?.userName
              ? `${user.userName} gave you a Big LIKE Bro👍`
              : "Unknown User";
            const imageUrl = profilePicture
              ? `${BASE_PROFILE_IMAGE_URL}${profilePicture}`
              : "/default-profile.png";

            return (
              <div key={user?.userId || Math.random()} className="like-card">
                <img
                  src={imageUrl}
                  alt={userName}
                  className="like-profile-pic"
                />
                <span className="like-name">{userName}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LikesDialog;
