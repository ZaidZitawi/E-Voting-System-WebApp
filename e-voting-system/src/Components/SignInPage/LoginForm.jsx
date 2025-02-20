import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { decodeJWT } from "../../Components/utils/jwt.js";
import { toast } from "react-toastify";
import "./LoginForm.css";

const LoginPage = () => {
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
        // Store token in localStorage
        localStorage.setItem("authToken", token);

        // Decode token to get user info (including roles)
        const decoded = decodeJWT(token);
        console.log("Logged in user:", decoded);
        const roles = decoded.roles || [];

        // Store roles in localStorage for later use
        localStorage.setItem("userRoles", JSON.stringify(roles));

        // If user is a candidate or party manager, set a flag for extra UI (post creation)
        if (
          roles.includes("ROLE_CANDIDATE") ||
          roles.includes("ROLE_PARTY_MANAGER")
        ) {
          localStorage.setItem("canCreatePost", "true");
        } else {
          localStorage.setItem("canCreatePost", "false");
        }

        // Navigate based on role:
        // ROLE_ADMIN gets a separate admin panel; the others share the same UI.
        if (roles.includes("ROLE_ADMIN")) {
          navigate("/admin/dashboard");
        } else {
          navigate("/home");
        }

        toast.success("Logged in successfully!");
      } else {
        throw new Error("Invalid login response. Token not found.");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data) {
        setErrors({
          form:
            error.response.data.message || "Login failed. Please try again.",
        });
      } else if (error.request) {
        setErrors({
          form: "No response from server. Please try again later.",
        });
      } else {
        setErrors({
          form: error.message || "An unexpected error occurred.",
        });
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
        {errors.username && <p className="error-message">{errors.username}</p>}
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
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>
      <div className="form-actions">
        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? "Logging In..." : "Log In"}
        </button>
      </div>
      <p className="dont-have-account">
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </form>
  );
};

export default LoginPage;
