// src/components/SignUpPage/SignUpForm.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { decodeJWT, isTokenExpired } from '../utils/jwt';
import { toast } from 'react-toastify';
import './SignUpForm.css';

const SignUpForm = () => {
  const [step, setStep] = useState(1);

  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    verificationCode: '',
    faculty: '',
    department: '',
  });

  // Error state
  const [errors, setErrors] = useState({});

  // Faculties and Departments data
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);

  // Password strength indicator
  const [passwordStrength, setPasswordStrength] = useState('');

  // Resend code timer
  const [resendTimer, setResendTimer] = useState(60);

  // Sign up success state
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const navigate = useNavigate();

  // Loading and error states for faculties and departments
  const [loadingFaculties, setLoadingFaculties] = useState(false);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [facultiesError, setFacultiesError] = useState('');
  const [departmentsError, setDepartmentsError] = useState('');

  // Helper function to parse string to Long
  const parseLong = (value) => {
    const parsed = Number(value);
    return isNaN(parsed) ? null : parsed;
  };

  useEffect(() => {
    let timer;
    if (step === 2 && resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer, step]);

  // Fetch all faculties when step changes to 3
  useEffect(() => {
    if (step === 3 && faculties.length === 0) {
      fetchFaculties();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Password strength calculation
    if (name === 'password') {
      calculatePasswordStrength(value);
    }

    setFormData({ ...formData, [name]: value });

    // If faculty changes, fetch corresponding departments
    if (name === 'faculty') {
      if (value) {
        fetchDepartments(value);
      } else {
        setDepartments([]);
        setFormData({ ...formData, department: '' });
      }
    }
  };

  // Password strength function
  const calculatePasswordStrength = (password) => {
    let strength = '';
    const regexes = [
      /.{8,}/, // Minimum length 8
      /[A-Z]/,  // Uppercase letter
      /[a-z]/,  // Lowercase letter
      /[0-9]/,  // Digit
      /[^A-Za-z0-9]/, // Special character
    ];
    const passedTests = regexes.reduce((acc, regex) => acc + regex.test(password), 0);

    switch (passedTests) {
      case 5:
        strength = 'Very Strong';
        break;
      case 4:
        strength = 'Strong';
        break;
      case 3:
        strength = 'Medium';
        break;
      case 2:
        strength = 'Weak';
        break;
      default:
        strength = 'Very Weak';
    }
    setPasswordStrength(strength);
  };

  // Form validation
  const validate = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name || formData.name.length < 3) {
        newErrors.name = 'Name must be at least 3 characters long.';
      }
      const emailRegex = /^[0-9]+@student\.birzeit\.edu$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Email must be in the format studentnumber@student.birzeit.edu.';
      }
      if (!formData.password || passwordStrength === 'Very Weak' || passwordStrength === 'Weak') {
        newErrors.password = 'Password is too weak.';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
      }
    }

    if (step === 2) {
      if (!formData.verificationCode) {
        newErrors.verificationCode = 'Please enter the verification code.';
      }
      // Add additional verification code validation if needed
    }

    if (step === 3) {
      if (!formData.faculty) {
        newErrors.faculty = 'Please select a faculty.';
      }
      if (!formData.department) {
        newErrors.department = 'Please select a department.';
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Fetch all faculties
  const fetchFaculties = async () => {
    setLoadingFaculties(true);
    setFacultiesError('');
    try {
      const response = await axios.get('http://localhost:8080/faculty-and-department/faculties',{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, 
        },
      });
      setFaculties(response.data);
      console.log('Faculties fetched:', response.data);
    } catch (error) {
      console.error('Error fetching faculties:', error);
      setFacultiesError('Failed to load faculties. Please try again.');
    } finally {
      setLoadingFaculties(false);
    }
  };

  // Fetch departments based on faculty ID
  const fetchDepartments = async (facultyId) => {
    setLoadingDepartments(true);
    setDepartmentsError('');
    try {
      const response = await axios.get(`http://localhost:8080/faculty-and-department/faculties/${facultyId}/departments`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, 
        },
      });
      setDepartments(response.data);
      console.log('Departments fetched:', response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
      setDepartmentsError('Failed to load departments. Please try again.');
    } finally {
      setLoadingDepartments(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        if (step === 1) {
          // Step 1: User Registration
          const registerResponse = await axios.post('http://localhost:8080/auth/register', {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          });

          alert(registerResponse.data); // "Registration successful. Please check your email for the verification code."
          setStep(2);
        } else if (step === 2) {
          // Step 2: Email Verification
          const verifyResponse = await axios.post('http://localhost:8080/auth/verify', {
            email: formData.email,
            verificationCode: formData.verificationCode,
          });

          // Extract token from response
          const token = verifyResponse.data; // Adjust based on backend response structure

          if (token) {
            // Store token in localStorage
            localStorage.setItem('authToken', token);

            // Decode token to get user info (optional)
            const decoded = decodeJWT(token);

            // Set auto-logout based on token expiration (handled in App.js)
            toast.success('Verification successful. Please complete your registration.');
            setStep(3);
          } else {
            throw new Error('Invalid verification response.');
          }
        } else if (step === 3) {
          // Step 3: Complete Registration
          const token = localStorage.getItem('authToken');
          if (!token || isTokenExpired(token)) {
            toast.error('Session expired. Please sign up again.');
            navigate('/signup');
            return;
          }

          const registrationCompletionDTO = {
            facultyId: parseLong(formData.faculty),
            departmentId: parseLong(formData.department),
          };

          if (!registrationCompletionDTO.facultyId || !registrationCompletionDTO.departmentId) {
            throw new Error('Invalid faculty or department selection.');
          }

          const completeResponse = await axios.post(
            `http://localhost:8080/auth/complete-registration?email=${encodeURIComponent(formData.email)}`,
            registrationCompletionDTO,
            {
              headers: {
                Authorization: token,
              },
            }
          );

          console.log("Completion dto:", completeResponse.data);

          alert(completeResponse.data); // "Registration completed successfully."
          toast.success('Registration completed successfully!');
          setSignUpSuccess(true);
          navigate('/home');
        }
      } catch (error) {
        // Handle errors from backend
        if (error.response && error.response.data) {
          alert(`Error: ${error.response.data.message || error.response.data}`);
        } else {
          alert(`Error: ${error.message}`);
        }
      }
    }
  };

  // Handle Resend Code
  const handleResendCode = async () => {
    try {
      // Assuming you have a dedicated endpoint for resending verification codes
      const resendResponse = await axios.post('http://localhost:8080/auth/resend-verification', {
        email: formData.email,
      });

      alert(resendResponse.data); // "Verification code resent. Please check your email."
      setResendTimer(60);
    } catch (error) {
      if (error.response && error.response.data) {
        alert(`Error: ${error.response.data.message || error.response.data}`);
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return signUpSuccess ? (
    // Success Message Component
    <div className="signup-success">
      <h2>Sign Up Successful!</h2>
      <p>Your account has been created successfully.</p>
      <Link to="/dashboard" className="btn btn-primary">
        Go to Dashboard
      </Link>
    </div>
  ) : (
    // Sign Up Form
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <div className="progress-indicator">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
      </div>

      {step === 1 && (
        <div className="form-step">
          {/* Step 1 Fields */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email (studentnumber@student.birzeit.edu)</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="e.g., 1200000@student.birzeit.edu"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
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
            />
            {passwordStrength && (
              <p
                className={`password-strength ${passwordStrength
                  .replace(' ', '-')
                  .toLowerCase()}`}
              >
                Strength: {passwordStrength}
              </p>
            )}
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="form-step">
          {/* Step 2 Fields */}
          <div className="form-group">
            <label htmlFor="verificationCode">Verification Code</label>
            <input
              type="text"
              id="verificationCode"
              name="verificationCode"
              value={formData.verificationCode}
              onChange={handleChange}
              required
            />
            {errors.verificationCode && (
              <p className="error-message">{errors.verificationCode}</p>
            )}
          </div>
          <button
            type="button"
            className="resend-button"
            onClick={handleResendCode}
            disabled={resendTimer > 0}
          >
            Resend Code {resendTimer > 0 ? `(${resendTimer}s)` : ''}
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="form-step">
          {/* Step 3 Fields */}
          <div className="form-group">
            <label htmlFor="faculty">Faculty</label>
            {loadingFaculties ? (
              <p>Loading faculties...</p>
            ) : facultiesError ? (
              <p className="error-message">{facultiesError}</p>
            ) : (
              <select
                id="faculty"
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
                required
              >
                <option value="">Select Faculty</option>
                {faculties.map((faculty) => (
                  <option key={faculty.facultyId} value={faculty.facultyId}>
                    {faculty.facultyName}
                  </option>
                ))}
              </select>
            )}
            {errors.faculty && <p className="error-message">{errors.faculty}</p>}
          </div>

          {formData.faculty && (
            <div className="form-group">
              <label htmlFor="department">Department</label>
              {loadingDepartments ? (
                <p>Loading departments...</p>
              ) : departmentsError ? (
                <p className="error-message">{departmentsError}</p>
              ) : (
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((department) => (
                    <option key={department.departmentId} value={department.departmentId}>
                      {department.departmentName}
                    </option>
                  ))}
                </select>
              )}
              {errors.department && <p className="error-message">{errors.department}</p>}
            </div>
          )}
        </div>
      )}

      <div className="form-actions">
        {step > 1 && (
          <button type="button" className="back-button" onClick={() => setStep(step - 1)}>
            Back
          </button>
        )}
        <button type="submit" className="next-button">
          {step < 3 ? 'Next' : 'Create Account'}
        </button>
      </div>

      {/* "Already have an account?" Link */}
      <p className="already-have-account">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </form>
  );
};

export default SignUpForm;
