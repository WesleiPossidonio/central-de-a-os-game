import axios, { InternalAxiosRequestConfig } from 'axios'

const token = 'sDUEqMJPPV2kVh9Rof6CqhdG';

const api = axios.create({
  baseURL: 'https://criardash.com/api/ranking.php',
})

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
})

export default api;
