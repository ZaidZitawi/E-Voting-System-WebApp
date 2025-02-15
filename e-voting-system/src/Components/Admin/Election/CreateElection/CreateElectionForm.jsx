// src/components/admin/CreateElectionForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CreateElectionPage.css"; // Reuse the same CSS file

const CreateElectionForm = ({ setCreatedElectionId }) => {
  const navigate = useNavigate();
  const [electionDetails, setElectionDetails] = useState({
    title: "",
    description: "",
    type: 2, // 1: University, 2: Faculty, 3: Department
    startDate: "",
    endDate: "",
    imageFile: null,
    image: null,
    faculties: "",       // Selected faculty id
    departments: "",     // Selected department id
  });

  // States for fetched faculties and departments
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);

  // Local constant for election types
  const electionTypes = [
    { id: 1, name: "University Election" },
    { id: 2, name: "Faculty Election" },
    { id: 3, name: "Department Election" },
  ];

  // Fetch faculties on mount
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://localhost:8080/faculty-and-department/faculties",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFaculties(response.data);
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };
    fetchFaculties();
  }, []);

  // Fetch departments when a faculty is selected
  useEffect(() => {
    const fetchDepartments = async () => {
      if (!electionDetails.faculties) {
        setDepartments([]);
        setElectionDetails((prev) => ({ ...prev, departments: "" }));
        return;
      }
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `http://localhost:8080/faculty-and-department/faculties/${electionDetails.faculties}/departments`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, [electionDetails.faculties]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setElectionDetails({ ...electionDetails, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setElectionDetails({
      ...electionDetails,
      imageFile: file,
      image: file ? URL.createObjectURL(file) : null,
    });
  };

  // Helper to format datetime-local string into a valid ZonedDateTime (appends seconds and "Z")
  const formatToZonedDateTime = (dateStr) => {
    return dateStr + ":00Z";
  };

  const handleSubmit = async () => {
    try {
      const electionData = {
        title: electionDetails.title,
        description: electionDetails.description,
        typeId: Number(electionDetails.type),
        startDatetime: formatToZonedDateTime(electionDetails.startDate),
        endDatetime: formatToZonedDateTime(electionDetails.endDate),
        facultyId: electionDetails.faculties ? Number(electionDetails.faculties) : null,
        departmentId: electionDetails.departments ? Number(electionDetails.departments) : null,
        isActive: true,
      };

      const formData = new FormData();
      formData.append(
        "election",
        new Blob([JSON.stringify(electionData)], { type: "application/json" })
      );
      if (electionDetails.imageFile) {
        formData.append("file", electionDetails.imageFile);
      }

      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:8080/admin/elections/create",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          transformRequest: [(data) => data],
        }
      );

      const createdElection = response.data;
      alert("Election created successfully.");
      // Pass the created election id back to the parent so the next step can be rendered
      setCreatedElectionId(createdElection.electionId);
    } catch (error) {
      console.error("Error creating election:", error);
      alert("Failed to create election.");
    }
  };

  return (
    <div className="create-election-form-container">
      <h2 className="create-election-title">Create New Election</h2>
      <form
        className="create-election-form"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="form-grid-container">
          {/* Title */}
          <div className="form-group full-width">
            <label>Election Title</label>
            <input
              type="text"
              name="title"
              value={electionDetails.title}
              onChange={handleInputChange}
              placeholder="Enter election title"
            />
          </div>
          {/* Description */}
          <div className="form-group full-width">
            <label>Election Description</label>
            <textarea
              name="description"
              value={electionDetails.description}
              onChange={handleInputChange}
              placeholder="Enter election description"
            />
          </div>
          {/* Election Type */}
          <div className="form-group">
            <label>Election Type</label>
            <select
              name="type"
              value={electionDetails.type}
              onChange={(e) =>
                setElectionDetails({
                  ...electionDetails,
                  type: Number(e.target.value),
                })
              }
            >
              {electionTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          {/* Start and End Dates */}
          <div className="form-group">
            <label>Start Date and Time</label>
            <input
              type="datetime-local"
              name="startDate"
              value={electionDetails.startDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>End Date and Time</label>
            <input
              type="datetime-local"
              name="endDate"
              value={electionDetails.endDate}
              onChange={handleInputChange}
            />
          </div>
          {/* Faculties */}
          <div className="form-group">
            <label>Faculties</label>
            <select
              name="faculties"
              value={electionDetails.faculties}
              onChange={handleInputChange}
            >
              <option value="">Select Faculty</option>
              {faculties.map((faculty) => (
                <option key={faculty.facultyId} value={faculty.facultyId}>
                  {faculty.facultyName}
                </option>
              ))}
            </select>
          </div>
          {/* Departments */}
          <div className="form-group">
            <label>Departments</label>
            <select
              name="departments"
              value={electionDetails.departments}
              onChange={handleInputChange}
              disabled={!electionDetails.faculties}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.departmentId} value={dept.departmentId}>
                  {dept.departmentName}
                </option>
              ))}
            </select>
          </div>
          {/* Image Upload */}
          <div className="form-group full-width image-upload-section">
            <label>Election Image</label>
            <div className="image-upload-container">
              <label
                htmlFor="create-election-file-upload"
                className="image-upload-button"
              >
                <span className="button-text">
                  {electionDetails.image ? "Change Image" : "Upload Image"}
                </span>
                <input
                  type="file"
                  id="create-election-file-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
              {electionDetails.image && (
                <div className="image-preview-container">
                  <img
                    src={electionDetails.image}
                    alt="Election preview"
                    className="image-preview"
                  />
                  <button
                    type="button"
                    className="remove-image-button"
                    onClick={() =>
                      setElectionDetails({
                        ...electionDetails,
                        image: null,
                        imageFile: null,
                      })
                    }
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="submit-button"
        >
          Submit and Assign Parties →
        </button>
      </form>
    </div>
  );
};

export default CreateElectionForm;
