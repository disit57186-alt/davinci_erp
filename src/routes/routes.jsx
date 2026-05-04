import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getToken } from "../utils/auth";

// Pages
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Attendance from "../pages/Attendance/Attendance";
import LateEntry from "../pages/LateEntry/LateEntry";
import EarlyExit from "../pages/EarlyExit/EarlyExit";
import QrScan from "../pages/QrScans/QrScans";
import Students from "../pages/Students/Students";
import Report from "../pages/Reports/Reports"; 

function ProtectedRoute({ children }) {
  return getToken() ? children : <Navigate to="/" replace />;
}

export default function AppRoutes() {
  const isLoggedIn = !!getToken();

  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={
            isLoggedIn
              ? <Navigate to="/dashboard" replace />
              : <Login />
          }
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />

        <Route
          path="/attendance"
          element={<ProtectedRoute><Attendance /></ProtectedRoute>}
        />

        <Route
          path="/late-entry"
          element={<ProtectedRoute><LateEntry /></ProtectedRoute>}
        />

        <Route
          path="/early-exit"
          element={<ProtectedRoute><EarlyExit /></ProtectedRoute>}
        />

        <Route
          path="/students"
          element={<ProtectedRoute><Students /></ProtectedRoute>}
        />

        <Route
          path="/qr-scan"
          element={<ProtectedRoute><QrScan /></ProtectedRoute>}
        />

        {/* ✅ REPORTS */}
        <Route
          path="/reports"
          element={<ProtectedRoute><Report /></ProtectedRoute>}
        />

        {/* FALLBACK */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}