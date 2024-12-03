// src/components/SignUpPage/SignUpPage.jsx

import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SignUpForm from './SignUpForm';
import './SignUpPage.css';
import leftImage from '../../assets/file.ico'; // Replace with your image path
//hahahah
const SignUpPage = () => {
  return (
    <div className="signup-page">
      <Header />
      <div className="signup-container">
        {/* Left Section */}
        <div className="left-section">
          <img src={leftImage} alt="Students participating" />
          <h1>Join the Transparent Democracy Movement</h1>
          <p>
            Empower your voice and be part of a transparent election process. Sign up today and make a difference in your student community.
          </p>
        </div>

        {/* Right Section - Sign Up Form */}
        <div className="right-section">
          <SignUpForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUpPage;
