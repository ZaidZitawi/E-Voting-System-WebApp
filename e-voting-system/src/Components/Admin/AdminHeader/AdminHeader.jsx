import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './AdminHeader.css';
import logo from '../../../assets/file.ico';
import arrowDownIcon from '../../../assets/arrow-down.png';
import logoutIcon from '../../../assets/logout.png';

const AdminHeader = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    }, []);
  
    const handleClickOutside = (event) => {
      if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [dropdownOpen]);
  
    const handleLogout = () => {
      localStorage.removeItem('authToken');
      setIsLoggedIn(false);
      setDropdownOpen(false);
      navigate('/login');
    };
  
    return (
      <header className="admin-header">
        <div className="admin-header-container">
          {/* Logo */}
          <div className="logo">
            <NavLink to="/Home">
              <img src={logo} alt="Logo" className="logo-image" />
              Vote Chain
            </NavLink>
          </div>
  
          {isLoggedIn ? (
            <>
              {/* Admin Navigation */}
              <nav className="admin-nav-bar">
                <NavLink to="/create-election" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                  Create New Election
                </NavLink>
                <NavLink to="/create-post" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                  Create New Post
                </NavLink>
                <NavLink to="/create-notification" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                  Create New Notification
                </NavLink>
                <NavLink to="/manage-users" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                  Manage Users
                </NavLink>
              </nav>
  
              {/* Admin Profile Dropdown */}
              <div className="admin-profile" ref={dropdownRef}>
                <button
                  className="user-icon"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                >
                  <span className="user-initials">AD</span> {/* Replace 'AD' with dynamic initials if available */}
                  <img
                    src={arrowDownIcon}
                    alt="Toggle Dropdown"
                    className={`arrow-down ${dropdownOpen ? 'open' : ''}`}
                  />
                </button>
                <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                  <NavLink to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                    Profile
                  </NavLink>
                  <button className="dropdown-item logout-button" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <NavLink to="/login" className="btn btn-secondary">
                Sign In
              </NavLink>
            </div>
          )}
        </div>
      </header>
    );
  };
  
  export default AdminHeader;