import React from "react";
import axios from "axios";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import "./PublishBlockchainPage.css";

const PublishBlockchainPage = () => {
  const electionDetails = {
    name: "Election Name",
    bio: "Election Description",
    parties: [
      { name: "Party 1", bio: "Party 1 Bio", manager: "Manager 1", candidates: 3 },
    ],
  }; // Replace with real data

  const publishToBlockchain = async () => {
    try {
      const response = await axios.post(`/elections/${electionDetails.id}/publish`);
      console.log("Published to Blockchain:", response.data);
    } catch (error) {
      console.error("Error publishing election:", error);
    }
  };

  return (
    <div className="publish-blockchain-page">
      <Header />
      <h2>Publish to Blockchain</h2>
      <div className="summary">
        <p>
          <strong>Election Name:</strong> {electionDetails.name}
        </p>
        <p>
          <strong>Description:</strong> {electionDetails.bio}
        </p>
        <h3>Parties:</h3>
        <ul>
          {electionDetails.parties.map((party, index) => (
            <li key={index}>
              {party.name} - {party.manager} ({party.candidates} Candidates)
            </li>
          ))}
        </ul>
      </div>
      <button onClick={publishToBlockchain}>Publish to Blockchain</button>
      <Footer />
    </div>
  );
};

export default PublishBlockchainPage;
