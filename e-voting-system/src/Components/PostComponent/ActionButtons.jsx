// src/Components/PostComponent/ActionButtons.jsx
import React, { useState } from "react";
import axios from "axios";
import "./post.css";
import LikesDialog from "./LikesDialog.jsx";

const ActionButtons = ({
  postId,
  likedByCurrentUser,
  likes,
  commentsCount,
  onCommentClick,
  updatePostLikes,
}) => {
  const [liked, setLiked] = useState(likedByCurrentUser);
  const [likeCount, setLikeCount] = useState(likes);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [likers, setLikers] = useState([]); // New state for storing likers
  const userId = localStorage.getItem("userId");
  const authToken = localStorage.getItem("authToken");

  const handleLikeClick = async () => {
    if (!userId || !authToken) {
      console.error("User ID or auth token is missing.");
      return;
    }

    // Optimistic UI Update
    const newLikedState = !liked;
    const newLikeCount = liked ? likeCount - 1 : likeCount + 1;
    setLiked(newLikedState);
    setLikeCount(newLikeCount);
    updatePostLikes(postId, newLikedState, newLikeCount);

    try {
      const headers = { Authorization: `Bearer ${authToken}` };

      if (liked) {
        // Unlike post
        await axios.delete(
          `http://localhost:8080/likes/posts/${postId}?userId=${userId}`,
          { headers }
        );
      } else {
        // Like post
        await axios.post(
          `http://localhost:8080/likes/posts/${postId}?userId=${userId}`,
          {},
          { headers }
        );
      }
    } catch (error) {
      console.error("Error updating like status:", error);
      // Rollback UI update if API request fails
      setLiked(likedByCurrentUser);
      setLikeCount(likes);
      updatePostLikes(postId, likedByCurrentUser, likes);
    }
  };

  // New function to fetch likers when the likes counter is clicked
  const handleLikesCountClick = async () => {
    if (!authToken) {
      console.error("Missing auth token.");
      return;
    }
    try {
      const headers = { Authorization: `Bearer ${authToken}` };
      const response = await axios.get(
        `http://localhost:8080/likes/posts/${postId}/likers`,
        { headers }
      );
      setLikers(response.data || []); // Set the likers from the backend response
      setDialogOpen(true);
    } catch (error) {
      console.error("Error fetching likers:", error);
    }
  };

  return (
    <div className="action-buttons-container">
      <div className="action-buttons">
        <button onClick={handleLikeClick} className="action-button">
          {liked ? "Unlike 👎" : "Like 👍"}
        </button>
        <button onClick={onCommentClick} className="action-button">
          💬 {commentsCount} {commentsCount === 1 ? "Comment" : "Comments"}
        </button>
      </div>
      <span className="likes-count" onClick={handleLikesCountClick}>
        {likeCount} {likeCount === 1 ? "Like" : "Likes"}
      </span>
      {dialogOpen && (
        <LikesDialog users={likers} onClose={() => setDialogOpen(false)} />
      )}
    </div>
  );
};

export default ActionButtons;
