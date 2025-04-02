import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PortfolioPage from "./pages/PortfolioPage";
import Navbar from "./components/Navbar";
import "./styles/global.css";
import AssetDetailsPage from "./pages/AssetDetailsPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage"; // ✅ Import LoginPage

function App() {
  const [user, setUser] = useState(null); // ✅ Add user state

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} /> {/* ✅ Add LoginPage Route */}
        <Route path="/portfolio" element={user ? <PortfolioPage user={user} /> : <LoginPage setUser={setUser} />} />
        <Route path="/assets" element={<AssetDetailsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
