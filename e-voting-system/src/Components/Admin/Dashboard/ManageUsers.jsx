// page for search about users and mange them 
import React from 'react';
import "./ManageUsers.css";

const ManageUsers = () => {
    return (
        <div className="manage-users-page">
            <h2>Manage Users</h2>
            <div className="search-container">
                <label htmlFor="search-user" className="search-label">Search User</label>
                <input 
                    type="text" 
                    id="search-user" 
                    className="search-input" 
                    placeholder="Enter username or email" 
                />
                <button className="search-button">Search</button>
            </div>
            <div className="user-list">
                <h3>User List</h3>
                <ul>
                    <li className="user-item">
                        <span className="user-details">User1 - Admin</span>
                        <button className="action-button remove-button">Remove</button>
                    </li>
                    <li className="user-item">
                        <span className="user-details">User2 - Voter</span>
                        <button className="action-button block-button">make as Candidate</button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ManageUsers;
