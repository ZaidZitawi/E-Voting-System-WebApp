// src/components/admin/AdminDashboardOverview.jsx
import React from 'react';
import './AdminDashboardOverview.css';
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
  // Dummy metrics data for development purposes
  const totalElections = 20;
  const activeElections = 12;
  const liveElections = 5;
  const totalUsers = 1500;
  const voters = 1200;
  const candidates = 200;
  const admins = 100;
  const parties = 50; // New metric for parties

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

  // Dummy data for user roles breakdown (for a pie chart)
  const userRolesData = [
    { role: 'Voters', count: voters },
    { role: 'Candidates', count: candidates },
    { role: 'Admins', count: admins },
    { role: 'Parties', count: parties },
  ];

  // Colors for pie slices
  const pieColors = ['#347928', '#FCCD2A', '#8884d8', '#82ca9d'];

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
          <p>{totalUsers + parties}</p>
          <small>
            Voters: {voters} | Candidates: {candidates} | Admins: {admins} | {parties} Parties
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
