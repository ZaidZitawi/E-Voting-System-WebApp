// src/App.jsx

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Components/SignInPage/LoginPage.jsx";
import Header from "./Components/Header/Header.jsx";
import LandingPage from "./Components/LandingPage.jsx";
import SignUpPage from "./Components/SignUpPage/SignUpPage.jsx";
import UserHomePage from "./Components/UserHomePage/UserHomePage.jsx";
import ElectionListPage from "./Components/ElectionListPage/ElectionListPage.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import ElectionDetailsPage from "./Components/ElectionDetailsPage/ElectionDetailsPage.jsx";
import Profile from "./Components/Profile/ProfilePage.jsx";
import AdminLoginPage from "./Components/Admin/SignIn/AdminLoginPage.jsx";
import CreateElectionPage from "./Components/Admin/Election/CreateElectionPage.jsx";
import AssignPartiesPage from "./Components/Admin/Election/AssignPartiesPage.jsx";
import SendNotifications from "./Components/Admin/Dashboard/SendNotifications.jsx";
import ManageUsers from "./Components/Admin/Dashboard/ManageUsers.jsx";
import CreatePostPage from "./Components/Admin/Dashboard/CreatePostPage.jsx";
import ManageElections from "./Components/Admin/Election/ManageElections.jsx";
import AssignCandidateToElection from "./Components/Admin/Dashboard/AssignCandidateToElection.jsx";
import AdminDashboard from "./Components/Admin/Dashboard/AdminDashboard.jsx";
import CandidateDashboard from "./Components/Admin/Candidate/CandidateDashboard.jsx";
import MyElectionDetails from "./Components/Admin/Candidate/MyElectionDetails.jsx";


import { decodeJWT, isTokenExpired } from "./Components/utils/jwt.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@fortawesome/fontawesome-free/css/all.min.css";

const AppContent = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    toast.info("Session expired. Please log in again.");
    navigate("/login");
  };

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        if (isTokenExpired(token)) {
          // Token is expired
          handleLogout();
        } else {
          // Token is valid, set a timeout to logout when it expires
          const decoded = decodeJWT(token);
          if (decoded && decoded.exp) {
            const expirationTime = decoded.exp * 1000 - Date.now() - 60000; // 1 minute before expiry
            if (expirationTime > 0) {
              setTimeout(() => {
                handleLogout();
              }, expirationTime);
            } else {
              // If expirationTime is negative, logout immediately
              handleLogout();
            }
          }
        }
      }
    };

    checkToken();

    // Optionally, set an interval to check periodically (e.g., every minute)
    const interval = setInterval(checkToken, 60000); // 60,000 ms = 1 minute

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<UserHomePage />} />
        <Route path="/electionlist" element={<ElectionListPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/details" element={<ElectionDetailsPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/AdminIn" element={<AdminLoginPage/>}/>
        <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
        <Route path="/CreateElection" element={<CreateElectionPage/>}/>
        <Route path="/assign-parties" element={<AssignPartiesPage/>} />
        <Route path="/sendNot" element={<SendNotifications/>}/>
        <Route path="/manageUsers" element={<ManageUsers/>}/>
        <Route path="/createPost" element={<CreatePostPage/>}/>
        <Route path="/manageElection" element={<ManageElections />}/>
        <Route path="assign-candidate-election" element={<AssignCandidateToElection/>}/>
        <Route path="/CandidateDash" element={<CandidateDashboard />}/>
        <Route path="/candidate/election/:id" element={<MyElectionDetails />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000} // 5 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
