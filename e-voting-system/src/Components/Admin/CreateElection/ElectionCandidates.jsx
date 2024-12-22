import React from "react";
import "./ElectionCandidates.css";

const ElectionCandidates = ({ formData, setFormData, prevStep, handleSubmit }) => {
  const handleCandidateChange = (index, field, value) => {
    const updatedCandidates = [...formData.candidates];
    updatedCandidates[index][field] = value;
    setFormData({ ...formData, candidates: updatedCandidates });
  };

  const addCandidate = () => {
    setFormData((prevState) => ({
      ...prevState,
      candidates: [
        ...prevState.candidates,
        { name: "", bio: "", image: null },
      ],
    }));
  };

  return (
    <div className="step">
      <h2>Candidates</h2>
      {formData.candidates.map((candidate, index) => (
        <div key={index} className="candidate-card">
          <input
            type="text"
            placeholder="Candidate Name"
            value={candidate.name}
            onChange={(e) => handleCandidateChange(index, "name", e.target.value)}
          />
          <input
            type="text"
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
      <button onClick={addCandidate}>Add Candidate</button>
      <button onClick={prevStep}>Back</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ElectionCandidates;
