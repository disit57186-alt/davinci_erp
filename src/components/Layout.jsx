// src/components/Layout.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, ClipboardList, LogOut } from "lucide-react";
import { clearAuth } from "../utils/auth";

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* 🧭 Sidebar */}
      <div className="w-64 bg-white shadow-md flex flex-col">

        {/* Logo */}
        <div className="p-5 border-b">
          <h2 className="text-lg font-bold text-blue-600">
            Da Vinci School
          </h2>
          <p className="text-sm text-gray-500">
            Attendance System
          </p>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2 flex-1">

          {/* Dashboard */}
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 p-2 rounded ${
              location.pathname === "/dashboard"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          {/* Attendance */}
          <Link
            to="/attendance"
            className={`flex items-center gap-2 p-2 rounded ${
              location.pathname === "/attendance"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <ClipboardList size={18} />
            Attendance
          </Link>

        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="m-4 flex items-center justify-center gap-2 bg-red-500 text-white p-2 rounded"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

      {/* 📊 Right Panel */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <div className="bg-white p-4 shadow flex justify-between">
          <p>
            Welcome back <b>User</b>
          </p>
        </div>

        {/* Page Content */}
        <div className="p-6 overflow-auto">
          {children}
        </div>

      </div>
    </div>
  );
}