import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./AssignCandidateToElection.css";
import AdminHeader from "../AdminHeader/AdminHeader";
import Footer from "../../Footer/Footer";

const electionsData = [
  {
    id: 1,
    name: "Presidential Election",
    parties: ["Party 2024Team", "Party cool", "Party hero"],
  },
  {
    id: 2,
    name: "Local Election",
    parties: ["Party goUP", "Party DChange"],
  },
];

const AssignCandidateToElection = () => {
  const { userId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [elections, setElections] = useState(electionsData);
  const [selectedElection, setSelectedElection] = useState(null);

  const handleSearch = () => {
    if (searchTerm === "") {
      setElections(electionsData);
    } else {
      const filteredElections = electionsData.filter((election) =>
        election.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setElections(filteredElections);
    }
  };

  const handleAssignParty = (party) => {
    alert(`Candidate assigned to ${party}`);
  };

  return (
    <div className="assign-candidate-page">
      <header className="page-header">
        <AdminHeader />
      </header>
      <main className="content-wrapper">
        <h2>Assign Candidate to Election</h2>
        <div className="search-container">
          <label htmlFor="search-election" className="search-label">
            Search Election
          </label>
          <input
            type="text"
            id="search-election"
            className="search-input"
            placeholder="Enter election name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="election-list">
          <h3>Election List</h3>
          <ul>
            {elections.map((election) => (
              <li
                key={election.id}
                className={`election-item ${
                  selectedElection?.id === election.id ? "selected" : ""
                }`}
                onClick={() => setSelectedElection(election)}
              >
                {election.name}
              </li>
            ))}
          </ul>
        </div>
        {selectedElection && (
          <div className="party-list">
            <h3>Parties in {selectedElection.name}</h3>
            <ul>
              {selectedElection.parties.map((party) => (
                <li key={party} className="party-item">
                  <span>{party}</span>
                  <button
                    className="assign-button"
                    onClick={() => handleAssignParty(party)}
                  >
                    Assign to Party
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <footer className="page-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default AssignCandidateToElection;
