import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateElectionPage.css";

const CreateElectionPage = () => {
  const navigate = useNavigate();
  const [electionDetails, setElectionDetails] = useState({
    title: "",
    description: "",
    type: "faculty election",
    startDate: "",
    endDate: "",
    image: null,
    faculties: [],
    departments: [],
    status: "Active",
  });

  const facultyOptions = ["Arts", "Science", "Engineering"];
  const departmentOptions = ["Computer Science", "Physics", "Mathematics"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setElectionDetails({ ...electionDetails, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setElectionDetails({ ...electionDetails, image: URL.createObjectURL(file) });
  };

  const toggleSelection = (type, value) => {
    const selectedItems = electionDetails[type];
    if (selectedItems.includes(value)) {
      setElectionDetails({
        ...electionDetails,
        [type]: selectedItems.filter((item) => item !== value),
      });
    } else {
      setElectionDetails({
        ...electionDetails,
        [type]: [...selectedItems, value],
      });
    }
  };

  const handleSubmit = () => {
    console.log("Election Details Submitted:", electionDetails);
    navigate("/assign-parties");
  };

  return (
    <div className="create-election-page">
      <h2>Create Election</h2>
      <form className="election-form">
        <div className="form-group">
          <label>Election Title</label>
          <input
            type="text"
            name="title"
            value={electionDetails.title}
            onChange={handleInputChange}
            placeholder="Enter election title"
          />
        </div>

        <div className="form-group">
          <label>Election Description</label>
          <textarea
            name="description"
            value={electionDetails.description}
            onChange={handleInputChange}
            placeholder="Enter election description"
          />
        </div>

        <div className="form-group">
          <label>Election Type</label>
          <select
            name="type"
            value={electionDetails.type}
            onChange={handleInputChange}
          >
            <option value="faculty election">Faculty Election</option>
            <option value="department election">Department Election</option>
            <option value="all students">All Students</option>
          </select>
        </div>

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

        <div className="form-group">
          <label>Election Image</label>
          <input type="file" onChange={handleImageUpload} />
        </div>
        {electionDetails.image && (
          <div className="form-group">
            <img src={electionDetails.image} alt="Election" className="election-image" />
          </div>
        )}

        <div className="form-group">
          <label>Faculties</label>
          <div className="checkbox-group">
            {facultyOptions.map((faculty) => (
              <div key={faculty} className="checkbox-option">
                <label>{faculty}</label>
                <input
                  type="checkbox"
                  checked={electionDetails.faculties.includes(faculty)}
                  onChange={() => toggleSelection("faculties", faculty)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Departments</label>
          <div className="checkbox-group">
            {departmentOptions.map((department) => (
              <div key={department} className="checkbox-option">
                <label>{department}</label>
                <input
                  type="checkbox"
                  checked={electionDetails.departments.includes(department)}
                  onChange={() => toggleSelection("departments", department)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={electionDetails.status}
            onChange={handleInputChange}
          >
            <option value="Active">Active</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Ended">Ended</option>
          </select>
        </div>

        <button type="button" onClick={handleSubmit} className="submit-button">
          Submit and Assign Parties
        </button>
      </form>
    </div>
  );
};

export default CreateElectionPage;
