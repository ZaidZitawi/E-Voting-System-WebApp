// src/components/ElectionListPage/ElectionList.jsx

import React, { useState, useEffect } from 'react';
import ElectionCard from './ElectionCard';
import './ElectionList.css';

// Sample data (replace with API data as needed)
const allElections = [
  {
    id: 1,
    title: 'Student Council Elections 2023',
    type: 'Council',
    startDate: '2023-11-01',
    endDate: '2023-11-05',
    eligibility: 'All Students',
    description: 'Vote for your student council representatives.',
  },
  {
    id: 2,
    title: 'Computer Science Club Elections',
    type: 'Club',
    startDate: '2023-11-10',
    endDate: '2023-11-15',
    eligibility: 'Computer Science Students',
    description: 'Elect the new leadership of the CS Club.',
  },
  {
    id: 3,
    title: 'Arts Club Elections',
    type: 'Club',
    startDate: '2023-11-20',
    endDate: '2023-11-25',
    eligibility: 'Arts Students',
    description: 'Choose the new leaders of the Arts Club.',
  },
  {
    id: 4,
    title: 'Sports Committee Elections',
    type: 'Committee',
    startDate: '2023-12-01',
    endDate: '2023-12-05',
    eligibility: 'All Students',
    description: 'Vote for the new Sports Committee members.',
  },
  {
    id: 5,
    title: 'Environmental Society Elections',
    type: 'Society',
    startDate: '2023-12-10',
    endDate: '2023-12-15',
    eligibility: 'All Students',
    description: 'Select the advocates for a greener campus.',
  },
  {
    id: 6,
    title: 'Tech Innovators Club Elections',
    type: 'Club',
    startDate: '2024-01-05',
    endDate: '2024-01-10',
    eligibility: 'Engineering Students',
    description: 'Lead the future of technology on campus.',
  },
  {
    id: 7,
    title: 'Cultural Fest Committee Elections',
    type: 'Committee',
    startDate: '2024-02-01',
    endDate: '2024-02-05',
    eligibility: 'All Students',
    description: 'Organize the most vibrant cultural fest.',
  },
  // Add more elections as needed
];

const ElectionList = ({ filters }) => {
  const [filteredElections, setFilteredElections] = useState(allElections);
  const [currentPage, setCurrentPage] = useState(1);
  const electionsPerPage = 6; // Adjust as needed

  useEffect(() => {
    // Apply filters and sorting
    let filtered = allElections.filter((election) => {
      const matchesSearchTerm = election.title.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesTypeFilter = filters.typeFilter ? election.type === filters.typeFilter : true;
      return matchesSearchTerm && matchesTypeFilter;
    });

    // Sorting
    filtered.sort((a, b) => {
      if (filters.sortOption === 'title') {
        return a.title.localeCompare(b.title);
      } else if (filters.sortOption === 'startDate') {
        return new Date(a.startDate) - new Date(b.startDate);
      } else if (filters.sortOption === 'endDate') {
        return new Date(a.endDate) - new Date(b.endDate);
      }
      return 0;
    });

    setFilteredElections(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [filters]);

  // Pagination logic
  const indexOfLastElection = currentPage * electionsPerPage;
  const indexOfFirstElection = indexOfLastElection - electionsPerPage;
  const currentElections = filteredElections.slice(indexOfFirstElection, indexOfLastElection);
  const totalPages = Math.ceil(filteredElections.length / electionsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="election-list-container">
      <div className="election-list">
        {currentElections.length > 0 ? (
          currentElections.map((election) => (
            <ElectionCard key={election.id} election={election} />
          ))
        ) : (
          <p className="no-results">No elections match your filters.</p>
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="btn pagination-btn"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`btn pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="btn pagination-btn"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ElectionList;
