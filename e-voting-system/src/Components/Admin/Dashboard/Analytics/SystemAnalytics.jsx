// src/components/SystemAnalytics/SystemAnalytics.jsx
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
import "./SystemAnalytics.css";

// Mock Data for Voters per Election (Current Month)
const votersPerElectionData = [
  { election: "Presidential", voters: 500 },
  { election: "Parliamentary", voters: 350 },
  { election: "Local Council", voters: 250 },
  { election: "Mayoral", voters: 150 },
  { election: "Governors", voters: 400 },
];

// Mock Data for Users per Month (Current Year)
const usersPerMonthData = [
  { month: "Jan", users: 100 },
  { month: "Feb", users: 120 },
  { month: "Mar", users: 140 },
  { month: "Apr", users: 130 },
  { month: "May", users: 160 },
  { month: "Jun", users: 170 },
  { month: "Jul", users: 150 },
  { month: "Aug", users: 180 },
  { month: "Sep", users: 200 },
  { month: "Oct", users: 220 },
  { month: "Nov", users: 210 },
  { month: "Dec", users: 230 },
];

// Mock Data for Total Stats
const totalElections = 10;
const totalUsers = 2000;

const SystemAnalytics = () => {
  // Get the current month name
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  return (
    <section className="system-analytics">
      <h2>System Analytics</h2>
      <div className="quick-stats">
        <div className="stat-card">
          <h3>Total Elections</h3>
          <p>{totalElections}</p>
        </div>
        <div className="stat-card">
          <h3>Total Registered Users</h3>
          <p>{totalUsers}</p>
        </div>
      </div>
      <div className="charts-container">
        {/* Voters Per Election Chart */}
        <div className="chart-card">
          <h3>Voters per Election ({currentMonth})</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={votersPerElectionData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <XAxis
                dataKey="election"
                interval={0} // Ensures all names are displayed
                tick={{ fontSize: 10 }} // Adjust text size for better readability
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="voters" fill="#2f8a4c" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Users Per Month Chart */}
        <div className="chart-card">
        <h3>Users per Month ({currentMonth})</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={usersPerMonthData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default SystemAnalytics;
