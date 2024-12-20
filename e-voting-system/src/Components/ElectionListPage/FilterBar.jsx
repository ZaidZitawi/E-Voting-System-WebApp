// src/components/ElectionListPage/FilterBar.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FilterBar.css';

const FilterBar = React.memo(({ onFilterChange }) => {
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [faculty, setFaculty] = useState('');
  const [department, setDepartment] = useState('');
  const [upcoming, setUpcoming] = useState(false);
  const [active, setActive] = useState(false);
  const [type, setType] = useState('');

  // Fetch faculties on component mount
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:8080/faculty-and-department/faculties', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setFaculties(response.data);
        console.log('Faculties fetched:', response.data);
      } catch (error) {
        console.error('Error fetching faculties:', error);
        // Optionally, handle error (e.g., show a notification)
      }
    };

    fetchFaculties();
  }, []);

  // Fetch departments based on selected faculty or fetch all departments if filtering by department only
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem('authToken');
        let url = '';

        const isDepartmentOnly = department !== '' && faculty === '';

        if (isDepartmentOnly) {
          // Fetch all departments
          url = 'http://localhost:8080/faculty-and-department/all'; // Correct endpoint as per your controller
        } else if (faculty) {
          // Fetch departments for the selected faculty
          url = `http://localhost:8080/faculty-and-department/faculties/${faculty}/departments`;
        } else {
          setDepartments([]);
          console.log('No faculty selected and no department selected. Departments cleared.');
          return;
        }

        console.log('Fetching departments from URL:', url);

        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setDepartments(response.data);
        console.log('Departments fetched:', response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
        // Optionally, handle error (e.g., show a notification)
      }
    };

    // Compute isDepartmentOnly inside useEffect for accurate logic
    const isDepartmentOnly = department !== '' && faculty === '';

    // Only fetch departments if:
    // - A specific faculty is selected
    // - Or, filtering by department only
    if (isDepartmentOnly || faculty) {
      fetchDepartments();
    } else {
      setDepartments([]);
      console.log('Faculty and Department filters are not set. Departments cleared.');
    }
  }, [faculty, department]); // Added 'department' to dependencies

  // Debounce filter changes to optimize performance
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onFilterChange({
        faculty: faculty ? Number(faculty) : undefined, // Convert to number
        department: department ? Number(department) : undefined, // Convert to number
        upcoming: upcoming || undefined,
        active: active || undefined,
        type: type ? Number(type) : undefined, // Convert to number
      });
      console.log('Filter changed:', {
        faculty: faculty ? Number(faculty) : undefined,
        department: department ? Number(department) : undefined,
        upcoming: upcoming || undefined,
        active: active || undefined,
        type: type ? Number(type) : undefined,
      });
    }, 300); // 300ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [faculty, department, upcoming, active, type, onFilterChange]);

  const handleClearFilters = () => {
    setFaculty('');
    setDepartment('');
    setUpcoming(false);
    setActive(false);
    setType('');
    onFilterChange({
      faculty: undefined,
      department: undefined,
      upcoming: undefined,
      active: undefined,
      type: undefined,
    });
    console.log('Filters cleared');
  };

  return (
    <div className="filter-bar">
      {/* Faculty Dropdown */}
      <div className="filter-group">
        <label htmlFor="faculty-select">Faculty:</label>
        <select
          id="faculty-select"
          value={faculty}
          onChange={(e) => {
            setFaculty(e.target.value);
            if (e.target.value !== '') {
              setDepartment(''); // Reset Department selection when Faculty changes
              console.log('Faculty selected:', e.target.value);
            } else {
              console.log('Faculty set to All Faculties');
            }
          }}
          disabled={department !== '' && faculty === ''} // Disable Faculty filter if filtering by Department only
          aria-label="Filter by faculty"
        >
          <option value="">All Faculties</option>
          {faculties.map((fac) => (
            <option key={fac.facultyId} value={fac.facultyId}>
              {fac.facultyName}
            </option>
          ))}
        </select>
      </div>

      {/* Department Dropdown */}
      <div className="filter-group">
        <label htmlFor="department-select">Department:</label>
        <select
          id="department-select"
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
            if (e.target.value !== '') {
              console.log('Department selected:', e.target.value);
            } else {
              console.log('Department set to All Departments');
            }
          }}
          aria-label="Filter by department"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept.departmentId} value={dept.departmentId}>
              {dept.departmentName}
            </option>
          ))}
        </select>
      </div>

      {/* Election Type Dropdown */}
      <div className="filter-group">
        <label htmlFor="type-select">Election Type:</label>
        <select
          id="type-select"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            if (e.target.value !== '') {
              console.log('Election Type selected:', e.target.value);
            } else {
              console.log('Election Type set to All Types');
            }
          }}
          aria-label="Filter by election type"
        >
          <option value="">All Types</option>
          <option value="1">University Election</option>
          <option value="2">Faculty Election</option>
          <option value="3">Department Election</option>
        </select>
      </div>

      {/* Upcoming and Active Checkboxes */}
      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={upcoming}
            onChange={(e) => setUpcoming(e.target.checked)}
            aria-label="Filter by upcoming elections"
          />
          Upcoming
        </label>
        <label>
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            aria-label="Filter by active elections"
          />
          Active
        </label>
      </div>

      {/* Clear Filters Button */}
      <button className="btn btn-secondary" onClick={handleClearFilters}>
        Clear Filters
      </button>
    </div>
  );
});

export default FilterBar;
