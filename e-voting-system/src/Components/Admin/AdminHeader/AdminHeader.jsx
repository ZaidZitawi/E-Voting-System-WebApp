// src/components/admin/AdminHeader.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminHeader.css';
import adminLogo from '../../../assets/file.ico'; 

const AdminHeader = () => {
  return (
    <header className="admin-header">
      <div className="admin-header-container">
        <div className="admin-logo">
          <NavLink to="/admin">
            <img src={adminLogo} alt="Admin Logo" className="admin-logo-image" />
            <span className="admin-logo-text">Admin Panel</span>
          </NavLink>
        </div>
        <nav className="admin-nav">
          <NavLink 
            to="/admin/dashboard" 
            className={({ isActive }) => (isActive ? 'admin-active-link' : '')}
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/admin/users" 
            className={({ isActive }) => (isActive ? 'admin-active-link' : '')}
          >
            Users
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
