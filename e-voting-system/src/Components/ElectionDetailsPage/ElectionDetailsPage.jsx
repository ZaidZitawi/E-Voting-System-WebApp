// src/Components/ElectionDetailsPage/ElectionDetailsPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ElectionCoverageSection from "./ElectionCoverageSection/ElectionCoverageSection";
import PartiesOverviewSection from "./PartiesPieChartSection/PartiesOverviewSection.jsx";
import LeadershipBoardSection from "./LeadershipBoardSection/LeaderShipBoard.jsx";
import PostsSection from "./PostsSection/PostSection.jsx";
import BlockchainVerificationWidget from "../UserHomePage/BlockchainVerificationWidget.jsx";
import "./ElectionDetailsPage.css";
import axios from "axios";
import { ethers } from "ethers";
import VotingSystemABI from "../../VotingSystem.json";
import { useJwt } from "react-jwt";

const wsProviderUrl =
  "wss://polygon-amoy.infura.io/ws/v3/957f1ca772d24c7fb7a9b8b97f42f77c";
const contractAddress = "0x4E0121aF93679B40690DEA62652f0232CB5ecE93";

const ElectionDetailsPage = () => {
  const { id } = useParams();
  const electionId = parseInt(id, 10);

  // STATE DECLARATIONS
  const [election, setElection] = useState(null);
  const [parties, setParties] = useState([]);
  const [candidates, setCandidates] = useState([]); // Fetched from /candidates/election/{electionId}
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blockchainTotalVotes, setBlockchainTotalVotes] = useState(0);
  const [partiesWithVotes, setPartiesWithVotes] = useState([]);

  // Always call hooks in the same order.
  // Retrieve the auth token (defaulting to an empty string) and decode it.
  const authToken = localStorage.getItem("authToken") || "";
  const { decodedToken } = useJwt(authToken);

  // 1) Fetch election details.
  useEffect(() => {
    const fetchElection = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!authToken)
          throw new Error("No authentication token found. Please log in.");
        const response = await axios.get(`http://localhost:8080/elections/${id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setElection(response.data);
        console.log("Election data:", response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch election data."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchElection();
  }, [id, authToken]);

  // 2) Fetch parties for the election.
  useEffect(() => {
    const fetchPartiesForElection = async () => {
      try {
        if (!authToken)
          throw new Error("No authentication token found. Please log in.");
        const res = await axios.get(`http://localhost:8080/parties/election/${id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setParties(res.data || []);
      } catch (err) {
        console.error("Error fetching parties:", err);
      }
    };
    fetchPartiesForElection();
  }, [id, authToken]);

  // 2b) Fetch candidates for the election.
  useEffect(() => {
    const fetchCandidatesForElection = async () => {
      try {
        if (!authToken)
          throw new Error("No authentication token found. Please log in.");
        const res = await axios.get(`http://localhost:8080/candidates/election/${id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setCandidates(res.data || []);
        console.log("Fetched candidates:", res.data);
      } catch (err) {
        console.error("Error fetching candidates:", err);
        setCandidates([]);
      }
    };
    fetchCandidatesForElection();
  }, [id, authToken]);

  // 3) Fetch blockchain data from Infura.
  const fetchBlockchainData = async (ourParties) => {
    if (!electionId) return;
    try {
      const provider = new ethers.WebSocketProvider(wsProviderUrl);
      const contract = new ethers.Contract(
        contractAddress,
        VotingSystemABI.abi,
        provider
      );
      // Total votes:
      const votesArray = await contract.getVotes(electionId);
      setBlockchainTotalVotes(votesArray.length);

      // Get votes per party.
      const updatedParties = await Promise.all(
        ourParties.map(async (party) => {
          const normalizedId = party.id || party.partyId;
          if (!normalizedId) return party;
          try {
            const votesForParty = await contract.getVotesForParty(
              electionId,
              normalizedId
            );
            return {
              ...party,
              id: normalizedId,
              votes: votesForParty.length,
            };
          } catch (err) {
            console.error("Error fetching votes for party", normalizedId, err);
            return { ...party, id: normalizedId, votes: 0 };
          }
        })
      );
      updatedParties.sort((a, b) => (b.votes || 0) - (a.votes || 0));
      setPartiesWithVotes(updatedParties);
      provider.destroy();
    } catch (error) {
      console.error("Error in fetchBlockchainData:", error);
    }
  };

  // 4) Poll blockchain data every 30 seconds.
  useEffect(() => {
    if (!electionId || !parties.length) return;
    const doFetch = () => fetchBlockchainData(parties);
    doFetch();
    const interval = setInterval(doFetch, 30000);
    return () => clearInterval(interval);
  }, [electionId, parties]);

  // 5) Early returns for loading/error states.
  if (loading) {
    return (
      <>
        <Header />
        <main className="election-details-page">
          <div>Loading election details...</div>
        </main>
        <Footer />
      </>
    );
  }
  if (error && !election) {
    return (
      <>
        <Header />
        <main className="election-details-page">
          <div>Error loading election: {error}</div>
        </main>
        <Footer />
      </>
    );
  }
  if (!election) {
    return (
      <>
        <Header />
        <main className="election-details-page">
          <div>Election not found.</div>
        </main>
        <Footer />
      </>
    );
  }

  // 6) Determine if the logged-in user is allowed to post.
  // For candidates, we now compare the candidate's userId from the candidate list
  // with the logged-in user's id stored in localStorage.
  let canPost = false;
  if (decodedToken) {
    const userRole = decodedToken.role; // e.g., "ROLE_CANDIDATE" or "ROLE_PARTY_MANAGER"
    if (userRole === "ROLE_CANDIDATE" && candidates.length > 0) {
      // Retrieve the logged-in candidate's userId from localStorage.
      const loggedCandidateId = Number(localStorage.getItem("userId"));
      canPost = candidates.some(
        (candidate) => candidate.userId === loggedCandidateId
      );
    } else if (userRole === "ROLE_PARTY_MANAGER" && parties.length > 0) {
      // Compare using the party's partyId from the fetched data.
      const partyId = parseInt(localStorage.getItem("partyId"), 10);
      canPost = parties.some((party) => party.partyId === partyId);
    }
  }

  return (
    <>
      <Header />
      <main className="election-details-page">
        {/* 1) Coverage Section */}
        <ElectionCoverageSection election={election} parties={parties} />

        {/* 2) Parties & Pie Chart Overview Section */}
        <section className="parties-overview-section">
          <PartiesOverviewSection
            electionId={electionId}
            parties={parties}
            totalVotes={blockchainTotalVotes}
            partiesWithVotes={partiesWithVotes}
          />
        </section>

        {/* 3) Leadership Board Section */}
        <section className="leadership-board-section">
          <h1 className="leadership-board-title">🚀LeaderShip Board🚀</h1>
          <LeadershipBoardSection
            electionId={electionId}
            fallbackParties={parties}
            totalVotes={blockchainTotalVotes}
            partiesWithVotes={partiesWithVotes}
          />
        </section>

        {/* 4) Blockchain Verification Component */}
        <section className="blockchain-verification-section">
          <BlockchainVerificationWidget />
        </section>

        {/* 5) Posts Feed Section */}
        <section className="posts-section">
          <PostsSection electionId={electionId} canPost={canPost} />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ElectionDetailsPage;
