// src/components/SidebarLayout.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/SentimentDashboard.css";

function SidebarLayout({ children }) {
  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-logo">Sentiment App</h2>
        <nav className="sidebar-nav">
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><a href="#summary">Summary</a></li>
            <li><a href="#trends">Trends</a></li>
            <li><a href="#tweets">Tweets</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
}

export default SidebarLayout;
