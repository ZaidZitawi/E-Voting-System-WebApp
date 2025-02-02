import React, { useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import EtherAnimation from "../../../assets/Ether.json";
import SuccessAnimation from "../../../assets/pendingAnimation.json";
import "./VoteDialog.css";
import logo from "../../../assets/User.png";

const VoteDialog = ({ isOpen, onClose, electionId, parties }) => {
  const [selectedPartyId, setSelectedPartyId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState(null);
  const [error, setError] = useState("");
  const [voteSuccess, setVoteSuccess] = useState(false);

  const handlePartySelect = (partyId) => setSelectedPartyId(partyId);

  const handleSubmitVote = async () => {
    if (!selectedPartyId) {
      alert("Please select a party first.");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("No auth token found. Please log in.");
      return;
    }

    try {
      setError("");
      setTransactionHash(null);
      setLoading(true);

      const formData = new FormData();
      formData.append("electionId", electionId);
      formData.append("partyId", selectedPartyId);
      formData.append("characterName", "anonymous");

      const response = await axios.post(
        "http://localhost:8080/votes/cast",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const message = response.data;
      const match = message.match(/Transaction Hash:\s*(.*)/);
      if (match && match[1]) {
        setTransactionHash(match[1]);
        setVoteSuccess(true);
      } else {
        setTransactionHash("No hash found in server response");
      }
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="vote-dialog-overlay">
      <div className="vote-dialog-content">
        <button className="vote-dialog-close" onClick={onClose}>×</button>

        {/* Step 1: Select Party */}
        {!loading && !transactionHash && !voteSuccess && (
          <>
            <h2 className="vote-dialog-title">Cast Your Vote</h2>
            <p className="vote-dialog-subtitle">Select your preferred party and submit your vote securely.</p>
            <p className="vote-dialog-instructions">Your vote will be recorded on the blockchain for transparency and security.</p>

            <div className="vote-dialog-list">
              {parties?.length > 0 ? (
                parties.map((party) => (
                  <div
                    key={party.partyId}
                    className={`vote-party-card ${selectedPartyId === party.partyId ? "selected" : ""}`}
                    onClick={() => handlePartySelect(party.partyId)}
                  >
                    <img src={party.imageUrl || logo} alt={party.name} className="party-logo" />
                    <div className="party-details">
                      <span className="party-name">{party.name}</span>
                      <input
                        type="radio"
                        name="selectedParty"
                        value={party.partyId}
                        checked={selectedPartyId === party.partyId}
                        readOnly
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-parties">No parties available for this election.</p>
              )}
            </div>

            <div className="vote-dialog-buttons">
              <button
                className="submit-vote-button"
                onClick={handleSubmitVote}
                disabled={!selectedPartyId}
              >
                Submit Vote
              </button>
              <button
                className="exit-button"
                onClick={onClose}
              >
                Cancel & Exit
              </button>
            </div>
          </>
        )}

        {/* Step 2: Processing Animation */}
        {loading && (
          <div className="vote-dialog-loader">
            <Lottie loop animationData={EtherAnimation} play style={{ width: 150, height: 150 }} />
            <p className="processing-text">Processing your vote on the blockchain...</p>
          </div>
        )}

        {/* Step 3: Success Confirmation */}
        {voteSuccess && (
          <div className="vote-dialog-success">
            <Lottie animationData={SuccessAnimation} play style={{ width: 100, height: 100 }} />
            <h3>Vote Successfully Cast!</h3>
            <p>Your vote has been securely recorded on the blockchain.</p>
            <p>Transaction Hash: <strong>{transactionHash}</strong></p>
            <button className="return-home-button" onClick={onClose}>Return to Election</button>
          </div>
        )}

        {/* Error Message */}
        {error && <div className="vote-dialog-error">Error: {error}</div>}
      </div>
    </div>
  );
};

export default VoteDialog;
