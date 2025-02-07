// src/Components/ElectionDetailsPage/LeaderShipBoard/LeaderShipBoard.jsx
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import PartiesRankingTable from "./RankingTable/PartiesRankingTable.jsx";
import "./LeaderShipBoard.css";

/*
  We no longer do any Infura calls here. We rely on the parent's
  'partiesWithVotes' and 'totalVotes' data, so:
*/
const PartyLeaderHighlight = ({ topParty }) => {
  if (!topParty) {
    return (
      <div className="leader-highlight no-leader">
        <h4>No Leading Party Yet</h4>
      </div>
    );
  }

  const handleViewProfile = () => {
    alert(`View profile clicked for ${topParty.name}`);
  };

  return (
    <div className="leader-highlight">
      <img
        src={topParty.imageUrl || "https://via.placeholder.com/150"}
        alt={topParty.name}
        className="leader-logo"
      />
      <h2 className="leader-name">{topParty.name}</h2>
      <p className="leader-votes">
        Votes: {topParty.votes?.toLocaleString() || 0}
      </p>
      <p className="leader-description">
        {topParty.description || "A brief party vision or slogan goes here..."}
      </p>
      <button className="view-profile-btn" onClick={handleViewProfile}>
        View Profile
      </button>
    </div>
  );
};

PartyLeaderHighlight.propTypes = {
  topParty: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    votes: PropTypes.number.isRequired,
    description: PropTypes.string,
  }),
};

const LeaderShipBoard = ({ 
  electionId,
  fallbackParties,
  totalVotes,
  partiesWithVotes
}) => {

  // Compute a "percentage" if needed
  const partiesWithPercentage = useMemo(() => {
    return (partiesWithVotes || []).map(p => ({
      ...p,
      percentage: totalVotes > 0 ? ((p.votes / totalVotes) * 100).toFixed(2) : '0'
    }));
  }, [partiesWithVotes, totalVotes]);

  // The top party is the first item if sorted
  const topParty = partiesWithPercentage.length > 0
    ? partiesWithPercentage[0]
    : null;

  return (
    <div className="leadership-board">
      <div className="left-leader-section">
        <PartyLeaderHighlight topParty={topParty} />
      </div>
      <div className="right-ranking-section">
        <PartiesRankingTable parties={partiesWithPercentage} />
      </div>
    </div>
  );
};

LeaderShipBoard.propTypes = {
  electionId: PropTypes.number.isRequired,
  fallbackParties: PropTypes.array,
  totalVotes: PropTypes.number,
  partiesWithVotes: PropTypes.array
};

export default LeaderShipBoard;
