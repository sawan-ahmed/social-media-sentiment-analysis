import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../pages/Layout";
import "../styles/SentimentDashboard.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SentimentDashboard = () => {
  const [topic, setTopic] = useState("Vanderbilt");
  const [sentimentData, setSentimentData] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState(null);
  const BACKEND_URL = "http://129.114.26.43:5000";

  const fetchSentimentStats = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/results?topic=${encodeURIComponent(topic)}`);
      setSentimentData(res.data);
      setError(null);
    } catch (err) {
      console.error("Sentiment fetch failed:", err);
      setError("Failed to load sentiment stats.");
    }
  };

  const fetchTweets = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/tweets`);
      if (res.data?.data?.length > 0) {
        setTweets(res.data.data);
        setError(null);
      } else {
        throw new Error("No tweets found.");
      }
    } catch (err) {
      console.error("Tweet fetch failed:", err);
      setTweets([]);
      setError("Failed to load tweets. Please try again later.");
    }
  };

  useEffect(() => {
    fetchSentimentStats();
    fetchTweets();
  }, [topic]);

  const getPieData = () => {
    const { positive, neutral, negative } = sentimentData;
    const total = positive + neutral + negative || 1;
    return [
      (positive / total) * 100,
      (neutral / total) * 100,
      (negative / total) * 100,
    ];
  };

  return (
    <Layout>
      <div className="dashboard-container">
        <h1 style={{ textAlign: "center" }}>Sentiment Dashboard</h1>

        <div className="topic-input" style={{ textAlign: "center", marginBottom: "1rem" }}>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic"
          />
          <button onClick={() => {
            fetchSentimentStats();
            fetchTweets();
          }}>
            Analyze
          </button>
        </div>

        {sentimentData && (
          <div className="pie-chart-container" style={{ maxWidth: "400px", margin: "0 auto" }}>
            <h2 style={{ textAlign: "center", color: "green" }}>Sentiment Distribution</h2>
            <Pie
              data={{
                labels: ["Positive", "Neutral", "Negative"],
                datasets: [
                  {
                    data: getPieData(),
                    backgroundColor: ["#00C49F", "#FFBB28", "#FF4444"],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "bottom" },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `${context.label}: ${context.raw.toFixed(1)}%`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <h2>Recent Comments</h2>
          <button onClick={fetchTweets}>Fetch Comments</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {tweets.length > 0 && (
            <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
              {tweets.slice(0, 10).map((tweet, idx) => (
                <li
                  key={idx}
                  style={{
                    backgroundColor: "#f4f4f4",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  <strong>{tweet.sentiment}</strong>: {tweet.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SentimentDashboard;
