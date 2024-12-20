// src/components/ElectionListPage/ElectionListPage.jsx

import React, { useState, useCallback } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import FilterBar from './FilterBar';
import ElectionList from './ElectionList';
import './ElectionListPage.css';

const ElectionListPage = () => {
  const [filters, setFilters] = useState({
    faculty: '',
    department: '',
    upcoming: false,
    active: false,
    type: '',
    filterByDepartmentOnly: false,
  });

  const [currentPage, setCurrentPage] = useState(0); // Manage currentPage here to reset on filter change

  // Memoize the handleFilterChange function
  const handleFilterChange = useCallback((newFilters) => {
    // Compare newFilters with current filters
    const isDifferent = Object.keys(newFilters).some(
      key => filters[key] !== newFilters[key]
    );
    if (isDifferent) {
      setFilters(newFilters);
      setCurrentPage(0); // Reset to first page when filters change
    }
  }, [filters]);

  return (
    <div className="election-list-page">
      <Header />
      <div className="main-content2">
        <div className="content-area2">
          <FilterBar onFilterChange={handleFilterChange} />
          <ElectionList
            filters={filters}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ElectionListPage;
