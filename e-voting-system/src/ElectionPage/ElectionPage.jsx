import React, { useState } from "react";
import "./ElectionPage.css";
import mohammad from '../assets/Mohammad.jpg';


const ElectionPage = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [voted, setVoted] = useState(false);

  const candidates = [
    {
      id: 1,
      name: "Candidate A",
      description: "Faculty of Science",
      image: "https://via.placeholder.com/150", // Replace with actual candidate image URL
    },
    {
      id: 2,
      name: "Candidate B",
      description: "Faculty of Engineering",
      image: "https://via.placeholder.com/150", // Replace with actual candidate image URL
    },
    {
      id: 3,
      name: "Candidate C",
      description: "Faculty of Business",
      image: "https://via.placeholder.com/150", // Replace with actual candidate image URL
    },
  ];

  const handleVote = () => {
    if (selectedCandidate) {
      alert(`You voted for ${selectedCandidate}`);
      setVoted(true);
    } else {
      alert("Please select a candidate before voting!");
    }
  };

  return (
    <div className="election-page-container">
      <header className="election-header">
        <h1>Birzeit Vote</h1>
        <nav>
          <button>Dashboard</button>
          <button>Profile</button>
          <button className="logout-button">Logout</button>
        </nav>
      </header>

      <main className="election-main">
        <h2>Ongoing Election</h2>
        <p>Select a candidate and cast your vote.</p>

        <div className="candidates-list">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className={`candidate-card ${
                selectedCandidate === candidate.name ? "selected" : ""
              }`}
              onClick={() => setSelectedCandidate(candidate.name)}
            >
              <img
                src={mohammad}
                alt={candidate.name}
                className="candidate-image"
              />
              <h3>{candidate.name}</h3>
              <p>{candidate.description}</p>
            </div>
          ))}
        </div>

        {!voted ? (
          <button onClick={handleVote} className="vote-button">
            Vote
          </button>
        ) : (
          <p className="thank-you-message">Thank you for voting!</p>
        )}
      </main>

      <footer className="election-footer">
        © 2024/25 BirzeitVote - All Rights Reserved
      </footer>
    </div>
  );
};

export default ElectionPage;
