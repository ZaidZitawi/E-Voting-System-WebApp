import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCube, FaUserShield, FaVoteYea, FaClock, FaUsers } from 'react-icons/fa';
import './ElectionBlockchainOverview.css';

// Helper function to validate dates
const isValidDate = (dateString) => {
  return !isNaN(Date.parse(dateString));
};

// Helper function to safely format dates
const formatDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleString();
  } catch (e) {
    return 'Invalid Date';
  }
};

function BlockchainOverview({ electionId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [election, setElection] = useState(null);
  const [parties, setParties] = useState([]);
  const [userVote, setUserVote] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        const baseUrl = "http://localhost:8080";
        const authToken = localStorage.getItem('authToken');

        // Fetch all data in parallel
        const [electionRes, partiesRes, voteRes] = await Promise.all([
          fetch(`${baseUrl}/elections/${electionId}`, {
            headers: { 'Authorization': `Bearer ${authToken}` },
            signal: abortController.signal
          }),
          fetch(`${baseUrl}/parties/election/${electionId}`, {
            headers: { 'Authorization': `Bearer ${authToken}` },
            signal: abortController.signal
          }),
          fetch(`${baseUrl}/votes/election/${electionId}/myVote`, {
            headers: { 'Authorization': `Bearer ${authToken}` },
            signal: abortController.signal
          })
        ]);

        // Validate election data
        if (!electionRes.ok) throw new Error("Failed to fetch election");
        const electionData = await electionRes.json();

        // Data validation checks
        const validationErrors = [];
        if (!electionData.startDatetime || !isValidDate(electionData.startDatetime)) {
          validationErrors.push('Invalid start date format');
        }
        if (!electionData.endDatetime || !isValidDate(electionData.endDatetime)) {
          validationErrors.push('Invalid end date format');
        }
        if (validationErrors.length > 0) {
          throw new Error(`Data validation failed: ${validationErrors.join(', ')}`);
        }

        // Validate parties data
        if (!partiesRes.ok) throw new Error("Failed to fetch parties");
        const partiesData = await partiesRes.json();
        if (!Array.isArray(partiesData)) {
          throw new Error('Invalid parties data format');
        }

        // Validate user vote
        const userVoteData = voteRes.ok ? await voteRes.json() : null;
        if (userVoteData && typeof userVoteData !== 'object') {
          throw new Error('Invalid vote data format');
        }

        // Set validated data
        setElection(electionData);
        setParties(partiesData);
        setUserVote(userVoteData);

      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err);
          setError(err.message || 'Failed to load election data. Please check data formats.');
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    return () => abortController.abort();
  }, [electionId]);

  const handleVoteButtonClick = () => {
    navigate(`/elections/${electionId}/vote`);
  };

  // Render methods
  const renderTimeline = () => {
    if (!election?.startDatetime || !election?.endDatetime) {
      return (
        <div className="blockchain-overview-error-message">
          Invalid election timeline data
        </div>
      );
    }

    return (
      <div className="blockchain-overview-timeline">
        <div className="blockchain-overview-timeline-item">
          <FaClock />
          <span>Start: {formatDate(election.startDatetime)}</span>
        </div>
        <div className="blockchain-overview-timeline-item">
          <FaClock />
          <span>End: {formatDate(election.endDatetime)}</span>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="blockchain-overview-container">
        <div className="blockchain-overview-loading-card">
          <h3>Loading election #{electionId}...</h3>
          <div className="blockchain-overview-loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blockchain-overview-container">
        <div className="blockchain-overview-error-card">
          <h3>Error: {error}</h3>
        </div>
      </div>
    );
  }

  if (!election) {
    return (
      <div className="blockchain-overview-container">
        <div className="blockchain-overview-error-card">
          <h3>No election data found.</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="blockchain-overview-container">
      {/* Sidebar */}
      <div className="blockchain-overview-sidebar">
        <div className="blockchain-overview-sidebar-section">
          <h3>Election Timeline</h3>
          {renderTimeline()}
        </div>
        <div className="blockchain-overview-sidebar-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href={`https://mumbai.polygonscan.com/tx/${election.transactionHash}`} target="_blank" rel="noopener noreferrer">View Election on Polygonscan</a></li>
            <li><a href="#parties">View Parties</a></li>
            <li><a href="#vote">View Your Vote</a></li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="blockchain-overview-main-content">
        {/* Election Summary */}
        <div className="blockchain-overview-card blockchain-overview-summary-card">
          <div className="blockchain-overview-card-header">
            <FaCube className="blockchain-overview-card-icon" />
            <h2>Election Summary</h2>
          </div>
          <div className="blockchain-overview-card-body">
            <div className="blockchain-overview-info-row">
              <span className="label">Title:</span>
              <span className="value">{election.title || 'N/A'}</span>
            </div>
            <div className="blockchain-overview-info-row">
              <span className="label">Description:</span>
              <span className="value">{election.description || 'N/A'}</span>
            </div>
            <div className="blockchain-overview-info-row">
              <span className="label">Department:</span>
              <span className="value">Department {election.departmentId || 'N/A'}</span>
            </div>
            <div className="blockchain-overview-info-row">
              <span className="label">Faculty:</span>
              <span className="value">Faculty {election.facultyId || 'N/A'}</span>
            </div>
            {election.transactionHash && (
              <div className="blockchain-overview-info-row">
                <span className="label">Transaction Hash:</span>
                <a
                  className="blockchain-overview-hash-link"
                  href={`https://mumbai.polygonscan.com/tx/${election.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Polygonscan
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Parties Section */}
        <div className="blockchain-overview-card blockchain-overview-parties-card" id="parties">
          <div className="blockchain-overview-card-header">
            <FaUsers className="blockchain-overview-card-icon" />
            <h3>Participating Parties</h3>
          </div>
          <div className="blockchain-overview-card-body blockchain-overview-parties-list">
            {parties.length > 0 ? (
              parties.map((party) => (
                <div key={party.partyId} className="blockchain-overview-party-item">
                  <div className="blockchain-overview-party-header">
                    {party.imageUrl && (
                      <img
                        src={party.imageUrl}
                        alt={party.name}
                        className="blockchain-overview-party-image"
                      />
                    )}
                    <h4 className="blockchain-overview-party-name">{party.name || 'N/A'}</h4>
                  </div>
                  <div className="blockchain-overview-party-details">
                    <div className="blockchain-overview-info-row">
                      <span className="label">Bio:</span>
                      <span className="value">{party.bio || 'N/A'}</span>
                    </div>
                    {party.transactionHash && (
                      <div className="blockchain-overview-info-row">
                        <span className="label">Tx Hash:</span>
                        <a
                          className="blockchain-overview-hash-link"
                          href={`https://mumbai.polygonscan.com/tx/${party.transactionHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View on Polygonscan
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="blockchain-overview-no-parties">No parties found for this election.</p>
            )}
          </div>
        </div>

        {/* User Vote Section */}
        <div className="blockchain-overview-card blockchain-overview-user-vote-card" id="vote">
          <div className="blockchain-overview-card-header">
            <FaVoteYea className="blockchain-overview-card-icon" />
            <h3>Your Vote</h3>
          </div>
          <div className="blockchain-overview-card-body">
            {userVote && userVote.status !== 'no_vote' ? (
              <>
                <div className="blockchain-overview-info-row">
                  <span className="label">Character Name:</span>
                  <span className="value">{userVote.characterName || 'N/A'}</span>
                </div>
                {userVote.transactionHash && (
                  <div className="blockchain-overview-info-row">
                    <span className="label">Tx Hash:</span>
                    <a
                      className="blockchain-overview-hash-link"
                      href={`https://mumbai.polygonscan.com/tx/${userVote.transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Polygonscan
                    </a>
                  </div>
                )}
              </>
            ) : (
              <div className="blockchain-overview-no-vote">
                <p>You haven't voted in this election yet.</p>
                <button className="blockchain-overview-vote-btn" onClick={handleVoteButtonClick}>
                  Vote Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlockchainOverview;