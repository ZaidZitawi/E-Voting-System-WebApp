// src/components/SignUpPage/SignUpForm.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SignUpForm.css';

const SignUpForm = () => {
  const [step, setStep] = useState(1);

  // Form data state
  const [formData, setFormData] = useState({
    username: '',
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
  const faculties = ['Engineering', 'Arts', 'Science', 'Business'];
  const departments = {
    Engineering: ['Computer Engineering', 'Electrical Engineering', 'Mechanical Engineering'],
    Arts: ['English Literature', 'History', 'Philosophy'],
    Science: ['Biology', 'Chemistry', 'Physics'],
    Business: ['Accounting', 'Marketing', 'Finance'],
  };

  // Password strength indicator
  const [passwordStrength, setPasswordStrength] = useState('');

  // Resend code timer
  const [resendTimer, setResendTimer] = useState(60);

  // Sign up success state
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  useEffect(() => {
    let timer;
    if (step === 2 && resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer, step]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Password strength calculation
    if (name === 'password') {
      calculatePasswordStrength(value);
    }

    setFormData({ ...formData, [name]: value });
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
      if (!formData.username || formData.username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters long.';
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (step < 3) {
        setStep(step + 1);
      } else {
        // Final form submission logic
        console.log('Form submitted:', formData);
        // Implement loading indicator and API call here
        setSignUpSuccess(true); // Set sign-up success to true
      }
    }
  };

  // Handle Resend Code
  const handleResendCode = () => {
    // Implement resend code logic here
    setResendTimer(60);
  };

  // Handle Faculty Change
  const handleFacultyChange = (e) => {
    setFormData({ ...formData, faculty: e.target.value, department: '' });
  };

  return signUpSuccess ? (
    // Success Message Component
    <div className="signup-success">
      <h2>Sign Up Successful!</h2>
      <p>Your account has been created successfully.</p>
      <Link to="/login" className="btn btn-primary">
        Go to Sign In
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
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <p className="error-message">{errors.username}</p>}
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
            <select
              id="faculty"
              name="faculty"
              value={formData.faculty}
              onChange={handleFacultyChange}
              required
            >
              <option value="">Select Faculty</option>
              {faculties.map((faculty) => (
                <option key={faculty} value={faculty}>
                  {faculty}
                </option>
              ))}
            </select>
            {errors.faculty && <p className="error-message">{errors.faculty}</p>}
          </div>

          {formData.faculty && (
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                {departments[formData.faculty].map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
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
