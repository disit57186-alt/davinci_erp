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
  QrCode
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

  const navClass = (path) =>
    location.pathname.startsWith(path)
      ? "bg-blue-100 text-blue-600 p-2 rounded flex gap-2 items-center"
      : "p-2 flex gap-2 items-center hover:bg-gray-100 rounded";

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
        className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-white shadow
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

          {/* ✅ NEW QR */}
          <Link to="/qr-scan" className={navClass("/qr-scan")}>
            <QrCode size={18} />
            QR Scan
          </Link>

        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded flex justify-center gap-2 items-center"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col w-full">

        {/* HEADER */}
        <div className="bg-white p-4 shadow flex justify-between items-center">

          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>

          <div>
            <p className="text-sm text-gray-500">Welcome</p>
            <p className="font-bold">{user.name || "User"}</p>
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