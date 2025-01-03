import React, { useState } from "react";
import "./AssignPartiesPage.css";

const AssignPartiesPage = () => {
  const [parties, setParties] = useState([]);

  const addParty = () => {
    setParties([
      ...parties,
      { name: "", bio: "", image: null, manager: null, members: [] },
    ]);
  };

  const handlePartyChange = (index, field, value) => {
    const updatedParties = [...parties];
    updatedParties[index][field] = value;
    setParties(updatedParties);
  };

  const handleAddMember = (index) => {
    const updatedParties = [...parties];
    updatedParties[index].members.push({ name: "", image: null });
    setParties(updatedParties);
  };

  const handlePublish = () => {
    console.log("Parties Data Submitted:", parties);
    alert("Election Published Successfully!");
  };

  return (
    <div className="assign-parties-page">
      <h2>Assign Parties</h2>
      {parties.map((party, index) => (
        <div key={index} className="party-form">
          <input
            type="text"
            placeholder="Party Name"
            value={party.name}
            onChange={(e) => handlePartyChange(index, "name", e.target.value)}
          />
          <textarea
            placeholder="Party Bio"
            value={party.bio}
            onChange={(e) => handlePartyChange(index, "bio", e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => handlePartyChange(index, "image", e.target.files[0])}
          />
          <div className="members">
            {party.members.map((member, memberIndex) => (
              <div key={memberIndex} className="member-card">
                <span>Member {memberIndex + 1}</span>
              </div>
            ))}
            <button onClick={() => handleAddMember(index)}>Add Member</button>
          </div>
        </div>
      ))}
      <button onClick={addParty} className="add-party-button">
        Add Party
      </button>
      <button onClick={handlePublish} className="publish-button">
        Publish Election
      </button>
    </div>
  );
};

export default AssignPartiesPage;
