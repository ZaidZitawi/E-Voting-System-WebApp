// src/components/HowItWorks/HowItWorks.jsx

import React from 'react';
import StepCard from './StepCard';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      stepNumber: '1',
      icon: 'fa-solid fa-user-plus', // Font Awesome icon class
      title: 'Register',
      description: 'Create an account to get started.',
    },
    {
      stepNumber: '2',
      icon: 'fa-solid fa-vote-yea',
      title: 'Vote',
      description: 'Cast your vote securely and anonymously.',
    },
    {
      stepNumber: '3',
      icon: 'fa-solid fa-chart-line',
      title: 'View Results',
      description: 'See real-time election results.',
    },
  ];

  return (
    <section className="how-it-works" id="how-it-works">
      <h2 className="section-title">How It Works</h2>
      <div className="steps-grid">
        {steps.map((step, index) => (
          <StepCard
            key={index}
            stepNumber={step.stepNumber}
            icon={step.icon}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
