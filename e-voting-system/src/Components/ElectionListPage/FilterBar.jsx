// src/components/ElectionListPage/FilterBar.jsx

import React, { useState, useEffect } from 'react';
import './FilterBar.css';

const FilterBar = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortOption, setSortOption] = useState('startDate');

  // Debounce search input to optimize performance
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onFilterChange({ searchTerm, typeFilter, sortOption });
    }, 300); // 300ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, typeFilter, sortOption, onFilterChange]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setTypeFilter('');
    setSortOption('startDate');
    onFilterChange({ searchTerm: '', typeFilter: '', sortOption: 'startDate' });
  };

  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search elections..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search elections"
      />
      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        aria-label="Filter by election type"
      >
        <option value="">All Types</option>
        <option value="Council">Council</option>
        <option value="Club">Club</option>
        <option value="Committee">Committee</option>
        <option value="Society">Society</option>
        {/* Add more types as needed */}
      </select>
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        aria-label="Sort elections"
      >
        <option value="startDate">Start Date</option>
        <option value="endDate">End Date</option>
        <option value="title">Title</option>
      </select>
      <button className="btn btn-secondary" onClick={handleClearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

export default FilterBar;
