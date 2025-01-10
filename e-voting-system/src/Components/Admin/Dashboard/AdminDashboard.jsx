import React from "react";
import "./AdminDashboard.css";
import ElectionSlider from "../../Dashboard/ElectionSlider";
import elections from "../../Dashboard/elections"; // Import the mock data
import candidates from "../../Dashboard/candidate";
import SystemAnalytics from "./SystemAnalytics";
import ElectionStates from "../../Dashboard/ElectionStates";
import AdminHeader from "../AdminHeader/AdminHeader";
import SideNavBar from "../../SideNavBar/SideNavBar";
import CreatePostPage from "./CreatePostPage";
import heroImage from '../../../assets/biroil.png'; 

const Dashboard = () => {
    return (
      <>
        {/* Header */}
        <AdminHeader />
  
        {/* Side Navigation Bar */}
        <SideNavBar userRole="admin" />
  
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
              <ElectionStates candidates={candidates} />
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Dashboard;