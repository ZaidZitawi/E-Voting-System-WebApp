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

  // Function to fetch posts from the backend using axios
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }
      const response = await axios.get(`http://localhost:8080/posts/election/${electionId}/posts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
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
      {posts.map((post) => (
        <Post key={post.postId} post={post} />
      ))}
      {loading && <div>Loading posts...</div>}
      {error && <div>Error loading posts: {error}</div>}
    </div>
  );
};

PostsSection.propTypes = {
  electionId: PropTypes.number.isRequired,
};

export default PostsSection;
