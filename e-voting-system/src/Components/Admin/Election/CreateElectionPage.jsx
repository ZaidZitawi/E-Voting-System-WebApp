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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setElectionDetails({ ...electionDetails, [name]: value });
  };

  const handleImageUpload = (e) => {
    setElectionDetails({ ...electionDetails, image: e.target.files[0] });
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

        <div className="form-group">
          <label>Faculties</label>
          <select
            name="faculties"
            multiple
            onChange={(e) =>
              setElectionDetails({
                ...electionDetails,
                faculties: Array.from(e.target.selectedOptions, (opt) => opt.value),
              })
            }
          >
            <option value="Arts">Arts</option>
            <option value="Science">Science</option>
            <option value="Engineering">Engineering</option>
          </select>
        </div>

        <div className="form-group">
          <label>Departments</label>
          <select
            name="departments"
            multiple
            onChange={(e) =>
              setElectionDetails({
                ...electionDetails,
                departments: Array.from(e.target.selectedOptions, (opt) => opt.value),
              })
            }
          >
            <option value="Computer Science">Computer Science</option>
            <option value="Physics">Physics</option>
            <option value="Mathematics">Mathematics</option>
          </select>
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
