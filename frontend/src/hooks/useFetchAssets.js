// src/hooks/useFetchAssets.js
import { useState, useEffect } from 'react';
import { fetchAssets } from '../services/api';

export const useFetchAssets = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAssets = async () => {
      try {
        const response = await fetchAssets();
        setAssets(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getAssets();
  }, []);

  return { assets, loading, error };
};