// src/components/UserHomePage/UserHomePage.jsx

import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SideNavBar from '../SideNavBar/SideNavBar';
import HeroHome from './HeroHome';
import FeaturedElections from './FeaturedElections';
import CandidateDashboard from './CandidateDashboard'; 
import './UserHomePage.css';

const UserHomePage = ({ userRole }) => {
  // userRole can be 'user' or 'candidate'
  return (
    <div className="user-home-page">
      <Header />
      <div className="main-content">
        {/* Side Navigation Bar */}
        <SideNavBar userRole={userRole} />
        {/* Main Content Area */}
        <div className="content-area">
          <HeroHome />
          <FeaturedElections />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
