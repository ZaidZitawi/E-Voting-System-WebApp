// src/pages/Dashboard/ElectionSlider.jsx
import React, { useMemo, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./ElectionSlider.css";
import featuredElectionImage from "../../assets/file.ico"; // Update the path as necessary

const ElectionSlider = ({ elections }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = useMemo(() => ({
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
  }), []);

  return (
    <section className="election-slider">
      <h2>Your Elections</h2>
      <Slider {...settings}>
        {elections.map((election, index) => (
          <div key={election.id} className={`election-card2 ${activeSlide === index ? "active" : ""}`}>
            <img src={election.image || featuredElectionImage} alt={election.title} loading="lazy" />
            <div className="election-content">
              <h3>{election.title}</h3>
              <p>{election.description}</p>
              <Link to={`/elections/${election.id}`} className="btn btn-secondary">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ElectionSlider;
