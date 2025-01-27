// SocialSection.jsx
import React from 'react';
import Post from '../PostComponent/Post.jsx';
import './SocialSection.css';
import logo from '../../assets/file.ico'
import Media from '../../assets/Poster.jpg'

const SocialSection = () => {
  const samplePost = {
    userEntity: {
      name: "VoteChain Official",
      profile: {
        profilePictureUrl: logo
      }
    },
    date: "2h ago",
    text: "🚀 Cast your vote now and join the discussion! See what candidates are sharing...",
    media: [
        { mediaUrl: Media, type: ".png" }
    ],
    likes: Array(142).fill({}), // 142 likes
    comments: [
      { user: "Sarah", text: "Love the transparency!" },
      { user: "Mike", text: "When's the debate?" }
    ],
    postId: 123
  };

  return (
    <div className="social-section-container">
      {/* Left Container - Fixed Text */}
      <div className="text-container">
        <div className="fixed-text">
          <h2>Engage. Discuss. Decide.</h2>
          <p>
            Our platform empowers real-time discussions during elections. 
            Interact with candidates, view campaign updates, and join 
            the democratic conversation.
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