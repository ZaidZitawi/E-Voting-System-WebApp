// src/pages/Dashboard/Dashboard.jsx
import React, { useState } from "react";
import "./Dashboard.css";
import ElectionSlider from "./ElectionSlider";
import candidates from "./candidate";
import ElectionAnalytics from "./ElectionAnalytics";
import ElectionStates from "./ElectionStates";
import Header from "../Header/Header";
import SideNavBar from "../SideNavBar/SideNavBar";
import BlockchainOverview from "../BlockchainExplorer/ElectionBlockchainOverview";

const Dashboard = () => {
  const [selectedElectionId, setSelectedElectionId] = useState(null);

  const handleElectionSelect = (electionId) => {
    setSelectedElectionId(electionId);
  };

  return (
    <>
      <Header />
      <SideNavBar userRole="user" />
      <div className="dashboard">
        <h2>Welcome to Your Dashboard</h2>
        <p>Select an election from the slider to view details.</p>

        <div className="main-content-area">
          {/* Election Slider fetches data from /elections/featured */}
          <ElectionSlider onSelectElection={handleElectionSelect} />

          {/* Only render if an election is selected */}
          {selectedElectionId && (
            <>
              <BlockchainOverview electionId={selectedElectionId} />

              <div className="analytics-states-container">
                <ElectionAnalytics electionId={selectedElectionId} />
                <ElectionStates candidates={candidates} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
