// src/components/ElectionStatesSection/PartiesRankingTable.jsx
import React from "react";
import "./PartiesRankingTable.css";
import PartyRankingCard from "./PartyRankingCard";
import PropTypes from "prop-types";

const PartiesRankingTable = ({ parties }) => {
  return (
    <div className="parties-ranking-table">
      <h3>Party Rankings</h3>
      {parties.map((party, index) => (
        <PartyRankingCard
          key={party.id || index}  // fallback to index if id is missing
          rank={index + 1}
          name={party.name}
          imageUrl={party.imageUrl || "https://via.placeholder.com/150"}
          percentage={party.percentage}
        />
      ))}
    </div>
  );
};

PartiesRankingTable.propTypes = {
  parties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string, // fallback in render
      percentage: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PartiesRankingTable;
