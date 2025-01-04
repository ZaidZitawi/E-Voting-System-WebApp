import React from "react";
import "./AdminDashboard.css";
import ElectionSlider from "../../Dashboard/ElectionSlider";
import elections from "../../Dashboard/elections"; // Import the mock data
import candidates from "../../Dashboard/candidate";
import ElectionAnalytics from "../../Dashboard/ElectionAnalytics";
import ElectionStates from "../../Dashboard/ElectionStates";
import Header from "../../Header/Header";
import SideNavBar from "../../SideNavBar/SideNavBar";
import CreatePostPage from "./CreatePostPage";

const Dashboard = () => {
    return (
      <>
        {/* Header */}
        <Header />
  
        {/* Side Navigation Bar */}
        <SideNavBar userRole="admin" />
  
        {/* Main Content Area */}
        <div className="dashboard">
          <h2>Welcome Back Admin</h2>
          <CreatePostPage/>
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