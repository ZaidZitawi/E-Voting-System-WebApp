// src/components/admin/ElectionForm.jsx
import React from "react";
import { Grid, TextField, MenuItem, Button, Typography } from "@mui/material";

const ElectionForm = ({
  election,
  description,
  setDescription,
  typeId,
  setTypeId,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  imagePreview,
  handleImageChange,
  facultyId,
  setFacultyId,
  departmentId,
  setDepartmentId,
  faculties,
  departments,
}) => {
  // Allowed election type options
  const allowedTypes = [1, 2, 3];

  // Helper functions to check if the current value is valid in the list.
  const isValidFaculty = faculties.some(
    (faculty) => String(faculty.facultyId) === String(facultyId)
  );
  const isValidDepartment = departments.some(
    (dept) => String(dept.departmentId) === String(departmentId)
  );

  return (
    <Grid container spacing={2}>
      {/* Title (read-only) */}
      <Grid item xs={12}>
        <TextField
          label="Title"
          value={election.title}
          fullWidth
          variant="outlined"
          InputProps={{ readOnly: true }}
        />
      </Grid>

      {/* Description */}
      <Grid item xs={12}>
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          minRows={3}
          variant="outlined"
        />
      </Grid>

      {/* Start and End Dates */}
      <Grid item xs={6}>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      {/* Election Type */}
      <Grid item xs={12}>
        <TextField
          label="Type"
          select
          value={allowedTypes.includes(typeId) ? typeId : ""}
          onChange={(e) => setTypeId(Number(e.target.value))}
          fullWidth
          variant="outlined"
        >
          <MenuItem value={1}>University Election</MenuItem>
          <MenuItem value={2}>Faculty Election</MenuItem>
          <MenuItem value={3}>Department Election</MenuItem>
        </TextField>
      </Grid>

      {/* Image Upload */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          Election Image
        </Typography>
        {imagePreview && (
          <div style={{ marginBottom: "0.5rem" }}>
            <img src={imagePreview} alt="Election" className="election-image" />
          </div>
        )}
        <Button variant="contained" component="label">
          Change Image
          <input type="file" hidden onChange={handleImageChange} />
        </Button>
      </Grid>

      {/* Faculty & Department Select */}
      <Grid item xs={6}>
        <TextField
          label="Faculty"
          select
          value={isValidFaculty ? facultyId : ""}
          onChange={(e) => setFacultyId(e.target.value)}
          fullWidth
          variant="outlined"
        >
          {faculties.map((faculty) => (
            <MenuItem key={faculty.facultyId} value={faculty.facultyId}>
              {faculty.facultyName}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Department"
          select
          value={isValidDepartment ? departmentId : ""}
          onChange={(e) => setDepartmentId(e.target.value)}
          fullWidth
          variant="outlined"
          disabled={!facultyId}
        >
          {departments.map((dept) => (
            <MenuItem key={dept.departmentId} value={dept.departmentId}>
              {dept.departmentName}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};

export default ElectionForm;
