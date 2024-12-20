// src/components/ElectionListPage/ElectionList.jsx

import React, { useState, useEffect } from 'react';
import ElectionCard from './ElectionCard';
import './ElectionList.css';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner'; // Ensure this package is installed

const ElectionList = ({ filters, currentPage, setCurrentPage }) => {
  const [elections, setElections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [totalPages, setTotalPages] = useState(0);
  const electionsPerPage = 6; // Adjust as needed

  useEffect(() => {
    const fetchElections = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No authentication token found. Please log in.');
        }

        // Make a GET request to the /filter endpoint with filters and pagination
        const response = await axios.get('http://localhost:8080/elections/filter', {
          params: {
            faculty: filters.faculty || undefined,
            department: filters.department || undefined,
            upcoming: filters.upcoming || undefined,
            active: filters.active || undefined,
            type: filters.type || undefined,
            page: currentPage,
            size: electionsPerPage,
          },
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        setElections(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error('Error fetching elections:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch elections.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchElections();
  }, [filters, currentPage]);

  const paginate = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="election-list-container">
      {/* Election List */}
      {isLoading ? (
        <div className="loader">
          <TailSpin
            height="50"
            width="50"
            color="#347928"
            ariaLabel="loading"
          />
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button className="btn btn-secondary" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      ) : elections.length === 0 ? (
        <p className="no-results">No elections match your filters.</p>
      ) : (
        <>
          <div className="election-list">
            {elections.map((election) => (
              <ElectionCard key={election.electionId} election={election} />
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              className="btn pagination-btn"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`btn pagination-btn ${currentPage === index ? 'active' : ''}`}
                onClick={() => paginate(index)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="btn pagination-btn"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ElectionList;
