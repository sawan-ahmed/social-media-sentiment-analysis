import React, { useState, useEffect } from "react";
import axios from "axios";

const TweetsPage = () => {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 🔥 Hardcoded backend URL (replace with your actual VM1 IP)
    const BACKEND_URL = "http://129.114.26.43:5000";

    useEffect(() => {
        fetchTweets();
    }, []);

    const fetchTweets = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${BACKEND_URL}/tweets`);
            if (response.data && response.data.data.length > 0) {
                setTweets(response.data.data);
            } else {
                setError("No tweets found.");
            }
        } catch (err) {
            console.error("❌ Error fetching tweets:", err);
            setError("Failed to load tweets. Please try again later.");
        }

        setLoading(false);
    };

    return (
        <div className="tweets-page">
            <h2>📥 Recent AI Tweets</h2>

            <div className="button-container">
                <button onClick={fetchTweets} className="fetch-button" disabled={loading}>
                    {loading ? "Loading..." : "Fetch More Tweets"}
                </button>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul className="tweet-list">
                {tweets.length > 0 ? (
                    tweets.map((tweet, index) => (
                        <li key={tweet.tweet_id || index} className="tweet-item">
                            <strong>{tweet.username || "User"}</strong>: {tweet.text}
                            {tweet.sentiment_label && (
                                <> — <em>{tweet.sentiment_label.toUpperCase()}</em></>
                            )}
                        </li>
                    ))
                ) : (
                    !loading && <p>No tweets available.</p>
                )}
            </ul>
        </div>
    );
};

export default TweetsPage;
