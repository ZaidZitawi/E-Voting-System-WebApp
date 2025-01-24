import React, { useState } from "react";
import UserPostData from "./UserPostData";
import MediaDisplay from "./MediaDisplay";
import ActionButtons from "./ActionButtons";
import CommentsContainer from "./CommentsContainer";
import "./post.css";

const Post = ({ post = {} }) => {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  // Destructure post properties with fallback values
  const {
    userEntity = {},
    date = "",
    media = [],
    likes = [],
    comments = [],
    text = "",
    postId = null,
  } = post;

  // Extract user details safely
  const profilePic = userEntity?.profile?.profilePictureUrl;
  const username = userEntity?.name || "Unknown User";

  // Toggle visibility of comments
  const toggleComments = () => {
    setIsCommentsVisible((prevVisible) => !prevVisible);
  };

  return (
    <div className="post">
      {/* User Details */}
      <UserPostData profilePic={profilePic} username={username} date={date} />

      {/* Post Text */}
      <div className="post-text">
        <p>{text}</p>
      </div>

      {/* Media Display */}
      <MediaDisplay media={media} />

      {/* Action Buttons */}
      <ActionButtons
        likes={likes}
        onCommentClick={toggleComments}
        postId={postId}
        commentsCount={comments.length}
      />

      {/* Comments Container */}
      {isCommentsVisible && (
        <CommentsContainer comments={comments} postId={postId} />
      )}
    </div>
  );
};

export default Post;
