// src/utils/auth.js

// ✅ Get token
export const getToken = () => {
  return localStorage.getItem("token");
};

// ✅ Save token
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// ✅ Clear auth data
export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("savedEmail");
};

// ✅ Check if logged in
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};