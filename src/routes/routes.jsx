import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getToken } from "../utils/auth";

// Pages
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Attendance from "../pages/Attendance/Attendance";
import LateEntry from "../pages/LateEntry/LateEntry";
import EarlyExit from "../pages/EarlyExit/EarlyExit";
import QrScan from "../pages/QrScans/QrScans"; // ✅ FIXED PATH

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

        {/* PROTECTED */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
        <Route path="/late-entry" element={<ProtectedRoute><LateEntry /></ProtectedRoute>} />
        <Route path="/early-exit" element={<ProtectedRoute><EarlyExit /></ProtectedRoute>} />

        {/* ✅ QR MODULE */}
        <Route
          path="/qr-scan"
          element={
            <ProtectedRoute>
              <QrScan />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />

      </Routes>
    </BrowserRouter>
  );
}