import axios from 'axios';

export const httpClient = axios.create({
  baseURL: process.env.TREM_GIS_API_URL ?? 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
