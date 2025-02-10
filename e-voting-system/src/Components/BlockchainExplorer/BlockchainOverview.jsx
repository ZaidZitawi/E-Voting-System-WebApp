import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCube, FaVoteYea, FaClock, FaUsers } from "react-icons/fa";
import PartyCard from "../Cards/PartyCard.jsx";
import "./BlockchainOverview.css";

//
// Helper functions
//
const isValidDate = (dateString) => !isNaN(Date.parse(dateString));
const formatDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleString();
  } catch {
    return "Invalid Date";
  }
};

function BlockchainOverview({ electionId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [election, setElection] = useState(null);
  const [parties, setParties] = useState([]);
  const [userVote, setUserVote] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const navigate = useNavigate();

  // Update currentTime every second for live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch election, parties, vote, and faculty/department info
  useEffect(() => {
    const abortController = new AbortController();
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);
        const baseUrl = "http://localhost:8080";
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("No auth token provided.");
        }
        const [electionRes, partiesRes, voteRes] = await Promise.all([
          fetch(`${baseUrl}/elections/${electionId}`, {
            headers: { Authorization: `Bearer ${authToken}` },
            signal: abortController.signal,
          }),
          fetch(`${baseUrl}/parties/election/${electionId}`, {
            headers: { Authorization: `Bearer ${authToken}` },
            signal: abortController.signal,
          }),
          fetch(`${baseUrl}/votes/election/${electionId}/myVote`, {
            headers: { Authorization: `Bearer ${authToken}` },
            signal: abortController.signal,
          }),
        ]);

        if (!electionRes.ok) throw new Error("Failed to fetch election");
        const electionData = await electionRes.json();

        // Validate date fields
        const invalidFields = [];
        if (
          !electionData.startDatetime ||
          !isValidDate(electionData.startDatetime)
        )
          invalidFields.push("Invalid start date");
        if (!electionData.endDatetime || !isValidDate(electionData.endDatetime))
          invalidFields.push("Invalid end date");
        if (invalidFields.length > 0) {
          throw new Error(
            `Data validation failed: ${invalidFields.join(", ")}`
          );
        }

        // Fetch faculty info
        if (electionData.facultyId && electionData.facultyId !== "null") {
          try {
            const facultyResponse = await axios.get(
              `${baseUrl}/faculty-and-department/faculties/${electionData.facultyId}`,
              { headers: { Authorization: `Bearer ${authToken}` } }
            );
            electionData.facultyName = facultyResponse.data.facultyName;
          } catch (err) {
            electionData.facultyName = "N/A";
          }
        } else {
          electionData.facultyName = "N/A";
        }

        // Fetch department info
        if (electionData.departmentId && electionData.departmentId !== "null") {
          try {
            const departmentResponse = await axios.get(
              `${baseUrl}/faculty-and-department/departments/${electionData.departmentId}`,
              { headers: { Authorization: `Bearer ${authToken}` } }
            );
            electionData.departmentName =
              departmentResponse.data.departmentName;
          } catch (err) {
            electionData.departmentName = "N/A";
          }
        } else {
          electionData.departmentName = "N/A";
        }

        // Fetch parties
        if (!partiesRes.ok) throw new Error("Failed to fetch parties");
        const partiesData = await partiesRes.json();
        if (!Array.isArray(partiesData)) {
          throw new Error("Invalid parties data format");
        }

        // Fetch user vote
        const userVoteData = voteRes.ok ? await voteRes.json() : null;
        if (userVoteData && typeof userVoteData !== "object") {
          throw new Error("Invalid vote data format");
        }

        setElection(electionData);
        setParties(partiesData);
        setUserVote(userVoteData);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load election data.");
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    return () => abortController.abort();
  }, [electionId]);

  // Sidebar helper functions
  const getElectionStatus = () => {
    const start = new Date(election.startDatetime);
    const end = new Date(election.endDatetime);
    if (currentTime < start) return "Upcoming";
    else if (currentTime >= start && currentTime <= end) return "Ongoing";
    else return "Closed";
  };

  const renderCountdown = () => {
    const start = new Date(election.startDatetime);
    const end = new Date(election.endDatetime);
    let targetTime;
    if (currentTime < start) {
      targetTime = start;
    } else if (currentTime >= start && currentTime <= end) {
      targetTime = end;
    } else {
      return <p className="countdown">Election ended.</p>;
    }
    const diff = targetTime - currentTime;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return (
      <p className="countdown">
        {currentTime < start ? "Starts in:" : "Ends in:"} {days}d {hours}h{" "}
        {minutes}m {seconds}s
      </p>
    );
  };

  const renderProgressBar = () => {
    const start = new Date(election.startDatetime);
    const end = new Date(election.endDatetime);
    if (currentTime < start || currentTime > end) return null;
    const total = end - start;
    const elapsed = currentTime - start;
    const percentage = Math.min((elapsed / total) * 100, 100);
    return (
      <div className="progress-wrapper">
        <div className="progress-label">{Math.floor(percentage)}% completed</div>
        <div className="progress-bar-timeline">
          <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
          <div className="progress-marker" style={{ left: `${percentage}%` }}></div>
        </div>
      </div>
    );
  };
  
  

  // Base URL for election images
  const imageBaseUrl = "http://localhost:8080/uploads";

  // Navigation handlers
  const handleDetailsClick = () => {
    navigate(`/details/${electionId}`);
  };
  const handleVoteButtonClick = () => {
    navigate(`/vote/${electionId}`);
  };
  const handlePartySelect = (partyId) => {
    navigate(`/parties/${partyId}`);
  };

  // Loading / Error states
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
      {/* Header */}
      <div className="blockchain-overview-header">
        <h2>Blockchain Overview</h2>
        <button className="view-details-button" onClick={handleDetailsClick}>
          View Election Details
        </button>
      </div>

      {/* Left Sidebar - Election Dashboard */}
      <div className="blockchain-overview-sidebar">
        <div className="blockchain-overview-sidebar-section">
          <div className="election-banner">
            {election.imageUrl && (
              <img
                src={`${imageBaseUrl}/${election.imageUrl}`}
                alt="Election Banner"
              />
            )}
          </div>
          <div className="countdown-container">{renderCountdown()}</div>
          <div className="election-status-info">
            <div className="sidebar-info-row">
              <FaCube className="sidebar-icon" />
              <span>
                <strong>Status:</strong> {getElectionStatus()}
              </span>
            </div>
            {getElectionStatus() === "Ongoing" && renderProgressBar()}
            <div className="sidebar-info-row">
              <FaClock className="sidebar-icon" />
              <span>
                <strong>Start:</strong> {formatDate(election.startDatetime)}
              </span>
            </div>
            <div className="sidebar-info-row">
              <FaClock className="sidebar-icon" />
              <span>
                <strong>End:</strong> {formatDate(election.endDatetime)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="blockchain-overview-main-content">
        <div className="blockchain-overview-card blockchain-overview-summary-card">
          <div className="blockchain-overview-card-header">
            <FaCube className="blockchain-overview-card-icon" />
            <h2>Election Summary</h2>
          </div>
          <div className="blockchain-overview-card-body">
            <div className="blockchain-overview-info-row">
              <span className="label">Title:</span>
              <span className="value">{election.title || "N/A"}</span>
            </div>
            <div className="blockchain-overview-info-row">
              <span className="label">Description:</span>
              <span className="value">{election.description || "N/A"}</span>
            </div>
            <div className="blockchain-overview-info-row">
              <span className="label">Department:</span>
              <span className="value">
                {election.departmentName ||
                  `Department ${election.departmentId || "N/A"}`}
              </span>
            </div>
            <div className="blockchain-overview-info-row">
              <span className="label">Faculty:</span>
              <span className="value">
                {election.facultyName ||
                  `Faculty ${election.facultyId || "N/A"}`}
              </span>
            </div>
            {election.transactionHash && (
              <div className="blockchain-overview-info-row">
                <span className="label">Tx Hash:</span>
                <a
                  className="blockchain-overview-hash-link"
                  href={`https://amoy.polygonscan.com/tx/${election.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Polygonscan
                </a>
              </div>
            )}
          </div>
        </div>

        <div
          className="blockchain-overview-card blockchain-overview-parties-card"
          id="parties"
        >
          <div className="blockchain-overview-card-header">
            <FaUsers className="blockchain-overview-card-icon" />
            <h3>Participating Parties</h3>
          </div>
          <div className="blockchain-overview-card-body blockchain-overview-parties-list">
            {parties.length > 0 ? (
              <div className="parties-grid">
                {parties.map((party) => (
                  <PartyCard
                    key={party.partyId}
                    party={party}
                    onSelect={handlePartySelect}
                  />
                ))}
              </div>
            ) : (
              <p className="blockchain-overview-no-parties">
                No parties found for this election.
              </p>
            )}
          </div>
        </div>

        <div
          className="blockchain-overview-card blockchain-overview-user-vote-card"
          id="vote"
        >
          <div className="blockchain-overview-card-header">
            <FaVoteYea className="blockchain-overview-card-icon" />
            <h3>Your Vote</h3>
          </div>
          <div className="blockchain-overview-card-body">
            {userVote && userVote.status !== "no_vote" ? (
              <>
                <div className="blockchain-overview-info-row">
                  <span className="label">Character Name:</span>
                  <span className="value">
                    {userVote.characterName || "N/A"}
                  </span>
                </div>
                {userVote.transactionHash && (
                  <div className="blockchain-overview-info-row">
                    <span className="label">Tx Hash:</span>
                    <a
                      className="blockchain-overview-hash-link"
                      href={`https://amoy.polygonscan.com/tx/${userVote.transactionHash}`}
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
                <button
                  className="blockchain-overview-vote-btn"
                  onClick={handleVoteButtonClick}
                >
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
