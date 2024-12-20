// src/components/PostsSection/LikeDialog.jsx

import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import Like from './Like';
import './Dialog.css'; // Shared dialog styles

// Set the app element for accessibility
ReactModal.setAppElement('#root');

const LikeDialog = ({ isOpen, onRequestClose, likes }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="dialog-content"
      overlayClassName="dialog-overlay"
    >
      <button className="dialog-close" onClick={onRequestClose}>
        &times;
      </button>
      <h2>Liked by</h2>
      <div className="likes-list">
        {likes.map((user) => (
          <Like key={user.id} user={user} />
        ))}
      </div>
    </ReactModal>
  );
};

LikeDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  likes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default LikeDialog;
