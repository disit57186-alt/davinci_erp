// src/routes/routes.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Attendance from "../pages/Attendance/Attendance";
import LateEntry from "../pages/LateEntry/LateEntry";
import EarlyExit from "../pages/EarlyExit/EarlyExit";
import { getToken } from "../utils/auth";

function ProtectedRoute({ children }) {
  return getToken() ? children : <Navigate to="/" />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={
            getToken() ? <Navigate to="/dashboard" /> : <Login />
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />

        {/* Attendance */}
        <Route
          path="/attendance"
          element={<ProtectedRoute><Attendance /></ProtectedRoute>}
        />

        {/* ✅ Late Entry (NO CHILD ROUTES NOW) */}
        <Route
          path="/late-entry"
          element={<ProtectedRoute><LateEntry /></ProtectedRoute>}
        />

        {/* ✅ Early exit (NO CHILD ROUTES NOW) */}
        <Route
          path="/early-exit"
          element={<ProtectedRoute><EarlyExit /></ProtectedRoute>}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" />} />

      </Routes>
    </BrowserRouter>
  );
}