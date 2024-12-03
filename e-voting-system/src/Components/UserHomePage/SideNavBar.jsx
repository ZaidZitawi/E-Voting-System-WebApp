// src/components/UserHomePage/SideNavBar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideNavBar.css';
import User from '../../assets/User.png'

const SideNavBar = ({ userRole }) => {
  // Sample user data (replace with actual data)
  const user = {
    name: 'John Doe',
    profilePicture: User,
  };

  const navItems = [
    { to: '/elections/upcoming', label: 'Upcoming Elections', icon: 'upcoming.png' },
    { to: '/elections/past', label: 'Past Elections', icon: 'past.png' },
    { to: '/notifications', label: 'Notifications', icon: 'notifications.png' },
    { to: '/help', label: 'Help Center', icon: 'help.png' },
  ];

  if (userRole === 'candidate') {
    navItems.push({
      to: '/candidate/dashboard',
      label: 'Candidate Dashboard',
      icon: 'dashboard.png',
    });
  }

  return (
    <aside className="side-nav-bar">
      <div className="profile-section">
        <img src={user.profilePicture} alt={user.name} />
        <h3>{user.name}</h3>
        <NavLink to="/profile" className="btn btn-secondary">
          Profile Settings
        </NavLink>
      </div>
      <nav className="nav-links">
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink to={item.to} >
                <img src={`/assets/icons/${item.icon}`} alt="" className="nav-icon" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideNavBar;
