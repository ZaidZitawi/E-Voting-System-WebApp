// src/pages/CandidateDashboard/EngagementAnalytics.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ComposedChart
} from "recharts";
import "./CandidateDashboard.css";

// Enhanced Mock Data with more details
const engagementData = [
  { post: "Post 1", likes: 120, comments: 30, engagementRate: 75 },
  { post: "Post 2", likes: 90, comments: 45, engagementRate: 67.5 },
  { post: "Post 3", likes: 150, comments: 60, engagementRate: 105 },
  { post: "Post 4", likes: 180, comments: 80, engagementRate: 130 },
  { post: "Post 5", likes: 200, comments: 100, engagementRate: 150 },
];

// Custom Tooltip for better clarity
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p><strong>{label}</strong></p>
        <p>👍 Likes: {payload[0].value}</p>
        <p>💬 Comments: {payload[1].value}</p>
        <p>📈 Engagement Rate: {payload[2].value}%</p>
      </div>
    );
  }
  return null;
};

const EngagementAnalytics = () => {
  return (
    <div className="election-analytics">
      <h2>Advanced Engagement Analytics</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={engagementData}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="post" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {/* Bar for Likes */}
          <Bar dataKey="likes" barSize={20} fill="#2f8a4c" />

          {/* Bar for Comments */}
          <Bar dataKey="comments" barSize={20} fill="#82ca9d" />

          {/* Line for Engagement Rate */}
          <Line type="monotone" dataKey="engagementRate" stroke="#ff7300" strokeWidth={3} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EngagementAnalytics;
