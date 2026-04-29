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

// ✅ NEW IMPORTS
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

      // ✅ NEW FEATURES
      case "mark": return <MarkAttendance />;
      case "bulk": return <BulkAbsent />;
      case "auto": return <AutoPresent />;

      default: return <Daily />;
    }
  };

  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">Attendance</h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-4 border-b pb-2 overflow-x-auto">

        {/* Existing */}
        <Tab label="Daily" value="daily" tab={tab} setTab={setTab} />
        <Tab label="Absentees" value="absentees" tab={tab} setTab={setTab} />
        <Tab label="Range" value="range" tab={tab} setTab={setTab} />
        <Tab label="Student" value="student" tab={tab} setTab={setTab} />
        <Tab label="Unmarked" value="unmarked" tab={tab} setTab={setTab} />
        <Tab label="Student Log" value="log" tab={tab} setTab={setTab} />
        <Tab label="Yearly" value="yearly" tab={tab} setTab={setTab} />
        <Tab label="Low %" value="low" tab={tab} setTab={setTab} />
        <Tab label="Consecutive" value="consecutive" tab={tab} setTab={setTab} />

        {/* ✅ NEW TABS */}
        <Tab label="Mark" value="mark" tab={tab} setTab={setTab} />
        <Tab label="Bulk Absent" value="bulk" tab={tab} setTab={setTab} />
        <Tab label="Auto Present" value="auto" tab={tab} setTab={setTab} />

      </div>

      {/* Render Selected Tab */}
      {renderTab()}
    </Layout>
  );
}

function Tab({ label, value, tab, setTab }) {
  return (
    <button
      onClick={() => setTab(value)}
      className={`whitespace-nowrap px-4 py-2 rounded transition ${
        tab === value
          ? "bg-blue-600 text-white shadow"
          : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      {label}
    </button>
  );
}