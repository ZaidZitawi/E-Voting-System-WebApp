// src/Components/Profile/ProfilePage.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // For route parameter
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./ProfilePage.css";
import {
  FaUser,
  FaEnvelope,
  FaUniversity,
  FaBuilding,
  FaLink,
} from "react-icons/fa";

const ProfilePage = () => {
  const { id } = useParams(); // Get the profile id from the URL, if present
  const [user, setUser] = useState(null);
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [profileElectionId, setProfileElectionId] = useState(null); // Fetched election id for Candidate/Party Manager
  const [isOwnProfile, setIsOwnProfile] = useState(true); // Determines if viewing own profile

  // Edit form states
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editProfilePictureFile, setEditProfilePictureFile] = useState(null);
  const [previewProfilePicture, setPreviewProfilePicture] = useState(null);

  // Feedback states
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Role mapping to display a friendly role name
  const roleMap = {
    1: "User", // ROLE_USER
    2: "Candidate", // ROLE_CANDIDATE
    4: "Party Manager", // ROLE_PARTY_MANAGER
  };

  useEffect(() => {
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      let url = "http://localhost:8080/users/profile";
      // If an id is provided via the route, fetch that user's profile
      if (id) {
        url = `http://localhost:8080/users/profile/${id}`;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data;
      setUser(userData);
      console.log("User data:", userData);
      fetchFacultyAndDepartment(userData.facultyId, userData.departmentId);

      // Determine if the profile being viewed is the logged-in user's own profile.
      const loggedInUserId = localStorage.getItem("userId");
      if (!id || id === loggedInUserId) {
        setIsOwnProfile(true);
        // For Party Manager or Candidate, fetch the election id.
        const userId = userData.id || userData.userId;
        if (userData.roleId === 4) {
          fetchElectionIdForPartyManager(userId);
        } else if (userData.roleId === 2) {
          fetchElectionIdForCandidate(userId);
        }
      } else {
        setIsOwnProfile(false);
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setError("Failed to load user profile.");
    }
  };

  const fetchFacultyAndDepartment = async (facultyId, departmentId) => {
    const token = localStorage.getItem("authToken");
    try {
      // Check if facultyId is valid before making the request
      if (facultyId && facultyId !== "null") {
        const facultyRes = await axios.get(
          `http://localhost:8080/faculty-and-department/faculties/${facultyId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFaculty(facultyRes.data.facultyName);
      } else {
        setFaculty("N/A");
      }

      // Check if departmentId is valid before making the request
      if (departmentId && departmentId !== "null") {
        const departmentRes = await axios.get(
          `http://localhost:8080/faculty-and-department/departments/${departmentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDepartment(departmentRes.data.departmentName);
      } else {
        setDepartment("N/A");
      }
    } catch (error) {
      console.error("Error fetching faculty or department:", error);
      setFaculty("N/A");
      setDepartment("N/A");
    }
  };

  // Fetch election id for a Party Manager based on user id
  const fetchElectionIdForPartyManager = async (userId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `http://localhost:8080/elections/user/${userId}/electionId`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data) {
        setProfileElectionId(response.data);
        console.log("Fetched Party Manager election id:", response.data);
      } else {
        setProfileElectionId(null);
      }
    } catch (err) {
      console.error("Error fetching election id for party manager:", err);
      setProfileElectionId(null);
    }
  };

  // Fetch election id for a Candidate based on user id
  const fetchElectionIdForCandidate = async (userId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `http://localhost:8080/elections/candidate/user/${userId}/electionId`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data) {
        setProfileElectionId(response.data);
        console.log("Fetched Candidate election id:", response.data);
      } else {
        setProfileElectionId(null);
      }
    } catch (err) {
      console.error("Error fetching election id for candidate:", err);
      setProfileElectionId(null);
    }
  };

  const openEditModal = () => {
    if (user) {
      setEditName(user.name || "");
      setEditBio(user.bio || "");
      setEditProfilePictureFile(null);
      setPreviewProfilePicture(null);
    }
    setError("");
    setSuccessMessage("");
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditProfilePictureFile(file);
      setPreviewProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("User data is not loaded.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", editName);
      formData.append("bio", editBio);
      if (editProfilePictureFile) {
        formData.append("profilePicture", editProfilePictureFile);
      }
      const userId = user.id || user.userId;
      if (!userId) {
        setError("User ID not found.");
        return;
      }
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Authentication token not found.");
        return;
      }
      const response = await axios.put(
        `http://localhost:8080/users/update/${userId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Update response:", response.data);
      setUser(response.data);
      setSuccessMessage("Profile updated successfully!");
      setEditModalOpen(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      if (err.response && err.response.status === 401) {
        setError("Unauthorized: Please log in again.");
      } else {
        setError("Failed to update profile. Please try again.");
      }
    }
  };

  if (!user) {
    return (
      <>
        <Header />
        <div className="profile-page loading-state">
          Loading your profile...
        </div>
        <Footer />
      </>
    );
  }

  const userRole = roleMap[user.roleId] || "Unknown";

  return (
    <>
      <Header />
      <div className="profile-page">
        <div className="profile-container">
          {/* Top Section: Profile Header */}
          <div className="profile-top">
            <div className="profile-left">
              <img
                src={
                  user.profilePicture
                    ? `http://localhost:8080/uploads/${user.profilePicture}`
                    : "/default-profile.png"
                }
                alt={user.name}
                className="profile-picture"
                loading="lazy"
              />
              <h2 className="profile-name">
                {user.name}
                <span
                  className={`role-badge ${userRole.toLowerCase().replace(" ", "-")}`}
                >
                  {userRole}
                </span>
              </h2>
            </div>
            <div className="profile-right">
              <p className="profile-email">
                <FaEnvelope className="icon" /> {user.email}
              </p>
            </div>
          </div>

          {/* Center Section: Profile Details */}
          <div className="profile-center">
            <div className="section-card">
              <h3>Bio</h3>
              <p>{user.bio || "No bio added yet."}</p>
            </div>

            <div className="section-card">
              <h3>Details</h3>
              <ul>
                <li>
                  <FaUser className="icon" /> {userRole}
                </li>
                <li>
                  <FaUniversity className="icon" /> {faculty}
                </li>
                <li>
                  <FaBuilding className="icon" /> {department}
                </li>
              </ul>
              {(user.roleId === 2 || user.roleId === 4) && (
                <ul>
                  <li>
                    <FaLink className="icon" /> Election:{" "}
                    {profileElectionId ? (
                      <a href={`/details/${profileElectionId}`}>View Details</a>
                    ) : (
                      <span>N/A</span>
                    )}
                  </li>
                </ul>
              )}
            </div>

            <div className="section-card">
              <h3>Elections Participated In</h3>
              {user.elections && user.elections.length > 0 ? (
                <ul>
                  {user.elections.map((election) => (
                    <li key={election.id}>
                      <FaLink className="icon" /> {election.name} (
                      {election.year})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No elections participated in yet.</p>
              )}
            </div>
          </div>

          {/* Edit Profile Button: Only show when viewing own profile */}
          {isOwnProfile && (
            <div className="edit-profile-button">
              <button className="edit-profile-btn" onClick={openEditModal}>
                Edit Profile
              </button>
              {successMessage && (
                <p className="success-message">{successMessage}</p>
              )}
              {error && <p className="error-message">{error}</p>}
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editModalOpen && (
          <div className="modal-overlay" onClick={closeEditModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Edit Your Profile</h2>
              <form onSubmit={handleSaveChanges}>
                <div className="form-group">
                  <label htmlFor="editName">Name</label>
                  <input
                    type="text"
                    id="editName"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editBio">Bio</label>
                  <textarea
                    id="editBio"
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="editProfilePicture">Profile Picture</label>
                  <input
                    type="file"
                    id="editProfilePicture"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                  />
                </div>
                {previewProfilePicture && (
                  <div className="image-preview">
                    <p>Image Preview:</p>
                    <img
                      src={previewProfilePicture}
                      alt="Profile Preview"
                      className="preview-image"
                    />
                  </div>
                )}
                {error && <p className="error-message">{error}</p>}
                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={closeEditModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
