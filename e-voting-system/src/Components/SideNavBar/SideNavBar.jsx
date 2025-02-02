// src/components/UserHomePage/SideNavBar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./SideNavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUser,
  faUsers,
  faClipboardList,
  faChevronDown,
  faChevronUp,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import defaultImage from "../../assets/User.png";

const SideNavBar = ({ userRole }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userElections, setUserElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  console.log("Rendering userElections:", userElections);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    console.log("Updated userElections:", userElections);
  }, [userElections]);

  // Fetch Participated Elections inside SideNavBar
  useEffect(() => {
    const fetchParticipatedElections = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("User is not authenticated.");
        }

        const response = await axios.get(
          "http://localhost:8080/elections/participated",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        console.log("Fetched Participated Elections:", response.data);
        setUserElections(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching participated elections:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch participated elections."
        );
        setLoading(false);
      }
    };

    fetchParticipatedElections();
  }, []);

  // Fetch User Profile
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/users/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        const data = response.data;
        setUserProfile(data);

        // Store required fields in localStorage
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("email", data.email);
        localStorage.setItem("facultyId", data.facultyId);
        localStorage.setItem("departmentId", data.departmentId);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserData();
  }, []);

  const userName = userProfile ? userProfile.name : "Loading...";
  const userPicture =
    userProfile && userProfile.profilePicture
      ? `http://localhost:8080/uploads/${userProfile.profilePicture}`
      : defaultImage;

  const handleElectionSelect = (electionId) => {
    navigate(`/details/${electionId}`);
    setIsDropdownOpen(false);
  };

  return (
    <aside className="side-nav-bar">
      <div className="profile-section">
        <img src={userPicture} alt={userName} className="profile-picture" />
        <h3 className="profile-name">{userName}</h3>
        <NavLink
          to="/profile"
          className="btn btn-secondary profile-settings-btn"
        >
          Profile Settings
        </NavLink>
      </div>

      <nav className="nav-links">
        <div className="nav-section">
          <h4 className="nav-section-title">Main</h4>
          <ul>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "active-link" : "nav-link"
                }
              >
                <FontAwesomeIcon icon={faTachometerAlt} className="nav-icon" />
                <span className="nav-label">Dashboard</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="nav-section">
          <h4 className="nav-section-title">User</h4>
          <ul>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "active-link" : "nav-link"
                }
              >
                <FontAwesomeIcon icon={faUser} className="nav-icon" />
                <span className="nav-label">Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about-us"
                className={({ isActive }) =>
                  isActive ? "active-link" : "nav-link"
                }
              >
                <FontAwesomeIcon icon={faUsers} className="nav-icon" />
                <span className="nav-label">Who We Are</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="nav-section">
          <h4 className="nav-section-title">Elections</h4>
          <ul>
            <li className="sideNav-dropdown-container">
              <button
                className="sideNav-dropdown-btn"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
              >
                <FontAwesomeIcon icon={faClipboardList} className="nav-icon" />
                <span className="nav-label">My Elections</span>
                <FontAwesomeIcon
                  icon={isDropdownOpen ? faChevronUp : faChevronDown}
                  className="sideNav-dropdown-icon"
                />
              </button>

              {isDropdownOpen && (
                <ul className="sideNav-dropdown-menu">
                  {loading ? (
                    <li className="sideNav-loading-container">Loading...</li>
                  ) : error ? (
                    <li className="sideNav-error-container">{error}</li>
                  ) : userElections.length > 0 ? (
                    userElections.map((election) => (
                      <li
                        key={election.electionId}
                        className="sideNav-dropdown-item"
                      >
                        <button
                          className="sideNav-dropdown-link"
                          onClick={() =>
                            handleElectionSelect(election.electionId)
                          }
                        >
                          <FontAwesomeIcon
                            icon={faClipboardList}
                            className="nav-icon sideNav-dropdown-item-icon"
                          />
                          <span className="sideNav-dropdown-item-label">
                            {election.title}
                          </span>
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="sideNav-no-elections">
                      No Elections Involved
                    </li>
                  )}
                </ul>
              )}
            </li>
          </ul>
        </div>

        <div className="nav-section">
          <h4 className="nav-section-title">Social</h4>
          <ul>
            <li>
              <NavLink
                to="/social"
                className={({ isActive }) =>
                  isActive ? "active-link" : "nav-link"
                }
              >
                <FontAwesomeIcon icon={faComments} className="nav-icon" />
                <span className="nav-label">Social</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default SideNavBar;
