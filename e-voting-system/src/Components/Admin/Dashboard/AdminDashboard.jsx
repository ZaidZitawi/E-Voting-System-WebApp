import React from "react";
import "./AdminDashboard.css";
import ElectionSlider from "../../Dashboard/ElectionSlider";
import elections from "../../Dashboard/elections"; // Import the mock data
import candidates from "../../Dashboard/candidate";
import SystemAnalytics from "./SystemAnalytics";
// import ElectionStates from "../../Dashboard/ElectionStates";
import AdminHeader from "../AdminHeader/AdminHeader";
import heroImage from '../../../assets/biroil.png'; 
import Footer from "../../Footer/Footer";
import AdminSideNavBar from "../AdminSideNavBar/AdminSideNavBar";
import LiveElectionStates from "./LiveElectionStates";

const localElections = [
  {
    name: "Presidential Election",
    candidates: [
      { name: "Candidate A", votes: 500 },
      { name: "Candidate B", votes: 300 },
    ],
  },
  {
    name: "Local Council Election",
    candidates: [
      { name: "Candidate X", votes: 200 },
      { name: "Candidate Y", votes: 100 },
    ],
  },
];

const Dashboard = () => {
    return (
      <>
        {/* Header */}
        <AdminHeader />
  
        {/* Side Navigation Bar */}
        <AdminSideNavBar />
        
        {/* Main Content Area */}
        <div className="dashboard">
          {/* <h2>Welcome Back Admin</h2> */}
          
          {/* System Analytics */}
          <SystemAnalytics />
          
          {/* <p>Do you want to create new post?</p>
          <CreatePostPage/> */}
          
          
          {/* Main Content Container */}
          <div className="main-content-area">
            
            {/* Election Slider */}
            {/* <ElectionSlider elections={elections} /> */}

            
  
            {/* Container for Analytics and States */}
            <div className="analytics-states-container">
             
  
              {/* Election States */}
              <LiveElectionStates elections={localElections}/>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  };
  
  export default Dashboard;