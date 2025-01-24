// src/components/ElectionStatesSection/CandidateRankingList.jsx

import React from 'react';
import './CandidateRankingList.css';
import CandidateRankingCard from './CandidateRankingCard';
import PropTypes from 'prop-types';

const CandidateRankingList = ({ candidates }) => {
  return (
    <div className="candidate-ranking-list">
      <h3>Candidate Rankings</h3>
      {candidates.map((candidate, index) => (
        <CandidateRankingCard
          key={candidate.id}
          rank={index + 1}
          name={candidate.name}
          imageUrl={candidate.imageUrl}
          percentage={candidate.percentage}
        />
      ))}
    </div>
  );
};

CandidateRankingList.propTypes = {
  candidates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      percentage: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CandidateRankingList;
