// src/pages/Login.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import api from "../api/axios";
import { setAuth, isAuthenticated } from "../utils/auth";

export default function Login() {
  const [email, setEmail] = useState(
    localStorage.getItem("savedEmail") || ""
  );
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    }
  }, []);

  // ✅ Focus email
  useEffect(() => {
    document.getElementById("email")?.focus();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const data = res.data?.data;

      if (!data?.token) {
        setError("Invalid login response");
        return;
      }

      // ✅ Save auth correctly
      setAuth(data);

      // Remember email
      if (rememberMe) {
        localStorage.setItem("savedEmail", email);
      } else {
        localStorage.removeItem("savedEmail");
      }

      // ✅ Navigate ONLY on success
      navigate("/dashboard");

    } catch (err) {
      console.log(err);

      setPassword("");

      setError(
        err.response?.data?.message || "Invalid email or password"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-gray-300">
      <div className="bg-white w-96 p-8 rounded-2xl shadow-xl">

        {/* Logo */}
        <div className="flex justify-center mb-4 text-blue-600">
          <GraduationCap size={36} />
        </div>

        <h2 className="text-2xl font-bold text-center">
          Da Vinci School
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Attendance Management System
        </p>

        <form onSubmit={handleLogin}>

          {/* Email */}
          <label className="text-sm">Email</label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border rounded-lg mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <label className="text-sm">Password</label>
          <div className="relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className="absolute right-3 top-2.5 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {/* Remember */}
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            <span className="text-sm">Remember me</span>
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center mt-3">
              {error}
            </p>
          )}

        </form>
      </div>
    </div>
  );
}