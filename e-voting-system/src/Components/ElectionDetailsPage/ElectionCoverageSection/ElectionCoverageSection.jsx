// src/Components/ElectionCoverageSection/ElectionCoverageSection.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ElectionCoverageSection.css';
import defaultImage from '../../../assets/Default_Election.png';
import VoteDialog from './VoteDialog'; // Adjust import path as needed

const ElectionCoverageSection = ({ election, parties }) => {
  const {
    electionId,
    title,
    description,
    typeId,
    startDatetime,
    endDatetime,
    imageUrl,
    facultyId,
    departmentId,
    isActive,
  } = election;

  const [facultyName, setFacultyName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [userEligible, setUserEligible] = useState(false);
  const [userHasVoted, setUserHasVoted] = useState(false);
  const [eligibilityChecked, setEligibilityChecked] = useState(false);
  const [voteChecked, setVoteChecked] = useState(false);
  const [showVoteDialog, setShowVoteDialog] = useState(false);

  // New states for transaction hash and character name
  const [transactionHash, setTransactionHash] = useState('');
  const [characterName, setCharacterName] = useState('');

  // ─────────────────────────────────────────────────────────────
  // 1) Check user eligibility
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!electionId) return;
    const checkEligibility = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.warn('No auth token found. You must be logged in to check eligibility.');
          setEligibilityChecked(true);
          return;
        }
        const response = await axios.get(
          `http://localhost:8080/eligibility/elections/${electionId}/check`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUserEligible(response.data.eligible);
      } catch (err) {
        console.error('Error checking eligibility:', err);
      } finally {
        setEligibilityChecked(true);
      }
    };
    checkEligibility();
  }, [electionId]);

  // ─────────────────────────────────────────────────────────────
  // 2) Check if user has already voted and fetch vote details
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!electionId) return;
    const checkUserVote = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.warn('No auth token found. Cannot check user vote.');
          setVoteChecked(true);
          return;
        }
        // GET /votes/election/{electionId}/myVote
        const response = await axios.get(
          `http://localhost:8080/votes/election/${electionId}/myVote`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('User vote response:', response.data);
        if (response.data?.status === 'no_vote') {
          setUserHasVoted(false);
        } else {
          setUserHasVoted(true);
          // Extract transactionHash and characterName from the vote object
          setTransactionHash(response.data.transactionHash || '');
          setCharacterName(response.data.characterName || 'Unknown Character');
        }
      } catch (err) {
        console.error('Error checking user vote:', err);
      } finally {
        setVoteChecked(true);
      }
    };
    checkUserVote();
  }, [electionId]);

  // ─────────────────────────────────────────────────────────────
  // 3) Fetch faculty & department names
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchNames = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No auth token found');
        return;
      }
      try {
        const facultyResponse = await axios.get(
          `http://localhost:8080/faculty-and-department/faculties/${facultyId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFacultyName(facultyResponse.data?.facultyName || facultyId);
      } catch (err) {
        console.error('Error fetching faculty:', err);
      }
      try {
        const departmentResponse = await axios.get(
          `http://localhost:8080/faculty-and-department/departments/${departmentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDepartmentName(departmentResponse.data?.departmentName || departmentId);
      } catch (err) {
        console.error('Error fetching department:', err);
      }
    };
    fetchNames();
  }, [facultyId, departmentId]);

  // ─────────────────────────────────────────────────────────────
  // 4) Helper to format datetime
  // ─────────────────────────────────────────────────────────────
  const formatDateTime = (datetimeStr) => {
    if (!datetimeStr) return '';
    const date = new Date(datetimeStr);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // ─────────────────────────────────────────────────────────────
  // 5) Get election type
  // ─────────────────────────────────────────────────────────────
  const getElectionType = (typeId) => {
    switch (typeId) {
      case 1:
        return 'University Election';
      case 2:
        return 'Faculty Election';
      default:
        return 'Department Election';
    }
  };

  // ─────────────────────────────────────────────────────────────
  // 6) Show/hide Vote Dialog
  // ─────────────────────────────────────────────────────────────
  const handleVoteClick = () => {
    setShowVoteDialog(true);
  };
  const handleCloseDialog = () => {
    setShowVoteDialog(false);
  };

  // ─────────────────────────────────────────────────────────────
  // 7) Copy transaction hash to clipboard
  // ─────────────────────────────────────────────────────────────
  const handleCopyTransactionHash = () => {
    navigator.clipboard.writeText(transactionHash)
      .then(() => {
        alert("Transaction hash copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy transaction hash:", err);
      });
  };

  // If eligibility or vote check is pending, show a loading state
  if (!eligibilityChecked || !voteChecked) {
    return (
      <section className="election-coverage-hero">
        <div className="overlay"></div>
        <div className="election-content">Loading coverage details...</div>
      </section>
    );
  }

  const fullImageUrl = imageUrl 
    ? `http://localhost:8080/uploads/${imageUrl}` 
    : defaultImage;

  return (
    <section
      className="election-coverage-hero"
      style={{ backgroundImage: `url(${fullImageUrl})` }}
      aria-labelledby="election-title"
    >
      <div className="overlay"></div>
      <div className="election-content">
        <h1 className="election-title" id="election-title">{title}</h1>
        <p className="election-description">{description}</p>

        <div className="election-details-grid">
          <div className="detail-card">
            <i className="fas fa-bullhorn detail-icon"></i>
            <span className="detail-label">Type</span>
            <span className="detail-value">{getElectionType(typeId)}</span>
          </div>
          <div className="detail-card">
            <i className="fas fa-calendar-alt detail-icon"></i>
            <span className="detail-label">Start</span>
            <span className="detail-value">{formatDateTime(startDatetime)}</span>
          </div>
          <div className="detail-card">
            <i className="fas fa-calendar-check detail-icon"></i>
            <span className="detail-label">End</span>
            <span className="detail-value">{formatDateTime(endDatetime)}</span>
          </div>
          <div className="detail-card">
            <i className="fas fa-university detail-icon"></i>
            <span className="detail-label">Faculty</span>
            <span className="detail-value">{facultyName}</span>
          </div>
          <div className="detail-card">
            <i className="fas fa-building detail-icon"></i>
            <span className="detail-label">Department</span>
            <span className="detail-value">{departmentName}</span>
          </div>
        </div>

        {isActive ? (
          <>
            {userHasVoted ? (
              <>
                <div className="already-voted-message">
                  You have already cast your vote for this election as <span className="silly-name">{characterName}</span>.
                </div>
                <div className="transaction-hash-container">
                  <label htmlFor="transactionHash">Transaction Hash</label>
                  <div className="copyable-input-wrapper">
                    <input
                      type="text"
                      id="transactionHash"
                      value={transactionHash}
                      readOnly
                      className="copyable-input"
                    />
                    <button
                      className="copy-btn"
                      onClick={handleCopyTransactionHash}
                      title="Copy Transaction Hash"
                    >
                      <i className="fa fa-copy"></i>
                    </button>
                  </div>
                </div>
              </>
            ) : userEligible ? (
              <button className="vote-button" onClick={handleVoteClick}>
                Vote Now
              </button>
            ) : (
              <div className="ineligibility-message">
                You are not eligible to vote in this election.
              </div>
            )}
          </>
        ) : (
          <button className="vote-button disabled" disabled>
            Voting Closed
          </button>
        )}
      </div>

      <VoteDialog
        isOpen={showVoteDialog}
        onClose={handleCloseDialog}
        electionId={electionId}
        parties={parties}
      />
    </section>
  );
};

export default ElectionCoverageSection;
