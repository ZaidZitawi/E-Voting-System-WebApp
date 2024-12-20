// src/components/CandidateCard/CandidateCard.jsx

import React from 'react';
import './CandidateCard.css';

const CandidateCard = ({ candidate }) => {
  const { imageUrl, name, shortBio, keyStats, profileLink } = candidate;

  return (
    <div className="candidate-card">
      <img src={imageUrl} alt={`${name}`} className="candidate-image" loading="lazy" />
      <div className="candidate-info">
        <h3 className="candidate-name">{name}</h3>
        <p className="candidate-bio">{shortBio}</p>
        <div className="candidate-stats">
          {keyStats && keyStats.map((stat, index) => (
            <div key={index} className="candidate-stat">
              <strong>{stat.label}:</strong> {stat.value}
            </div>
          ))}
        </div>
      </div>
      <a href={profileLink} className="view-profile-button" aria-label={`View profile of ${name}`}>
        View Profile
      </a>
    </div>
  );
};

export default CandidateCard;
