import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/Layout.css";

const SidebarLayout = () => {
  return (
    <div className="layout-wrapper">
      <aside className="sidebar">
        <NavLink to="/sentiment" className={({ isActive }) => (isActive ? "active" : "")}>
          📊 Dashboard
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
          🔍 About
        </NavLink>
      </aside>

      <main className="main-content">
        <header className="main-header">Social Media Sentiment Analyzer</header>
        <div className="page-body">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SidebarLayout;
