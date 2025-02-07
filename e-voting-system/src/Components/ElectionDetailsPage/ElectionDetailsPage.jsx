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

const wsProviderUrl = "wss://polygon-amoy.infura.io/ws/v3/957f1ca772d24c7fb7a9b8b97f42f77c";
const contractAddress = "0x4E0121aF93679B40690DEA62652f0232CB5ecE93";

const ElectionDetailsPage = () => {
  const { id } = useParams();
  const electionId = parseInt(id, 10);

  const [election, setElection] = useState(null);
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // -- CENTRALIZED BLOCKCHAIN + BACKEND STATE --
  const [blockchainTotalVotes, setBlockchainTotalVotes] = useState(0);
  const [partiesWithVotes, setPartiesWithVotes] = useState([]);  

  /* 
     1) Fetch the standard election details from your backend
        (Same as before)
  */
  useEffect(() => {
    const fetchElection = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No authentication token found. Please log in.");

        const response = await axios.get(`http://localhost:8080/elections/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setElection(response.data);
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
  }, [id]);

  /*
     2) Fetch the parties from your backend
  */
  useEffect(() => {
    const fetchPartiesForElection = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No authentication token found. Please log in.");

        const res = await axios.get(`http://localhost:8080/parties/election/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setParties(res.data || []);
      } catch (err) {
        console.error("Error fetching parties:", err);
      }
    };
    fetchPartiesForElection();
  }, [id]);

  /*
     3) A single function that fetches total votes + each party's votes from Infura.
        We'll store it in local states: (blockchainTotalVotes, partiesWithVotes).
  */
  const fetchBlockchainData = async (ourParties) => {
    if (!electionId) return;
    try {
      // Create a single WebSocket provider or HTTP provider
      const provider = new ethers.WebSocketProvider(wsProviderUrl);
      const contract = new ethers.Contract(contractAddress, VotingSystemABI.abi, provider);
      
      // 3-A) Fetch total votes for the election
      const votesArray = await contract.getVotes(electionId);
      const totalVotes = votesArray.length;
      setBlockchainTotalVotes(totalVotes);

      // 3-B) For each party, get the number of votes
      const updatedParties = await Promise.all(
        ourParties.map(async (party) => {
          const normalizedId = party.id || party.partyId;
          if (!normalizedId) return party;

          // calls getVotesForParty(electionId, normalizedId)
          try {
            const votesForParty = await contract.getVotesForParty(electionId, normalizedId);
            return {
              ...party,
              id: normalizedId,
              votes: votesForParty.length,
            };
          } catch (err) {
            console.error("Error fetching votes for party", normalizedId, err);
            return {
              ...party,
              id: normalizedId,
              votes: 0
            };
          }
        })
      );

      // sort by descending votes
      updatedParties.sort((a, b) => (b.votes || 0) - (a.votes || 0));
      setPartiesWithVotes(updatedParties);

      // after calls, close the provider
      provider.destroy();

    } catch (error) {
      console.error("Error in fetchBlockchainData:", error);
    }
  };

  /*
     4) Whenever we have parties or an electionId, we fetch
        the blockchain data. 
        We'll poll only every 30 seconds (or 1 min, your choice).
  */
  useEffect(() => {
    if (!electionId || !parties.length) return;

    // define a function that calls fetchBlockchainData
    const doFetch = () => fetchBlockchainData(parties);

    // initial fetch
    doFetch();

    // poll every 30 secs
    const interval = setInterval(doFetch, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [electionId, parties]);

  /*
     5) Our error/ loading state checks
  */
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

  return (
    <>
      <Header />
      <main className="election-details-page">
        {/* 1) Coverage Section */}
        <ElectionCoverageSection election={election} parties={parties} />

        {/* 2) Parties & Pie Chart Overview Section */}
        <section className="parties-overview-section">
          {/* 
            We pass the data we have to PartiesOverviewSection:
            - electionId if needed
            - original parties from backend
            - totalVotes from chain
            - partiesWithVotes from chain
          */}
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
          {/*
            Same approach: pass totalVotes + partiesWithVotes 
            so we do NOT fetch again from chain
          */}
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
          <PostsSection electionId={electionId} />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ElectionDetailsPage;
