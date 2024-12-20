// src/components/PostsSection/CommentSection.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';
import CommentsDialog from './CommentsDialog';
import AddComment from './AddComment';
import './CommentSection.css';

const CommentSection = ({ comments, onAddComment }) => {
  const [isCommentsDialogOpen, setIsCommentsDialogOpen] = useState(false);

  const handleViewMore = () => {
    setIsCommentsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsCommentsDialogOpen(false);
  };

  // Show the two most recent comments
  const recentComments = comments.slice(-2).reverse();

  return (
    <div className="comment-section">
      {recentComments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      {comments.length > 2 && (
        <p className="view-more-comments" onClick={handleViewMore}>
          View More Comments
        </p>
      )}
      <AddComment onAdd={onAddComment} />

      {/* Comments Dialog */}
      {isCommentsDialogOpen && (
        <CommentsDialog
          isOpen={isCommentsDialogOpen}
          onRequestClose={handleCloseDialog}
          comments={comments}
        />
      )}
    </div>
  );
};

CommentSection.propTypes = {
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
  onAddComment: PropTypes.func.isRequired,
};

export default CommentSection;
