import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import "./AssignCandidatesPage.css";

const AssignCandidatesPage = () => {
  const navigate = useNavigate();
  const [parties, setParties] = useState([
    { id: "1", name: "Party 1" },
    { id: "2", name: "Party 2" },
  ]); // Replace with real data
  const [selectedParty, setSelectedParty] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  const assignCandidates = async () => {
    try {
      await axios.post(`/parties/${selectedParty}/assign-candidates`, {
        candidateIds: selectedCandidates,
      });
      navigate("/publish-blockchain");
    } catch (error) {
      console.error("Error assigning candidates:", error);
    }
  };

  return (
    <div className="assign-candidates-page">
      <Header />
      <h2>Assign Candidates</h2>
      <div className="form-group">
        <label>Select Party</label>
        <select
          onChange={(e) => setSelectedParty(e.target.value)}
          value={selectedParty || ""}
        >
          <option value="" disabled>
            Choose a party
          </option>
          {parties.map((party) => (
            <option value={party.id} key={party.id}>
              {party.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Select Candidates</label>
        <select
          multiple
          onChange={(e) =>
            setSelectedCandidates(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
        >
          {/* Replace with real data */}
          <option value="1">Candidate 1</option>
          <option value="2">Candidate 2</option>
        </select>
      </div>

      <button onClick={assignCandidates}>Assign Candidates</button>
      <Footer />
    </div>
  );
};

export default AssignCandidatesPage;
