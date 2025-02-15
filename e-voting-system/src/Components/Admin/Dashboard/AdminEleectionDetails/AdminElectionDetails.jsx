// src/components/admin/AdminElectionDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminHeader from "../../AdminHeader/AdminHeader";
import AdminSideNavBar from "../../AdminSideNavBar/AdminSideNavBar";
import Footer from "../../../Footer/Footer";
import ElectionDetailsContent from "./ElectionDetailsContent";
import "./AdminElectionDetails.css";

const AdminElectionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [election, setElection] = useState(null);
  const [parties, setParties] = useState([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch election details
  useEffect(() => {
    const fetchElection = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`http://localhost:8080/elections/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setElection(response.data);
      } catch (err) {
        console.error("Error fetching election details:", err);
        setError("Failed to fetch election details.");
      }
    };

    fetchElection();
  }, [id]);

  // Define refreshParties as a function to fetch parties and candidates
  const refreshParties = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const partyResponse = await axios.get(`http://localhost:8080/parties/election/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const partyList = partyResponse.data; // Array of PartyDTO
      const partiesWithCandidates = await Promise.all(
        partyList.map(async (party) => {
          const candidateResponse = await axios.get(
            `http://localhost:8080/candidates/party/${party.partyId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          return { ...party, candidates: candidateResponse.data };
        })
      );
      setParties(partiesWithCandidates);
    } catch (err) {
      console.error("Error refreshing parties:", err);
    }
  };

  // Fetch parties on mount
  useEffect(() => {
    if (id) {
      refreshParties();
    }
  }, [id]);

  // Handle save using a loading state to prevent duplicate requests.
  const handleSave = async (formData) => {
    if (isSubmitting) return; // prevent duplicate submissions
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `http://localhost:8080/admin/elections/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          // Ensure Axios sends the FormData as is
          transformRequest: [(data) => data],
        }
      );
      setElection(response.data);
      alert("Election updated successfully.");
      // Refresh parties after update
      refreshParties();
    } catch (err) {
      console.error("Error updating election:", err);
      alert("Failed to update the election.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this election?")) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.delete(`http://localhost:8080/admin/elections/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Election deleted successfully.");
        navigate("/AdminDashboard");
      } catch (err) {
        console.error("Error deleting election:", err);
        alert("Failed to delete the election.");
      }
    }
  };

  if (error) return <div className="admin-election-details-error">{error}</div>;
  if (!election)
    return (
      <div className="admin-election-details-loading">
        Loading election details...
      </div>
    );

  return (
    <>
      <AdminHeader />
      <AdminSideNavBar />
      <div className="admin-main-wrapper">
        <ElectionDetailsContent
          election={election}
          parties={parties}
          onSave={handleSave}
          onDelete={handleDelete}
          isSubmitting={isSubmitting}
          refreshParties={refreshParties}
        />
        <Footer />
      </div>
    </>
  );
};

export default AdminElectionDetails;
