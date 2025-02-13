// src/components/Header/Header.jsx

import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css';
import logo from '../../assets/file.ico';
import NotificationDialog from './NotificationDialog';


// Import PNG images for icons
import notificationIcon from '../../assets/Bell.png';
import dashboardIcon from '../../assets/User.png';
import logoutIcon from '../../assets/logout.png';
import arrowDownIcon from '../../assets/arrow-down.png';


const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardDropdownOpen, setDashboardDropdownOpen] = useState(false);
  const [showNotificationDialog, setShowNotificationDialog] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const dashboardDropdownRef = useRef(null);
  const navigate = useNavigate();

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  // Listen for storage changes (e.g., authToken changes in other tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Fetch user profile data if logged in
  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem('authToken');
      axios
        .get('http://localhost:8080/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserProfile(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, [isLoggedIn]);

  // Close dashboard dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (
      dashboardDropdownOpen &&
      dashboardDropdownRef.current &&
      !dashboardDropdownRef.current.contains(event.target)
    ) {
      setDashboardDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dashboardDropdownOpen]);

  // Toggle for dashboard dropdown
  const handleDashboardDropdownToggle = () => {
    setDashboardDropdownOpen((prev) => !prev);
  };

  // Logout function: confirm logout, clean local storage, and navigate to login
  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      // Clean local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('profileImage');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('canCreatePost');
      localStorage.removeItem('userRoles');
      localStorage.removeItem('facultyId');
      localStorage.removeItem('departmentId');
      setIsLoggedIn(false);
      setDashboardDropdownOpen(false);
      setTimeout(() => navigate('/login'), 0);
    }
  };

  // Construct the profile image URL if available
  const profileImageUrl =
    userProfile && userProfile.profilePicture
      ? `http://localhost:8080/uploads/${userProfile.profilePicture}`
      : null;

  // For demonstration, use static notifications (replace with dynamic data as needed)
  const notifications = [
    { id: 1, message: "You have a new message", time: "2 mins ago", userImage: null },
    { id: 2, message: "Your vote has been confirmed", time: "1 hour ago", userImage: null },
    { id: 3, message: "New election available", time: "Yesterday", userImage: null },
  ];

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Logo */}
          <div className="logo">
            <NavLink to={isLoggedIn ? "/home" : "/"}>
              <img src={logo} alt="Logo" className="logo-image" />
              VoteChain
            </NavLink>
          </div>

          {isLoggedIn ? (
            <>
              {/* Navigation Bar */}
              <nav className="nav-bar">
                <NavLink to="/home" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                  Home
                </NavLink>
                <NavLink
                  to="/electionlist"
                  className={({ isActive }) => (isActive ? 'active-link' : '')}
                >
                  Elections
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => (isActive ? 'active-link' : '')}
                >
                  Dashboard
                </NavLink>
              </nav>

              {/* Header Actions */}
              <div className="header-actions">
                {/* Notification Button */}
                <button
                  className="notification-button"
                  onClick={() => setShowNotificationDialog(true)}
                >
                  <img src={notificationIcon} alt="Notifications" className="icon-image" />
                </button>

                {/* User Profile Dropdown */}
                <div className="dashboard-profile" ref={dashboardDropdownRef}>
                  <button
                    className="user-icon"
                    onClick={handleDashboardDropdownToggle}
                    aria-haspopup="true"
                    aria-expanded={dashboardDropdownOpen}
                  >
                    {profileImageUrl ? (
                      <img
                        src={profileImageUrl}
                        alt="User Profile"
                        className="user-profile-img"
                      />
                    ) : (
                      <span className="user-initials">JD</span>
                    )}
                    <img
                      src={arrowDownIcon}
                      alt="Toggle Dropdown"
                      className={`arrow-down ${dashboardDropdownOpen ? 'open' : ''}`}
                    />
                  </button>
                  <div className={`dropdown-menu ${dashboardDropdownOpen ? 'show' : ''}`}>
                    {userProfile && (
                      <div className="dropdown-user-info">
                        {profileImageUrl && (
                          <img
                            src={profileImageUrl}
                            alt="Profile"
                            className="dropdown-profile-img"
                          />
                        )}
                        <span className="dropdown-user-name">{userProfile.name}</span>
                      </div>
                    )}
                    <NavLink
                      to="/profile"
                      className="dropdown-item"
                      onClick={() => setDashboardDropdownOpen(false)}
                    >
                      <img src={dashboardIcon} alt="Profile" className="dropdown-icon" />
                      Profile
                    </NavLink>
                    <NavLink className="dropdown-item logout-button" onClick={handleLogout}>
                      <img src={logoutIcon} alt="Logout" className="dropdown-icon" />
                      Logout
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Sign In / Sign Up Buttons for Unauthenticated Users
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

      {/* Notification Dialog */}
      {showNotificationDialog && (
        <NotificationDialog
          notifications={notifications}
          onClose={() => setShowNotificationDialog(false)}
        />
      )}
    </>
  );
};

export default Header;
