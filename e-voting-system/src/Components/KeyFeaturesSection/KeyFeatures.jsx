// src/components/KeyFeatures/KeyFeatures.jsx

import React from 'react';
import FeatureCard from './FeatureCard';
import './KeyFeatures.css';

// Import your PNG images
import blockchainIcon from '../../assets/image.png';
import globeIcon from '../../assets/Global.png';
import shieldIcon from '../../assets/Shield.png';
import mobileIcon from '../../assets/mobile.png';


const KeyFeatures = () => {
  const features = [
    {
      icon: blockchainIcon,
      title: 'Blockchain Security',
      description: 'Ensuring secure and tamper-proof voting records.',
    },
    {
      icon: globeIcon,
      title: 'Global Accessibility',
      description: 'Vote from anywhere with internet access.',
    },
    {
      icon: shieldIcon,
      title: 'Privacy Protection',
      description: 'Your vote remains anonymous and confidential.',
    },
    {
      icon: mobileIcon,
      title: 'Mobile Friendly',
      description: 'Optimized for voting on any device.',
    },
  ];

  return (
    <section className="key-features">
      <h2 className="section-title">Key Features</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
};

export default KeyFeatures;
