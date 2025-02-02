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

  // States to store fetched faculty/department names
  const [facultyName, setFacultyName] = useState('');
  const [departmentName, setDepartmentName] = useState('');

  // States for eligibility + "has user voted?"
  const [userEligible, setUserEligible] = useState(false);
  const [userHasVoted, setUserHasVoted] = useState(false);

  // We need 2 "checks" to finish before we show final UI
  const [eligibilityChecked, setEligibilityChecked] = useState(false);
  const [voteChecked, setVoteChecked] = useState(false);

  // For opening/closing the Vote Dialog
  const [showVoteDialog, setShowVoteDialog] = useState(false);

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
        console.log('Eligibility response:', response.data);
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
  // 2) Check if user has already voted
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

        // If there's a "voteDTO" object => userHasVoted = true
        // If "status=no_vote" => userHasVoted = false
        if (response.data?.status === 'no_vote') {
          setUserHasVoted(false);
        } else {
          // We assume if not "no_vote", the user has a vote object
          setUserHasVoted(true);
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
        // Fetch faculty name by facultyId
        let response = await axios.get(
          `http://localhost:8080/faculty-and-department/faculties/${facultyId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data && response.data.facultyName) {
          setFacultyName(response.data.facultyName);
        }
      } catch (err) {
        console.error('Error fetching faculty:', err);
      }

      try {
        // Fetch department name by departmentId
        let response = await axios.get(
          `http://localhost:8080/faculty-and-department/departments/${departmentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data && response.data.departmentName) {
          setDepartmentName(response.data.departmentName);
        }
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
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    };
    const date = new Date(datetimeStr);
    return date.toLocaleDateString(undefined, options);
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
  // 7) Return the final UI
  // ─────────────────────────────────────────────────────────────
  // If we haven't finished both checks, show a loading state
  if (!eligibilityChecked || !voteChecked) {
    return (
      <section className="election-coverage-hero">
        <div className="overlay"></div>
        <div className="election-content">
          <div>Loading coverage details...</div>
        </div>
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
        {/* Title & Description */}
        <h1 className="election-title" id="election-title">{title}</h1>
        <p className="election-description">{description}</p>

        {/* Election Details */}
        <div className="election-details-grid">
          <div className="detail-card">
            <i className="fas fa-bullhorn detail-icon" aria-hidden="true"></i>
            <span className="detail-label">Type</span>
            <span className="detail-value">{getElectionType(typeId)}</span>
          </div>
          <div className="detail-card">
            <i className="fas fa-calendar-alt detail-icon" aria-hidden="true"></i>
            <span className="detail-label">Start</span>
            <span className="detail-value">{formatDateTime(startDatetime)}</span>
          </div>
          <div className="detail-card">
            <i className="fas fa-calendar-check detail-icon" aria-hidden="true"></i>
            <span className="detail-label">End</span>
            <span className="detail-value">{formatDateTime(endDatetime)}</span>
          </div>
          <div className="detail-card">
            <i className="fas fa-university detail-icon" aria-hidden="true"></i>
            <span className="detail-label">Faculty</span>
            <span className="detail-value">{facultyName || facultyId}</span>
          </div>
          <div className="detail-card">
            <i className="fas fa-building detail-icon" aria-hidden="true"></i>
            <span className="detail-label">Department</span>
            <span className="detail-value">{departmentName || departmentId}</span>
          </div>
        </div>

        {/* Main Voting UI logic: */}
        {isActive ? (
          <>
            {userHasVoted ? (
              // User already voted
              <div className="already-voted-message">
                You have already cast your vote for this election.
              </div>
            ) : userEligible ? (
              // Show the "Vote Now" button
              <button className="vote-button" onClick={handleVoteClick}>
                Vote Now
              </button>
            ) : (
              // Not eligible
              <div className="ineligibility-message">
                You are not eligible to vote in this election.
              </div>
            )}
          </>
        ) : (
          // Election is not active
          <button className="vote-button disabled" disabled>
            Voting Closed
          </button>
        )}
      </div>

      {/* Vote Dialog */}
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
