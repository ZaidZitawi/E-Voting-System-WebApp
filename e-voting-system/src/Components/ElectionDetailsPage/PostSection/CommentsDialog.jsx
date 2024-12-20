// src/components/PostsSection/CommentsDialog.jsx

import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import Comment from './Comment';
import './Dialog.css'; // Shared dialog styles

// Set the app element for accessibility
ReactModal.setAppElement('#root');

const CommentsDialog = ({ isOpen, onRequestClose, comments }) => {
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
      <h2>All Comments</h2>
      <div className="comments-list">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </ReactModal>
  );
};

CommentsDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      commenter: PropTypes.shape({
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
      }).isRequired,
      text: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CommentsDialog;
