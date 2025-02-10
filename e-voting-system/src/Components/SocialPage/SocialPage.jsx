// src/Components/SocialPage/SocialPage.jsx
import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SideNavBar from "../SideNavBar/SideNavBar";
import Post from "../PostComponent/Post";
import PostsFilter from "./PostsFilter";
import axios from "axios";
import "./SocialPage.css";

const SocialPage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0); // Start from page 0 for pagination
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({});

  const fetchPosts = async (pageNumber, filters = {}) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) {
        throw new Error("Missing authentication token or user ID. Please log in.");
      }
      // Combine page, userId, and filters into query parameters
      const params = { page: pageNumber, userId, ...filters };
      
      // Use the filterPosts endpoint
      const response = await axios.get("http://localhost:8080/posts/filterPosts", {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched posts:", response.data);
      const newPosts = response.data.content || [];
      setPosts((prevPosts) => {
        // Remove duplicates based on postId
        const existingIds = new Set(prevPosts.map((post) => post.postId));
        const uniquePosts = newPosts.filter((post) => !existingIds.has(post.postId));
        return [...prevPosts, ...uniquePosts];
      });
      setHasMore(!response.data.last);
    } catch (err) {
      setError(err.message || "Error loading posts.");
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch posts when filters change
  useEffect(() => {
    setPosts([]); // Reset posts when filters change
    setPage(0);
    fetchPosts(0, filters);
  }, [filters]);

  // Fetch posts when the page number changes (for pagination)
  useEffect(() => {
    if (page > 0) {
      fetchPosts(page, filters);
    }
  }, [page]);

  const updatePostLikes = (postId, liked, likeCount) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === postId ? { ...post, likedByCurrentUser: liked, likeCount } : post
      )
    );
  };

  const handleApplyFilters = (appliedFilters) => {
    setFilters(appliedFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  return (
    <div className="social-page">
      <Header />
      <div className="social-content">
        <SideNavBar />

        <div className="posts-main">
          <div className="posts-filter-container">
            <PostsFilter
              onApplyFilters={handleApplyFilters}
              onClearFilters={handleClearFilters}
            />
          </div>

          <div className="posts-container">
            {posts.map((post) => (
              <Post key={post.postId} post={post} updatePostLikes={updatePostLikes} />
            ))}
            {loading && <div className="loading">Loading more posts...</div>}
            {error && <div className="error">{error}</div>}
            {!hasMore && <div className="no-more-posts">No more posts to show.</div>}
          </div>
        </div>

        <div className="right-sidebar">
          <h3 className="sidebar-title">Trending</h3>
          <p className="sidebar-content">[Add trending topics here]</p>
        </div>
      </div>
    </div>
  );
};

export default SocialPage;
