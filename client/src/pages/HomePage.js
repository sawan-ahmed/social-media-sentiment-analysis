import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="home-page">
            <h1>🌐 Distributed Twitter Sentiment Analysis</h1>
            <p>
                This project analyzes real-time Twitter discussions using a distributed system powered by Kafka,
                Flask, and custom machine learning. Tweets are streamed from the Twitter API, processed across
                multiple virtual machines, and classified based on sentiment.
            </p>

            <h2>🔧 System Overview</h2>
            <ul>
                <li>💬 <strong>VM1:</strong> Twitter producer + Flask API triggered by the frontend</li>
                <li>🧠 <strong>VM4:</strong> Inference consumer that forwards tweets to the ML pipeline</li>
                <li>📊 <strong>VM3:</strong> ML consumer using custom MapReduce for sentiment analysis</li>
                <li>📦 <strong>VM2:</strong> Kafka broker facilitating real-time message passing</li>
            </ul>

            <h2>🔍 Project Objectives</h2>
            <ul>
                <li>Collect real-world tweets dynamically based on user input</li>
                <li>Apply custom sentiment analysis using keyword-based MapReduce techniques</li>
                <li>Visualize sentiment trends across topics in a live, interactive frontend</li>
            </ul>

            <h2>🚀 Explore the System</h2>
            <div className="buttons">
                <Link to="/tweets" className="nav-button">📰 View Live Tweets</Link>
                <Link to="/sentiment" className="nav-button">📈 Sentiment Dashboard</Link>
            </div>
        </div>
    );
};

export default HomePage;
