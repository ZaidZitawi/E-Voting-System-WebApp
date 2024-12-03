// src/components/Header/Header.jsx

import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/file.ico';

// Import PNG images for icons
import notificationIcon from '../../assets/Bell.png';
import dashboardIcon from '../../assets/User.png'; // Ensure this path is correct
import logoutIcon from '../../assets/logout.png';
import arrowDownIcon from '../../assets/arrow-down.png';

const Header = () => {
  const [dashboardDropdownOpen, setDashboardDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const dashboardDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);

  // Simulate user authentication status
  const isLoggedIn = true; // Change this to false to simulate a logged-out user

  const handleDashboardDropdownToggle = () => {
    setDashboardDropdownOpen((prev) => !prev);
  };

  const handleNotificationDropdownToggle = () => {
    setNotificationDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      dashboardDropdownOpen &&
      dashboardDropdownRef.current &&
      !dashboardDropdownRef.current.contains(event.target)
    ) {
      setDashboardDropdownOpen(false);
    }
    if (
      notificationDropdownOpen &&
      notificationDropdownRef.current &&
      !notificationDropdownRef.current.contains(event.target)
    ) {
      setNotificationDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dashboardDropdownOpen, notificationDropdownOpen]);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="Logo" className="logo-image" />
            VoteChain
          </NavLink>
        </div>

        {/* Conditional Rendering Based on Authentication Status */}
        {isLoggedIn ? (
          <>
            {/* Navigation Bar */}
            <nav className="nav-bar">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                Home
              </NavLink>
              <NavLink
                to="/elections"
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                Elections
              </NavLink>
              <NavLink
                to="/dashbored"
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                Dashbored
              </NavLink>
            </nav>

            {/* Header Actions: Notification and Dashboard Dropdowns */}
            <div className="header-actions">
              {/* Notification Icon */}
              <div className="notification-icon" ref={notificationDropdownRef}>
                <button
                  className="notification-button"
                  onClick={handleNotificationDropdownToggle}
                  aria-haspopup="true"
                  aria-expanded={notificationDropdownOpen}
                >
                  <img
                    src={notificationIcon}
                    alt="Notifications"
                    className="icon-image"
                  />
                  {/* Optional notification badge */}
                  <span className="notification-badge">3</span>
                </button>
                <div
                  className={`notification-dropdown ${
                    notificationDropdownOpen ? 'show' : ''
                  }`}
                >
                  <div className="notification-item">
                    <p>You have a new message</p>
                    <span>2 mins ago</span>
                  </div>
                  <div className="notification-item">
                    <p>Your vote has been confirmed</p>
                    <span>1 hour ago</span>
                  </div>
                  <div className="notification-item">
                    <p>New election available</p>
                    <span>Yesterday</span>
                  </div>
                  {/* Add more notifications as needed */}
                </div>
              </div>

              {/* User Profile Dropdown */}
              <div className="dashboard-profile" ref={dashboardDropdownRef}>
                <button
                  className="user-icon"
                  onClick={handleDashboardDropdownToggle}
                  aria-haspopup="true"
                  aria-expanded={dashboardDropdownOpen}
                >
                  <span>JS</span>
                  <img
                    src={arrowDownIcon}
                    alt="Toggle Dropdown"
                    className={`arrow-down ${dashboardDropdownOpen ? 'open' : ''}`}
                  />
                </button>
                <div className={`dropdown-menu ${dashboardDropdownOpen ? 'show' : ''}`}>
                  <NavLink to="/profile">
                    <img src={dashboardIcon} alt="Profile" className="dropdown-icon" />
                    Profile
                  </NavLink>
                  <NavLink to="/logout">
                    <img src={logoutIcon} alt="Logout" className="dropdown-icon" />
                    Logout
                  </NavLink>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Sign In and Sign Up Buttons for Unauthenticated Users */
          <div className="auth-buttons">
            <NavLink to="/login" className="btn btn-secondary">
              Sign In
            </NavLink>
            <NavLink to="/signup" className="btn btn-primary">
              Sign Up
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
