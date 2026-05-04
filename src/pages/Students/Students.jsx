// src/pages/Students/Students.jsx
import { useState } from "react";
import Layout from "../../components/Layout";

import StudentsList from "./StudentsList";
import StudentByUrn from "./StudentByUrn";
import StudentsByClass from "./StudentsByClass";
import SearchStudents from "./SearchStudents";
import StudentStatus from "./StudentStatus"; 
import StudentTimeline from "./StudentTimeline";
import TransitAlerts from "./TransitAlerts";

export default function Students() {
  const [tab, setTab] = useState("list");

  const renderTab = () => {
    switch (tab) {
      case "list":
        return <StudentsList />;

      case "urn":
        return <StudentByUrn />;

      case "class":
        return <StudentsByClass />;

      case "search":
        return <SearchStudents />;

      case "status":
        return <StudentStatus />;

      case "timeline":
        return <StudentTimeline />;

      case "alerts":
        return <TransitAlerts />;

      default:
        return <StudentsList />;
    }
  };

  return (
    <Layout>

      {/* 🔥 HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          🎓 Students Management
        </h1>
        <p className="text-gray-500 text-sm">
          View, search and filter student data
        </p>
      </div>

      {/* 🎨 TABS */}
      <div className="bg-white p-3 rounded-xl shadow mb-4 flex flex-wrap gap-2">

        <Tab label="📋 All Students" value="list" tab={tab} setTab={setTab} />
        <Tab label="🔍 By URN" value="urn" tab={tab} setTab={setTab} />
        <Tab label="🏫 By Class" value="class" tab={tab} setTab={setTab} />
        <Tab label="🔎 Search" value="search" tab={tab} setTab={setTab} />
        <Tab label="📊 Status" value="status" tab={tab} setTab={setTab} />
        <Tab label="📊 Timeline" value="timeline" tab={tab} setTab={setTab} />
        <Tab label="🚨 Alerts" value="alerts" tab={tab} setTab={setTab} />

      </div>

      {/* 📦 CONTENT */}
      <div className="bg-white rounded-xl shadow p-5 min-h-[300px]">
        {renderTab()}
      </div>

    </Layout>
  );
}

/* 🎨 SAME TAB UI */
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