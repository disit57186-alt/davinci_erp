import { useState } from "react";
import Layout from "../../components/Layout";

import Daily from "./Daily";
import Absentees from "./Absentees";
import Range from "./Range";
import StudentReport from "./StudentReport";
import Unmarked from "./Unmarked";
import StudentLog from "./StudentLog";
import ClassYearly from "./ClassYearly";
import LowAttendance from "./LowAttendance";
import Consecutive from "./Consecutive";

import MarkAttendance from "./MarkAttendance";
import BulkAbsent from "./BulkAbsent";
import AutoPresent from "./AutoPresent";

export default function Attendance() {
  const [tab, setTab] = useState("daily");

  const renderTab = () => {
    switch (tab) {
      case "daily": return <Daily />;
      case "absentees": return <Absentees />;
      case "range": return <Range />;
      case "student": return <StudentReport />;
      case "unmarked": return <Unmarked />;
      case "log": return <StudentLog />;
      case "yearly": return <ClassYearly />;
      case "low": return <LowAttendance />;
      case "consecutive": return <Consecutive />;

      case "mark": return <MarkAttendance />;
      case "bulk": return <BulkAbsent />;
      case "auto": return <AutoPresent />;

      default: return <Daily />;
    }
  };

  return (
    <Layout>

      {/* 🔥 HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          📊 Attendance Management
        </h1>
        <p className="text-gray-500 text-sm">
          Track, analyze and manage student attendance
        </p>
      </div>

      {/* 📦 TAB CONTAINER */}
      <div className="bg-white rounded-xl shadow p-4 mb-4">

        {/* 📘 REPORTS GROUP */}
        <div className="mb-3">
          <p className="text-xs text-gray-400 mb-2">REPORTS</p>
          <div className="flex gap-2 overflow-x-auto pb-2">

            <Tab label="📅 Daily" value="daily" tab={tab} setTab={setTab} />
            <Tab label="❌ Absentees" value="absentees" tab={tab} setTab={setTab} />
            <Tab label="📆 Range" value="range" tab={tab} setTab={setTab} />
            <Tab label="👤 Student" value="student" tab={tab} setTab={setTab} />
            <Tab label="⚠️ Unmarked" value="unmarked" tab={tab} setTab={setTab} />
            <Tab label="📝 Log" value="log" tab={tab} setTab={setTab} />
            <Tab label="📊 Yearly" value="yearly" tab={tab} setTab={setTab} />
            <Tab label="📉 Low %" value="low" tab={tab} setTab={setTab} />
            <Tab label="🔁 Consecutive" value="consecutive" tab={tab} setTab={setTab} />

          </div>
        </div>

        {/* ⚡ ACTIONS GROUP */}
        <div>
          <p className="text-xs text-gray-400 mb-2">ACTIONS</p>
          <div className="flex gap-2 overflow-x-auto">

            <Tab label="✍️ Mark" value="mark" tab={tab} setTab={setTab} />
            <Tab label="🚫 Bulk Absent" value="bulk" tab={tab} setTab={setTab} />
            <Tab label="⚡ Auto Present" value="auto" tab={tab} setTab={setTab} />

          </div>
        </div>

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
      className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
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