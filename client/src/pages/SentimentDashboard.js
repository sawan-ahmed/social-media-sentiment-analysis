import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/SentimentDashboard.css";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SentimentDashboard = () => {
  const [topic, setTopic] = useState("Vanderbilt");
  const [sentimentData, setSentimentData] = useState(null);
  const [tweetStats, setTweetStats] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState(null);

  const BACKEND_URL = "http://129.114.26.43:5000";

  const fetchSentimentStats = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/results?topic=${encodeURIComponent(topic)}`);
      setSentimentData(res.data);
    } catch (error) {
      console.error("Failed to fetch sentiment stats:", error);
    }
  };

  const fetchTweets = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/tweets?topic=${encodeURIComponent(topic)}`);
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

  const fetchTweetTimeline = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/tweets`);
      if (res.data && res.data.data.length > 0) {
        const grouped = {};
        res.data.data.forEach((tweet) => {
          const date = tweet.created_at;
          if (!grouped[date]) grouped[date] = { positive: 0, neutral: 0, negative: 0 };
          grouped[date][tweet.sentiment?.toLowerCase()] += 1;
        });
        const formatted = Object.entries(grouped).map(([date, sentiments]) => ({ date, ...sentiments }));
        setTweetStats(formatted);
      }
    } catch (err) {
      console.error("Failed to fetch timeline data:", err);
    }
  };

  useEffect(() => {
    fetchSentimentStats();
    fetchTweets();
    fetchTweetTimeline();
  }, [topic]);

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
          <button onClick={() => {
            fetchSentimentStats();
            fetchTweets();
            fetchTweetTimeline();
          }}>
            Analyze
          </button>
        </div>

        {sentimentData && (
          <div className="pie-chart-container">
            <h2 className="section-title">Sentiment Distribution</h2>
            <div className="canvas-wrapper">
              <Pie
                data={{
                  labels: ["Positive", "Neutral", "Negative"],
                  datasets: [
                    {
                      label: "Sentiment",
                      data: [
                        sentimentData.positive,
                        sentimentData.neutral,
                        sentimentData.negative,
                      ],
                      backgroundColor: ["#00C49F", "#FFBB28", "#FF4444"],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: { position: "bottom" },
                    tooltip: {
                      callbacks: {
                        label: (context) => `${context.label}: ${context.raw}`,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        )}

        {tweets.length > 0 && (
          <div className="tweet-list">
            <h2 className="section-title">Recent Comments</h2>
            <ul>
              {tweets.slice(0, 10).map((tweet, index) => (
                <li key={index} className={`tweet-item ${tweet.sentiment?.toLowerCase()}`}>
                  <strong>{tweet.sentiment}:</strong> {tweet.text}
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
