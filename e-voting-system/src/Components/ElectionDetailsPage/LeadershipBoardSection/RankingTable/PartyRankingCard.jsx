// src/components/ElectionStatesSection/PartyRankingCard.jsx
import React from "react";
import "./PartyRankingCard.css";
import PropTypes from "prop-types";

const PartyRankingCard = ({ rank, name, imageUrl, percentage }) => {
  return (
    <div className="party-ranking-card">
      <div className="rank-badge">{rank}</div>
      <img
        src={imageUrl || "https://via.placeholder.com/150"}
        alt={name}
        className="party-ranking-image"
        loading="lazy"
      />
      <div className="party-ranking-info">
        <h4 className="party-ranking-name">{name}</h4>
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

PartyRankingCard.propTypes = {
  rank: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string, // fallback applied in render
  percentage: PropTypes.string.isRequired,
};

export default PartyRankingCard;
