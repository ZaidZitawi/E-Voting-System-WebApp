import React, { useState } from "react";
import "./UpdatePassword.css";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    // Add your password update logic here (e.g., API call)
    alert("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  };

  return (
    <div className="update-password-container">
      <header className="update-header">
        <h1>Birzeit Vote</h1>
        <nav>
          <button>Dashboard</button>
          <button>Profile</button>
          <button className="logout-button">Logout</button>
        </nav>
      </header>

      <main className="update-password-main">
        <h2>Update Password</h2>
        <form onSubmit={handleSubmit} className="update-password-form">
          <div className="form-group">
            <label htmlFor="current-password">Current Password</label>
            <input
              type="password"
              id="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm New Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="submit-button">
            Update Password
          </button>
        </form>
      </main>

      <footer className="update-footer">
        © 2024/25 BirzeitVote - All Rights Reserved
      </footer>
    </div>
  );
};

export default UpdatePassword;
