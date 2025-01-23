// src/components/BlockchainExplorer/ElectionBlockchainOverview.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ElectionBlockchainOverview.css';

// Example icons using react-icons (optional)
import { FaCube, FaUserShield, FaVoteYea } from 'react-icons/fa';

function BlockchainOverview({ electionId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [election, setElection] = useState(null);
  const [parties, setParties] = useState([]);
  const [userVote, setUserVote] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        const baseUrl = "http://localhost:8080";
        const authToken = localStorage.getItem('authToken');

        // 1) FETCH ELECTION
        const resElection = await fetch(`${baseUrl}/elections/${electionId}`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        });
        if (!resElection.ok) {
          let errorMsg = 'Failed to load election';
          try {
            // Attempt to parse JSON error
            const errJson = await resElection.json();
            errorMsg = errJson.message || errorMsg;
          } catch (jsonErr) {
            // fallback to text or default
            const textErr = await resElection.text();
            if (textErr) errorMsg = textErr;
          }
          throw new Error(errorMsg);
        }
        const electionData = await resElection.json();

        // 2) FETCH PARTIES
        const resParties = await fetch(`${baseUrl}/parties/election/${electionId}`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        });
        if (!resParties.ok) {
          let errorMsg = 'Failed to load parties';
          try {
            const errJson = await resParties.json();
            errorMsg = errJson.message || errorMsg;
          } catch (jsonErr) {
            const textErr = await resParties.text();
            if (textErr) errorMsg = textErr;
          }
          throw new Error(errorMsg);
        }
        const partiesData = await resParties.json();

        // 3) FETCH USER VOTE
        const resVote = await fetch(`${baseUrl}/votes/election/${electionId}/myVote`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        });

        let userVoteData = null;
        if (resVote.ok) {
          // success => parse JSON
          userVoteData = await resVote.json();
        } else if (resVote.status === 404) {
          // no vote found, just set to null
          userVoteData = null;
        } else {
          // other error => try JSON, fallback to text
          let errorMsg = 'Failed to load user vote';
          try {
            const errJson = await resVote.json();
            errorMsg = errJson.message || errorMsg;
          } catch (jsonErr) {
            const textErr = await resVote.text();
            if (textErr) errorMsg = textErr;
          }
          throw new Error(errorMsg);
        }

        // SET STATE
        setElection(electionData);
        setParties(partiesData);
        setUserVote(userVoteData);

      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [electionId]);

  const handleVoteButtonClick = () => {
    navigate(`/elections/${electionId}/vote`);
  };

  // LOADING
  if (isLoading) {
    return (
      <div className="overview-container">
        <div className="loading-card">
          <h3>Loading election #{electionId}...</h3>
        </div>
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div className="overview-container">
        <div className="error-card">
          <h3>Error: {error}</h3>
        </div>
      </div>
    );
  }

  // RENDER
  return (
    <div className="overview-container">
      {/* Top: Election Summary Box */}
      {election && (
        <div className="card summary-card">
          <div className="card-header">
            <FaCube className="card-icon" />
            <h2>Election Summary</h2>
          </div>
          <div className="card-body">
            <div className="info-row">
              <span className="label">Title:</span>
              <span className="value">{election.title}</span>
            </div>
            {election.transactionHash && (
              <div className="info-row">
                <span className="label">Transaction Hash:</span>
                <a
                  className="hash-link"
                  href={`https://mumbai.polygonscan.com/tx/${election.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {election.transactionHash}
                </a>
              </div>
            )}
            {election.description && (
              <div className="info-row">
                <span className="label">Description:</span>
                <span className="value">{election.description}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Middle: 2 columns => Parties & User Vote */}
      <div className="columns-container">
        {/* Parties Column */}
        <div className="column left-column">
          <div className="card parties-card">
            <div className="card-header">
              <FaUserShield className="card-icon" />
              <h3>Participating Parties</h3>
            </div>
            <div className="card-body parties-list">
              {parties.map((party) => (
                <div key={party.partyId} className="party-item">
                  <h4 className="party-name">{party.name}</h4>
                  {party.transactionHash && (
                    <div className="info-row small-row">
                      <span className="label">Tx Hash:</span>
                      <a
                        className="hash-link"
                        href={`https://mumbai.polygonscan.com/tx/${party.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {party.transactionHash}
                      </a>
                    </div>
                  )}
                  <div className="info-row small-row">
                    <span className="label">Vote Count:</span>
                    <span className="value">{party.voteCount || 0}</span>
                  </div>
                  {party.bio && (
                    <div className="info-row small-row">
                      <span className="label">Bio:</span>
                      <span className="value">{party.bio}</span>
                    </div>
                  )}
                </div>
              ))}
              {parties.length === 0 && (
                <p className="placeholder-text">No parties found for this election.</p>
              )}
            </div>
          </div>
        </div>

        {/* User Vote Column */}
        <div className="column right-column">
          <div className="card user-vote-card">
            <div className="card-header">
              <FaVoteYea className="card-icon" />
              <h3>Your Vote</h3>
            </div>
            <div className="card-body">
              {userVote ? (
                <>
                  <div className="info-row">
                    <span className="label">Character Name:</span>
                    <span className="value">{userVote.characterName}</span>
                  </div>
                  {userVote.transactionHash && (
                    <div className="info-row">
                      <span className="label">Tx Hash:</span>
                      <a
                        className="hash-link"
                        href={`https://mumbai.polygonscan.com/tx/${userVote.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {userVote.transactionHash}
                      </a>
                    </div>
                  )}
                </>
              ) : (
                <div className="no-vote">
                  <p>You haven't voted in this election yet.</p>
                  <button className="vote-btn" onClick={handleVoteButtonClick}>
                    Vote Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlockchainOverview;
