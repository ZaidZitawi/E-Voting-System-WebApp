// src/components/UserHomePage/UserHomePage.jsx

import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SideNavBar from "../SideNavBar/SideNavBar";
import HeroHome from "./HeroHome";
import FeaturedElections from "./FeaturedElections";
import AnimatedCountersGroup from "./AnimatedCounter.jsx";
import SocialSection from "./SocialSection.jsx";
import BlockchainVerificationWidget from "./BlockchainVerificationWidget.jsx";
import "./UserHomePage.css";

const UserHomePage = ({ userRole }) => {
  const sampleStats = [
    { title: "Registered Users", value: 1200 },
    { title: "Votes Cast", value: 5200 },
    { title: "Elections", value: 86 },
    { title: "Posts", value: 2052 },
  ];

  return (
    <div className="user-home-page">
      <Header />
      <div className="main-content">
        {/* SideNavBar now handles fetching elections itself */}
        <SideNavBar userRole={userRole} />

        {/* Content Area */}
        <div className="content-area">
          <HeroHome />
          <section className="animated-counter-section">
            <h2 className="section-title">Platform Statistics</h2>
            <AnimatedCountersGroup stats={sampleStats} />
          </section>
          <FeaturedElections />
          <SocialSection />
          <BlockchainVerificationWidget />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
