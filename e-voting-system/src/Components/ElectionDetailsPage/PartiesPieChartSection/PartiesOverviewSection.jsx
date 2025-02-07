// src/Components/ElectionDetailsPage/PartiesOverviewSection.jsx
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import ElectionParties from './Parties&Piechart/ElectionParties.jsx';
import PieChartComponent from './Parties&Piechart/PieChartComponent.jsx';
import './PartiesOverviewSection.css';

/*
  Now we expect totalVotes and partiesWithVotes from the parent,
  instead of doing our own provider calls.
*/
const PartiesOverviewSection = ({
  electionId,
  parties,
  totalVotes,        // from parent
  partiesWithVotes,  // from parent
  onPartySelect,
  selectedPartyId,
  onCandidateFocus,
  focusedCandidate,
  onCloseFocus
}) => {

  // If you still want to compute a "percentage" property, you can do so:
  const partiesWithPercentage = useMemo(() => {
    return partiesWithVotes.map((p) => ({
      ...p,
      percentage:
        totalVotes > 0 ? ((p.votes / totalVotes) * 100).toFixed(2) : '0'
    }));
  }, [partiesWithVotes, totalVotes]);

  return (
    <div className="parties-overview">
      <h1 className="parties-overview-title">🚩 Parties Overview 🚩</h1>

      <div className="overview-top">
        <div className="overview-parties">
          {/* 
            This component presumably displays the list of parties from 'parties' 
            (the original array from your backend) 
          */}
          <ElectionParties
            parties={parties}
            onPartySelect={onPartySelect}
            selectedPartyId={selectedPartyId}
            onCandidateFocus={onCandidateFocus}
            focusedCandidate={focusedCandidate}
            onCloseFocus={onCloseFocus}
          />
        </div>

        <div className="overview-piechart">
          {/* Show the total votes and the parties with percentage in your PieChart */}
          <PieChartComponent 
            totalVotes={totalVotes} 
            candidates={partiesWithPercentage} 
          />
        </div>
      </div>
    </div>
  );
};

PartiesOverviewSection.propTypes = {
  electionId: PropTypes.number.isRequired,
  parties: PropTypes.array.isRequired,    // backend data
  totalVotes: PropTypes.number,           // chain total
  partiesWithVotes: PropTypes.array,      // chain data
  onPartySelect: PropTypes.func,
  selectedPartyId: PropTypes.string,
  onCandidateFocus: PropTypes.func,
  focusedCandidate: PropTypes.object,
  onCloseFocus: PropTypes.func
};

export default PartiesOverviewSection;
