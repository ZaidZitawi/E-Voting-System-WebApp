// src/components/admin/PartyCreationDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  DialogActions,
  Button,
} from "@mui/material";
import axios from "axios";

const PartyCreationDialog = ({
  open,
  onClose,
  electionId,
  newPartyName,
  setNewPartyName,
  newPartyBio,
  setNewPartyBio,
  campaignManagerSearch,
  setCampaignManagerSearch,
  campaignManagerResults,
  setCampaignManagerResults,
  selectedCampaignManagerId,
  setSelectedCampaignManagerId,
  refreshParties,
}) => {
  // Search for users by email
  const handleCampaignManagerSearch = async (e) => {
    const term = e.target.value;
    setCampaignManagerSearch(term);
    if (term.length > 2) {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `http://localhost:8080/users/search?email=${term}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCampaignManagerResults(response.data);
      } catch (error) {
        console.error("Error searching users by email:", error);
      }
    } else {
      setCampaignManagerResults([]);
    }
  };

  const handleSelectCampaignManager = (user) => {
    setSelectedCampaignManagerId(user.userId);
    setCampaignManagerSearch(user.email);
    setCampaignManagerResults([]);
  };

  // Create new party using the provided endpoint
  const handleCreateParty = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        "http://localhost:8080/admin/parties/create-with-manager",
        {
          name: newPartyName,
          bio: newPartyBio,
          campaignManagerId: selectedCampaignManagerId,
          electionId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Party created successfully.");
      onClose();
      refreshParties();
    } catch (err) {
      console.error("Error creating party", err);
      alert("Failed to create party.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Party</DialogTitle>
      <DialogContent>
        <TextField
          label="Party Name"
          value={newPartyName}
          onChange={(e) => setNewPartyName(e.target.value)}
          fullWidth
          margin="dense"
          variant="outlined"
        />
        <TextField
          label="Bio"
          value={newPartyBio}
          onChange={(e) => setNewPartyBio(e.target.value)}
          fullWidth
          margin="dense"
          variant="outlined"
        />
        <TextField
          label="Search Campaign Manager by Email"
          value={campaignManagerSearch}
          onChange={handleCampaignManagerSearch}
          fullWidth
          margin="dense"
          variant="outlined"
          style={{ marginTop: "0.5rem" }}
        />
        {campaignManagerResults.length > 0 && (
          <List>
            {campaignManagerResults.map((user) => (
              <ListItem
                button
                key={user.userId}
                onClick={() => handleSelectCampaignManager(user)}
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
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreateParty} color="primary" variant="contained">
          Create Party
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PartyCreationDialog;
