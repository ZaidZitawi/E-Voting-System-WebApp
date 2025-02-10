// src/Components/PostsFilter.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PostsFilter.css";

const PostsFilter = ({ onApplyFilters, onClearFilters, initialFilters = {} }) => {
  // Selected filter values
  const [faculty, setFaculty] = useState(initialFilters.faculty || "");
  const [dateRange, setDateRange] = useState(initialFilters.dateRange || "");
  const [sortBy, setSortBy] = useState(initialFilters.sortBy || "recent");
  const [keyword, setKeyword] = useState(initialFilters.keyword || "");
  // List of faculties fetched from backend
  const [faculties, setFaculties] = useState([]);

  // Fetch faculties from the backend on component mount
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("Missing authentication token.");
          return;
        }
        const response = await axios.get("http://localhost:8080/faculty-and-department/faculties", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFaculties(response.data || []);
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };

    fetchFaculties();
  }, []);

  const applyFilters = () => {
    onApplyFilters({
      faculty,   // faculty will be the facultyId (as a string or number)
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
          {faculties.map((fac) => (
            <option key={fac.facultyId} value={fac.facultyId}>
              {fac.facultyName}
            </option>
          ))}
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
