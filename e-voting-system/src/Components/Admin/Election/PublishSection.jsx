import React from "react";
import "./PublishSection.css";

const PublishSection = ({ electionData, candidates, parties, handlePublish }) => {
  return (
    <div className="publish-section">
      <h2>Publish to Blockchain</h2>
      <div className="summary">
        <p>
          <strong>Election Name:</strong> {electionData.name}
        </p>
        <p>
          <strong>Description:</strong> {electionData.bio}
        </p>
        <h3>Parties:</h3>
        <ul>
          {parties.map((party, index) => (
            <li key={index}>
              {party.name} - {party.bio}
            </li>
          ))}
        </ul>
        <h3>Candidates:</h3>
        <ul>
          {candidates.map((candidate, index) => (
            <li key={index}>{candidate.name}</li>
          ))}
        </ul>
      </div>
      <button className="publish-button" onClick={handlePublish}>
        Publish to Blockchain
      </button>
    </div>
  );
};

export default PublishSection;
