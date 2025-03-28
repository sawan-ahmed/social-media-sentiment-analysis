import React, { useState, useEffect } from "react";
import axios from "axios";

const TweetsPage = () => {
    const [tweets, setTweets] = useState([]); // ✅ Store tweets from MongoDB
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTweets();
    }, []);

    const fetchTweets = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get("http://localhost:5001/tweets");
            if (response.data.data.length > 0) {
                setTweets(response.data.data); // ✅ Keep old tweets visible even if API fails
            } else {
                setError("No tweets found.");
            }
        } catch (error) {
            console.error("❌ Error fetching tweets:", error);
            setError("Failed to load new tweets. Showing old tweets.");
        }

        setLoading(false);
    };

    return (
        <div className="tweets-page">
            <h2>Recent AI Tweets</h2>

            {/* ✅ Move button to the right */}
            <div className="button-container">
                <button onClick={fetchTweets} className="fetch-button" disabled={loading}>
                    {loading ? "Loading..." : "Fetch More Tweets"}
                </button>
            </div>

            {/* ✅ Show error message but keep old tweets visible */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul className="tweet-list">
                {tweets.length > 0 ? (
                    tweets.map(tweet => (
                        <li key={tweet.id} className="tweet-item">
                            <strong>{tweet.name} (@{tweet.username})</strong>: {tweet.text} ❤️ {tweet.likes} 🔄 {tweet.retweets}
                        </li>
                    ))
                ) : (
                    !loading && <p>No tweets available. Try again later.</p>
                )}
            </ul>
        </div>
    );
};

export default TweetsPage;
