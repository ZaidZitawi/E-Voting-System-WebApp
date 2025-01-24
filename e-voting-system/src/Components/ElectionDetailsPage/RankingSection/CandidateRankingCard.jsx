// src/components/ElectionStatesSection/CandidateRankingCard.jsx

import React from 'react';
import './CandidateRankingCard.css';
import PropTypes from 'prop-types';

const CandidateRankingCard = ({ rank, name, imageUrl, percentage }) => {
  return (
    <div className="candidate-ranking-card">
      <div className="rank-badge">{rank}</div>
      <img src={imageUrl} alt={`${name}`} className="candidate-ranking-image" loading="lazy" />
      <div className="candidate-ranking-info">
        <h4 className="candidate-ranking-name">{name}</h4>
        <div className="vote-percentage">
          <span>{percentage}%</span>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${percentage}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

CandidateRankingCard.propTypes = {
  rank: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  percentage: PropTypes.string.isRequired,
};

export default CandidateRankingCard;
