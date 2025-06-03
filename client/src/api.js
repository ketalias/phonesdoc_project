import axios from 'axios';

const API = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3000',
});

export default API;
