import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // 🔥 State
  const [presence, setPresence] = useState({});
  const [classData, setClassData] = useState([]);
  const [lateEntries, setLateEntries] = useState([]);
  const [transport, setTransport] = useState([]);
  const [recon, setRecon] = useState({});
  const [earlyExits, setEarlyExits] = useState([]);

  // 🚀 SAFE FETCH (NO CRASH)
  const fetchDashboard = async () => {
    setLoading(true);
    setApiError("");

    try {
      const summaryRes = await api
        .get("/dashboard/summary")
        .catch((err) => {
          console.log("summary error:", err);
          return { data: { data: {} } };
        });

      const transportRes = await api
        .get("/dashboard/transport-breakdown")
        .catch((err) => {
          console.log("transport error:", err);
          return { data: { data: [] } };
        });

      const reconRes = await api
        .get("/dashboard/reconciliation")
        .catch((err) => {
          console.log("recon error:", err);
          return { data: { data: {} } };
        });

      const earlyRes = await api
        .get("/dashboard/early-exits")
        .catch((err) => {
          console.log("early exits error:", err);
          return { data: { data: [] } };
        });

      const summary = summaryRes.data?.data || {};

      setPresence(summary.presence || {});
      setClassData(summary.classBreakdown || []);
      setLateEntries(summary.recentLateEntries || []);

      setTransport(transportRes.data?.data || []);
      setRecon(reconRes.data?.data || {});
      setEarlyExits(earlyRes.data?.data || []);

    } catch (err) {
      console.log("Dashboard error:", err);
      setApiError("Server error. Please try later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <Layout>

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
      <p className="text-gray-500 mb-6">
        Overview of today's attendance
      </p>

      {/* ERROR */}
      {apiError && (
        <p className="text-red-500 mb-4">{apiError}</p>
      )}

      {/* LOADING */}
      {loading && (
        <p className="text-blue-500 mb-4">Loading dashboard...</p>
      )}

      {/* 🔥 TOP CARDS */}
      <div className="grid grid-cols-4 gap-4 mb-6">

        <Card title="Total Students" value={presence.totalEnrolled} />
        <Card title="Present Today" value={presence.studentsOnCampus} color="green" />
        <Card title="Attendance %" value={`${presence.attendancePercentage || 0}%`} color="blue" />
        <Card title="Late Entries" value={presence.lateEntriesToday} color="yellow" />

      </div>

      {/* 📊 MAIN GRID */}
      <div className="grid grid-cols-2 gap-4">

        {/* CLASS TABLE */}
        <Section title="Class Breakdown">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Class</th>
                <th>Sec</th>
                <th>Present</th>
                <th>Absent</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              {classData.length ? (
                classData.map((c, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2">{c.class}</td>
                    <td>{c.section}</td>
                    <td>{c.present}</td>
                    <td>{c.absent}</td>
                    <td>{c.attendancePercentage}%</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-3 text-gray-500">
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Section>

        {/* LATE ENTRIES */}
        <Section title="Recent Late Entries">
          {lateEntries.length ? (
            lateEntries.map((l, i) => (
              <div key={i} className="border p-2 rounded mb-2">
                <p className="font-medium">{l.studentName}</p>
                <p className="text-sm text-gray-500">
                  {l.class} • {l.delayMinutes} mins late
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No late entries</p>
          )}
        </Section>

      </div>

      {/* 🚌 TRANSPORT */}
      <Section title="Transport Breakdown" className="mt-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Mode</th>
              <th>Registered</th>
              <th>Entered</th>
              <th>Late</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transport.length ? (
              transport.map((t, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{t.transportMode}</td>
                  <td>{t.registeredStudents}</td>
                  <td>{t.totalEntered}</td>
                  <td>{t.lateEntryCount}</td>
                  <td className="text-blue-600">{t.reconciliationStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-3 text-gray-500">
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Section>

      {/* 📊 RECON CARDS */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <Card title="On Campus" value={recon.currentOnCampus} />
        <Card title="Discrepancies" value={recon.openDiscrepancies} color="red" />
        <Card title="Late Pending" value={recon.lateEntriesPending} color="yellow" />
        <Card title="Early Exits" value={recon.earlyExitsCompleted} color="blue" />
      </div>

      {/* 🚪 EARLY EXITS */}
      <Section title="Early Exits" className="mt-6">
        {earlyExits.length ? (
          earlyExits.map((e, i) => (
            <div key={i} className="border p-2 rounded mb-2">
              <p className="font-medium">{e.studentName}</p>
              <p className="text-sm text-gray-500">
                {e.class} • {e.plannedExit}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No early exits</p>
        )}
      </Section>

    </Layout>
  );
}

// 🔥 CARD COMPONENT
function Card({ title, value = 0, color = "black" }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-gray-500">{title}</p>
      <h2 className={`text-2xl font-bold text-${color}-600`}>
        {value || 0}
      </h2>
    </div>
  );
}

// 🔥 SECTION COMPONENT
function Section({ title, children, className = "" }) {
  return (
    <div className={`bg-white p-4 rounded-xl shadow ${className}`}>
      <h3 className="font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}