// src/components/ElectionStatesSection/ElectionParties.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PartyCard from "../../../Cards/PartyCard";
import "./ElectionParties.css";

function ElectionParties({ parties }) {
  // The ID of the currently selected party
  const [selectedPartyId, setSelectedPartyId] = useState(null);
  // The list of candidate objects for the selected party
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();

  // Auto-select the first party once parties are loaded
  useEffect(() => {
    if (parties && parties.length > 0) {
      setSelectedPartyId(String(parties[0].partyId));
    }
  }, [parties]);

  // Fetch candidate data whenever the selected party changes
  useEffect(() => {
    if (!selectedPartyId) return;

    const fetchCandidatesForParty = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No auth token provided.");

        const res = await axios.get(
          `http://localhost:8080/candidates/party/${selectedPartyId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Fetched candidates:", res.data);
        setCandidates(res.data || []);
      } catch (err) {
        console.error("Error fetching candidates:", err);
        setCandidates([]);
      }
    };

    fetchCandidatesForParty();
  }, [selectedPartyId]);

  if (!parties || parties.length === 0) {
    return (
      <div className="eps-empty-state">
        <h3>No Parties Registered</h3>
        <p>Please check back closer to election day.</p>
      </div>
    );
  }

  // Limit to 6 parties for layout simplicity
  const displayParties = parties.slice(0, 6);

  // Find the currently selected party
  const selectedParty = displayParties.find(
    (p) => String(p.partyId) === String(selectedPartyId)
  );

  // Handler for selecting a party
  const handleSelectParty = (partyId) => {
    setSelectedPartyId(String(partyId));
  };

  // Utility function to resolve image URLs from the local server
  const resolveImageUrl = (imageName) => {
    if (!imageName) return null;
    return `http://localhost:8080/uploads/${imageName}`;
  };

  return (
    <div className="eps-container">
      <h2 className="eps-title">Parties & Candidates</h2>

      {/* New horizontal container wrapping the left and center panels */}
      <div className="eps-center-container">
        {/* LEFT SIDE: Party Navigator */}
        <div className="eps-center-left">
          <h3 className="eps-panel-heading">Party Navigator</h3>
          <div className="eps-parties-list">
            {displayParties.map((party) => {
              const isSelected =
                String(party.partyId) === String(selectedPartyId);
              const partyLogo = resolveImageUrl(party.imageUrl);
              return (
                <button
                  key={party.partyId}
                  className={`eps-party-button ${isSelected ? "eps-party-selected" : ""}`}
                  onClick={() => handleSelectParty(party.partyId)}
                >
                  {partyLogo && (
                    <img
                      src={partyLogo}
                      alt={party.name || "Party Logo"}
                      className="eps-party-logo"
                    />
                  )}
                  <span className="eps-party-name">
                    {party.name || "Unnamed Party"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE: Party Hub */}
        <div className="eps-center-panel">
          {selectedParty ? (
            <div className="eps-party-hub">
              {/* Display the selected party details using PartyCard */}
              <PartyCard
                party={{
                  ...selectedParty,
                  // Convert imageUrl to our local server URL
                  logoUrl: resolveImageUrl(selectedParty.imageUrl),
                }}
                onSelect={() => {}}
              />

              {/* Candidates Section */}
              <div className="eps-candidate-grid">
                {candidates && candidates.length > 0 ? (
                  candidates.map((cand) => {
                    const photoUrl = resolveImageUrl(cand.profilePicture);
                    return (
                      <div
                        key={cand.candidateId}
                        className="eps-candidate-card"
                      >
                        {photoUrl && (
                          <img
                            src={photoUrl}
                            alt={cand.candidateName}
                            className="eps-candidate-photo"
                          />
                        )}
                        <h4 className="eps-candidate-name">
                          {cand.candidateName || "Unnamed Candidate"}
                        </h4>
                        <button
                          className="eps-candidate-view-button"
                          onClick={() => navigate(`/profile/${cand.userId}`)}
                        >
                          View Profile
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <p className="eps-no-candidates-text">
                    No candidates listed for this party.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="eps-no-party-selected">
              <h4>Please select a party on the left.</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

ElectionParties.propTypes = {
  parties: PropTypes.arrayOf(
    PropTypes.shape({
      partyId: PropTypes.number.isRequired,
      name: PropTypes.string,
      bio: PropTypes.string,
      imageUrl: PropTypes.string,
      campaignManagerId: PropTypes.number,
      electionId: PropTypes.number,
      // Additional fields if needed...
    })
  ),
};

export default ElectionParties;
