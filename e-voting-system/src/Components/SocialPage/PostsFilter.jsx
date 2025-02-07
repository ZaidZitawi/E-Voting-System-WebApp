// src/Components/PostsFilter.jsx
import React, { useState } from "react";
import "./PostsFilter.css";

const PostsFilter = ({ onApplyFilters, onClearFilters, initialFilters = {} }) => {
  const [faculty, setFaculty] = useState(initialFilters.faculty || "");
  const [dateRange, setDateRange] = useState(initialFilters.dateRange || "");
  const [sortBy, setSortBy] = useState(initialFilters.sortBy || "recent");
  const [keyword, setKeyword] = useState(initialFilters.keyword || "");

  const applyFilters = () => {
    onApplyFilters({
      faculty,
      dateRange,
      sortBy,
      keyword,
    });
  };

  const clearFilters = () => {
    setFaculty("");
    setDateRange("");
    setSortBy("recent");
    setKeyword("");
    onClearFilters();
  };

  return (
    <div className="posts-filter">
      <div className="posts-filter__group">
        <label className="posts-filter__label">Faculties</label>
        <select
          className="posts-filter__select"
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
        >
          <option value="">All Faculties</option>
          <option value="science">Science</option>
          <option value="arts">Arts</option>
          <option value="engineering">Engineering</option>
          {/* Add more options based on your data */}
        </select>
      </div>

      <div className="posts-filter__group">
        <label className="posts-filter__label">Date Range</label>
        <select
          className="posts-filter__select"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option value="">All Time</option>
          <option value="24h">Last 24 Hours</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <div className="posts-filter__group">
        <label className="posts-filter__label">Sort By</label>
        <select
          className="posts-filter__select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="recent">Most Recent</option>
          <option value="likes">Most Liked</option>
          <option value="comments">Most Commented</option>
        </select>
      </div>

      <div className="posts-filter__group posts-filter__group--search">
        <label className="posts-filter__label">Keyword</label>
        <input
          type="text"
          className="posts-filter__input"
          placeholder="Search posts..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <div className="posts-filter__actions">
        <button className="posts-filter__button" onClick={applyFilters}>
          Apply Filters
        </button>
        <button
          className="posts-filter__button posts-filter__button--clear"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default PostsFilter;
