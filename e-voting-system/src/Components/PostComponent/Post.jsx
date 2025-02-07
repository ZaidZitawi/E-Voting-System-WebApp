// src/Components/PostComponent/Post.jsx
import React, { useState } from "react";
import UserPostData from "./UserPostData";
import MediaDisplay from "./MediaDisplay";
import ActionButtons from "./ActionButtons";
import CommentsContainer from "./CommentsContainer";
import "./post.css";

const Post = ({ post = {}, updatePostLikes }) => {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const {
    postId = null,
    content = "",
    mediaUrl = "",
    createdAt = "",
    commentCount = 0,
    likeCount = 0,
    likedByCurrentUser = false,
    party,
    candidate,
  } = post;

  // Determine the publisher: if party exists, use it; otherwise, use candidate.
  const publisher =
    party ||
    candidate || { name: "Unknown", imageUrl: "https://via.placeholder.com/150" };
  const formattedDate = createdAt ? new Date(createdAt).toLocaleString() : "";

  const toggleComments = () => {
    setIsCommentsVisible((prevVisible) => !prevVisible);
  };

  return (
    <div className="post">
      <UserPostData
        profilePic={publisher.imageUrl}
        username={publisher.name}
        date={formattedDate}
      />
      <div className="post-text">
        <p>{content}</p>
      </div>
      {mediaUrl && <MediaDisplay media={[mediaUrl]} />}
      <ActionButtons
        postId={postId}
        likes={likeCount}
        likedByCurrentUser={likedByCurrentUser}
        commentsCount={commentCount}
        onCommentClick={toggleComments}
        updatePostLikes={updatePostLikes}
      />
      {isCommentsVisible && <CommentsContainer postId={postId} />}
    </div>
  );
};

export default Post;
