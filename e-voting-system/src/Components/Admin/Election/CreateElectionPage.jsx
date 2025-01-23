import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateElectionPage.css";
import AdminHeader from "../AdminHeader/AdminHeader";
import Footer from "../../Footer/Footer";

const CreateElectionPage = () => {
  const navigate = useNavigate();
  const [electionDetails, setElectionDetails] = useState({
    title: "",
    description: "",
    type: "faculty election",
    startDate: "",
    endDate: "",
    image: null,
    faculties: "",
    departments: "",
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
    setElectionDetails({
      ...electionDetails,
      image: file ? URL.createObjectURL(file) : null,
    });
  };

  const handleSubmit = () => {
    console.log("Election Details Submitted:", electionDetails);
    navigate("/assign-parties");
  };

  return (
    <div className="create-election-page">
      <header className="page-header">
        <AdminHeader />
      </header>
      <main className="content-wrapper">
        <h2>Create New Election</h2>
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
            <label htmlFor="file-upload" className="image-upload-button">
              Upload Image
            </label>
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {electionDetails.image && (
              <div className="form-group preview-container">
                <img
                  src={electionDetails.image}
                  alt="Election"
                  className="election-image"
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Faculties</label>
            <select
              name="faculties"
              value={electionDetails.faculties}
              onChange={handleInputChange}
            >
              <option value="">Select Faculty</option>
              {facultyOptions.map((faculty) => (
                <option key={faculty} value={faculty}>
                  {faculty}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Departments</label>
            <select
              name="departments"
              value={electionDetails.departments}
              onChange={handleInputChange}
            >
              <option value="">Select Department</option>
              {departmentOptions.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
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

          <button
            type="button"
            onClick={handleSubmit}
            className="submit-button"
          >
            Submit and Assign Parties
          </button>
        </form>
      </main>
      <footer className="page-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default CreateElectionPage;
