// src/components/PostsSection/PostsSection.jsx

import React from 'react';
import PropTypes from 'prop-types';
import './PostsSection.css';
import Post from './Post';

const PostsSection = ({ posts }) => {
  return (
    <section className="posts-section">
      <div className="posts-container"> {/* New container */}
        <h2 className="section-title">Latest Posts</h2>
        <div className="posts-list">
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

PostsSection.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      publisher: PropTypes.shape({
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
      }).isRequired,
      time: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      media: PropTypes.string, // Optional
      likes: PropTypes.array,  // To be used in later phases
      comments: PropTypes.array, // To be used in later phases
    })
  ).isRequired,
};

export default PostsSection;
