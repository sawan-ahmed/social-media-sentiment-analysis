import React, { useState, useEffect } from "react";
import axios from "axios";

const SentimentPage = () => {
    const [topic, setTopic] = useState("");
    const [status, setStatus] = useState("");
    const [results, setResults] = useState(null);

    const BACKEND_URL = "http://129.114.26.43:5000"; 

    const startAnalysis = async () => {
        if (!topic.trim()) return;

        setStatus("Starting analysis...");
        try {
            await axios.post(`${BACKEND_URL}/api/analyze`, { topic });
            setStatus("Fetching tweets and running sentiment analysis...");
        } catch (err) {
            console.error(err);
            setStatus("Failed to start analysis.");
        }
    };

    // Poll sentiment results every 5s
    useEffect(() => {
        if (!topic) return;
        const interval = setInterval(async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/results?topic=${encodeURIComponent(topic)}`);
                setResults(res.data);
            } catch (err) {
                console.error("Error fetching sentiment results", err);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [topic]);

    return (
        <div className="sentiment-page">
            <h2>Sentiment Analysis Visualization</h2>

            <div className="input-section">
                <input
                    type="text"
                    placeholder="Enter topic (e.g., ChatGPT)"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                />
                <button onClick={startAnalysis}>Analyze</button>
            </div>

            <p>{status}</p>

            {results && (
                <div className="sentiment-results">
                    <h3>Results for "{topic}":</h3>
                    <ul>
                        <li>🙂 Positive: {results.positive}</li>
                        <li>😐 Neutral: {results.neutral}</li>
                        <li>☹️ Negative: {results.negative}</li>
                    </ul>

                    <div className="chart-placeholder">
                        <div className="positive-bar" style={{ width: `${results.positive || 0}%` }}>🙂 Positive</div>
                        <div className="neutral-bar" style={{ width: `${results.neutral || 0}%` }}>😐 Neutral</div>
                        <div className="negative-bar" style={{ width: `${results.negative || 0}%` }}>☹️ Negative</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SentimentPage;
