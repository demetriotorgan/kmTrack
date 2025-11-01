import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-km-track.vercel.app',
});

export default api;