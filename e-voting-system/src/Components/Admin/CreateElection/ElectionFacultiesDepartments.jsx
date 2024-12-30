import React from "react";
import { useNavigate } from "react-router-dom";
import "./ElectionFacultiesDepartments.css";

const ElectionFacultiesDepartments = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="step">
      <h2>Faculties and Departments</h2>
      <div className="form-group">
        <label>Faculty</label>
        <input
          type="text"
          name="faculty"
          value={formData.faculty}
          onChange={handleInputChange}
          placeholder="Enter faculty name"
        />
      </div>
      <div className="form-group">
        <label>Department</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleInputChange}
          placeholder="Enter department name"
        />
      </div>
      <div className="buttons-container">
        <button
          className="single-candidate-button"
          onClick={() => navigate("/election-candidates")}
        >
          Single Candidate
        </button>
        <button
          className="parties-button"
          onClick={() => navigate("/manage-parties")}
        >
          Parties
        </button>
      </div>
    </div>
  );
};

export default ElectionFacultiesDepartments;
