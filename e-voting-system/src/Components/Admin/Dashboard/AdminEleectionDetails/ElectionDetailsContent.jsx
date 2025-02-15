// src/components/admin/ElectionDetailsContent.jsx
import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Divider, Grid, Button } from "@mui/material";
import axios from "axios";
import ElectionForm from "./ElectionForm";
import PartyAccordionList from "./PartyAccordionList";
import PartyCreationDialog from "./PartyCreationDialog";
import "./ElectionDetailsContent.css";

const ElectionDetailsContent = ({
  election,
  parties,
  onSave,
  onDelete,
  refreshParties,
  isSubmitting,
}) => {
  // Election form state
  const [description, setDescription] = useState(election.description);
  const [typeId, setTypeId] = useState(election.typeId);
  const [startDate, setStartDate] = useState(
    new Date(election.startDatetime).toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date(election.endDatetime).toISOString().split("T")[0]
  );
  const [imageUrl, setImageUrl] = useState(election.imageUrl || "");
  const [newFile, setNewFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    election.imageUrl ? `http://localhost:8080/uploads/${election.imageUrl}` : ""
  );
  const [facultyId, setFacultyId] = useState(election.facultyId || "");
  const [departmentId, setDepartmentId] = useState(election.departmentId || "");

  // Additional state for faculties/departments and candidate assignments
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [candidateAssignments, setCandidateAssignments] = useState({});
  const [openPartyDialog, setOpenPartyDialog] = useState(false);

  // Party creation dialog state – used for fetching users via /users/search
  const [newPartyName, setNewPartyName] = useState("");
  const [newPartyBio, setNewPartyBio] = useState("");
  const [campaignManagerSearch, setCampaignManagerSearch] = useState("");
  const [campaignManagerResults, setCampaignManagerResults] = useState([]);
  const [selectedCampaignManagerId, setSelectedCampaignManagerId] = useState("");

  // Fetch faculties on mount
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:8080/faculty-and-department/faculties", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFaculties(response.data);
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };
    fetchFaculties();
  }, []);

  // Fetch departments when faculty changes
  useEffect(() => {
    const fetchDepartments = async () => {
      if (!facultyId) {
        setDepartments([]);
        setDepartmentId("");
        return;
      }
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `http://localhost:8080/faculty-and-department/faculties/${facultyId}/departments`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, [facultyId]);

  // Sync local state if election prop changes.
  useEffect(() => {
    setDescription(election.description);
    setTypeId(election.typeId);
    setStartDate(new Date(election.startDatetime).toISOString().split("T")[0]);
    setEndDate(new Date(election.endDatetime).toISOString().split("T")[0]);
    setImageUrl(election.imageUrl || "");
    setFacultyId(election.facultyId || "");
    setDepartmentId(election.departmentId || "");
    setImagePreview(election.imageUrl ? `http://localhost:8080/uploads/${election.imageUrl}` : "");
    setNewFile(null);
  }, [election]);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Build FormData and pass it to the parent's onSave function.
  const handleSaveClick = () => {
    const updatedElection = {
      electionId: election.electionId,
      title: election.title, // read-only
      description,
      typeId: Number(typeId),
      startDatetime: new Date(startDate).toISOString(),
      endDatetime: new Date(endDate).toISOString(),
      imageUrl, // will be replaced on the backend if a file is provided
      facultyId: facultyId ? Number(facultyId) : null,
      departmentId: departmentId ? Number(departmentId) : null,
      isActive: election.isActive,
    };

    const formData = new FormData();
    formData.append("election", new Blob([JSON.stringify(updatedElection)], { type: "application/json" }));
    if (newFile) {
      formData.append("file", newFile);
    }

    onSave(formData);
  };

  return (
    <Card className="election-details-card">
      <CardContent>
        <Typography variant="h4" gutterBottom>{election.title}</Typography>
        <Divider style={{ marginBottom: "1rem" }} />

        <ElectionForm
          election={election}
          description={description}
          setDescription={setDescription}
          typeId={typeId}
          setTypeId={setTypeId}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          imagePreview={imagePreview}
          handleImageChange={handleImageChange}
          facultyId={facultyId}
          setFacultyId={setFacultyId}
          departmentId={departmentId}
          setDepartmentId={setDepartmentId}
          faculties={faculties}
          departments={departments}
        />

        <Divider style={{ margin: "1rem 0" }} />

        <Typography variant="h6" gutterBottom>Parties and Candidates</Typography>
        <PartyAccordionList
          parties={parties}
          candidateAssignments={candidateAssignments}
          setCandidateAssignments={setCandidateAssignments}
          refreshParties={refreshParties}
        />

        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginTop: "0.5rem" }}
          onClick={() => setOpenPartyDialog(true)}
          type="button"
        >
          Add Party
        </Button>

        <Divider style={{ margin: "1rem 0" }} />

        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveClick}
              type="button"
              disabled={isSubmitting}
            >
              Save
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="error" onClick={onDelete} type="button">
              Delete
            </Button>
          </Grid>
        </Grid>

        <PartyCreationDialog
          open={openPartyDialog}
          onClose={() => setOpenPartyDialog(false)}
          electionId={election.electionId}
          newPartyName={newPartyName}
          setNewPartyName={setNewPartyName}
          newPartyBio={newPartyBio}
          setNewPartyBio={setNewPartyBio}
          campaignManagerSearch={campaignManagerSearch}
          setCampaignManagerSearch={setCampaignManagerSearch}
          campaignManagerResults={campaignManagerResults}
          setCampaignManagerResults={setCampaignManagerResults}
          selectedCampaignManagerId={selectedCampaignManagerId}
          setSelectedCampaignManagerId={setSelectedCampaignManagerId}
          refreshParties={refreshParties}
        />
      </CardContent>
    </Card>
  );
};

export default ElectionDetailsContent;
