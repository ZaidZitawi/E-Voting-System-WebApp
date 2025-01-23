import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./CandidateDashboard.css";

const resultsData = [
  { time: "10 AM", votes: 100 },
  { time: "12 PM", votes: 250 },
  { time: "2 PM", votes: 400 },
  { time: "4 PM", votes: 600 },
  { time: "6 PM", votes: 800 },
];

const LiveResults = () => {
  return (
    <div className="election-analytics">
      <h2>Live Election Results</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={resultsData}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="votes" stroke="#2f8a4c" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LiveResults;
