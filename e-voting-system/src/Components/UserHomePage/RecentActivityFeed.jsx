// src/components/UserHomePage/RecentActivityFeed.jsx

import React, { useState, useEffect } from 'react';
import './RecentActivityFeed.css';
import PostCard from './PostCard';

const RecentActivityFeed = () => {
  // Sample data (replace with API data)
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'John Doe',
      authorImage: '/assets/users/john-doe.jpg',
      content: 'Excited to vote in the upcoming elections!',
      timestamp: '2 hours ago',
      likes: 120,
      comments: 45,
      shares: 10,
      media: '/assets/posts/post1.jpg', // Image or video path
    },
    {
      id: 2,
      author: 'Jane Smith',
      authorImage: '/assets/users/jane-smith.jpg',
      content: 'Check out the candidate profiles before voting.',
      timestamp: '5 hours ago',
      likes: 85,
      comments: 20,
      shares: 5,
      media: '', // No media content
    },
    // Add more posts as needed
  ]);

  // Simulate live updates (e.g., using WebSockets or polling in real implementation)
  useEffect(() => {
    const interval = setInterval(() => {
      // Fetch new posts and update state
      // For demonstration, we'll just log a message
      console.log('Fetching new posts...');
      // Implement actual data fetching here
    }, 60000); // Fetch new posts every 60 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="recent-activity-feed">
      <h2>Recent Activity</h2>
      <div className="posts-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {/* Pagination or Load More Button */}
    </section>
  );
};

export default RecentActivityFeed;
