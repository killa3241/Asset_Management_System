import React from "react";
import "../styles/global.css";

function HomePage() {
  return (
   
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome to Asset Manager</h1>
        <p>Efficiently manage your financial assets with ease.</p>
      </section>



      {/* Key Features */}
      <section className="features-section">
        <h2>Key Features</h2>
        <ul>
          <li>📊 Portfolio Overview</li>
          <li>🔍 Detailed Asset Insights</li>
          <li>💰 Transaction Tracking</li>
          <li>📈 Performance Reports</li>
        </ul>
      </section>

      
    </div>
  );
}

export default HomePage;
