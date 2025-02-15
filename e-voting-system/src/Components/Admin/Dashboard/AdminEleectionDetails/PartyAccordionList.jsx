// src/components/admin/PartyAccordionList.jsx
import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Grid,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

const PartyAccordionList = ({
  parties,
  candidateAssignments,
  setCandidateAssignments,
  refreshParties,
}) => {
  // Candidate search and assignment functions.
  const handleCandidateSearch = async (partyId, value) => {
    // Update search value immediately
    setCandidateAssignments((prev) => ({
      ...prev,
      [partyId]: { search: value, results: [] },
    }));
    if (value.length > 2) {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `http://localhost:8080/users/search?email=${value}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCandidateAssignments((prev) => ({
          ...prev,
          [partyId]: { ...prev[partyId], results: response.data },
        }));
      } catch (err) {
        console.error("Error searching candidates by email:", err);
      }
    }
  };

  const handleSelectCandidateForParty = (partyId, user) => {
    setCandidateAssignments((prev) => ({
      ...prev,
      [partyId]: {
        ...prev[partyId],
        selected: user.userId,
        selectedEmail: user.email,
        search: user.email,
        results: [],
      },
    }));
  };

  // Use the assign-candidates endpoint to assign candidate(s) to a party.
  const handleAssignCandidate = async (partyId) => {
    const selectedCandidate = candidateAssignments[partyId]?.selected;
    if (!selectedCandidate) {
      alert("Please select a candidate.");
      return;
    }
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `http://localhost:8080/admin/parties/${partyId}/assign-candidates`,
        [selectedCandidate],
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Candidate assigned to party successfully.");
      refreshParties();
    } catch (err) {
      console.error("Error assigning candidate:", err);
      alert("Failed to assign candidate to party.");
    }
  };

  const handleDeleteCandidate = async (candidateId) => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.delete(`http://localhost:8080/admin/candidates/${candidateId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Candidate deleted successfully.");
        refreshParties();
      } catch (err) {
        console.error("Error deleting candidate:", err);
        alert("Failed to delete candidate.");
      }
    }
  };

  const handleDeleteParty = async (partyId) => {
    if (window.confirm("Are you sure you want to delete this party?")) {
      try {
        const token = localStorage.getItem("authToken");
        // Updated URL to match backend mapping "/party/{partyId}"
        await axios.delete(`http://localhost:8080/parties/${partyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Party deleted successfully.");
        refreshParties();
      } catch (err) {
        console.error("Error deleting party:", err);
        alert("Failed to delete party.");
      }
    }
  };

  return (
    <>
      {parties.length > 0 ? (
        parties.map((party) => (
          <Accordion key={party.partyId}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">{party.name}</Typography>
              {/* Change the button component to 'span' and stop propagation */}
              <Button
                component="span"
                variant="outlined"
                color="error"
                size="small"
                style={{ marginLeft: "auto" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteParty(party.partyId);
                }}
              >
                Delete Party
              </Button>
            </AccordionSummary>
            <AccordionDetails>
              {party.candidates && party.candidates.length > 0 ? (
                <List>
                  {party.candidates.map((candidate) => (
                    <ListItem key={candidate.candidateId} divider>
                      <ListItemAvatar>
                        <Avatar
                          src={`http://localhost:8080/uploads/${candidate.profilePicture}`}
                          className="circular-image"
                        />
                      </ListItemAvatar>
                      <ListItemText primary={candidate.candidateName} />
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDeleteCandidate(candidate.candidateId)}
                      >
                        Remove Candidate
                      </Button>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No candidates added.
                </Typography>
              )}
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={8}>
                  <TextField
                    label="Search Candidate by Email"
                    value={candidateAssignments[party.partyId]?.search || ""}
                    onChange={(e) =>
                      handleCandidateSearch(party.partyId, e.target.value)
                    }
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAssignCandidate(party.partyId)}
                  >
                    Add Candidate
                  </Button>
                </Grid>
                {candidateAssignments[party.partyId]?.results?.length > 0 && (
                  <Grid item xs={12}>
                    <List>
                      {candidateAssignments[party.partyId].results.map((user) => (
                        <ListItem
                          key={user.userId}
                          button
                          onClick={() =>
                            handleSelectCandidateForParty(party.partyId, user)
                          }
                        >
                          <ListItemAvatar>
                            <Avatar
                              src={`http://localhost:8080/uploads/${user.profilePicture}`}
                              className="circular-image"
                            />
                          </ListItemAvatar>
                          <ListItemText primary={user.email} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">
          No parties added.
        </Typography>
      )}
    </>
  );
};

export default PartyAccordionList;
