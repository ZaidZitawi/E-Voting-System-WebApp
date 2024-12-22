import React from "react";
import './ElectionBasicInfo.css';

const ElectionBasicInfo = ({ formData, setFormData, nextStep }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="step">
      <h2>Basic Information</h2>
      <div className="form-group">
        <label>Election Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Start Time</label>
        <input
          type="datetime-local"
          name="startTime"
          value={formData.startTime}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>End Time</label>
        <input
          type="datetime-local"
          name="endTime"
          value={formData.endTime}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Election Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          rows="4"
        />
      </div>
      <div className="form-group">
        <label>Election Image</label>
        <input
          type="file"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
        />
      </div>
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

export default ElectionBasicInfo;
