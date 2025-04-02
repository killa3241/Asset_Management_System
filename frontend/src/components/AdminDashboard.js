import React, { useEffect, useState } from 'react';
import { getAssets } from '../services/api';

function AdminDashboard() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    getAssets()
      .then(response => setAssets(response.data))
      .catch(error => console.error('Error fetching assets:', error));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {assets.map(asset => (
          <li key={asset.id}>{asset.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
