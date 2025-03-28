import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./styles/App.css";  // ✅ Correct
import "./styles/HomePage.css";  // ✅ Correct
import HomePage from "./pages/HomePage";
import TweetsPage from "./pages/TweetsPage";
import SentimentPage from "./pages/SentimentPage";

function App() {
    const [tweets, setTweets] = useState([]); // Global tweet state

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/tweets" className="nav-link">Tweets</Link>
                    <Link to="/sentiment" className="nav-link">Sentiment Analysis</Link>
                </header>

                <Routes>
                    <Route path="/" element={<HomePage />} /> {/* ✅ Fixed: Added Homepage Route */}
                    <Route path="/tweets" element={<TweetsPage tweets={tweets} setTweets={setTweets} />} />
                    <Route path="/sentiment" element={<SentimentPage tweets={tweets} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
