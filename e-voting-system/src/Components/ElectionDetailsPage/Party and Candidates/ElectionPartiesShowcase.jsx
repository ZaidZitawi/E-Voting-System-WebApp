import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './ElectionPartiesShowcase.css';

function ElectionPartiesShowcase({ parties }) {
  // The ID of the currently selected party
  const [selectedPartyId, setSelectedPartyId] = useState(null);

  // The list of candidate objects (CandidateSummaryDTO) for the selected party
  const [candidates, setCandidates] = useState([]);

  // The candidate overlay
  const [focusedCandidate, setFocusedCandidate] = useState(null);

  // Once parties are loaded, auto-select the first party by default
  useEffect(() => {
    if (parties && parties.length > 0) {
      setSelectedPartyId(String(parties[0].partyId));
    }
  }, [parties]);

  // When selectedPartyId changes, fetch the candidate data from the backend
  useEffect(() => {
    if (!selectedPartyId) return;

    const fetchCandidatesForParty = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('No authentication token found.');

        // GET /party/{partyId}
        const res = await axios.get(`http://localhost:8080/candidates/party/${selectedPartyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // This returns List<CandidateSummaryDTO> = { candidateId, candidateName, profilePicture, party }
        setCandidates(res.data || []);
      } catch (err) {
        console.error('Error fetching candidates:', err);
        setCandidates([]); // fallback to empty if error
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

  // We'll cap at 6 parties for layout simplicity
  const displayParties = parties.slice(0, 6);

  // If there's a selectedPartyId, find that actual party object
  // from the array (so we can show party name + optional bio, etc.)
  const selectedParty = displayParties.find(
    (p) => String(p.partyId) === String(selectedPartyId)
  );

  // Click on a party in the left panel
  const handleSelectParty = (partyId) => {
    setSelectedPartyId(String(partyId));
    setFocusedCandidate(null);
  };

  // Click on a candidate in the center
  const handleCandidateFocus = (cand) => {
    setFocusedCandidate(cand);
  };

  // Close the overlay
  const handleCloseFocus = () => {
    setFocusedCandidate(null);
  };

  return (
    <div className="eps-container">
      <h2 className="eps-title">Parties & Candidates</h2>

      {/* LEFT PANEL: Party Navigator */}
      <div className="eps-left-panel">
        <h3 className="eps-panel-heading">Party Navigator</h3>
        <div className="eps-parties-list">
          {displayParties.map((party) => {
            const isSelected = String(party.partyId) === String(selectedPartyId);
            return (
              <button
                key={party.partyId}
                className={`eps-party-button ${isSelected ? 'eps-party-selected' : ''}`}
                onClick={() => handleSelectParty(party.partyId)}
              >
                {/* If party has an imageUrl, it’s the party “logo” */}
                {party.imageUrl && (
                  <img
                    src={party.imageUrl}
                    alt={party.name || 'Party logo'}
                    className="eps-party-logo"
                  />
                )}
                <span className="eps-party-name">
                  {party.name || 'Unnamed Party'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CENTER PANEL: Party Hub */}
      <div className="eps-center-panel">
        {selectedParty ? (
          <div className="eps-party-hub">
            {/* Simple header with party name + optional bio */}
            <div className="eps-party-header">
              <h3 className="eps-party-title">{selectedParty.name}</h3>
              {selectedParty.bio && (
                <p className="eps-party-bio">{selectedParty.bio}</p>
              )}
            </div>

            {/* Candidate Grid (fetched from /party/{partyId}) */}
            <div className="eps-candidate-grid">
              {candidates && candidates.length > 0 ? (
                candidates.map((cand) => (
                  <div
                    key={cand.candidateId}
                    className="eps-candidate-card"
                    onClick={() => handleCandidateFocus(cand)}
                  >
                    {/* candidateName & profilePicture from CandidateSummaryDTO */}
                    {cand.profilePicture && (
                      <img
                        src={cand.profilePicture}
                        alt={cand.candidateName}
                        className="eps-candidate-photo"
                      />
                    )}
                    <h4 className="eps-candidate-name">
                      {cand.candidateName || 'Unnamed Candidate'}
                    </h4>
                    {/* the 'party' field is optional, but we can display or ignore */}
                  </div>
                ))
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

      {/* RIGHT OVERLAY: Candidate Focus */}
      {focusedCandidate && (
        <div className="eps-right-overlay">
          <div className="eps-overlay-content">
            <button className="eps-overlay-close" onClick={handleCloseFocus}>
              &times;
            </button>

            <h3 className="eps-focus-title">
              {focusedCandidate.candidateName}
            </h3>
            {focusedCandidate.profilePicture && (
              <img
                src={focusedCandidate.profilePicture}
                alt={focusedCandidate.candidateName}
                className="eps-focus-photo"
              />
            )}
            {/* We only have candidateName, profilePicture, party from CandidateSummaryDTO. 
                There's no 'bio' or socialLinks from that DTO, so we omit them. */}
            <p className="eps-focus-bio">
              This candidate’s detailed info is not provided in CandidateSummaryDTO.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

ElectionPartiesShowcase.propTypes = {
  parties: PropTypes.arrayOf(
    PropTypes.shape({
      partyId: PropTypes.number.isRequired,
      name: PropTypes.string,
      bio: PropTypes.string,
      imageUrl: PropTypes.string,
      campaignManagerId: PropTypes.number,
      electionId: PropTypes.number,
    })
  ),
};

export default ElectionPartiesShowcase;
