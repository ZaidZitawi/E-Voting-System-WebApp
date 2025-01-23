import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CandidateDashboard.css";

// Mock Data - Replace with real API fetch
const mockElectionDetails = {
  1: { title: "Student Council Election", description: "Vote for the next student council!", date: "2025-03-15" },
  2: { title: "Science Club Election", description: "Leadership election for Science Club.", date: "2025-04-01" },
  3: { title: "Art Club Leadership", description: "Art club leadership voting.", date: "2025-02-20" },
};

const MyElectionDetails = () => {
  const { id } = useParams();
  const [election, setElection] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setElection(mockElectionDetails[id]);
    }, 500);
  }, [id]);

  if (!election) return <p>Loading election details...</p>;

  return (
    <div className="election-analytics">
      <h2>{election.title}</h2>
      <p><strong>Date:</strong> {election.date}</p>
      <p><strong>Description:</strong> {election.description}</p>
    </div>
  );
};

export default MyElectionDetails;