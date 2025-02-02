import React, { useMemo, useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import axios from "axios";
import "./ElectionSlider.css";
import featuredElectionImage from "../../assets/file.ico";
import defaultImage from "../../assets/Default_Election.png";

const ElectionSlider = ({ onSelectElection }) => {
  const [featuredElections, setFeaturedElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);


  // FETCH FEATURED ELECTIONS
  useEffect(() => {
    let isMounted = true;
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setError("No authentication token found. Please log in.");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get("http://localhost:8080/elections", {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (isMounted) {
          setFeaturedElections(Array.isArray(response.data) ? response.data : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load featured elections.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  // AUTO-SELECT MIDDLE CARD ONCE ELECTIONS ARE LOADED
  useEffect(() => {
    if (featuredElections.length > 0 && onSelectElection) {
      // Middle index
      const initialIndex = Math.floor(featuredElections.length / 2);
      const safeIndex = Math.min(initialIndex, featuredElections.length - 1);
      setActiveSlide(safeIndex);
      onSelectElection(featuredElections[safeIndex].electionId);
    }
  }, [featuredElections, onSelectElection]);

  // HANDLER FOR SLIDER MOVEMENT
  const handleAfterChange = (current) => {
    if (!sliderRef.current || !featuredElections.length) return;

    // slidesToShow from internal slider state
    const slidesToShow = sliderRef.current.innerSlider.state.slidesToShow || 1;

    // Middle index relative to 'current' when centerMode = true
    const midpoint = current + Math.floor(slidesToShow / 2);

    // If infinite: we can modulo, else clamp
    const isInfinite = sliderRef.current.innerSlider.props.infinite;
    let centerIndex;
    if (isInfinite) {
      centerIndex = midpoint % featuredElections.length;
    } else {
      // clamp within array bounds
      centerIndex = Math.max(0, Math.min(midpoint, featuredElections.length - 1));
    }

    setActiveSlide(centerIndex);
    if (onSelectElection) {
      onSelectElection(featuredElections[centerIndex].electionId);
    }
  };

  // SLIDER SETTINGS
  const sliderSettings = useMemo(() => {
    return {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "0px",
      afterChange: handleAfterChange,
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
    };
  }, [featuredElections]);

  if (loading) {
    return (
      <div className="election-slider-loading">
        <h3>Loading featured elections...</h3>
        <div className="election-slider-loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="election-slider-error">
        <h3 style={{ color: "red" }}>Error: {error}</h3>
      </div>
    );
  }

  if (featuredElections.length === 0) {
    return (
      <div className="election-slider-empty">
        <h3>No featured elections available at the moment.</h3>
      </div>
    );
  }

  // RENDER
  return (
    <section className="election-slider">
      <h2>Your Elections</h2>
      <Slider {...sliderSettings} ref={sliderRef}>
        {featuredElections.map((election, index) => (
          <div
            key={election.electionId}
            className={`election-card2 ${activeSlide === index ? "active" : ""}`}
          >
            <img
              src={ `http://localhost:8080/uploads/${election.imageUrl}` || defaultImage}
              alt={election.title || "Election"}
              loading="lazy"
            />
            <div className="election-content">
              <h3>{election.title || "Untitled Election"}</h3>
              <p>{election.description || "No description available."}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ElectionSlider;
