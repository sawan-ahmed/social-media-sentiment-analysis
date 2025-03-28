require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose"); // ✅ MongoDB connection
const Sentiment = require("sentiment");

const app = express();
const PORT = process.env.PORT || 5001;
const BEARER_TOKEN = process.env.BEARER_TOKEN;
const MONGODB_URI = process.env.MONGODB_URI;

// ✅ Check if BEARER_TOKEN exists
if (!BEARER_TOKEN) {
    console.error("❌ ERROR: Missing BEARER_TOKEN in .env file.");
    process.exit(1);
}

app.use(cors());
app.use(express.json());

const sentimentAnalyzer = new Sentiment();

// ✅ Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB!"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Define Tweet Schema
const tweetSchema = new mongoose.Schema({
    id: { type: String, unique: true }, // Prevent duplicates
    text: String,
    created_at: String,
    likes: Number,
    retweets: Number,
    username: String,
    name: String,
    sentiment: String,
});

const Tweet = mongoose.model("Tweet", tweetSchema);

// ✅ Fetch AI tweets and store them in MongoDB
app.get("/tweets", async (req, res) => {
    try {
        console.log("📡 Fetching fresh AI tweets from Twitter API...");

        const response = await axios.get("https://api.twitter.com/2/tweets/search/recent", {
            headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
            params: {
                query: "AI OR Artificial Intelligence OR #AI",
                max_results: 10, // Twitter API limit
                "tweet.fields": "created_at,public_metrics",
                expansions: "author_id",
                "user.fields": "username,name",
            }
        });

        if (!response.data || !response.data.data) {
            throw new Error("No fresh tweets found.");
        }

        const tweets = response.data.data;
        const users = response.data.includes?.users || [];

        // ✅ Process and format tweets with sentiment analysis
        const tweetData = tweets.map(tweet => {
            const user = users.find(u => u.id === tweet.author_id) || {};
            const formattedDate = new Date(tweet.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });

            // Perform Sentiment Analysis
            const sentimentScore = sentimentAnalyzer.analyze(tweet.text).score;
            const sentimentLabel = sentimentScore > 0 ? "Positive" : sentimentScore < 0 ? "Negative" : "Neutral";

            return {
                id: tweet.id,
                text: tweet.text,
                created_at: formattedDate,
                likes: tweet.public_metrics?.like_count || 0,
                retweets: tweet.public_metrics?.retweet_count || 0,
                username: user.username || "Unknown",
                name: user.name || "Unknown User",
                sentiment: sentimentLabel
            };
        });

        // ✅ Save new tweets to MongoDB (ignore duplicates)
        await Tweet.insertMany(tweetData, { ordered: false }).catch(err => console.warn("⚠️ Some tweets were already stored."));

    } catch (error) {
        console.error("❌ Error fetching AI tweets:", error.response?.data || error.message);
    }

    // ✅ Always return old tweets, even if API fails
    try {
        const allTweets = await Tweet.find().sort({ created_at: -1 }).limit(100);
        res.json({ data: allTweets });
    } catch (dbError) {
        console.error("❌ MongoDB error:", dbError);
        res.status(500).json({ error: "Failed to fetch tweets from the database." });
    }
});

// ✅ Auto-Fetch Tweets Every Hour (Optional)
setInterval(async () => {
    console.log("⏳ Auto-fetching new tweets...");
    await axios.get("http://localhost:5001/tweets");
}, 60 * 60 * 1000); // Every 1 hour

// ✅ Start the Express server
app.listen(PORT, () => console.log(`🚀 AI Tweet Sentiment Server running on http://localhost:${PORT}`));
