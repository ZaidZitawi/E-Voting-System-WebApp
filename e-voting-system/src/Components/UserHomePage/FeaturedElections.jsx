// src/components/UserHomePage/FeaturedElections.jsx

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import featuredElectionImage from "../../assets/file.ico";
import "./FeaturedElections.css";
import axios from 'axios'; // Import axios for HTTP requests

// Lazy load the Slider component for performance optimization
const Slider = React.lazy(() => import("react-slick"));

const FeaturedElections = React.memo(() => {
  // 1. State variables for featured elections, loading status, and errors
  const [featuredElections, setFeaturedElections] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initially loading
  const [error, setError] = useState(null); // To capture any errors

  // 2. Fetch featured elections from the backend when the component mounts
  useEffect(() => {
    const fetchFeaturedElections = async () => {
      setIsLoading(true); // Start loading
      setError(null); // Reset any previous errors

      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('authToken');

        if (!token) {
          throw new Error('No authentication token found. Please log in.');
        }

        // Make a GET request to the /elections/featured endpoint
        const response = await axios.get('http://localhost:8080/elections/featured', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        // Assuming the response data is an array of ElectionDTO objects
        setFeaturedElections(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch featured elections.');
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchFeaturedElections();
  }, []); // Empty dependency array ensures this runs once on mount

  // 3. Slider settings (modified)
  const settings = useMemo(() => ({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // Remove centerMode to simplify spacing
    // centerMode: true,
    // centerPadding: "50px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          // centerPadding: "30px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          // centerPadding: "20px",
        },
      },
    ],
  }), []);

  // 4. Render elections from state instead of hardcoded data
  const renderElections = useCallback(() => {
    if (isLoading) {
      return <div className="loader">Loading featured elections...</div>; // Replace with spinner if desired
    }

    if (error) {
      return <div className="error-message">{error}</div>;
    }

    if (featuredElections.length === 0) {
      return <div>No featured elections available at the moment.</div>;
    }

    return featuredElections.map((election) => (
      <div key={election.electionId} className="featured-card">
        {/* Use election.imageUrl if available, else fallback to a default image */}
        <img src={election.imageUrl || featuredElectionImage} alt={election.title} loading="lazy" />
        <div className="featured-content">
          <h3>{election.title}</h3>
          <p>{election.description}</p>
          <Link to={`/elections/${election.electionId}`} className="btn btn-secondary">
            Learn More
          </Link>
        </div>
      </div>
    ));
  }, [featuredElections, isLoading, error]);

  return (
    <section className="featured-elections" id="featured-elections">
      <h2>Featured Elections</h2>
      <div className="slider-container">
        <React.Suspense fallback={<div>Loading slider...</div>}>
          <Slider {...settings}>
            {renderElections()}
          </Slider>
        </React.Suspense>
      </div>
    </section>
  );
});

export default FeaturedElections;
