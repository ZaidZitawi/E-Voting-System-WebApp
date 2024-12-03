// src/components/UserHomePage/HeroHome.jsx

import React from 'react';
import './HeroHome.css';
import heroImage from '../../assets/Birzeit_University_PIC.jpg'; // Replace with your image path

const HeroHome = () => {
  const scrollToFeatured = () => {
    const featuredSection = document.getElementById('featured-elections');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-overlay">
        <h1>Your Voice, Your Future</h1>
        <p>Participate in the most transparent and secure university elections powered by blockchain technology.</p>
        <button className="btn btn-primary" onClick={scrollToFeatured}>
          Get Started
        </button>
      </div>
    </section>
  );
};

export default HeroHome;
