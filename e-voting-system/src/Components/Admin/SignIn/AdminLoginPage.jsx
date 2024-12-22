// src/components/LoginPage/LoginPage.jsx

import React from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import LoginForm from './AdminLoginForm';
import './AdminLoginPage.css';
import leftImage from '../../../assets/file.ico'; // Update the image path as needed

const LoginPage = () => {
  return (
    <div className="login-page">
      <Header />
      <div className="login-container">
        {/* Left Section */}
        <div className="left-section">
          <img src={leftImage} alt="Welcome Back" />
          <h1>Welcome Back Admin!</h1>
          <p>
            Log in to continue where you left off and participate in the transparent election process.<br></br>
            Go On Admin
          </p>
        </div>

        {/* Right Section - Login Form */}
        <div className="right-section">
          <LoginForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
