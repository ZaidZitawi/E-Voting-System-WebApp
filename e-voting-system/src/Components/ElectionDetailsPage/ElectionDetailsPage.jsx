// src/pages/ElectionDetailsPage/ElectionDetailsPage.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ElectionCoverageSection from "./ElectionCoverageSection/ElectionCoverageSection";
import CandidatesAndStatesSection from "./ElectionAndStateSection/CandidatesAndStatesSection";
import PostsSection from "./PostSection/PostsSection";
import "./ElectionDetailsPage.css";
import axios from "axios";
import User from '../../assets/User.png';


const ElectionDetailsPage = () => {
  // Get the election id from the URL parameters
  const { id } = useParams();

  // State variables for election data, loading, and error handling
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchElection = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }

        // GET request to fetch the election by id
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

  if (error) {
    return (
      <>
        <Header />
        <main className="election-details-page">
          <div>Error: {error}</div>
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

  // For demonstration purposes, sample data for candidates and posts can be used.
  // In production, you would likely fetch these pieces of information as well.
  const candidates = [
    {
      id: 1,
      name: "Alice Johnson",
      description: "A dedicated leader committed to progress.",
      imageUrl: User,
      profileLink: "/candidates/1",
      votes: 7000,
    },
    {
      id: 2,
      name: "Bob Smith",
      description: "Experienced politician with a vision.",
      imageUrl: User,
      profileLink: "/candidates/2",
      votes: 5000,
    },
    {
      id: 3,
      name: "Carol Williams",
      description: "Passionate advocate for education.",
      imageUrl: User,
      profileLink: "/candidates/3",
      votes: 3000,
    },
    {
      id: 4,
      name: "David Brown",
      description: "Committed to economic growth and stability.",
      imageUrl: User,
      profileLink: "/candidates/4",
      votes: 2000,
    },
  ];

  // Calculate total votes
  const totalVotes = candidates.reduce((acc, candidate) => acc + candidate.votes, 0);

  // Sample posts data – ideally, this would also come from your backend
  const samplePosts = [
    {
      id: 1,
      publisher: {
        name: "Alice Johnson",
        imageUrl: User,
      },
      time: "2024-11-05T10:00:00Z",
      content:
        "Excited to announce my campaign launch for the upcoming Presidential Election!",
      media: "https://via.placeholder.com/500.png?text=Campaign+Launch",
      likes: [
        {
          id: 1,
          name: "Bob Smith",
          imageUrl: "https://via.placeholder.com/40.png?text=Bob",
        },
        {
          id: 2,
          name: "Carol Williams",
          imageUrl: "https://via.placeholder.com/40.png?text=Carol",
        },
      ],
      comments: [
        {
          id: 1,
          commenter: {
            name: "David Brown",
            imageUrl: "https://via.placeholder.com/40.png?text=David",
          },
          text: "Congratulations, Alice! Wishing you the best.",
          time: "2024-11-05T11:00:00Z",
        },
        {
          id: 2,
          commenter: {
            name: "Eve Davis",
            imageUrl: "https://via.placeholder.com/40.png?text=Eve",
          },
          text: "Looking forward to your campaign promises.",
          time: "2024-11-05T12:30:00Z",
        },
      ],
    },
  ];

  return (
    <>
      <Header />
      <main className="election-details-page">
        {/* Pass the election object into ElectionCoverageSection */}
        <ElectionCoverageSection election={election} />
        <CandidatesAndStatesSection
          candidates={candidates}
          electionStates={[]} // Replace with real state data if available
          totalVotes={totalVotes}
        />
        <PostsSection posts={samplePosts} />
      </main>
      <Footer />
    </>
  );
};

export default ElectionDetailsPage;
