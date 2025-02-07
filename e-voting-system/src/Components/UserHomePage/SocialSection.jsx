// src/Components/SocialSection.jsx
import React from "react";
import Post from "../PostComponent/Post.jsx";
import "./SocialSection.css";
import logo from "../../assets/file.ico";
import Media from "../../assets/Poster.jpg";

const SocialSection = () => {
  const samplePost = {
    postId: 123,
    content:
      "🚀 Cast your vote now and join the discussion! See what candidates are sharing...",
    mediaUrl: Media, // Pass local image directly
    createdAt: new Date().toISOString(), // Using ISO date format for consistency
    commentCount: 2,
    likeCount: 142,
    likedByCurrentUser: false,

    // Simulating a post published by VoteChain Official (as a party)
    party: {
      name: "VoteChain Official",
      imageUrl: logo, // Pass local logo directly
    },
  };

  return (
    <div className="social-section-container">
      {/* Left Container - Fixed Text */}
      <div className="text-container">
        <div className="fixed-text">
          <h2>Engage. Discuss. Decide.</h2>
          <p>
            Our platform empowers real-time discussions during elections.
            Interact with candidates, view campaign updates, and join the
            democratic conversation.
          </p>
          <a href="/social" className="cta-button">
            Explore Social Hub →
          </a>
        </div>
      </div>

      {/* Right Container - Floating Transparent Post */}
      <div className="post-container">
        <div className="glassmorphism-post">
          <Post post={samplePost} />
        </div>
      </div>
    </div>
  );
};

export default SocialSection;
