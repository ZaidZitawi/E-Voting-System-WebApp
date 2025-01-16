// src/pages/CandidateDashboard/CandidateDashboard.jsx
import React from "react";
import Header from "../../Header/Header";
import SideNavBar from "../../SideNavBar/SideNavBar";
import EngagementAnalytics from "./EngagementAnalytics";
import LiveResults from "./LiveResults";
import "./CandidateDashboard.css";
import Footer from "../../Footer/Footer";
import CreatePostPage from "../Dashboard/CreatePostPage";

const CandidateDashboard = () => {
  return (
    <>
      <Header />
      <SideNavBar userRole="candidate" />
      <div className="dashboard">
        <h2>Candidate Dashboard</h2>
        <p>Track your campaign progress and audience engagement.</p>

        <div className="main-content-area">
          {/* <CreatePostPage />  */}
          <EngagementAnalytics />
          <LiveResults />
        </div>
        <footer>
            <Footer />
        </footer>
      </div>
    </>
  );
};

export default CandidateDashboard;
