import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageUsers.css";
import AdminHeader from "../../AdminHeader/AdminHeader";
import Footer from "../../../Footer/Footer";

const usersData = [
  { id: 1, name: "Mohammad", role: "voter" },
  { id: 2, name: "Zaid", role: "Voter" },
  { id: 3, name: "Maen", role: "Candidate" },
];

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(usersData);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm === "") {
      setUsers(usersData);
    } else {
      const filteredUsers = usersData.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUsers(filteredUsers);
    }
  };

  const handleRoleChange = (userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? { ...user, role: user.role === "Candidate" ? "Voter" : "Candidate" }
        : user
    );
    setUsers(updatedUsers);

    if (users.find((user) => user.id === userId).role !== "Candidate") {
      navigate(`/assign-candidate-election`);
    }
  };

  return (
    <div className="manage-users-page">
      <header className="page-header">
        <AdminHeader />
      </header>
      <main className="content-wrapper">
        <h2>Manage Users</h2>
        <div className="search-container">
          <label htmlFor="search-user" className="search-label">
            Search User
          </label>
          <input
            type="text"
            id="search-user"
            className="search-input"
            placeholder="Enter username or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="user-list">
          <h3>User List</h3>
          <ul>
            {users.map((user) => (
              <li key={user.id} className="user-item">
                <span className="user-details">
                  {user.name} - {user.role}
                </span>
                <button
                  className={`action-button ${
                    user.role === "Candidate" ? "remove-button" : "block-button"
                  }`}
                  onClick={() => handleRoleChange(user.id)}
                >
                  {user.role === "Candidate" ? "Remove" : "Make as Candidate"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer className="page-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default ManageUsers;
