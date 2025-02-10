// src/Components/Profile/ProfilePage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './ProfilePage.css';
import { FaUser, FaEnvelope, FaUniversity, FaBuilding, FaLink, FaUserTie } from 'react-icons/fa';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [faculty, setFaculty] = useState('');
  const [department, setDepartment] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Edit form states
  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editProfilePictureFile, setEditProfilePictureFile] = useState(null);
  const [previewProfilePicture, setPreviewProfilePicture] = useState(null);

  // Feedback states
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Update the role mapping to match the new roles
  const roleMap = {
    1: 'User',           // ROLE_USER
    2: 'Candidate',      // ROLE_CANDIDATE
    4: 'Party Manager',  // ROLE_PARTY_MANAGER
  };

  useEffect(() => {
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:8080/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data;
      setUser(userData);
      console.log('User data:', userData);
      fetchFacultyAndDepartment(userData.facultyId, userData.departmentId);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Failed to load user profile.');
    }
  };

  const fetchFacultyAndDepartment = async (facultyId, departmentId) => {
    const token = localStorage.getItem('authToken'); // Retrieve the auth token
    try {
      const [facultyRes, departmentRes] = await Promise.all([
        axios.get(`http://localhost:8080/faculty-and-department/faculties/${facultyId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(`http://localhost:8080/faculty-and-department/departments/${departmentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);
      setFaculty(facultyRes.data.facultyName);
      setDepartment(departmentRes.data.departmentName);
    } catch (error) {
      console.error('Error fetching faculty or department:', error);
      setFaculty('N/A');
      setDepartment('N/A');
    }
  };

  const openEditModal = () => {
    if (user) {
      setEditName(user.name || '');
      setEditBio(user.bio || '');
      setEditProfilePictureFile(null);
      setPreviewProfilePicture(null);
    }
    setError('');
    setSuccessMessage('');
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
      setError('User data is not loaded.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('name', editName);
      formData.append('bio', editBio);
      if (editProfilePictureFile) {
        formData.append('profilePicture', editProfilePictureFile);
      }
      const userId = user.id || user.userId;
      if (!userId) {
        setError('User ID not found.');
        return;
      }
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Authentication token not found.');
        return;
      }
      const response = await axios.put(`http://localhost:8080/users/update/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Update response:', response.data);
      setUser(response.data);
      setSuccessMessage('Profile updated successfully!');
      setEditModalOpen(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response && error.response.status === 401) {
        setError('Unauthorized: Please log in again.');
      } else {
        setError('Failed to update profile. Please try again.');
      }
    }
  };

  if (!user) {
    return (
      <>
        <Header />
        <div className="profile-page loading-state">Loading your profile...</div>
        <Footer />
      </>
    );
  }

  // Determine user role from roleMap
  const userRole = roleMap[user.roleId] || 'Unknown';
  // Show post creation UI if the user is either Candidate or Party Manager
  const canCreatePost = user.roleId === 2 || user.roleId === 4;

  return (
    <>
      <Header />
      <div className="profile-page">
        <div className="profile-container">
          {/* Top Section */}
          <div className="profile-top">
            {/* Left Side: Profile Picture and Name */}
            <div className="profile-left">
              <img
                src={user.profilePicture ? `http://localhost:8080/uploads/${user.profilePicture}` : '/default-profile.png'}
                alt={user.name}
                className="profile-picture"
                loading="lazy"
              />
              <h2 className="profile-name">
                {user.name}
                <span className={`role-badge ${userRole.toLowerCase().replace(" ", "-")}`}>
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

          {/* Center Section */}
          <div className="profile-center">
            <div className="section-card">
              <h3>Bio</h3>
              <p>{user.bio || 'No bio added yet.'}</p>
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
              {canCreatePost && (
                <ul>
                  <li>
                    <FaUserTie className="icon" /> Party: {user.party}
                  </li>
                  <li>
                    <FaLink className="icon" /> Election: <a href={`/elections/${user.electionId}`}>View Details</a>
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
                      <FaLink className="icon" /> {election.name} ({election.year})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No elections participated in yet.</p>
              )}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="profile-bottom">
            {canCreatePost && (
              <div className="profile-posts">
                <h3>Posts</h3>
                {user.posts && user.posts.length > 0 ? (
                  <ul>
                    {user.posts.map((post) => (
                      <li key={post.id}>
                        <h4>{post.title}</h4>
                        <p>{post.content}</p>
                        <p><em>{post.date}</em></p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No posts yet.</p>
                )}
              </div>
            )}
          </div>

          {/* Edit Profile Button */}
          <div className="edit-profile-button">
            <button className="edit-profile-btn" onClick={openEditModal}>Edit Profile</button>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {error && <p className="error-message">{error}</p>}
          </div>
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
                    <img src={previewProfilePicture} alt="Profile Preview" className="preview-image" />
                  </div>
                )}
                {error && <p className="error-message">{error}</p>}
                <div className="form-actions">
                  <button type="submit" className="save-btn">Save Changes</button>
                  <button type="button" className="cancel-btn" onClick={closeEditModal}>
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
