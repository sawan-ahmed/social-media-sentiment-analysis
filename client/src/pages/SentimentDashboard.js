import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../styles/SentimentDashboard.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SentimentDashboard = () => {
  const [topic, setTopic] = useState("Vanderbilt");
  const [sentimentData, setSentimentData] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);

  const fetchSentimentStats = useCallback(async () => {
    try {
      const res = await axios.get(`/api/results?topic=${encodeURIComponent(topic)}`);
      setSentimentData(res.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch sentiment stats:", err);
      setError("Could not load sentiment data.");
    }
  }, [topic]);

  const fetchTweets = useCallback(async () => {
    try {
      const res = await axios.get(`/tweets?topic=${encodeURIComponent(topic)}`);
      setTweets(res.data?.data || []);
      setError(null);
    } catch (err) {
      console.error("Tweet fetch failed:", err);
      setError("Could not load tweets.");
    }
  }, [topic]);

  const startAnalysis = async () => {
    if (!topic.trim()) return;
    setStatus("Starting analysis...");
    try {
      await axios.post(`/api/analyze`, { topic });
      setStatus("⏳ Analyzing... please wait.");

      setTimeout(() => {
        fetchSentimentStats();
        fetchTweets();
        setStatus("Analysis complete!");
      }, 6000);
    } catch (err) {
      console.error("Error starting analysis", err);
      setStatus("Failed to start analysis.");
    }
  };

  useEffect(() => {
    if (!topic) return;
    const interval = setInterval(() => {
      fetchSentimentStats();
      fetchTweets();
    }, 10000);
    return () => clearInterval(interval);
  }, [topic, fetchSentimentStats, fetchTweets]);

  const getPieData = () => {
    const { positive = 0, neutral = 0, negative = 0 } = sentimentData || {};
    const total = positive + neutral + negative || 1;
    return [(positive / total) * 100, (neutral / total) * 100, (negative / total) * 100];
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Sentiment Dashboard</h1>

      <div className="topic-input">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic"
        />
        <button onClick={startAnalysis}>Analyze</button>
      </div>

      {status && <p style={{ textAlign: "center" }}>{status}</p>}

      {sentimentData && (
        <div className="pie-chart-container">
          <h2>Sentiment Distribution</h2>
          <Pie
            data={{
              labels: ["Positive", "Neutral", "Negative"],
              datasets: [{
                data: getPieData(),
                backgroundColor: ["#00C49F", "#FFBB28", "#FF4444"],
                borderWidth: 1
              }]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "bottom" },
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.label}: ${context.raw.toFixed(1)}%`,
                  },
                },
              },
            }}
            height={300}
          />
        </div>
      )}

      {tweets.length > 0 && (
        <div className="tweet-list">
          <h2 className="section-title">Recent Comments</h2>
          <ul>
            {tweets.slice(0, 10).map((tweet, i) => (
              <li key={i} className={`tweet-item ${tweet.sentiment_label?.toLowerCase()}`}>
                <strong>{tweet.sentiment_label}:</strong> {tweet.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default SentimentDashboard;
