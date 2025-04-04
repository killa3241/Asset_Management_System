import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.setItem("authStatus", "loggedOut"); // Update auth status
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="logo">Asset Manager</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/portfolio">Portfolio</Link></li>
        <li><Link to="/assets">Assets</Link></li>
        <li><Link to="/reports">Reports</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li>
          <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
