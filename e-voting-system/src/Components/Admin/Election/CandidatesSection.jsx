import React from "react";
import "./CandidatesSection.css";

const CandidatesSection = ({ candidates, setCandidates }) => {
  const handleCandidateChange = (index, field, value) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index][field] = value;
    setCandidates(updatedCandidates);
  };

  const addCandidate = () => {
    setCandidates([
      ...candidates,
      { name: "", bio: "", image: null },
    ]);
  };

  return (
    <div className="candidates-section">
      <h2>Single Candidates</h2>
      {candidates.map((candidate, index) => (
        <div key={index} className="candidate-card">
          <input
            type="text"
            placeholder="Candidate Name"
            value={candidate.name}
            onChange={(e) => handleCandidateChange(index, "name", e.target.value)}
          />
          <textarea
            placeholder="Candidate Bio"
            value={candidate.bio}
            onChange={(e) => handleCandidateChange(index, "bio", e.target.value)}
          />
          <input
            type="file"
            onChange={(e) =>
              handleCandidateChange(index, "image", e.target.files[0])
            }
          />
        </div>
      ))}
      <button className="add-candidate-button" onClick={addCandidate}>
        Add Candidate
      </button>
    </div>
  );
};

export default CandidatesSection;
