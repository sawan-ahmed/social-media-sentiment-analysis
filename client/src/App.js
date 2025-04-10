import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SidebarLayout from "./pages/SidebarLayout";
import SentimentDashboard from "./pages/SentimentDashboard";
import AboutPage from "./pages/AboutPage";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Nest all routes under layout */}
        <Route path="/" element={<SidebarLayout />}>
          <Route index element={<SentimentDashboard />} />
          <Route path="sentiment" element={<SentimentDashboard />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
