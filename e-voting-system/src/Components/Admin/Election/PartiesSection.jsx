import React from "react";
import "./PartiesSection.css";

const PartiesSection = ({ parties, handleAddParty }) => {
  return (
    <div className="parties-section">
      <h2>Manage Parties</h2>
      <button
        className="add-party-button"
        onClick={() => handleAddParty({ name: "Party A", bio: "Bio" })}
      >
        Add Party
      </button>
      <ul>
        {parties.map((party, index) => (
          <li key={index}>
            {party.name} - {party.bio}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PartiesSection;
