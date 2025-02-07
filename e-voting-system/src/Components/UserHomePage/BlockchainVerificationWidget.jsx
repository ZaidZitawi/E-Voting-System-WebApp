import React, { useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import successAnimation from "../../assets/Ether.json";
import errorAnimation from "../../assets/errorAnimation.json";
import pendingAnimation from "../../assets/pendingAnimation.json";
import Blockchain from "../../assets/Blockchain.json";
import "./BlockchainVerificationWidget.css";

const BlockchainVerificationWidget = () => {
  const [transactionHash, setTransactionHash] = useState("");
  const [transactionData, setTransactionData] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setTransactionHash(e.target.value);
    setTransactionData(null);
    setError(null);
    setStatus(null);
  };

  const handleVerify = async () => {
    if (!transactionHash.startsWith("0x") || transactionHash.length !== 66) {
      setError("Invalid transaction format");
      setStatus("error");
      return;
    }

    setStatus("pending");
    setError(null);

    try {
      const response = await axios.get(
        `https://api-amoy.polygonscan.com/api?module=proxy&action=eth_getTransactionByHash&txhash=${transactionHash}&apikey=GC4WK4U1PP3VHRWVSZKAMSV9YX62ZMX59G`
      );

      const data = response.data;

      if (data.result) {
        // Fetch block details to get the timestamp
        const blockNumber = data.result.blockNumber;
        const blockResponse = await axios.get(
          `https://api-amoy.polygonscan.com/api?module=proxy&action=eth_getBlockByNumber&tag=${blockNumber}&boolean=true&apikey=GC4WK4U1PP3VHRWVSZKAMSV9YX62ZMX59G`
        );

        let timestamp = "Unknown";
        if (blockResponse.data.result?.timestamp) {
          const unixTimestamp = parseInt(blockResponse.data.result.timestamp, 16);
          timestamp = new Date(unixTimestamp * 1000).toLocaleString();
        }

        setTransactionData({ ...data.result, timestamp });
        setStatus("success");
      } else {
        setError("Transaction not found");
        setStatus("error");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
      setStatus("error");
    }
  };

  return (
    <div className="verification-container">
      {/* Left Section: Verification Widget */}
      <div className="verification-widget">
        <h2>Blockchain Verification</h2>
        <p>Verify your vote by pasting the transaction ID below.</p>

        <div className="input-container">
          <input
            type="text"
            placeholder="Paste your transaction ID (0x...)"
            value={transactionHash}
            onChange={handleInputChange}
            className={error ? "input-error" : ""}
          />
          <button onClick={handleVerify}>Verify</button>
        </div>

        {error && <p className="error-message">⚠️ {error}</p>}

        {status === "pending" && (
          <div className="result-container">
            <Lottie animationData={pendingAnimation} loop={true} className="status-animation" />
            <p>Verifying your transaction...</p>
          </div>
        )}

        {status === "success" && transactionData && (
          <div className="transaction-preview result-container">
            <Lottie animationData={successAnimation} loop={true} className="status-animation" />
            <p><strong>Block Number:</strong> {transactionData.blockNumber}</p>
            <p><strong>From:</strong> {transactionData.from}</p>
            <p><strong>To:</strong> {transactionData.to}</p>
            <p><strong>Transaction Timestamp:</strong> {transactionData.timestamp}</p>

            <a
              href={`https://amoy.polygonscan.com/tx/${transactionHash}#eventlog`}
              target="_blank"
              rel="noopener noreferrer"
              className="explorer-link"
            >
              🔍 View Transaction on Blockchain Explorer
            </a>
          </div>
        )}

        {status === "error" && (
          <div className="result-container">
            <Lottie animationData={errorAnimation} loop={true} className="status-animation" />
            <p>Error verifying the transaction. Please try again.</p>
          </div>
        )}
      </div>

      {/* Right Section: Blockchain Animation */}
      <div className="blockchain-animation">
        <Lottie animationData={Blockchain} loop={true} className="blockchain-lottie" />
        <p className="animation-text">Secure. Immutable. Transparent. Powered by Blockchain.</p>
      </div>
    </div>
  );
};

export default BlockchainVerificationWidget;
