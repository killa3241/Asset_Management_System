import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css"; // ✅ Ensure global styles are applied

function LoginPage({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ For redirecting

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    // Simulate authentication (Replace with API call later)
    if (email === "test@example.com" && password === "password123") {
      const userData = { email, name: "John Doe" }; // Example user data
      setUser(userData);
      navigate("/portfolio"); // Redirect after login
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
