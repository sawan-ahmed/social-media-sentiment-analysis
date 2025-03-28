import React from "react";

const SentimentPage = () => {
    return (
        <div className="sentiment-page">
            <h2>Sentiment Analysis Visualization</h2>

            {/* Placeholder Visualization */}
            <div className="sentiment-placeholder">
                <p>📊 Sentiment analysis will be displayed here.</p>
                <p>We are working on processing tweets for sentiment insights!</p>
                <div className="chart-placeholder">
                    <div className="positive-bar" style={{ width: "50%" }}>🙂 Positive</div>
                    <div className="neutral-bar" style={{ width: "30%" }}>😐 Neutral</div>
                    <div className="negative-bar" style={{ width: "20%" }}>☹️ Negative</div>
                </div>
            </div>
        </div>
    );
};

export default SentimentPage;
