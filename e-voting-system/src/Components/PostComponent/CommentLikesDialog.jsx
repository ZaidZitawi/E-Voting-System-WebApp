import React from 'react';
import './Dialog.css';

const CommentLikesDialog = ({ likes = [], onClose }) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <button className="close-dialog-btn" onClick={onClose}>
          Close
        </button>
        <h3>Users who liked this comment:</h3>
        <div className="dialog-list">
          {likes.map((like, index) => (
            <div key={index} className="like-card">
              <img
                src={like.userImage || '/default-profile.png'}
                alt={`${like.userName}'s profile`}
                className="like-profile-pic"
              />
              <p className="like-name">{like.userName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentLikesDialog;
