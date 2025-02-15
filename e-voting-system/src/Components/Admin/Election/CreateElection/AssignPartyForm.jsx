// src/components/admin/AssignPartyForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AssignPartyForm.css";

const AssignPartyForm = ({ electionId }) => {
  const navigate = useNavigate();

  // Maintain an array of party entries, each with candidate information.
  const [partyForms, setPartyForms] = useState([
    {
      name: "",
      bio: "",
      campaignManagerSearch: "",
      campaignManagerResults: [],
      selectedCampaignManagerId: "",
      // Array to hold candidate entries for this party
      candidates: [
        {
          candidateSearch: "",
          candidateResults: [],
          selectedCandidateId: "",
        },
      ],
    },
  ]);

  // Loader state for blockchain export (declared only once)
  const [isExporting, setIsExporting] = useState(false);

  // --- Party-level functions ---
  const handlePartyInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedForms = [...partyForms];
    updatedForms[index][name] = value;
    setPartyForms(updatedForms);
  };

  const handleCampaignManagerSearch = async (index, e) => {
    const term = e.target.value;
    const updatedForms = [...partyForms];
    updatedForms[index].campaignManagerSearch = term;
    setPartyForms(updatedForms);
    if (term.length > 2) {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `http://localhost:8080/users/search?email=${term}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        updatedForms[index].campaignManagerResults = response.data;
        setPartyForms(updatedForms);
      } catch (error) {
        console.error("Error searching campaign manager:", error);
      }
    } else {
      updatedForms[index].campaignManagerResults = [];
      setPartyForms(updatedForms);
    }
  };

  const selectCampaignManager = (index, user) => {
    const updatedForms = [...partyForms];
    updatedForms[index].selectedCampaignManagerId = user.userId;
    updatedForms[index].campaignManagerSearch = user.email;
    updatedForms[index].campaignManagerResults = [];
    setPartyForms(updatedForms);
  };

  // --- Candidate-level functions (per party) ---
  const handleCandidateInputChange = (partyIndex, candidateIndex, e) => {
    const { name, value } = e.target;
    const updatedForms = [...partyForms];
    updatedForms[partyIndex].candidates[candidateIndex][name] = value;
    setPartyForms(updatedForms);
  };

  const handleCandidateSearch = async (partyIndex, candidateIndex, e) => {
    const term = e.target.value;
    const updatedForms = [...partyForms];
    updatedForms[partyIndex].candidates[candidateIndex].candidateSearch = term;
    setPartyForms(updatedForms);
    if (term.length > 2) {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `http://localhost:8080/users/search?email=${term}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        updatedForms[partyIndex].candidates[candidateIndex].candidateResults = response.data;
        setPartyForms(updatedForms);
      } catch (error) {
        console.error("Error searching candidate:", error);
      }
    } else {
      updatedForms[partyIndex].candidates[candidateIndex].candidateResults = [];
      setPartyForms(updatedForms);
    }
  };

  const selectCandidate = (partyIndex, candidateIndex, user) => {
    const updatedForms = [...partyForms];
    updatedForms[partyIndex].candidates[candidateIndex].selectedCandidateId = user.userId;
    updatedForms[partyIndex].candidates[candidateIndex].candidateSearch = user.email;
    updatedForms[partyIndex].candidates[candidateIndex].candidateResults = [];
    setPartyForms(updatedForms);
  };

  const addCandidateField = (partyIndex) => {
    const updatedForms = [...partyForms];
    updatedForms[partyIndex].candidates.push({
      candidateSearch: "",
      candidateResults: [],
      selectedCandidateId: "",
    });
    setPartyForms(updatedForms);
  };

  const removeCandidateField = (partyIndex, candidateIndex) => {
    const updatedForms = [...partyForms];
    updatedForms[partyIndex].candidates = updatedForms[partyIndex].candidates.filter(
      (_, idx) => idx !== candidateIndex
    );
    setPartyForms(updatedForms);
  };

  // --- Party form addition and removal ---
  const addPartyForm = () => {
    setPartyForms([
      ...partyForms,
      {
        name: "",
        bio: "",
        campaignManagerSearch: "",
        campaignManagerResults: [],
        selectedCampaignManagerId: "",
        candidates: [
          {
            candidateSearch: "",
            candidateResults: [],
            selectedCandidateId: "",
          },
        ],
      },
    ]);
  };

  const removePartyForm = (index) => {
    const updatedForms = partyForms.filter((_, idx) => idx !== index);
    setPartyForms(updatedForms);
  };

  // --- Submission: Create parties, assign candidates, then export to blockchain ---
  const handleSubmit = async () => {
    // Validate each party entry
    for (let i = 0; i < partyForms.length; i++) {
      if (!partyForms[i].name || !partyForms[i].selectedCampaignManagerId) {
        alert(`Please enter party name and select a campaign manager for party #${i + 1}.`);
        return;
      }
    }
    try {
      const token = localStorage.getItem("authToken");
      // For each party, create the party and assign candidates.
      for (const party of partyForms) {
        const payload = {
          name: party.name,
          bio: party.bio,
          campaignManagerId: party.selectedCampaignManagerId,
          electionId: electionId,
        };
        const partyResponse = await axios.post(
          "http://localhost:8080/admin/parties/create-with-manager",
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const createdParty = partyResponse.data;
        // Gather candidate IDs for this party.
        const candidateIds = party.candidates
          .filter((candidate) => candidate.selectedCandidateId)
          .map((candidate) => candidate.selectedCandidateId);
        if (candidateIds.length > 0) {
          await axios.post(
            `http://localhost:8080/admin/parties/${createdParty.partyId}/assign-candidates`,
            candidateIds,
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      }
      // After creating all parties and assigning candidates, export to blockchain.
      setIsExporting(true);
      await axios.post(
        `http://localhost:8080/blockchain/elections/${electionId}/publish`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsExporting(false);
      alert("Election and parties published to blockchain successfully.");
      navigate("/AdminDashboard");
    } catch (error) {
      setIsExporting(false);
      console.error("Error creating parties or exporting to blockchain:", error);
      alert("Failed to create parties or export data to blockchain.");
    }
  };

  // If exporting, show loader overlay
  if (isExporting) {
    return (
      <div className="exporting-overlay">
        <div className="exporting-panel">
          <p>Exporting election data to blockchain. Please wait...</p>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="assign-party-form-container">
      <h2 className="assign-party-title">Assign Parties for Election</h2>
      {partyForms.map((party, index) => (
        <div key={index} className="party-form">
          <div className="form-group full-width">
            <label>Party Name</label>
            <input
              type="text"
              name="name"
              value={party.name}
              onChange={(e) => handlePartyInputChange(index, e)}
              placeholder="Enter party name"
            />
          </div>
          <div className="form-group full-width">
            <label>Party Bio</label>
            <textarea
              name="bio"
              value={party.bio}
              onChange={(e) => handlePartyInputChange(index, e)}
              placeholder="Enter party bio"
            />
          </div>
          <div className="form-group full-width">
            <label>Search Campaign Manager by Email</label>
            <input
              type="text"
              name="campaignManagerSearch"
              value={party.campaignManagerSearch}
              onChange={(e) => handleCampaignManagerSearch(index, e)}
              placeholder="Enter email"
            />
            {party.campaignManagerResults.length > 0 && (
              <div className="search-results">
                {party.campaignManagerResults.map((user) => (
                  <div
                    key={user.userId}
                    className="search-result-item"
                    onClick={() => selectCampaignManager(index, user)}
                  >
                    {user.email}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Candidate Assignment Section */}
          <div className="candidate-section">
            <h3 className="candidate-section-title">Candidates</h3>
            {party.candidates.map((candidate, candIndex) => (
              <div key={candIndex} className="candidate-form">
                <div className="form-group full-width">
                  <label>Search Candidate by Email</label>
                  <input
                    type="text"
                    name="candidateSearch"
                    value={candidate.candidateSearch}
                    onChange={(e) => handleCandidateSearch(index, candIndex, e)}
                    placeholder="Enter candidate email"
                  />
                  {candidate.candidateResults.length > 0 && (
                    <div className="search-results">
                      {candidate.candidateResults.map((user) => (
                        <div
                          key={user.userId}
                          className="search-result-item"
                          onClick={() => selectCandidate(index, candIndex, user)}
                        >
                          {user.email}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="remove-candidate-button"
                  onClick={() => removeCandidateField(index, candIndex)}
                >
                  Remove Candidate
                </button>
              </div>
            ))}
            <button
              type="button"
              className="add-candidate-button"
              onClick={() => addCandidateField(index)}
            >
              Add Candidate
            </button>
          </div>
          {partyForms.length > 1 && (
            <button
              type="button"
              className="remove-party-button"
              onClick={() => removePartyForm(index)}
            >
              Remove Party
            </button>
          )}
          <hr />
        </div>
      ))}
      <button type="button" className="add-party-button" onClick={addPartyForm}>
        Add Another Party
      </button>
      <button type="button" className="submit-button" onClick={handleSubmit}>
        Submit and Export to Blockchain →
      </button>
    </div>
  );
};

export default AssignPartyForm;
