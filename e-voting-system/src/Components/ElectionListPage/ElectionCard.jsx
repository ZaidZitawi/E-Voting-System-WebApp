// src/components/ElectionListPage/ElectionCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './ElectionCard.css';

const ElectionCard = ({ election }) => {
  // Helper function to format dates
  const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Map typeId to type name
  const getTypeName = (typeId) => {
    const types = {
      1: 'University Election',
      2: 'Faculty Election',
      3: 'Department Election',
    };
    return types[typeId] || 'Unknown Type';
  };

  // Determine card border color based on isActive
  const cardBorderColor = election.isActive ? '#347928' : '#ccc';

  return (
    <div
      className="election-card"
      tabIndex="0"
      aria-labelledby={`election-title-${election.electionId}`}
      style={{ borderColor: cardBorderColor }}
    >
      {election.imageUrl && (
        <img 
          src={`http://localhost:8080/uploads/${election.imageUrl}`} 
          alt={`${election.title} Image`} 
          loading="lazy" 
          className="election-image"
        />
      )}
      <div className="election-card-content">
        <h3 id={`election-title-${election.electionId}`} className="election-title">
          {election.title}
        </h3>
        <p className="election-type">
          <strong>Type:</strong> {getTypeName(election.typeId)}
        </p>
        <p className="election-dates">
          <strong>Start:</strong> {formatDate(election.startDatetime)}<br/>
          <strong>End:</strong> {formatDate(election.endDatetime)}
        </p>
        <p className="election-description">
          {election.description.length > 150 
            ? `${election.description.substring(0, 147)}...` 
            : election.description}
        </p>
        <div className="election-footer">
          <Link to={`/elections/${election.electionId}`} className="btn view-details-btn">
            View Details
          </Link>
          <span className={`status-indicator ${election.isActive ? 'active' : 'inactive'}`}>
            {election.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ElectionCard;
