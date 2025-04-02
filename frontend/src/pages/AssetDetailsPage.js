import React from "react";
import "../styles/global.css";

function AssetDetailsPage() {
  return (
    <div className="asset-details-container">
      <h1>Asset Details</h1>
      <div className="asset-card">
        <h2>Stock Investments</h2>
        <p>Details of stocks you own, including company names, quantity, and value.</p>
      </div>
      <div className="asset-card">
        <h2>Mutual Funds</h2>
        <p>Breakdown of your mutual fund investments and their performance.</p>
      </div>
      <div className="asset-card">
        <h2>Real Estate</h2>
        <p>Information about properties owned, their valuation, and income generated.</p>
      </div>
    </div>
  );
}

export default AssetDetailsPage;
