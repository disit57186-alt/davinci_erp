// src/components/Layout.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, ClipboardList, LogOut } from "lucide-react";
import { clearAuth, getUser } from "../utils/auth";

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const user = getUser() || {};

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow flex flex-col">
        <div className="p-5 border-b">
          <h2 className="font-bold text-blue-600">Da Vinci School</h2>
        </div>

        <nav className="p-4 flex-1 space-y-2">

          <Link to="/dashboard"
            className={location.pathname === "/dashboard"
              ? "bg-blue-100 p-2 rounded flex gap-2"
              : "p-2 flex gap-2"}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>

          <Link to="/attendance"
            className={location.pathname.startsWith("/attendance")
              ? "bg-blue-100 p-2 rounded flex gap-2"
              : "p-2 flex gap-2"}>
            <ClipboardList size={18} /> Attendance
          </Link>

        </nav>

        <button onClick={handleLogout}
          className="m-4 bg-red-500 text-white p-2 rounded flex justify-center gap-2">
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        <div className="bg-white p-4 shadow flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Welcome</p>
            <p className="font-bold">{user.name || "User"}</p>
          </div>
        </div>

        <div className="p-6 overflow-auto">
          {children}
        </div>

      </div>
    </div>
  );
}