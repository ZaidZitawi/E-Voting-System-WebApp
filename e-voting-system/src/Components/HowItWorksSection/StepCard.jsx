// src/components/HowItWorks/StepCard.jsx

import React from 'react';
import './HowItWorks.css';

const StepCard = ({ stepNumber, icon, title, description }) => {
  return (
    <div className="step-card">
      <div className="step-number">{stepNumber}</div>
      <div className="step-icon">
        <i className={icon}></i>
      </div>
      <h3 className="step-title">{title}</h3>
      <p className="step-description">{description}</p>
    </div>
  );
};

export default StepCard;
