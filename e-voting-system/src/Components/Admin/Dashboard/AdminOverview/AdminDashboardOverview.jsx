// src/components/admin/AdminDashboardOverview.jsx
import React, { useState, useEffect } from 'react';
import './AdminDashboardOverview.css';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const AdminDashboardOverview = () => {
  // State for user statistics fetched from the backend
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    roleBreakdown: {
      ROLE_ADMIN: 0,
      ROLE_CANDIDATE: 0,
      ROLE_PARTY_MANAGER: 0,
      ROLE_USER: 0,
    },
  });

  // Fetch user statistics on component mount
  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:8080/users/statistics', {
          headers: { Authorization: `Bearer ${token}` },
        });
        // The response data should include totalUsers and roleBreakdown
        setUserStats(response.data);
      } catch (error) {
        console.error('Error fetching user statistics:', error);
      }
    };

    fetchUserStats();
  }, []);

  // Dummy elections data remains unchanged for now
  const totalElections = 20;
  const activeElections = 12;
  const liveElections = 5;

  // Destructure the fetched statistics
  const { totalUsers, roleBreakdown } = userStats;

  // Prepare data for the pie chart by mapping backend roles to display labels:
  // ROLE_USER -> Voters, ROLE_CANDIDATE -> Candidates,
  // ROLE_ADMIN -> Admins, ROLE_PARTY_MANAGER -> Parties
  const userRolesData = [
    { role: 'Voters', count: roleBreakdown.ROLE_USER },
    { role: 'Candidates', count: roleBreakdown.ROLE_CANDIDATE },
    { role: 'Admins', count: roleBreakdown.ROLE_ADMIN },
    { role: 'Parties', count: roleBreakdown.ROLE_PARTY_MANAGER },
  ];

  // Colors for pie slices
  const pieColors = ['#347928', '#FCCD2A', '#8884d8', '#82ca9d'];

  // Dummy data for elections trend chart (votes per month)
  const electionTrendData = [
    { month: 'Jan', votes: 1200 },
    { month: 'Feb', votes: 1500 },
    { month: 'Mar', votes: 1700 },
    { month: 'Apr', votes: 1600 },
    { month: 'May', votes: 1800 },
    { month: 'Jun', votes: 2000 },
    { month: 'Jul', votes: 1900 },
    { month: 'Aug', votes: 2100 },
    { month: 'Sep', votes: 2200 },
    { month: 'Oct', votes: 2300 },
    { month: 'Nov', votes: 2100 },
    { month: 'Dec', votes: 2500 },
  ];

  return (
    <section className="admin-dashboard-overview">
      <h2>Dashboard Overview</h2>
      
      {/* Summary Metrics Cards */}
      <div className="admin-summary-cards">
        <div className="admin-summary-card">
          <h3>Total Elections</h3>
          <p>{totalElections}</p>
          <small>Active: {activeElections}</small>
        </div>
        <div className="admin-summary-card">
          <h3>Live Elections</h3>
          <p>{liveElections}</p>
        </div>
        <div className="admin-summary-card">
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
          <small>
            Voters: {roleBreakdown.ROLE_USER} | Candidates: {roleBreakdown.ROLE_CANDIDATE} | Admins: {roleBreakdown.ROLE_ADMIN} | Parties: {roleBreakdown.ROLE_PARTY_MANAGER}
          </small>
        </div>
      </div>

      {/* Visual Indicators & Charts */}
      <div className="admin-charts">
        {/* Elections Trend Chart */}
        <div className="admin-chart-card">
          <h3>Elections Trend (Monthly Votes)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={electionTrendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="votes" stroke="#347928" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* User Roles Breakdown Chart */}
        <div className="admin-chart-card">
          <h3>User Roles Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={userRolesData}
                dataKey="count"
                nameKey="role"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {userRolesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardOverview;
