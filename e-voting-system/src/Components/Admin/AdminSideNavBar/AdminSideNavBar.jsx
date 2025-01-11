import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./AdminSideNavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faPlus,
  faClipboardList,
  faBell,
  faUsers,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const AdminSideNavBar = () => {
  const [adminProfile, setAdminProfile] = useState(null);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setAdminProfile(response.data);
    } catch (error) {
      console.error("Error fetching admin profile:", error);
    }
  };

  const adminName = adminProfile ? adminProfile.name : "Loading...";
  const adminPicture =
    adminProfile && adminProfile.profilePicture
      ? `http://localhost:8080/uploads/${adminProfile.profilePicture}`
      : "/path/to/default.jpg";

  // Define navigation sections
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
        { to: "/createPost", label: "Create New Post", icon: faClipboardList },
        {
          to: "/sendNot",
          label: "Create New Notification",
          icon: faBell,
        },
      ],
    },
    {
      section: "Management",
      items: [
        { to: "/manageUsers", label: "Manage Users", icon: faUsers },
        { to: "/profile", label: "Profile", icon: faUser },
      ],
    },
  ];

  return (
    <aside className="admin-side-nav-bar">
      {/* Profile Section */}
      <div className="profile-section">
        <img src={adminPicture} alt={adminName} />
        <h3>{adminName}</h3>
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
                <li key={idx}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => (isActive ? "active-link" : "")}
                  >
                    <FontAwesomeIcon icon={item.icon} className="nav-icon" />
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