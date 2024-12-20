// src/components/PostsSection/Post.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Post.css';
import './Card.css'; // Import shared card styles
import LikeSection from './LikeSection';
import CommentSection from './CommentSection';

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [comments, setComments] = useState(post.comments);
  const [commentCount, setCommentCount] = useState(post.comments.length);

  const handleLikeClick = () => {
    // For simplicity, we'll just increment the like count and add a dummy user
    const newLike = {
      id: likes.length + 1,
      name: 'Current User', // Replace with actual current user data
      imageUrl: 'https://via.placeholder.com/40.png?text=You',
    };
    setLikes([...likes, newLike]);
    setLikeCount(likeCount + 1);
  };

  const handleCommentClick = () => {
    // Focus or open comment section if needed
    console.log('Navigate to comments section or open comment input.');
  };

  const handleAddComment = (text) => {
    const newComment = {
      id: comments.length + 1,
      commenter: {
        name: 'Current User', // Replace with actual current user data
        imageUrl: 'https://via.placeholder.com/40.png?text=You',
      },
      text: text,
      time: new Date().toISOString(),
    };
    setComments([...comments, newComment]);
    setCommentCount(commentCount + 1);
  };

  return (
    <div className="card post-card">
      <div className="card-header">
        <img src={post.publisher.imageUrl} alt={`${post.publisher.name}'s profile`} />
        <div>
          <h4 className="card-title">{post.publisher.name}</h4>
          <p className="card-subtitle">{new Date(post.time).toLocaleString()}</p>
        </div>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
        {post.media && (
          <div className="post-media">
            <img src={post.media} alt="Post media" className="card-image" loading="lazy" />
          </div>
        )}
      </div>
      <LikeSection
        likeCount={likeCount}
        commentCount={commentCount}
        onLikeClick={handleLikeClick}
        onCommentClick={handleCommentClick}
        likes={likes}
      />
      <CommentSection comments={comments} onAddComment={handleAddComment} />
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    publisher: PropTypes.shape({
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    }).isRequired,
    time: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    media: PropTypes.string,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
  }).isRequired,
};

export default Post;
