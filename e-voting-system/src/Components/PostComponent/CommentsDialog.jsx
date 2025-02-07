// src/Components/PostComponent/CommentsDialog.jsx
import React from "react";
import "./Dialog.css";
import Comment from "./Comment";

const CommentsDialog = ({ comments = [], onClose }) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <button className="close-dialog-btn" onClick={onClose}>
          Close
        </button>
        <h3>All Comments</h3>
        <div className="all-comments-list">
          {comments.map((comment) => (
            <Comment
              key={comment.commentId}
              userImage={comment.userProfilePicture}  // Use the backend field
              userName={comment.userName}
              commentTime={comment.createdAt}
              text={comment.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentsDialog;
