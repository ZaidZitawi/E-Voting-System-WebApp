import React from 'react';
import './Header.css';
import image from './assets/file.png';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        BirzeitVote
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
          <li className="nav-item"><a href="/elections" className="nav-link">Elections</a></li>
          <li className="nav-item"><a href="/about" className="nav-link">About</a></li>
          <li className="nav-item"><a href="/contact" className="nav-link">Contact</a></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        <button className="btn login-btn">Login</button>
        <button className="btn register-btn">Register</button>
      </div>
    </header>
  );
}

export default Header;
