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

      {/* Portfolio Summary */}
      <section className="portfolio-summary">
        <h2>Your Portfolio Summary</h2>
        <div className="portfolio-card">
          <p>Total Assets: <strong>$120,000</strong></p>
          <p>Investments: <strong>Stocks, Mutual Funds, Real Estate</strong></p>
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="recent-transactions">
        <h2>Recent Transactions</h2>
        <ul>
          <li>📈 Bought 10 shares of Tesla ($1,500)</li>
          <li>🏠 Invested in Real Estate Fund ($5,000)</li>
          <li>💳 Mutual Fund Dividend Received ($200)</li>
        </ul>
      </section>
    </div>
  );
}

export default HomePage;
