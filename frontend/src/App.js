import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar"; // Import the Navbar component
function App() {
  const isLoggedIn = localStorage.getItem("authStatus") === "loggedIn";

  return (
    <Router>
      <Navbar />  {/* Add Navbar here to make it appear on all pages */}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}


export default App;
