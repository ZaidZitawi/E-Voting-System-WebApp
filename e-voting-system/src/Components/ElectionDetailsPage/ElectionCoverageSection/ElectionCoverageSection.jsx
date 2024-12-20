// src/components/ElectionCoverageSection/ElectionCoverageSection.jsx

import React from 'react';
import './ElectionCoverageSection.css';

const ElectionCoverageSection = ({ election }) => {
  const {
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

  // Function to format datetime strings
  const formatDateTime = (datetimeStr) => {
    const options = {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
      timeZoneName: 'short',
    };
    const date = new Date(datetimeStr);
    return date.toLocaleDateString(undefined, options);
  };

  // Function to get election type based on typeId
  const getElectionType = (typeId) => {
    switch(typeId) {
      case 1:
        return 'Presidential Election';
      case 2:
        return 'Parliamentary Election';
      // Add more cases as needed
      default:
        return 'General Election';
    }
  };

  // Handler for Vote Button click
  const handleVoteClick = () => {
    // Implement voting logic here
    alert('Vote process initiated!');
  };

  return (
    <section
      className="election-coverage-hero"
      style={{ backgroundImage: `url(${imageUrl})` }}
      aria-labelledby="election-title"
    >
      <div className="overlay"></div>
      <div className="election-content">
        {/* Election Title */}
        <h1 className="election-title" id="election-title">{title}</h1>

        {/* Election Description */}
        <p className="election-description">{description}</p>

        {/* Election Details Grid */}
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
            <span className="detail-label">Faculty ID</span>
            <span className="detail-value">{facultyId}</span>
          </div>
          <div className="detail-card">
            <i className="fas fa-building detail-icon" aria-hidden="true"></i>
            <span className="detail-label">Department ID</span>
            <span className="detail-value">{departmentId}</span>
          </div>
        </div>

        {/* Vote Button */}
        {isActive ? (
          <button className="vote-button" onClick={handleVoteClick} aria-label="Vote Now">
            Vote Now
          </button>
        ) : (
          <button className="vote-button disabled" disabled aria-label="Voting Closed">
            Voting Closed
          </button>
        )}
      </div>
    </section>
  );
};

export default ElectionCoverageSection;
