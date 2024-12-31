import React from "react";
import { useNavigate } from "react-router-dom";
import "./ElectionDetailsForm.css";

const ElectionDetailsForm = ({ electionData, setElectionData }) => {
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setElectionData({ ...electionData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setElectionData({ ...electionData, image: e.target.files[0] });
  };

  return (
    <div className="election-details-form">
      <h2>Election Details</h2>
      <div className="form-group">
        <label>Election Name</label>
        <input
          type="text"
          name="name"
          value={electionData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Start Time</label>
        <input
          type="datetime-local"
          name="startTime"
          value={electionData.startTime}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>End Time</label>
        <input
          type="datetime-local"
          name="endTime"
          value={electionData.endTime}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Election Bio</label>
        <textarea
          name="bio"
          value={electionData.bio}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Election Image</label>
        <input type="file" onChange={handleImageUpload} />
      </div>
      <button onClick={() => navigate("/create-election/candidates")}>
        Next: Candidates
      </button>
    </div>
  );
};

export default ElectionDetailsForm;
