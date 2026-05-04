import { useState } from "react";
import Layout from "../../components/Layout";

import AttendanceSummary from "./AttendanceSummary";
import ClassMonthlyReport from "./ClassMonthlyReport";
import RecentAbsentees from "./RecentAbsentees";
import StudentYearReport from "./StudentYearReport";
import MonthlyRegister from "./MonthlyRegister"; 

export default function Report() {
  const [tab, setTab] = useState("summary");

  const tabs = [
    { key: "summary", label: "Attendance Summary" },
    { key: "classMonthly", label: "Class Monthly" },
    { key: "monthlyRegister", label: "Monthly Register" }, 
    { key: "absentees", label: "Recent Absentees" },
    { key: "studentYear", label: "Student Year" },
  ];

  return (
    <Layout>
      {/* HEADER */}
      <h1 className="text-xl font-bold mb-4">Reports</h1>

      {/* TABS */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition
              ${
                tab === t.key
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="bg-white rounded-xl shadow p-4">
        {tab === "summary" && <AttendanceSummary />}
        {tab === "classMonthly" && <ClassMonthlyReport />}
        {tab === "monthlyRegister" && <MonthlyRegister />} 
        {tab === "absentees" && <RecentAbsentees />}
        {tab === "studentYear" && <StudentYearReport />}
      </div>
    </Layout>
  );
}