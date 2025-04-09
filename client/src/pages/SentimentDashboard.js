import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Layout from "../pages/Layout";
import "../styles/SentimentDashboard.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SentimentDashboard = () => {
  const [topic, setTopic] = useState("Vanderbilt");
  const [sentimentData, setSentimentData] = useState(null);
  const [tweetStats, setTweetStats] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const fetchTweetTimeline = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/tweets`);
      if (res.data && res.data.data.length > 0) {
        const grouped = {};
        res.data.data.forEach((tweet) => {
          const date = tweet.created_at;
          if (!grouped[date]) grouped[date] = { positive: 0, neutral: 0, negative: 0 };
          grouped[date][tweet.sentiment.toLowerCase()] += 1;
        });
        const formatted = Object.entries(grouped).map(([date, sentiments]) => ({ date, ...sentiments }));
        setTweetStats(formatted);
        setTweets(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch timeline data:", err);
    }
  };

  const fetchTweets = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:5001/tweets");
      console.log("📡 API Response:", response.data);
      if (response.data && response.data.data.length > 0) {
        setTweets(response.data.data);
      } else {
        throw new Error("No tweets found.");
      }
    } catch (error) {
      console.error("❌ Error fetching tweets:", error);
      setError("Failed to load tweets. Please try again later.");
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSentimentStats();
    fetchTweetTimeline();
  }, [topic]);

  return (
    <Layout>
      <div className="dashboard-container">
      <div style={{ textAlign: "center" }}>
        <h1>Sentiment Dashboard</h1>
      </div>

        <div className="topic-input" style={{ textAlign: "center", marginBottom: "20px" }}>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic"
          />
          <button onClick={() => {
            fetchSentimentStats();
            fetchTweetTimeline();
          }}>
            Analyze
          </button>
        </div>

        {sentimentData && (
          <div className="pie-chart-container">
            <h2>Sentiment Distribution</h2>
            <div style={{ width: "400px", height: "400px", margin: "0 auto" }}>
              <Pie
                data={{
                  labels: ["Positive", "Neutral", "Negative"],
                  datasets: [
                    {
                      label: "Sentiment Distribution",
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
                        label: function (context) {
                          return `${context.label}: ${context.raw}%`;
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        )}

        {tweetStats.length > 0 && (
          <div className="timeline-section">
            <h2>📈 Sentiment Timeline</h2>
            <table className="timeline-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>🙂 Positive</th>
                  <th>😐 Neutral</th>
                  <th>☹️ Negative</th>
                </tr>
              </thead>
              <tbody>
                {tweetStats.map((item) => (
                  <tr key={item.date}>
                    <td>{item.date}</td>
                    <td>{item.positive}</td>
                    <td>{item.neutral}</td>
                    <td>{item.negative}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="tweets-container">
          <h2>📝 Recent Tweets</h2>
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <button onClick={fetchTweets} disabled={loading}>
              {loading ? "Loading..." : "Fetch AI Tweets"}
            </button>
          </div>
          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
          {tweets.length > 0 && (
            <ul>
              {tweets.slice(0, 10).map((tweet, index) => (
                <li key={index} className={`tweet-item ${tweet.sentiment.toLowerCase()}`}>
                  <strong>{tweet.sentiment}:</strong> {tweet.text}
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
