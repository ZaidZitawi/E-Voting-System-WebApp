// src/Components/Admin/SignIn/AdminDashboard.jsx
import React from "react";
import "./AdminDashboard.css";
import AdminDashboardOverview from "./AdminDashboardOverview";
import ElectionsManagement from "./ElectionsManagement";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSideNavBar from "../AdminSideNavBar/AdminSideNavBar";
import Footer from "../../Footer/Footer";

const AdminDashboard = () => {
  return (
    <>
      <AdminHeader />
      <AdminSideNavBar />
      {/* Wrapper for main content and footer */}
      <div className="admin-main-wrapper">
        {/* Dashboard Overview Section */}
        <AdminDashboardOverview />
        {/* Elections Management Section */}
        <ElectionsManagement />
        <Footer />
      </div>
    </>
  );
};

export default AdminDashboard;
