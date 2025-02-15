// src/Components/Admin/SignIn/AdminSideNavBar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./AdminSideNavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faPlus,
  faUsers,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const AdminSideNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all items from local storage (including auth token and others)
    localStorage.clear();
    // Navigate to the /AdminIn page
    navigate("/AdminIn");
  };

  // Define navigation sections with unwanted links removed
  const navSections = [
    {
      section: "Dashboard",
      items: [
        { to: "/AdminDashboard", label: "Dashboard", icon: faTachometerAlt },
      ],
    },
    {
      section: "Actions",
      items: [
        { to: "/CreateElection", label: "Create New Election", icon: faPlus },
      ],
    },
    {
      section: "Management",
      items: [
        { to: "/manageUsers", label: "Manage Users", icon: faUsers },
      ],
    },
  ];

  return (
    <aside className="admin-side-nav-bar">
      {/* Navigation Links */}
      <nav className="admin-nav-links">
        {navSections.map((section, index) => (
          <div key={index} className="admin-nav-section">
            <h4 className="admin-nav-section-title">{section.section}</h4>
            <ul className="admin-nav-list">
              {section.items.map((item, idx) => (
                <li key={idx} className="admin-nav-list-item">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      isActive ? "admin-active-link" : "admin-nav-link"
                    }
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="admin-nav-icon"
                    />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {/* Logout Link */}
        <div className="admin-nav-section">
          <ul className="admin-nav-list">
            <li className="admin-nav-list-item">
              <button
                onClick={handleLogout}
                className="admin-nav-link logout-link"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="admin-nav-icon" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSideNavBar;
