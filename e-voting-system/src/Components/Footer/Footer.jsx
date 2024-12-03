// src/components/Footer/Footer.jsx

import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/file.ico'; // Import your logo image
import facebookIcon from '../../assets/facebook.png';
import linkedinIcon from '../../assets/linkedin.png';
import instagramIcon from '../../assets/instagram.png';

const Footer = () => {

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section: Logo and Website Name */}
        <div className="footer-left">
          <Link to="/" className="footer-logo">
            <img src={logo} alt="ElectionPlatform Logo" />
            <h2>VoteChain</h2>
          </Link>
        </div>

        {/* Center Section: Social Media Icons */}
        <div className="footer-center">
          <div className="footer-social" aria-label="Social Media Links">
            <a
              href="https://www.facebook.com/YourPage"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <img src={facebookIcon} alt="Facebook" />
            </a>
            <a
              href="https://www.linkedin.com/in/YourProfile"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
            <a
              href="https://www.instagram.com/YourProfile"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <img src={instagramIcon} alt="Instagram" />
            </a>
          </div>
        </div>

        {/* Right Section: Quick Links */}
        <div className="footer-right">
          <nav className="footer-links" aria-label="Footer Navigation">
            <h4>Quick Links</h4>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About</Link>
          </nav>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} VoteChain. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;