// src/components/ElectionListPage/ElectionCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './ElectionCard.css';

const ElectionCard = ({ election }) => {
  return (
    <div
      className="election-card"
      tabIndex="0"
      aria-labelledby={`election-title-${election.id}`}
    >
      <h3 id={`election-title-${election.id}`}>{election.title}</h3>
      <p><strong>Type:</strong> {election.type}</p>
      <p><strong>Dates:</strong> {election.startDate} - {election.endDate}</p>
      <p><strong>Eligibility:</strong> {election.eligibility}</p>
      <p>{election.description}</p>
      <Link to={`/elections/${election.id}`} className="btn view-details-btn">
        View Details
      </Link>
    </div>
  );
};

export default ElectionCard;
