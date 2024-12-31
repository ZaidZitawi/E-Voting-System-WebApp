// src/components/ElectionListPage/ElectionCard.jsx

import React, { useState } from 'react';
import './ElectionCard.css';

// Importing icons from React Icons
import { FaCalendarAlt, FaUniversity, FaBuilding } from 'react-icons/fa';

const ElectionCard = ({ election }) => {
  /*
    Expected `election` object structure:
    {
      electionId: 27,
      title: "This my world amoy",
      description: "Hell No",
      startDatetime: 1704099600, // Unix timestamp in seconds
      endDatetime: 1704646800,   // Unix timestamp in seconds
      imageUrl: "www.Zzzzzzzzzzzzzzzz.com",
      isActive: true,
      faculty: {
        facultyId: 3,
        facultyName: 'Business and Economics',
      },
      department: {
        departmentId: 5,
        departmentName: 'Languages and Translation',
      },
      typeId: 1
    }
  */

  // Helper function to format Unix timestamp (seconds) to readable date
  const formatDate = (unixTimestamp) => {
    if (!unixTimestamp) return '';
    const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // State to manage image loading
  const [imgLoaded, setImgLoaded] = useState(false);
  const handleImageLoad = () => setImgLoaded(true);

  // Truncate description to 120 characters
  const truncateDescription = (desc, maxLength = 120) => {
    if (!desc) return '';
    return desc.length > maxLength ? `${desc.substring(0, maxLength - 3)}...` : desc;
  };

  return (
    <div className="election-card">
      {/* Image Section */}
      {election.imageUrl ? (
        <div className="card-image-wrapper">
          <img
            src={`http://localhost:8080/uploads/${election.imageUrl}`}
            alt={election.title || 'Election'}
            onLoad={handleImageLoad}
            className={`card-image ${imgLoaded ? 'loaded' : ''}`}
          />
          {!imgLoaded && <div className="card-image-placeholder">Loading Image...</div>}
        </div>
      ) : (
        <div className="card-image-placeholder no-image">No Image Available</div>
      )}

      {/* Main Content */}
      <div className="card-main-content">
        <h3 className="card-title">{election.title}</h3>
        <p className="card-description">{truncateDescription(election.description, 120)}</p>
      </div>

      {/* Overlay with Metadata */}
      <div className="card-overlay">
        <div className="overlay-content">
          <p>
            <FaCalendarAlt className="icon" /> <strong>Start:</strong> {formatDate(election.startDatetime)}
          </p>
          <p>
            <FaCalendarAlt className="icon" /> <strong>End:</strong> {formatDate(election.endDatetime)}
          </p>
          <p>
            <FaUniversity className="icon" /> <strong>Faculty:</strong> {election.faculty?.facultyName || 'N/A'}
          </p>
          <p>
            <FaBuilding className="icon" /> <strong>Dept:</strong> {election.department?.departmentName || 'N/A'}
          </p>
        </div>
      </div>

      {/* Footer: CTA and Status */}
      <div className="card-footer">
        <button className="learn-more-btn">Learn More</button>
        <span className={`status-badge ${election.isActive ? 'active' : 'inactive'}`}>
          {election.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
    </div>
  );
};

export default ElectionCard;
