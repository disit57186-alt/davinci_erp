// src/utils/auth.js

// ✅ Get token
export const getToken = () => localStorage.getItem("token");

// ✅ Save user + token
export const setAuth = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem(
    "user",
    JSON.stringify({
      name: data.name,
      role: data.role,
    })
  );
};

// ✅ Get user
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// ✅ Clear auth
export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("savedEmail");
};

// ✅ Check login
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};