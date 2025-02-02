import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import VotingSystemABI from "../../VotingSystem.json";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import "./ElectionAnalytics.css";

// Replace with your actual deployed contract address on the Polygon Amoy testnet
const contractAddress = "0x4E0121aF93679B40690DEA62652f0232CB5ecE93";

const ElectionAnalytics = () => {
  const [voterTurnoutData, setVoterTurnoutData] = useState([]);
  const [votingTrendsData, setVotingTrendsData] = useState([]);

  useEffect(() => {
    const fetchVotesData = async () => {
      try {
        const provider = new ethers.JsonRpcProvider("https://polygon-amoy.infura.io/v3/957f1ca772d24c7fb7a9b8b97f42f77c");
        const contract = new ethers.Contract(contractAddress, VotingSystemABI.abi, provider);
        
        // Replace with the actual electionId you want to fetch data for
        const electionId = 48;
        const votes = await contract.getVotes(electionId);
        
        // Process the votes to create chart data
        const totalVotes = votes.length;
        
        // For demonstration, assume the vote (if any) was cast in January and at 13:00
        const turnoutData = [
          { month: "Jan", turnout: totalVotes },
          { month: "Feb", turnout: 0 },
          { month: "Mar", turnout: 0 },
          { month: "Apr", turnout: 0 },
          { month: "May", turnout: 0 },
          { month: "Jun", turnout: 0 },
        ];
        
        const trendsData = [
          { time: "09:00", votes: 0 },
          { time: "10:00", votes: 0 },
          { time: "11:00", votes: 0 },
          { time: "12:00", votes: 0 },
          { time: "13:00", votes: totalVotes },
          { time: "14:00", votes: 0 },
          { time: "15:00", votes: 0 },
          { time: "16:00", votes: 0 },
          { time: "17:00", votes: 0 },
          { time: "18:00", votes: 0 },
        ];

        setVoterTurnoutData(turnoutData);
        setVotingTrendsData(trendsData);
      } catch (error) {
        console.error("Error fetching votes data:", error);
      }
    };

    fetchVotesData();
  }, []);

  return (
    <section className="election-analytics">
      <h2>Election Analytics</h2>
      <div className="charts-container">
        {/* Voter Turnout Bar Chart */}
        <div className="chart-card">
          <h3>Voter Turnout (Monthly)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={voterTurnoutData}>
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="turnout" fill="#2f8a4c" />
            </BarChart>
          </ResponsiveContainer>
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
