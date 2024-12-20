// src/components/ElectionStatesSection/ElectionStatesSection.jsx

import React, { useMemo } from 'react';
import './ElectionStatesSection.css';
import OverallStatistics from './OverallStatistics';
import CandidateRankingList from './CandidateRankingList';
import PropTypes from 'prop-types';

const ElectionStatesSection = ({ totalVotes, candidates }) => {
  // Calculate vote percentages and sort candidates descending by votes
  const candidatesWithPercentage = useMemo(() => {
    return candidates
      .map(candidate => ({
        ...candidate,
        percentage: ((candidate.votes / totalVotes) * 100).toFixed(2),
      }))
      .sort((a, b) => b.votes - a.votes); // Sort descending by votes
  }, [candidates, totalVotes]);

  return (
    <section className="election-states-section">
      <OverallStatistics totalVotes={totalVotes} candidates={candidatesWithPercentage} />
      <CandidateRankingList candidates={candidatesWithPercentage} />
    </section>
  );
};

ElectionStatesSection.propTypes = {
  totalVotes: PropTypes.number.isRequired,
  candidates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ElectionStatesSection;
