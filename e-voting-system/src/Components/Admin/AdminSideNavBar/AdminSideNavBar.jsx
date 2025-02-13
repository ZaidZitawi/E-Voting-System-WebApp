// src/Components/Admin/SignIn/AdminSideNavBar.jsx
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./AdminSideNavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const AdminSideNavBar = () => {
  // (No need to fetch admin profile anymore)
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
      </nav>
    </aside>
  );
};

export default AdminSideNavBar;
