// src/components/UserHomePage/FeaturedElections.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FeaturedElections.css';
import featuredElectionImage from '../../assets/file.ico'; // Replace with your actual image path


const FeaturedElections = () => {
  const featuredElections = [
    {
      id: 1,
      title: 'Student Council Elections',
      description: 'Vote for your student council representatives.',
      image: featuredElectionImage,
    },
    {
      id: 2,
      title: 'Sports Club Elections',
      description: 'Elect the new leaders of the sports club.',
      image: featuredElectionImage,
    },
    {
      id: 3,
      title: 'Art Society Elections',
      description: 'Choose the new heads of the art society.',
      image: featuredElectionImage,
    },
    {
      id: 4,
      title: 'Science Club Elections',
      description: 'Vote for the new science club leaders.',
      image: featuredElectionImage,
    },
    {
      id: 5,
      title: 'Debate Club Elections',
      description: 'Elect the new debate club committee.',
      image: featuredElectionImage,
    },
    {
      id: 6,
      title: 'Tech Innovators Club Elections',
      description: 'Lead the future of technology on campus.',
      image: featuredElectionImage,
    },
    {
      id: 7,
      title: 'Cultural Fest Committee Elections',
      description: 'Organize the most vibrant cultural fest.',
      image: featuredElectionImage,
    },
    // Add more featured elections as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 2; // Display two cards per slide
  const totalSlides = Math.ceil(featuredElections.length / cardsToShow);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < totalSlides - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === totalSlides - 1;

  const getCurrentSlideItems = () => {
    const startIndex = currentIndex * cardsToShow;
    const endIndex = startIndex + cardsToShow;
    return featuredElections.slice(startIndex, endIndex);
  };

  return (
    <section className="featured-elections" id="featured-elections">
      <h2>Featured Elections</h2>
      <div className="featured-elections-container">
        {/* Previous Arrow */}
        <button
          className="nav-arrow prev-arrow"
          onClick={handlePrev}
          disabled={isFirstSlide}
          aria-label="Previous Featured Elections"
        >
          &#8592; {/* Unicode Left Arrow */}
        </button>

        {/* Featured Slide */}
        <div className="featured-slide">
          {getCurrentSlideItems().map((election) => (
            <div key={election.id} className="election-card">
              <img src={election.image} alt={election.title} />
              <h3>{election.title}</h3>
              <p>{election.description}</p>
            </div>
          ))}
        </div>

        {/* Next Arrow */}
        <button
          className="nav-arrow next-arrow"
          onClick={handleNext}
          disabled={isLastSlide}
          aria-label="Next Featured Elections"
        >
          &#8594; {/* Unicode Right Arrow */}
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="slide-indicators">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <span
            key={index}
            className={`indicator-dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            role="button"
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setCurrentIndex(index);
              }
            }}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default FeaturedElections;