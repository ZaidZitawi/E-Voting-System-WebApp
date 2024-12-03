// src/components/Hero/Hero.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';
import backgroundImage from '../../assets/Birzeit_University_PIC.jpg';

const Hero = () => {
  const handleLearnMoreClick = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="h-overlay">
        <div className="hero-content">
          <h1 className="hero-title">
            Empowering{' '}
            <span className="highlighted-word">Transparent</span> Elections...
          </h1>
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary">
              Sign Up
            </Link>
            <a
              href="#how-it-works"
              className="btn btn-secondary"
              onClick={handleLearnMoreClick}
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
