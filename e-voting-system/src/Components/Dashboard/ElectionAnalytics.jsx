// src/components/ElectionAnalytics/ElectionAnalytics.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import "./ElectionAnalytics.css";

// Mock Data for Voter Turnout
const voterTurnoutData = [
  { month: "Jan", turnout: 400 },
  { month: "Feb", turnout: 300 },
  { month: "Mar", turnout: 500 },
  { month: "Apr", turnout: 200 },
  { month: "May", turnout: 700 },
  { month: "Jun", turnout: 600 },
];

// Mock Data for Voting Trends
const votingTrendsData = [
  { time: "09:00", votes: 400 },
  { time: "10:00", votes: 300 },
  { time: "11:00", votes: 500 },
  { time: "12:00", votes: 200 },
  { time: "13:00", votes: 700 },
  { time: "14:00", votes: 600 },
  { time: "15:00", votes: 800 },
  { time: "16:00", votes: 700 },
  { time: "17:00", votes: 900 },
  { time: "18:00", votes: 1000 },
];

const ElectionAnalytics = () => {
  return (
    <section className="election-analytics">
      <h2>Election Analytics</h2>
      <div className="charts-container">
        {/* Voter Turnout Bar Chart */}
        <div className="chart-card">
          <h3>Voter Turnout (Monthly)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={voterTurnoutData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="turnout" fill="#2f8a4c" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Voting Trends Line Chart */}
        <div className="chart-card">
          <h3>Voting Trends (Hourly)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={votingTrendsData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="votes" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default ElectionAnalytics;
