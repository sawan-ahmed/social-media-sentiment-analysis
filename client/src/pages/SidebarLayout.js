import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/Layout.css";

const SidebarLayout = () => {
  return (
    <div className="layout-wrapper">
      <aside className="sidebar">
        <h2 className="sidebar-title">CS4287: <br />
        Principles of Cloud Computing</h2>
        <nav className="nav-links">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
             Dashboard
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
             About
          </NavLink>
        </nav>
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
