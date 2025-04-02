import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Backend URL

export const getAssets = () => axios.get(`${API_URL}/assets`);
