// src/components/PostComponent/PostsSection.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Post from "../../PostComponent/Post.jsx";
import "./PostSection.css";
import axios from "axios";

const PostsSection = ({ electionId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This function updates the like state and count for a given post.
  const updatePostLikes = (postId, liked, likeCount) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === postId
          ? { ...post, likedByCurrentUser: liked, likeCount }
          : post
      )
    );
  };

  // Fetch posts from the backend using axios, passing userId as a query parameter
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }
      const response = await axios.get(
        `http://localhost:8080/posts/election/${electionId}/posts`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { userId },
        }
      );
      console.log("Fetched posts:", response.data);
      setPosts(response.data || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Fetch posts on component mount and when electionId changes
  useEffect(() => {
    fetchPosts();
  }, [electionId]);

  return (
    <div className="posts-section">
      <h2 className="posts-feed-title">Post Feed</h2>
      {posts.map((post) => (
        <Post key={post.postId} post={post} updatePostLikes={updatePostLikes} />
      ))}
      {loading && <div className="posts-loading">Loading posts...</div>}
      {error && <div className="posts-error">Error loading posts: {error}</div>}
    </div>
  );
};

PostsSection.propTypes = {
  electionId: PropTypes.number.isRequired,
};

export default PostsSection;
