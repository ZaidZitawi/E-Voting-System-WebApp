// src/components/CandidatesAndStatesSection/CandidatesAndStatesSection.jsx

import React from 'react';
import './CandidatesAndStatesSection.css';
import CandidatesDisplay from './Candidates/CandidatesDisplay';
import ElectionStatesSection from './Ranking Table/ElectionStatesSection';
import PropTypes from 'prop-types';

const CandidatesAndStatesSection = ({ candidates, electionStates, totalVotes }) => {
  return (
    <section className="candidates-states-section">
      <div className="candidates-display-container">
        <h2 className="section-title">Candidates</h2>
        <CandidatesDisplay candidates={candidates} />
      </div>
      <div className="election-states-section-container">
        <ElectionStatesSection totalVotes={totalVotes} candidates={candidates} />
      </div>
    </section>
  );
};

CandidatesAndStatesSection.propTypes = {
  candidates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      profileLink: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
    })
  ).isRequired,
  electionStates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
      percentage: PropTypes.number.isRequired,
    })
  ).isRequired,
  totalVotes: PropTypes.number.isRequired,
};

export default CandidatesAndStatesSection;
