// src/components/admin/ElectionsManagement.jsx
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
} from '@mui/material';
import axios from 'axios';
import './ElectionsManagement.css';

const ElectionsManagement = () => {
  const [elections, setElections] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  // Fetch elections from the backend using the filter endpoint
  useEffect(() => {
    const fetchElections = async () => {
      try {
        const token = localStorage.getItem('authToken');
        // Map our local filter state to API parameters
        const params = {
          page: 0,
          size: 100, // Adjust size as needed
        };

        if (statusFilter === 'Active') {
          params.active = true;
          params.upcoming = false;
        } else if (statusFilter === 'Upcoming') {
          params.upcoming = true;
        } else if (statusFilter === 'Completed') {
          params.active = false;
          params.upcoming = false;
        }

        if (typeFilter) {
          // Map type names to type IDs (for example: National -> 1, Local -> 2)
          params.type = typeFilter === 'National' ? 1 : typeFilter === 'Local' ? 2 : undefined;
        }

        const response = await axios.get('http://localhost:8080/elections/filter', {
          headers: { Authorization: `Bearer ${token}` },
          params,
        });
        // Assuming the backend returns a paginated result with a 'content' field
        const fetchedElections = response.data.content.map(election => {
          const now = new Date();
          const start = new Date(election.startDatetime);
          const end = new Date(election.endDatetime);
          let status = '';
          if (start > now) status = 'Upcoming';
          else if (end < now) status = 'Completed';
          else status = election.isActive ? 'Active' : 'Completed';

          return {
            id: election.electionId,
            title: election.title,
            start: new Date(election.startDatetime).toLocaleDateString(),
            end: new Date(election.endDatetime).toLocaleDateString(),
            type: election.typeId === 1 ? 'National' : election.typeId === 2 ? 'Local' : 'Other',
            status,
            // For demo purposes, candidate and party counts are set to 0.
            // In a real implementation, you might fetch these counts separately.
            candidates: 0,
            parties: 0,
          };
        });
        setElections(fetchedElections);
      } catch (error) {
        console.error("Error fetching elections:", error);
      }
    };

    fetchElections();
  }, [statusFilter, typeFilter]);

  // Apply additional filtering for search term (client-side)
  const filteredElections = elections.filter(election =>
    election.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // DataGrid columns
  const columns = [
    { field: 'title', headerName: 'Title', flex: 1, sortable: true },
    { field: 'start', headerName: 'Start Date', width: 130, sortable: true },
    { field: 'end', headerName: 'End Date', width: 130, sortable: true },
    { field: 'type', headerName: 'Type', width: 120, sortable: true },
    { field: 'status', headerName: 'Status', width: 120, sortable: true },
    { field: 'candidates', headerName: 'Candidates', width: 130, sortable: true },
    { field: 'parties', headerName: 'Parties', width: 100, sortable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box className="actions-cell">
          <Button variant="outlined" size="small" style={{ marginRight: 4 }}>View</Button>
          <Button variant="outlined" size="small" color="primary" style={{ marginRight: 4 }}>Edit</Button>
          <Button variant="outlined" size="small" color="error">Delete</Button>
        </Box>
      ),
    },
  ];

  return (
    <section className="elections-management">
      <h2>Manage Elections</h2>
      
      {/* Filters Section */}
      <div className="filters">
        <TextField
          label="Search by Title"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="filter-field"
        />
        <FormControl variant="outlined" size="small" className="filter-field">
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Upcoming">Upcoming</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" size="small" className="filter-field">
          <InputLabel>Type</InputLabel>
          <Select
            label="Type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="National">National</MenuItem>
            <MenuItem value="Local">Local</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Data Table */}
      <div className="data-grid-container">
        <DataGrid
          rows={filteredElections}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          checkboxSelection
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </section>
  );
};

export default ElectionsManagement;
