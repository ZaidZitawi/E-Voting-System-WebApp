// src/pages/CandidateDashboard/EngagementAnalytics.jsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./CandidateDashboard.css";

const engagementData = [
  { post: "Post 1", likes: 120, comments: 30 },
  { post: "Post 2", likes: 90, comments: 45 },
  { post: "Post 3", likes: 150, comments: 60 },
];

const EngagementAnalytics = () => {
  return (
    <div className="election-analytics">
      <h2>Engagement Analytics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={engagementData}>
          <XAxis dataKey="post" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="likes" fill="#2f8a4c" />
          <Bar dataKey="comments" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EngagementAnalytics;
