// src/pages/Dashboard/ElectionSlider.jsx
import React, { useMemo, useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import "./ElectionSlider.css";
import featuredElectionImage from "../../assets/file.ico"; // or any placeholder

const ElectionSlider = ({ onSelectElection }) => {
  const [featuredElections, setFeaturedElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    async function fetchFeaturedElections() {
      try {
        setLoading(true);
        setError(null);
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("No authentication token found. Please log in.");
        }

        // Use axios to call /elections/featured
        const response = await axios.get(
          "http://localhost:8080/elections/featured",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        setFeaturedElections(response.data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load featured elections.");
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedElections();
  }, []);

  const sliderSettings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "0px",
      afterChange: (current) => setActiveSlide(current),
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            centerPadding: "0px",
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            centerPadding: "0px",
          },
        },
      ],
    }),
    []
  );

  if (loading) {
    return <div>Loading featured elections...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  if (featuredElections.length === 0) {
    return <div>No featured elections available at the moment.</div>;
  }

  const handleElectionClick = (electionId) => {
    if (onSelectElection) {
      onSelectElection(electionId);
    }
  };

  return (
    <section className="election-slider">
      <h2>Your Elections</h2>
      <Slider {...sliderSettings}>
        {featuredElections.map((election, index) => (
          <div
            key={election.electionId}
            className={`election-card2 ${activeSlide === index ? "active" : ""}`}
            onClick={() => handleElectionClick(election.electionId)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={election.imageUrl || featuredElectionImage}
              alt={election.title}
              loading="lazy"
            />
            <div className="election-content">
              <h3>{election.title}</h3>
              <p>{election.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ElectionSlider;
