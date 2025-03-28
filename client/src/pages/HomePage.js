import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="home-page">
            <h1>📊 AI Sentiment Analysis Research</h1>
            <p>
                AI is transforming the world, sparking excitement and concerns.
                This project analyzes Twitter discussions on AI to understand public sentiment.
            </p>
            
            <h2>🔍 Research Goals</h2>
            <ul>
                <li>Analyze AI-related tweets to determine if sentiment is positive, neutral, or negative.</li>
                <li>Identify common themes in AI discussions (e.g., ethics, automation, job security).</li>
                <li>Compare how AI sentiment evolves over time.</li>
            </ul>

            <h2>📌 What’s Next?</h2>
            <p>
                We will implement **NLP-based sentiment analysis** and visualize AI-related trends.
            </p>

            <h2>🚀 Explore the Project</h2>
            <div className="buttons">
                <Link to="/tweets" className="nav-button">View AI Tweets</Link>
                <Link to="/sentiment" className="nav-button">Sentiment Analysis</Link>
            </div>
        </div>
    );
};

export default HomePage;
