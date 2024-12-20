// src/pages/Dashboard/Dashboard.jsx
import React from "react";
import "./Dashboard.css";
import ElectionSlider from "./ElectionSlider";
import elections from "../Dashboard/elections"; // Import the mock data
import candidates from "./candidate";
import ElectionAnalytics from "./ElectionAnalytics";
import ElectionStates from "./ElectionStates";
import Header from "../Header/Header";
import SideNavBar from "../SideNavBar/SideNavBar";

const Dashboard = () => {
    return (
      <>
        {/* Header */}
        <Header />
  
        {/* Side Navigation Bar */}
        <SideNavBar userRole="user" />
  
        {/* Main Content Area */}
        <div className="dashboard">
          <h2>Welcome to Your Dashboard</h2>
          <p>Select an election from the slider to view details.</p>
          
          {/* Main Content Container */}
          <div className="main-content-area">
            {/* Election Slider */}
            <ElectionSlider elections={elections} />
  
            {/* Container for Analytics and States */}
            <div className="analytics-states-container">
              {/* Election Analytics */}
              <ElectionAnalytics />
  
              {/* Election States */}
              <ElectionStates candidates={candidates} />
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Dashboard;