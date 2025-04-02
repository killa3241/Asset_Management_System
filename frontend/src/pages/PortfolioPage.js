import React from "react";
import "../styles/global.css";

function PortfolioPage() {
  return (
    <div className="portfolio-container">
      <h1>Portfolio Overview</h1>
      <p>Track and manage your financial assets effectively.</p>
      
      <div className="portfolio-summary">
        <h2>Asset Allocation</h2>
        <p>View the distribution of your investments.</p>
      </div>

      <div className="portfolio-returns">
        <h2>Returns Analysis</h2>
        <p>Monitor your investment performance over time.</p>
      </div>
    </div>
  );
}

export default PortfolioPage;