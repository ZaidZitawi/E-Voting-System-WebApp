import React, { useState } from "react";
import "./Dashboard.css";
import ElectionSlider from "./ElectionSlider";
import ElectionAnalytics from "./ElectionAnalytics";
import Header from "../Header/Header";
import SideNavBar from "../SideNavBar/SideNavBar";
import BlockchainOverview from "../BlockchainExplorer/ElectionBlockchainOverview";

const Dashboard = () => {
  const [selectedElectionId, setSelectedElectionId] = useState(null);

  return (
    <>
      <Header />
      <SideNavBar userRole="user" />
      <div className="dashboard">
        <h2>Welcome to Your Dashboard</h2>
        <p>Select an election from the slider below.</p>

        <div className="main-content-area">
          <ElectionSlider onSelectElection={setSelectedElectionId} />

          {selectedElectionId && (
            <>
              <BlockchainOverview electionId={selectedElectionId} />

              <div className="analytics-states-container">
                <ElectionAnalytics electionId={selectedElectionId} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
