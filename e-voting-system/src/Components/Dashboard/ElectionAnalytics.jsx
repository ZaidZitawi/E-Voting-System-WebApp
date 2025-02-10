import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import VotingSystemABI from "../../VotingSystem.json";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import PieChartComponent from "../ElectionDetailsPage/PartiesPieChartSection/Parties&Piechart/PieChartComponent.jsx";
import "./ElectionAnalytics.css";

// Replace with your actual deployed contract address on the Polygon Amoy testnet
const contractAddress = "0x4E0121aF93679B40690DEA62652f0232CB5ecE93";

const ElectionAnalytics = ({ electionId }) => {
  const [candidateVoteShare, setCandidateVoteShare] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [votingTrendsData, setVotingTrendsData] = useState([]);

  useEffect(() => {
    const fetchVotesData = async () => {
      try {
        const provider = new ethers.JsonRpcProvider(
          "https://polygon-amoy.infura.io/v3/957f1ca772d24c7fb7a9b8b97f42f77c"
        );
        const contract = new ethers.Contract(
          contractAddress,
          VotingSystemABI.abi,
          provider
        );
        const votes = await contract.getVotes(electionId);
        const total = votes.length;
        setTotalVotes(total);

        // Group votes by candidate (assuming each vote has a 'partyName' field)
        const grouped = votes.reduce((acc, vote) => {
          const name = vote.partyName || "Unknown";
          if (!acc[name]) {
            acc[name] = 0;
          }
          acc[name] += 1;
          return acc;
        }, {});
        const candidateData = Object.keys(grouped).map((name) => ({
          name,
          votes: grouped[name],
        }));
        setCandidateVoteShare(candidateData);

        // For demonstration, use dummy hourly trends data.
        // Replace this with real vote timestamp processing if available.
        const trendsData = [
          { time: "09:00", votes: 0 },
          { time: "10:00", votes: 0 },
          { time: "11:00", votes: 0 },
          { time: "12:00", votes: 0 },
          { time: "13:00", votes: total },
          { time: "14:00", votes: 0 },
          { time: "15:00", votes: 0 },
          { time: "16:00", votes: 0 },
          { time: "17:00", votes: 0 },
          { time: "18:00", votes: 0 },
        ];
        setVotingTrendsData(trendsData);
      } catch (error) {
        console.error("Error fetching votes data:", error);
      }
    };

    if (electionId) {
      fetchVotesData();
    }
  }, [electionId]);

  return (
    <section className="election-analytics">
      <h2>Election Analytics</h2>
      <div className="charts-container">
        {/* Candidate Vote Share Donut Chart */}
        <div className="chart-card">
          <h3>Parties Vote Share</h3>
          <PieChartComponent totalVotes={totalVotes} candidates={candidateVoteShare} />
        </div>

        {/* Voting Trends Line Chart */}
        <div className="chart-card">
          <h3>Voting Trends (Hourly)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={votingTrendsData}>
              <XAxis dataKey="time" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="votes" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default ElectionAnalytics;
