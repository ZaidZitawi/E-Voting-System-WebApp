// src/components/admin/CreateElectionPage.jsx
import React, { useState } from "react";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSideNavBar from "../AdminSideNavBar/AdminSideNavBar";
import Footer from "../../Footer/Footer";
import CreateElectionForm from "./CreateElection/CreateElectionForm";
import AssignPartyForm from "./CreateElection/AssignPartyForm";
import "./CreateElectionPage.css";

const CreateElectionPage = () => {
  // This state will be set after the election is created
  const [createdElectionId, setCreatedElectionId] = useState(null);

  return (
    <div className="create-election-page">
      <header className="create-election-header">
        <AdminHeader />
      </header>
      <aside className="create-election-sidebar">
        <AdminSideNavBar />
      </aside>
      <div className="create-election-main-wrapper">
        <main className="create-election-content">
          {createdElectionId === null ? (
            <CreateElectionForm setCreatedElectionId={setCreatedElectionId} />
          ) : (
            <AssignPartyForm electionId={createdElectionId} />
          )}
        </main>
        <footer className="create-election-footer">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default CreateElectionPage;
