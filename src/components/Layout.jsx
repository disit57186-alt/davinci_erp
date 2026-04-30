// src/components/Layout.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Clock3,
  LogOut,
  DoorOpen
} from "lucide-react";

import { clearAuth, getUser } from "../utils/auth";

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const user = getUser() || {};

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

      {/* Sidebar */}
      <div className="w-64 bg-white shadow flex flex-col">

        {/* Logo */}
        <div className="p-5 border-b">
          <h2 className="font-bold text-blue-600 text-lg">
            Da Vinci School
          </h2>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex-1 space-y-2">

          <Link to="/dashboard" className={navClass("/dashboard")}>
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link to="/attendance" className={navClass("/attendance")}>
            <ClipboardList size={18} />
            Attendance
          </Link>

          {/* NEW */}
          <Link to="/late-entry" className={navClass("/late-entry")}>
            <Clock3 size={18} />
            Late Entry
          </Link>

          {/* NEW */}
          <Link to="/early-exit" className={navClass("/early-exit")}>
            <DoorOpen size={18} />
            Early Exit
          </Link>

        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="m-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded flex justify-center gap-2 items-center"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <div className="bg-white p-4 shadow flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Welcome</p>
            <p className="font-bold">{user.name || "User"}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto">
          {children}
        </div>

      </div>
    </div>
  );
}