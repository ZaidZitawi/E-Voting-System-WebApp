import React from "react";
import Header from "../../Header/Header";
import SideNavBar from "../../SideNavBar/SideNavBar";
import EngagementAnalytics from "./EngagementAnalytics";
import LiveResults from "./LiveResults";
import CreatePostPage from "../Dashboard/CreatePostPage";
import Footer from "../../Footer/Footer";
import "./CandidateDashboard.css";
import MyElections from "./MyElections";

const CandidateDashboard = () => {
  return (
    <>
      <Header />
      <SideNavBar userRole="candidate" />

      <div className="dashboard">
        <h2>Candidate Dashboard</h2>
        <p>Manage your campaigns and monitor engagement.</p>

        <div className="main-content-area">
          <MyElections />  
          {/* <CreatePostPage /> */}
          <EngagementAnalytics />
          <LiveResults />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CandidateDashboard;