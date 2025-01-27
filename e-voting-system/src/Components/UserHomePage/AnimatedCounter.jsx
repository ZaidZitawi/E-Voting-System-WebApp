import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { FaUserFriends, FaVoteYea, FaRegCalendarAlt, FaPenNib } from "react-icons/fa";
import "./AnimatedCounter.css";

const iconsMap = {
  "Registered Users": <FaUserFriends className="animated-counter-icon" />,
  "Votes Cast": <FaVoteYea className="animated-counter-icon" />,
  Elections: <FaRegCalendarAlt className="animated-counter-icon" />,
  Posts: <FaPenNib className="animated-counter-icon" />,
};

const AnimatedCounter = ({ title, endValue, duration = 2000, shouldAnimate }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) return;

    let start = 0;
    const increment = Math.ceil(endValue / (duration / 80)); // Slower increment by increasing interval
    const intervalTime = 80; // Slower updates by increasing interval time

    const counterInterval = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(counterInterval);
      } else {
        setCount(start);
      }
    }, intervalTime);

    return () => clearInterval(counterInterval);
  }, [endValue, duration, shouldAnimate]);

  return (
    <div className="animated-counter">
      {iconsMap[title]}
      <h3 className="animated-counter-title">{title}</h3>
      <p className="animated-counter-value">{count.toLocaleString()}</p>
    </div>
  );
};

AnimatedCounter.propTypes = {
  title: PropTypes.string.isRequired,
  endValue: PropTypes.number.isRequired,
  duration: PropTypes.number,
  shouldAnimate: PropTypes.bool.isRequired,
};

const AnimatedCountersGroup = ({ stats }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.7} // Trigger when 30% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="animated-counters-group" ref={sectionRef}>
      {stats.map((stat, index) => (
        <AnimatedCounter
          key={index}
          title={stat.title}
          endValue={stat.value}
          duration={stat.duration || 3000} // Adjusted for a slower count
          shouldAnimate={isVisible}
        />
      ))}
    </section>
  );
};

AnimatedCountersGroup.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      duration: PropTypes.number,
    })
  ).isRequired,
};

export default AnimatedCountersGroup;
