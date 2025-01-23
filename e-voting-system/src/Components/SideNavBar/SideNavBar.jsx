// src/components/UserHomePage/SideNavBar.jsx

import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './SideNavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faUser, 
  faUsers, 
  faClipboardList, 
  faChevronDown, 
  faChevronUp 
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import defaultImage from '../../assets/User.png';

const SideNavBar = ({ userRole, userElections }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    // Check if we have user data in localStorage first
    const storedUserId = localStorage.getItem('userId');
    const storedEmail = localStorage.getItem('email');
    const storedFacultyId = localStorage.getItem('facultyId');
    const storedDepartmentId = localStorage.getItem('departmentId');

    if (storedUserId && storedEmail && storedFacultyId && storedDepartmentId) {
      // If we already have these details, we may just want to fetch once for the name and profilePicture
      // Alternatively, if you trust local storage for all data, you could skip fetching again.
      fetchUserData();
    } else {
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users/profile', {
        
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      
      const data = response.data;

      setUserProfile(data);

      // Store the required fields in localStorage
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('email', data.email);
      localStorage.setItem('facultyId', data.facultyId);
      localStorage.setItem('departmentId', data.departmentId);

    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const userName = userProfile ? userProfile.name : 'Loading...';
  const userPicture = userProfile && userProfile.profilePicture 
    ? `http://localhost:8080/uploads/${userProfile.profilePicture}`
    : defaultImage;

  // Define navigation sections
  const navSections = [
    {
      section: 'Main',
      items: [
        { to: '/dashboard', label: 'Dashboard', icon: faTachometerAlt },
      ],
    },
    {
      section: 'User',
      items: [
        { to: '/profile', label: 'Profile', icon: faUser },
        { to: '/about-us', label: 'Who We Are', icon: faUsers },
      ],
    },
    {
      section: 'Elections',
      items: [
        {
          label: 'My Elections',
          icon: faClipboardList,
          isDropdown: true,
          dropdownItems: userElections, // Array of elections the user is involved in
        },
      ],
    },
  ];

  return (
    <aside className="side-nav-bar">
      {/* Profile Section */}
      <div className="profile-section">
        <img src={userPicture} alt={userName} />
        <h3>{userName}</h3>
        <NavLink to="/profile" className="btn btn-secondary">
          Profile Settings
        </NavLink>
      </div>

      {/* Navigation Links */}
      <nav className="nav-links">
        {navSections.map((section, index) => (
          <div key={index} className="nav-section">
            <h4 className="nav-section-title">{section.section}</h4>
            <ul>
              {section.items.map((item, idx) => (
                item.isDropdown ? (
                  <li key={idx}>
                    <button className="dropdown-btn" onClick={toggleDropdown}>
                      <FontAwesomeIcon icon={item.icon} className="nav-icon" />
                      <span>{item.label}</span>
                      <FontAwesomeIcon icon={isDropdownOpen ? faChevronUp : faChevronDown} className="dropdown-icon" />
                    </button>
                    {isDropdownOpen && (
                      <ul className="dropdown-menu">
                        {item.dropdownItems && item.dropdownItems.length > 0 ? (
                          item.dropdownItems.map((election) => (
                            <li key={election.electionId}>
                              <NavLink 
                                to={`/elections/${election.electionId}`} 
                                className={({ isActive }) => (isActive ? 'active-link' : '')}
                              >
                                <FontAwesomeIcon icon={faClipboardList} className="nav-icon" />
                                <span>{election.title}</span>
                              </NavLink>
                            </li>
                          ))
                        ) : (
                          <li className="no-elections">No Elections Involved</li>
                        )}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={idx}>
                    <NavLink to={item.to} className={({ isActive }) => (isActive ? 'active-link' : '')}>
                      <FontAwesomeIcon icon={item.icon} className="nav-icon" />
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                )
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default SideNavBar;
