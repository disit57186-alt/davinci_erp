// src/api/axios.js
import axios from "axios";
import { getToken, clearAuth } from "../utils/auth";

const api = axios.create({
  baseURL: "https://attendance.mydavincischool.com/api",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      clearAuth();
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

export default api;