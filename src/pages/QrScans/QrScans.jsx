// src/pages/QrScans/QrScans.jsx
import { useState } from "react";
import Layout from "../../components/Layout";

import TodayScans from "./TodayScans";
import ScanByUrn from "./ScanByUrn";
import BusScans from "./BusScans";
import QRScanner from "./QRScanner"; // ✅ NEW

export default function QrScans() {
  const [tab, setTab] = useState("today");

  const renderTab = () => {
    switch (tab) {
      case "urn": return <ScanByUrn />;
      case "bus": return <BusScans />;
      case "scanner": return <QRScanner />; // ✅ NEW
      default: return <TodayScans />;
    }
  };

  return (
    <Layout>

      {/* 🔥 HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          📷 QR Scan Monitoring
        </h1>
        <p className="text-gray-500 text-sm">
          Track student entry and exit scans in real-time
        </p>
      </div>

      {/* 🎨 TABS */}
      <div className="bg-white p-3 rounded-xl shadow mb-4 flex flex-wrap gap-2">

        <Tab label="📅 Today Scans" value="today" tab={tab} setTab={setTab} />
        <Tab label="🔍 Search URN" value="urn" tab={tab} setTab={setTab} />
        <Tab label="🚌 Bus Tracking" value="bus" tab={tab} setTab={setTab} />
        <Tab label="📷 Scanner" value="scanner" tab={tab} setTab={setTab} /> {/* ✅ NEW */}

      </div>

      {/* 📦 CONTENT */}
      <div className="bg-white rounded-xl shadow p-5 min-h-[300px]">
        {renderTab()}
      </div>

    </Layout>
  );
}

/* 🎨 TAB UI */
function Tab({ label, value, tab, setTab }) {
  const isActive = tab === value;

  return (
    <button
      onClick={() => setTab(value)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
        ${
          isActive
            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md scale-105"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
        }
      `}
    >
      {label}
    </button>
  );
}