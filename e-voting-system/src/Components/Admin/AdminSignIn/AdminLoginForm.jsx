// src/Components/Admin/SignIn/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { decodeJWT, isTokenExpired } from "../../utils/jwt.js";
import { toast } from "react-toastify";
import "./AdminLoginForm.css";

const AdminLoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form validation
  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim())
      newErrors.username = "Please enter your Email.";
    if (!formData.password.trim())
      newErrors.password = "Please enter your password.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setErrors({});
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email: formData.username,
        password: formData.password,
      });
      const token = response.data; // Adjust based on your backend response structure
      if (token) {
        // Decode token to get user info
        const decoded = decodeJWT(token);
        console.log("Logged in user:", decoded);
        // Check if the user has the admin role
        if (decoded.role !== "ROLE_ADMIN") {
          setErrors({ form: "Unauthorized: Admin access only." });
          toast.error("Unauthorized: Admin access only.");
          // Clear any token if it was previously stored
          localStorage.removeItem("authToken");
          return;
        }
        // Store token in localStorage
        localStorage.setItem("authToken", token);
        // Display success toast
        toast.success("Logged in successfully!");
        // Redirect to Admin Dashboard
        navigate("/AdminDashboard");
      } else {
        throw new Error("Invalid login response. Token not found.");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data) {
        setErrors({
          form: error.response.data.message || "Login failed. Please try again.",
        });
      } else if (error.request) {
        setErrors({
          form: "No response from server. Please try again later.",
        });
      } else {
        setErrors({ form: error.message || "An unexpected error occurred." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      {errors.form && <p className="error-message">{errors.form}</p>}
      <div className="form-group">
        <label htmlFor="username">Email</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder="Enter your Email"
        />
        {errors.username && (
          <p className="error-message">{errors.username}</p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="error-message">{errors.password}</p>
        )}
      </div>
      <div className="form-actions">
        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? "Logging In..." : "Log In"}
        </button>
      </div>
    </form>
  );
};

export default AdminLoginForm;
