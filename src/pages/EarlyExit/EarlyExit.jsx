import { useState } from "react";
import Layout from "../../components/Layout";

import EarlyExitList from "./EarlyExitList";
import AddEarlyExit from "./AddEarlyExit";
import ApproveEarlyExit from "./ApproveEarlyExit";
import CheckEarlyExit from "./CheckEarlyExit";
import GateVerifyEarlyExit from "./GateVerifyEarlyExit";

export default function EarlyExit() {
  const [tab, setTab] = useState("list");

  const renderTab = () => {
    switch (tab) {
      case "list":
        return <EarlyExitList />;

      case "add":
        return (
          <AddEarlyExit onSuccess={() => setTab("list")} />
        );

      case "approve":
        return <ApproveEarlyExit />;

      case "check":
        return <CheckEarlyExit />;

      case "verify":
        return <GateVerifyEarlyExit />;

      default:
        return <EarlyExitList />;
    }
  };

  return (
    <Layout>

      {/* 🔥 HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          🚪 Early Exit Management
        </h1>
        <p className="text-gray-500 text-sm">
          Manage exits, approvals, and gate verification
        </p>
      </div>

      {/* 🎨 TABS */}
      <div className="bg-white p-3 rounded-xl shadow mb-4 flex flex-wrap gap-2">

        <Tab label="📋 Exit List" value="list" tab={tab} setTab={setTab} />
        <Tab label="➕ Add Exit" value="add" tab={tab} setTab={setTab} />
        <Tab label="✅ Approve" value="approve" tab={tab} setTab={setTab} />
        <Tab label="🔍 Check URN" value="check" tab={tab} setTab={setTab} />
        <Tab label="🚪 Verify Gate" value="verify" tab={tab} setTab={setTab} />

      </div>

      {/* 📦 CONTENT */}
      <div className="bg-white rounded-xl shadow p-5 min-h-[300px]">
        {renderTab()}
      </div>

    </Layout>
  );
}

/* 🎨 TAB COMPONENT */
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