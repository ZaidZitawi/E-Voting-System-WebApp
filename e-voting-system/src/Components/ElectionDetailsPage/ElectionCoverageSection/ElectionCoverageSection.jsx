// src/components/ElectionCoverageSection/ElectionCoverageSection.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ElectionCoverageSection.css';
import defaultImage from '../../../assets/Default_Election.png';

const ElectionCoverageSection = ({ election }) => {
  const {
    title,
    description,
    typeId,
    startDatetime,
    endDatetime,
    imageUrl,
    facultyId,
    departmentId,
    isActive,
  } = election;

  // States to store fetched names
  const [facultyName, setFacultyName] = useState('');
  const [departmentName, setDepartmentName] = useState('');

  // Fetch faculty and department names using async/await
  useEffect(() => {
    const fetchNames = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No auth token found');
        return;
      }

      try {
        // Fetch faculty name by facultyId
        let response = await axios.get(
          `http://localhost:8080/faculty-and-department/faculties/${facultyId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // Assuming FacultyDTO has a field called "name"
        if (response.data && response.data.facultyName) {
          setFacultyName(response.data.facultyName);
          console.log('Faculty response:', response.data);
        } else {
          console.warn('Faculty data does not include a "name" field:', response.data);
        }
      } catch (err) {
        console.error('Error fetching faculty:', err);
      }

      try {
        // Fetch department name by departmentId
        let response = await axios.get(
          `http://localhost:8080/faculty-and-department/departments/${departmentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // Assuming DepartmentDTO has a field called "name"
        if (response.data && response.data.departmentName) {
          setDepartmentName(response.data.departmentName);
          console.log('Department response:', response.data);
        } else {
          console.warn('Department data does not include a "name" field:', response.data);
        }
      } catch (err) {
        console.error('Error fetching department:', err);
      }
    };

    fetchNames();
  }, [facultyId, departmentId]);

  // Function to format datetime strings
  const formatDateTime = (datetimeStr) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    };
    const date = new Date(datetimeStr);
    return date.toLocaleDateString(undefined, options);
  };

  // Function to get election type based on typeId
  const getElectionType = (typeId) => {
    switch (typeId) {
      case 1:
        return 'University Election';
      case 2:
        return 'Faculty Election';
      default:
        return 'Department Election';
    }
  };

  const fullImageUrl = imageUrl 
    ? `http://localhost:8080/uploads/${imageUrl}` 
    : defaultImage;

  // Handler for Vote Button click
  const handleVoteClick = () => {
    alert('Vote process initiated!');
  };

  return (
    <section
      className="election-coverage-hero"
      style={{ backgroundImage: `url(${fullImageUrl})` }}
      aria-labelledby="election-title"
    >
      <div className="overlay"></div>
      <div className="election-content">
        {/* Election Title */}
        <h1 className="election-title" id="election-title">{title}</h1>

        {/* Election Description */}
        <p className="election-description">{description}</p>

        {/* Election Details Grid */}
        <div className="election-details-grid">
          <div className="detail-card">
            <i className="fas fa-bullhorn detail-icon" aria-hidden="true"></i>
            <span className="detail-label">Type</span>
            <span className="detail-value">{getElectionType(typeId)}</span>
          </div>
          <div className="detail-card">
            <i className="fas fa-calendar-alt detail-icon" aria-hidden="true"></i>
            <span className="detail-label">Start</span>
            <span className="detail-value">{formatDateTime(startDatetime)}</span>
          </div>
          <div className="detail-card">
            <i className="fas fa-calendar-check detail-icon" aria-hidden="true"></i>
            <span className="detail-label">End</span>
            <span className="detail-value">{formatDateTime(endDatetime)}</span>
          </div>
          <div className="detail-card">
            <i className="fas fa-university detail-icon" aria-hidden="true"></i>
            <span className="detail-label">Faculty</span>
            <span className="detail-value">{facultyName || facultyId}</span>
          </div>
          <div className="detail-card">
            <i className="fas fa-building detail-icon" aria-hidden="true"></i>
            <span className="detail-label">Department</span>
            <span className="detail-value">{departmentName || departmentId}</span>
          </div>
        </div>

        {/* Vote Button */}
        {isActive ? (
          <button className="vote-button" onClick={handleVoteClick} aria-label="Vote Now">
            Vote Now
          </button>
        ) : (
          <button className="vote-button disabled" disabled aria-label="Voting Closed">
            Voting Closed
          </button>
        )}
      </div>
    </section>
  );
};

export default ElectionCoverageSection;
