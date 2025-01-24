import React, { useState } from 'react';
import './post.css';
import './Dialog.css';
import Comment from './Comment';
import CommentLikesDialog from './CommentLikesDialog.jsx';

const CommentsContainer = ({ comments = [] }) => {
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState(comments);
  const [showLikesDialog, setShowLikesDialog] = useState(false);
  const [selectedCommentLikes, setSelectedCommentLikes] = useState([]);

  const handleSeeAllComments = () => {
    setShowAllComments(true);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setCommentList([
        ...commentList,
        {
          commentId: Date.now(),
          userImage: '/default-profile.png',
          userName: 'New User',
          commentTime: new Date().toLocaleString(),
          text: newComment,
          likesCount: 0,
          userLiked: false,
        },
      ]);
      setNewComment('');
    }
  };

  const handleShowLikesDialog = (likes) => {
    setSelectedCommentLikes(likes);
    setShowLikesDialog(true);
  };

  const handleCloseLikesDialog = () => {
    setShowLikesDialog(false);
  };

  return (
    <div className="comments-container">
      {commentList.slice(0, 3).map((comment) => (
        <Comment
          key={comment.commentId}
          {...comment}
          onShowLikes={() => handleShowLikesDialog(comment.likes || [])}
        />
      ))}

      {commentList.length > 3 && (
        <button className="see-all-comments-btn" onClick={handleSeeAllComments}>
          See all comments
        </button>
      )}

      <div className="add-comment">
        <input
          type="text"
          className="add-comment-input"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button className="add-comment-btn" onClick={handleAddComment}>
          Add
        </button>
      </div>

      {showLikesDialog && (
        <CommentLikesDialog
          likes={selectedCommentLikes}
          onClose={handleCloseLikesDialog}
        />
      )}
    </div>
  );
};

export default CommentsContainer;
