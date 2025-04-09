import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Layout.css";

const Layout = ({ children }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="app-container">
      <aside className="sidemenu">

        <Link to="/dashboard" className={isActive("/dashboard") ? "sidemenu_button--active" : "sidemenu_button--inactive"}>
          <img
            src="https://cdn.prod.website-files.com/5c30d30a32c1877cbb03e545/5c3f8723a6538c3f77d63a3c_Account.png"
            width="24"
            alt="Dashboard"
            className="sidemenu_button_icon"
          />
          <div className="sidemenu_button_text">Dashboard</div>
        </Link>

        <Link to="/about" className={isActive("/") ? "sidemenu_button--active" : "sidemenu_button--inactive"}>
          <img
            src="https://cdn.prod.website-files.com/5c30d30a32c1877cbb03e545/5c3f867128665fd78f82bed1_Search.png"
            width="24"
            alt="About"
            className="sidemenu_button_icon"
          />
          <div className="sidemenu_button_text">About</div>
        </Link>

        

        <div className="sidemenu_divider--bottom" />
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
