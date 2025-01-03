import React, { useState } from "react";
import "./AssignPartiesPage.css";

const AssignPartiesPage = () => {
  const [parties, setParties] = useState([]);

  const addParty = () => {
    setParties([
      ...parties,
      { name: "", bio: "", image: null, manager: {}, members: [] },
    ]);
  };

  const handlePartyChange = (index, field, value) => {
    const updatedParties = [...parties];
    updatedParties[index][field] = value;
    setParties(updatedParties);
  };

  const handleImageUpload = (index, file) => {
    const updatedParties = [...parties];
    updatedParties[index].image = URL.createObjectURL(file);
    setParties(updatedParties);
  };

  const handleAddMember = (index, member) => {
    const updatedParties = [...parties];
    updatedParties[index].members.push(member);
    setParties(updatedParties);
  };

  const handleSearchChange = (index, field, value) => {
    const updatedParties = [...parties];
    updatedParties[index][field] = value;
    setParties(updatedParties);
    // Add functionality to search from the database
  };

  const handleAssignManager = (index, manager) => {
    const updatedParties = [...parties];
    updatedParties[index].manager = manager;
    setParties(updatedParties);
  };

  const handleToggleRole = (user) => {
    // Add functionality to change user role to candidate
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
            onChange={(e) => handleImageUpload(index, e.target.files[0])}
          />
          {party.image && (
            <div className="form-group">
              <img src={party.image} alt="Party" className="party-image" />
            </div>
          )}
          <div>
            <h4>Search for Party Manager</h4>
            <input
              type="text"
              placeholder="Search Manager"
              value={party.manager.name || ""}
              onChange={(e) => handleSearchChange(index, "manager", e.target.value)}
            />
            <div className="search-results">
              {/* Add search results from the database */}
              <div className="search-item">
                <span>Manager Name</span>
                <button onClick={() => handleAssignManager(index, { name: "Manager Name" })}>
                  Assign as Manager
                </button>
                <button onClick={() => handleToggleRole({ name: "Manager Name" })}>
                  Assign as Candidate
                </button>
              </div>
            </div>
          </div>
          <div className="members">
            <h4>Party Members</h4>
            {party.members.map((member, memberIndex) => (
              <div key={memberIndex} className="member-card">
                <span>{member.name}</span>
              </div>
            ))}
            <input
              type="text"
              placeholder="Search Member"
              value={party.memberSearch || ""}
              onChange={(e) => handleSearchChange(index, "memberSearch", e.target.value)}
            />
            <div className="search-results">
              {/* Add search results from the database */}
              <div className="search-item">
                <span>Member Name</span>
                <button onClick={() => handleAddMember(index, { name: "Member Name" })}>
                  Add as Member
                </button>
                <button onClick={() => handleToggleRole({ name: "Member Name" })}>
                  Assign as Candidate
                </button>
              </div>
            </div>
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