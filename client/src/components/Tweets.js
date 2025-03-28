import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const Tweets = ({ setTweets }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ✅ Wrap fetchTweets in useCallback to prevent unnecessary re-renders
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
    }, [setTweets]); // ✅ Add `setTweets` as a dependency

    useEffect(() => {
        fetchTweets();
    }, [fetchTweets]); // ✅ Now we include fetchTweets as a dependency

    return (
        <div className="tweets-container">
            <button onClick={fetchTweets} className="refresh-button" disabled={loading}>
                {loading ? "Loading..." : "Fetch AI Tweets"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Tweets;
