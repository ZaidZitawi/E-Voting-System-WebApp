import React, { useState, useEffect } from 'react';
import './ManageElections.css';
const ManageElections = () => {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    // Fetch all elections (Mock API Call)
    fetch('/api/admin/elections')
      .then(res => res.json())
      .then(data => setElections(data))
      .catch(err => console.error('Failed to fetch elections', err));
  }, []);

  const handleElectionSelect = (electionId) => {
    const election = elections.find(e => e.id === electionId);
    setSelectedElection(election);

    // Fetch candidates and votes for the selected election (Mock API Call)
    fetch(`/api/admin/elections/${electionId}/candidates`)
      .then(res => res.json())
      .then(data => {
        setCandidates(data.candidates);
        setTotalVotes(data.totalVotes);
      })
      .catch(err => console.error('Failed to fetch candidates', err));
  };

  const handleDeleteElection = (electionId) => {
    if (window.confirm('Are you sure you want to delete this election?')) {
      fetch(`/api/admin/elections/${electionId}`, { method: 'DELETE' })
        .then(() => {
          setElections(elections.filter(e => e.id !== electionId));
          setSelectedElection(null);
        })
        .catch(err => console.error('Failed to delete election', err));
    }
  };

  const handleEditElection = (electionId) => {
    // Redirect to EditElection page or open modal for editing
    console.log(`Edit Election: ${electionId}`);
  };

  return (
    <div className="manage-elections-page">
      <h2>Manage Elections</h2>

      {/* Election List Section */}
      <div className="elections-list">
        <h3>All Elections</h3>
        <ul>
          {elections.map(election => (
            <li key={election.id}>
              <span>{election.title} ({election.status})</span>
              <div className="actions">
                <button onClick={() => handleElectionSelect(election.id)}>View</button>
                <button onClick={() => handleEditElection(election.id)}>Edit</button>
                <button onClick={() => handleDeleteElection(election.id)} className="delete-btn">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Selected Election Details */}
      {selectedElection && (
        <div className="election-details">
          <h3>Election Details: {selectedElection.title}</h3>
          <p><strong>Status:</strong> {selectedElection.status}</p>
          <p><strong>Start Date:</strong> {selectedElection.startDate}</p>
          <p><strong>End Date:</strong> {selectedElection.endDate}</p>
          <p><strong>Eligibility:</strong> {selectedElection.eligibility}</p>
          
        </div>
      )}
    </div>
  );
};

export default ManageElections;
