import React from "react";
import "./ElectionFacultiesDepartments.css";

const ElectionFacultiesDepartments = ({ formData, setFormData, nextStep, prevStep }) => {
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
        />
      </div>
      <div className="form-group">
        <label>Department</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={prevStep}>Back</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

export default ElectionFacultiesDepartments;
