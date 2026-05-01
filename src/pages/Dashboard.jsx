import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";
import {
  Users,
  UserCheck,
  Percent,
  Clock,
  AlertTriangle,
  Bus
} from "lucide-react";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const [presence, setPresence] = useState({});
  const [classData, setClassData] = useState([]);
  const [lateEntries, setLateEntries] = useState([]);
  const [transport, setTransport] = useState([]);
  const [recon, setRecon] = useState({});
  const [earlyExits, setEarlyExits] = useState([]);

  const fetchDashboard = async () => {
    setLoading(true);
    setApiError("");

    try {
      const summaryRes = await api.get("/dashboard/summary").catch(() => ({ data: { data: {} } }));
      const transportRes = await api.get("/dashboard/transport-breakdown").catch(() => ({ data: { data: [] } }));
      const reconRes = await api.get("/dashboard/reconciliation").catch(() => ({ data: { data: {} } }));
      const earlyRes = await api.get("/dashboard/early-exits").catch(() => ({ data: { data: [] } }));

      const summary = summaryRes.data?.data || {};

      setPresence(summary.presence || {});
      setClassData(summary.classBreakdown || []);
      setLateEntries(summary.recentLateEntries || []);
      setTransport(transportRes.data?.data || []);
      setRecon(reconRes.data?.data || {});
      setEarlyExits(earlyRes.data?.data || []);
    } catch (err) {
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

      {/* 🔥 HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="text-gray-500">
          Overview of today's attendance
        </p>
      </div>

      {/* ERROR */}
      {apiError && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
          {apiError}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <p className="text-blue-500 mb-4">Loading...</p>
      )}

      {/* 🔥 TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <Card title="Total Students" value={presence.totalEnrolled} icon={<Users />} color="blue" />
        <Card title="Present Today" value={presence.studentsOnCampus} icon={<UserCheck />} color="green" />
        <Card title="Attendance %" value={`${presence.attendancePercentage || 0}%`} icon={<Percent />} color="purple" />
        <Card title="Late Entries" value={presence.lateEntriesToday} icon={<Clock />} color="yellow" />

      </div>

      {/* 🔥 MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* CLASS TABLE */}
        <Section title="Class Breakdown">
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 text-left">Class</th>
                  <th>Sec</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>%</th>
                </tr>
              </thead>
              <tbody>
                {classData.length ? classData.map((c, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="p-2">{c.class}</td>
                    <td>{c.section}</td>
                    <td className="text-green-600">{c.present}</td>
                    <td className="text-red-500">{c.absent}</td>
                    <td>{c.attendancePercentage}%</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="text-center p-3 text-gray-400">
                      No Data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Section>

        {/* LATE ENTRIES */}
        <Section title="Recent Late Entries">
          {lateEntries.length ? lateEntries.map((l, i) => (
            <div key={i} className="flex justify-between bg-yellow-50 border border-yellow-200 p-3 rounded mb-2">
              <div>
                <p className="font-medium">{l.studentName}</p>
                <p className="text-sm text-gray-500">{l.class}</p>
              </div>
              <span className="text-yellow-600 font-semibold">
                {l.delayMinutes} min
              </span>
            </div>
          )) : (
            <p className="text-gray-400 text-center">No late entries</p>
          )}
        </Section>

      </div>

      {/* 🔥 TRANSPORT */}
      <Section title="Transport Breakdown" className="mt-6">
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left">Mode</th>
                <th>Registered</th>
                <th>Entered</th>
                <th>Late</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transport.length ? transport.map((t, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="p-2">{t.transportMode}</td>
                  <td>{t.registeredStudents}</td>
                  <td>{t.totalEntered}</td>
                  <td>{t.lateEntryCount}</td>
                  <td className="text-blue-600">{t.reconciliationStatus}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="text-center p-3 text-gray-400">
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 🔥 RECON CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <Card title="On Campus" value={recon.currentOnCampus} icon={<Users />} />
        <Card title="Discrepancies" value={recon.openDiscrepancies} icon={<AlertTriangle />} color="red" />
        <Card title="Late Pending" value={recon.lateEntriesPending} icon={<Clock />} color="yellow" />
        <Card title="Early Exits" value={recon.earlyExitsCompleted} icon={<Bus />} color="blue" />
      </div>

      {/* 🔥 EARLY EXITS */}
      <Section title="Early Exits" className="mt-6">
        {earlyExits.length ? earlyExits.map((e, i) => (
          <div key={i} className="flex justify-between bg-blue-50 border border-blue-200 p-3 rounded mb-2">
            <div>
              <p className="font-medium">{e.studentName}</p>
              <p className="text-sm text-gray-500">{e.class}</p>
            </div>
            <span className="text-blue-600 text-sm">
              {e.plannedExit}
            </span>
          </div>
        )) : (
          <p className="text-gray-400 text-center">No early exits</p>
        )}
      </Section>

    </Layout>
  );
}

/* 🔥 MODERN CARD */
function Card({ title, value = 0, icon, color = "gray" }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between hover:shadow-md transition">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800">{value || 0}</h2>
      </div>

      <div className={`p-3 rounded-lg bg-${color}-100 text-${color}-600`}>
        {icon}
      </div>
    </div>
  );
}

/* 🔥 SECTION */
function Section({ title, children, className = "" }) {
  return (
    <div className={`bg-white p-4 rounded-xl shadow ${className}`}>
      <h3 className="font-semibold mb-3 text-gray-700">
        {title}
      </h3>
      {children}
    </div>
  );
}