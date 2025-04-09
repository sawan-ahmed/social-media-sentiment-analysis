// client/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import "./styles/App.css";
import "./styles/AboutPage.css";
import "./styles/SentimentDashboard.css";

// Pages
import SentimentDashboard from "./pages/SentimentDashboard";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1 className="app-title">Social Media Sentiment Analyzer</h1>
        </header>

        <Routes>
          {/* ✅ Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* ✅ Dashboard is your main working page */}
          <Route path="/dashboard" element={<SentimentDashboard />} />

          {/* ✅ About is your old homepage content */}
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
