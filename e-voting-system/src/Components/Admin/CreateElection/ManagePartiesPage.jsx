import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import "./ManagePartiesPage.css";

const ManagePartiesPage = () => {
  const navigate = useNavigate();
  const [parties, setParties] = useState([]);
  const [partyData, setPartyData] = useState({
    name: "",
    bio: "",
    campaignManager: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPartyData({ ...partyData, [name]: value });
  };

  const addParty = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/parties/create-with-manager", partyData);
      setParties([...parties, response.data]);
      setPartyData({ name: "", bio: "", campaignManager: "" });
    } catch (error) {
      console.error("Error adding party:", error);
    }
  };

  const deleteParty = async (partyId) => {
    try {
      await axios.delete(`/parties/${partyId}`);
      setParties(parties.filter((party) => party.id !== partyId));
    } catch (error) {
      console.error("Error deleting party:", error);
    }
  };

  return (
    <div className="manage-parties-page">
      <Header />
      <h2>Manage Parties</h2>
      <form onSubmit={addParty}>
        <div className="form-group">
          <label>Party Name</label>
          <input
            type="text"
            name="name"
            value={partyData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Party Bio</label>
          <textarea
            name="bio"
            value={partyData.bio}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Campaign Manager</label>
          <select
            name="campaignManager"
            value={partyData.campaignManager}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select Manager
            </option>
            <option value="1">Manager 1</option>
            <option value="2">Manager 2</option>
          </select>
        </div>
        <button type="submit">Add Party</button>
      </form>

      <h3>Existing Parties</h3>
      <ul>
        {parties.map((party) => (
          <li key={party.id}>
            {party.name} - {party.campaignManager}
            <button onClick={() => deleteParty(party.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate("/assign-candidates")}>
        Next: Assign Candidates
      </button>
      <Footer />
    </div>
  );
};

export default ManagePartiesPage;
