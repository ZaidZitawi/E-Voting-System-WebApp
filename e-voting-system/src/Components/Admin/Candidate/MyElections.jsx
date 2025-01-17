import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CandidateDashboard.css";

// Mock Data - Replace this with real API data
const mockElections = [
  { id: 1, title: "Student Council Election", date: "2025-03-15", status: "Ongoing" },
  { id: 2, title: "Science Club Election", date: "2025-04-01", status: "Upcoming" },
  { id: 3, title: "Art Club Leadership", date: "2025-02-20", status: "Completed" },
];

const MyElections = () => {
  const [elections, setElections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call to fetch elections
    setTimeout(() => {
      setElections(mockElections);
    }, 500);
  }, []);

  const handleElectionClick = (id) => {
    navigate(`/candidate/election/${id}`);
  };

  return (
    <div className="election-analytics">
      <h2>My Elections</h2>
      <div className="election-list">
        {elections.length === 0 ? (
          <p>Loading elections...</p>
        ) : (
          elections.map((election) => (
            <div
              key={election.id}
              className="election-card"
              onClick={() => handleElectionClick(election.id)}
            >
              <h3>{election.title}</h3>
              <p>Date: {election.date}</p>
              <p>Status: {election.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyElections;
