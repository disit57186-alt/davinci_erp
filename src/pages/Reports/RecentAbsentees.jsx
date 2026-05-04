import { useState } from "react";
import api from "../../api/axios";

export default function RecentAbsentees() {
  const [form, setForm] = useState({
    Days: 7,
    Class: "",
    Section: "",
    MinDays: 2,
  });

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/reports/recent-absentees", {
        params: form,
      });
      setData(res.data?.data);
    } catch (err) {
      console.log(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    try {
      const res = await api.get("/reports/recent-absentees/pdf", {
        params: form,
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "recent_absentees.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>

      {/* 🔍 FILTER */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <input
          name="Days"
          value={form.Days}
          onChange={handleChange}
          placeholder="Days"
          className="border p-2 rounded"
        />

        <input
          name="Class"
          value={form.Class}
          onChange={handleChange}
          placeholder="Class"
          className="border p-2 rounded"
        />

        <input
          name="Section"
          value={form.Section}
          onChange={handleChange}
          placeholder="Section"
          className="border p-2 rounded"
        />

        <input
          name="MinDays"
          value={form.MinDays}
          onChange={handleChange}
          placeholder="Min Days"
          className="border p-2 rounded"
        />
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={fetchData}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Fetch
        </button>

        <button
          onClick={downloadPDF}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>
      </div>

      {/* LOADING */}
      {loading && <p className="text-blue-500">Loading...</p>}

      {/* SUMMARY */}
      {data && (
        <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <SummaryBox label="Students" value={data.summary?.totalStudentsWithAbsences} />
          <SummaryBox label="Absences" value={data.summary?.totalAbsenceInstances} />
          <SummaryBox label="Critical" value={data.summary?.criticalCount} />
          <SummaryBox label="Warning" value={data.summary?.warningCount} />
        </div>
      )}

      {/* TABLE */}
      {data?.absentees?.length > 0 && (
        <div className="overflow-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">URN</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Class</th>
                <th className="p-2 border">Absent Days</th>
                <th className="p-2 border">Consecutive</th>
                <th className="p-2 border">Severity</th>
              </tr>
            </thead>

            <tbody>
              {data.absentees.map((s, i) => (
                <tr key={i}>
                  <td className="p-2 border">{s.urn}</td>
                  <td className="p-2 border">{s.fullName || "-"}</td>
                  <td className="p-2 border">
                    {s.class} - {s.section}
                  </td>
                  <td className="p-2 border">{s.totalAbsentDays}</td>
                  <td className="p-2 border">{s.consecutiveAbsences}</td>
                  <td className="p-2 border">
                    <SeverityBadge value={s.severity} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && data && !data.absentees?.length && (
        <p className="text-center text-gray-500 mt-5">
          No absentees found
        </p>
      )}
    </div>
  );
}

/* 🔥 SUMMARY BOX */
function SummaryBox({ label, value }) {
  return (
    <div className="bg-white p-3 rounded shadow text-center">
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-bold text-lg">{value ?? 0}</p>
    </div>
  );
}

/* 🔥 SEVERITY COLORS */
function SeverityBadge({ value }) {
  const colors = {
    CRITICAL: "bg-red-100 text-red-700",
    WARNING: "bg-yellow-100 text-yellow-700",
    MONITOR: "bg-blue-100 text-blue-700",
  };

  return (
    <span className={`px-2 py-1 rounded text-xs ${colors[value] || "bg-gray-100"}`}>
      {value}
    </span>
  );
}