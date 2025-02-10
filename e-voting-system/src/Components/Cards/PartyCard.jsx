// PartyCard.js

import React, { useState } from "react";
import "./PartyCard.css";
import user from "../../assets/user.png";

const PartyCard = ({ party, onSelect }) => {
  const [expanded, setExpanded] = useState(false);

  // Handle bio safely in case it's missing or too short
  const bio = party.bio || "No biography available.";

  return (
    <div className="party-card">
      <div className="party-card-header">
        <img
          src={party.logoUrl || user}
          alt={`${party.name} Logo`}
          className="party-card-logo"
        />
      </div>

      <div className="party-card-body">
        <h3 className="party-card-title">{party.name || "Unnamed Party"}</h3>
        <p className="party-card-description">
          {expanded || bio.length <= 100 ? bio : `${bio.substring(0, 100)}...`}
          {bio.length > 100 && (
            <button
              className="party-card-readmore"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-label={expanded ? "Collapse biography" : "Expand biography"}
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          )}
        </p>
      </div>

      <div className="party-card-footer">
        <button
          className="party-card-select-button"
          onClick={() => onSelect(party.partyId)}
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default PartyCard;
