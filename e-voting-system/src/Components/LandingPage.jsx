// src/pages/LandingPage/LandingPage.jsx

import React from 'react';
import Header from './Header/Header';
import Hero from './HeroSection/HeroSection';
import HowItWorks from './HowItWorksSection/HowItWorks';
import KeyFeatures from './KeyFeaturesSection/KeyFeatures';
import Footer from './Footer/Footer';
// Import other sections if needed

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <Hero />
      <HowItWorks />
      <KeyFeatures />
      <Footer />
    </div>
  );
};

export default LandingPage;
