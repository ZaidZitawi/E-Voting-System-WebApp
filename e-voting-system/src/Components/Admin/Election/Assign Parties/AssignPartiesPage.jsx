import React, { useState } from "react";
import "./AssignPartiesPage.css";
import AdminHeader from "../../AdminHeader/AdminHeader";
import Footer from "../../../Footer/Footer";

const mockUsers = [
  {
    id: 1,
    name: "Mohammad",
    image: "/path/to/Mohammad.jpg",
    faculty: "Arts",
    department: "Drow",
  },
  {
    id: 2,
    name: "Maen",
    image: "/path/to/Maen.jpg",
    faculty: "Science",
    department: "Physics",
  },
  {
    id: 3,
    name: "Zaid",
    image: "/path/to/Zaid.jpg",
    faculty: "Engineering",
    department: "Mechanical Engineering",
  },
];

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

  const handleImageUpload = (index, file) => {
    const updatedParties = [...parties];
    updatedParties[index].image = URL.createObjectURL(file);
    setParties(updatedParties);
  };

  const handleAddMemberInput = (index) => {
    const updatedParties = [...parties];
    updatedParties[index].members.push({ id: null, name: "", memberSearch: "" });
    setParties(updatedParties);
  };

  const handleSearchChange = (index, memberIndex, value) => {
    const updatedParties = [...parties];
    updatedParties[index].members[memberIndex].memberSearch = value;

    // Example: Filtering mock users based on the search value
    const filteredUsers = mockUsers.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    updatedParties[index].members[memberIndex].searchResults = filteredUsers;

    setParties(updatedParties);
  };

  const handleAssignManager = (index, user) => {
    const updatedParties = [...parties];
    updatedParties[index].manager = user;
    setParties(updatedParties);
  };

  const handleAddMember = (index, memberIndex, user) => {
    const updatedParties = [...parties];
    updatedParties[index].members[memberIndex] = user;
    setParties(updatedParties);
  };

  const handlePublish = () => {
    console.log("Parties Data Submitted:", parties);
    alert("Election Published Successfully!");
  };

  return (
    <div className="assign-parties-page">
      <header className="page-header">
        <AdminHeader />
      </header>
      <div className="content-wrapper">
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
              <span className="search">
                Search:{" "}
                <input
                  placeholder="Search Manager"
                  onChange={(e) =>
                    handleSearchChange(index, null, e.target.value)
                  }
                />
              </span>
              <div className="search-results">
                {mockUsers.map((user) => (
                  <div key={user.id} className="search-item">
                    <span>{user.name}</span>
                    <button onClick={() => handleAssignManager(index, user)}>
                      Assign as Manager
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {party.manager && (
              <div className="manager-card">
                <img src={party.manager.image} alt="Manager" />
                <p>
                  <strong>{party.manager.name}</strong>
                  <br />
                  Faculty: {party.manager.faculty}
                  <br />
                  Department: {party.manager.department}
                </p>
              </div>
            )}
            <div className="members">
              <h4>Party Members</h4>
              {party.members.map((member, memberIndex) => (
                <div key={memberIndex}>
                  <span className="search">
                    Search:{" "}
                    <input
                      placeholder="Search Member"
                      value={member.memberSearch || ""}
                      onChange={(e) =>
                        handleSearchChange(index, memberIndex, e.target.value)
                      }
                    />
                  </span>
                  <div className="search-results">
                    {(member.searchResults || []).map((user) => (
                      <div key={user.id} className="search-item">
                        <span>{user.name}</span>
                        <button
                          onClick={() =>
                            handleAddMember(index, memberIndex, user)
                          }
                        >
                          Add as Member
                        </button>
                      </div>
                    ))}
                  </div>
                  {member.id && (
                    <div className="member-card">
                      <img src={member.image} alt="Member" />
                      <p>
                        <strong>{member.name}</strong>
                        <br />
                        Faculty: {member.faculty}
                        <br />
                        Department: {member.department}
                      </p>
                    </div>
                  )}
                </div>
              ))}
              <button
                onClick={() => handleAddMemberInput(index)}
                className="add-member-button"
              >
                Add New Member
              </button>
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
      <footer className="page-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default AssignPartiesPage;
