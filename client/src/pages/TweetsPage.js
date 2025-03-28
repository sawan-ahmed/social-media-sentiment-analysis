import React, { useState, useEffect } from "react";
import axios from "axios";

const TweetsPage = () => {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTweets();
    }, []);

    const fetchTweets = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get("http://localhost:5001/tweets");
            if (response.data.data) {
                setTweets(response.data.data);
            }
        } catch (error) {
            console.error("❌ Error fetching tweets:", error);
            setError("Failed to load tweets.");
        }

        setLoading(false);
    };

    return (
        <div className="tweets-page">
            <h2>Recent AI Tweets</h2>
            <button onClick={fetchTweets} disabled={loading}>
                {loading ? "Loading..." : "Fetch More Tweets"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {tweets.map(tweet => (
                    <li key={tweet.id}>
                        <strong>{tweet.name} (@{tweet.username})</strong>: {tweet.text} ❤️ {tweet.likes} 🔄 {tweet.retweets}
                        <br />
                        Sentiment: <strong>{tweet.sentiment}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TweetsPage;
