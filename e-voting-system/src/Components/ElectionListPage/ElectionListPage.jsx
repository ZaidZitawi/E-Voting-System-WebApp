// src/components/ElectionListPage/ElectionListPage.jsx

import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import FilterBar from './FilterBar';
import ElectionList from './ElectionList';
import './ElectionListPage.css';

const ElectionListPage = () => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    typeFilter: '',
    sortOption: 'startDate',
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="election-list-page">
      <Header />
      <div className="main-content2">
        <div className="content-area2">
          <FilterBar onFilterChange={handleFilterChange} />
          <ElectionList filters={filters} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ElectionListPage;
