// src/components/admin/ElectionsManagement.jsx
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ElectionsManagement.css";

const ElectionsManagement = () => {
  const [elections, setElections] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const navigate = useNavigate();

  // Fetch elections from the backend using the filter endpoint
  useEffect(() => {
    const fetchElections = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const params = {
          page: 0,
          size: 100, // Adjust size as needed
        };

        if (statusFilter === "Active") {
          params.active = true;
          params.upcoming = false;
        } else if (statusFilter === "Upcoming") {
          params.upcoming = true;
        } else if (statusFilter === "Completed") {
          params.active = false;
          params.upcoming = false;
        }

        if (typeFilter) {
          // Map type names to type IDs
          params.type =
            typeFilter === "University Election"
              ? 1
              : typeFilter === "Faculty Election"
              ? 2
              : typeFilter === "Department Election"
              ? 3
              : undefined;
        }

        const response = await axios.get("http://localhost:8080/elections/filter", {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
          params,
        });
        console.log("Fetched elections:", response.data);
        // Map fetched data into a format for DataGrid
        const fetchedElections = response.data.content.map((election) => {
          const now = new Date();
          const start = new Date(election.startDatetime);
          const end = new Date(election.endDatetime);
          let status = "";
          if (start > now) status = "Upcoming";
          else if (end < now) status = "Completed";
          else status = election.isActive ? "Active" : "Completed";

          let typeString = "";
          if (election.typeId === 1) typeString = "University Election";
          else if (election.typeId === 2) typeString = "Faculty Election";
          else if (election.typeId === 3) typeString = "Department Election";
          else typeString = "Other";

          return {
            id: election.electionId,
            title: election.title,
            start: start.toLocaleDateString(),
            end: end.toLocaleDateString(),
            type: typeString,
            status,
            transactionHash: election.transactionHash || "",
          };
        });
        setElections(fetchedElections);
        setTotalRows(response.data.totalElements);
      } catch (error) {
        console.error("Error fetching elections:", error);
      }
    };

    fetchElections();
  }, [statusFilter, typeFilter]);

  // Client-side filtering for search term
  const filteredElections = elections.filter((election) =>
    election.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // DataGrid columns, including a new "Tx Hash" column.
  const columns = [
    { field: "title", headerName: "Title", flex: 1, sortable: true },
    { field: "start", headerName: "Start Date", width: 130, sortable: true },
    { field: "end", headerName: "End Date", width: 130, sortable: true },
    { field: "type", headerName: "Type", width: 180, sortable: true },
    { field: "status", headerName: "Status", width: 120, sortable: true },
    {
      field: "transactionHash",
      headerName: "Tx Hash",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        const tx = params.value;
        if (!tx) return "";
        // Shorten the tx hash: first 6 characters, ellipsis, last 4 characters
        const shortTx = tx.length > 12 ? tx.substring(0, 6) + "..." + tx.substring(tx.length - 4) : tx;
        return (
          <a href={`https://amoy.polygonscan.com/tx/${tx}`} target="_blank" rel="noopener noreferrer">
            {shortTx}
          </a>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box className="actions-cell">
          <Button
            variant="outlined"
            size="small"
            onClick={() => navigate(`/elections/${params.row.id}`)}
          >
            View
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <section className="elections-management">
      <h2>Manage Elections</h2>
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
            <MenuItem value="University Election">University Election</MenuItem>
            <MenuItem value="Faculty Election">Faculty Election</MenuItem>
            <MenuItem value="Department Election">Department Election</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="data-grid-container">
        <DataGrid
          rows={filteredElections}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          rowCount={totalRows}
          paginationMode="server"
          onPageChange={(newPage) => {
            // Handle page change if needed.
          }}
          checkboxSelection
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </section>
  );
};

export default ElectionsManagement;
