import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Clock3,
  DoorOpen,
  LogOut,
  Menu,
  X,
  QrCode,
  Users,
  BarChart3
} from "lucide-react";

import { clearAuth, getUser } from "../utils/auth";

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser() || {};

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  const isActive = (path) => location.pathname.startsWith(path);

  const navClass = (path) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
    ${
      isActive(path)
        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="flex h-screen bg-gray-100">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-white shadow-lg
        transform transition-transform duration-300 flex flex-col
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >

        {/* LOGO */}
        <div className="p-5 border-b flex justify-between items-center">
          <h2 className="font-bold text-blue-600 text-lg">
            Da Vinci School
          </h2>

          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* NAV */}
        <nav className="p-4 flex-1 space-y-2 overflow-y-auto">

          <Link to="/dashboard" className={navClass("/dashboard")}>
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link to="/attendance" className={navClass("/attendance")}>
            <ClipboardList size={18} />
            Attendance
          </Link>

          <Link to="/late-entry" className={navClass("/late-entry")}>
            <Clock3 size={18} />
            Late Entry
          </Link>

          <Link to="/early-exit" className={navClass("/early-exit")}>
            <DoorOpen size={18} />
            Early Exit
          </Link>

          <Link to="/students" className={navClass("/students")}>
            <Users size={18} />
            Students
          </Link>

          <Link to="/qr-scan" className={navClass("/qr-scan")}>
            <QrCode size={18} />
            QR Scan
          </Link>

          {/* REPORTS */}
          <Link to="/reports" className={navClass("/reports")}>
            <BarChart3 size={18} />
            Reports
          </Link>

        </nav>

        {/* USER */}
        <div className="p-4 border-t space-y-3">

          <div className="bg-gray-50 rounded-lg p-3 text-sm">
            <p className="text-gray-500">Logged in as</p>
            <p className="font-semibold text-gray-800">
              {user.name || "User"}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex justify-center gap-2 items-center transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <div className="bg-white p-4 shadow-sm flex justify-between items-center">

          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>

          <div>
            <p className="text-sm text-gray-500">Welcome</p>
            <p className="font-bold text-gray-800">
              {user.name || "User"}
            </p>
          </div>

          <div className="hidden md:block text-sm text-gray-500">
            Attendance System
          </div>

        </div>

        {/* CONTENT */}
        <div className="p-4 md:p-6 overflow-auto">
          {children}
        </div>

      </div>
    </div>
  );
}