import React, { useState } from "react";
import "./SendNotifications.css";
import AdminHeader from "../AdminHeader/AdminHeader";
import Footer from "../../Footer/Footer";

const SendNotifications = () => {
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");

  const facultyOptions = ["Arts", "Science", "Engineering"];
  const departmentOptions = ["Computer Science", "Physics", "Mathematics"];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Notification sent successfully!");
  };

  return (
    <div className="send-notifications-page">
      <header className="page-header">
        <AdminHeader />
      </header>
      <main className="content-wrapper">
        <h2>Send Notifications</h2>
        <form className="notification-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="notification-title">Notification Title</label>
            <input
              type="text"
              id="notification-title"
              placeholder="Enter title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="notification-message">Message</label>
            <textarea
              id="notification-message"
              placeholder="Write your message"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="faculty">Select Faculty</label>
            <select
              id="faculty"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              className="dropdown"
            >
              <option value="">Select Faculty</option>
              {facultyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="department">Select Department</label>
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="dropdown"
            >
              <option value="">Select Department</option>
              {departmentOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-button">
            Send Notification
          </button>
        </form>
      </main>
      <footer className="page-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default SendNotifications;
