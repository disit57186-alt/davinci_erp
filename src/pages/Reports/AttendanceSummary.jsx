// src/pages/Reports/AttendanceSummary.jsx
import { useState } from "react";
import api from "../../api/axios";

export default function AttendanceSummary() {
  const [form, setForm] = useState({
    Class: "",
    Section: "",
    AcademicYear: "",
  });

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchSummary = async () => {
    if (!form.Class || !form.AcademicYear) {
      alert("Class and Academic Year required");
      return;
    }

    setLoading(true);
    try {
      const res = await api.get("/reports/attendance-summary", {
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

  return (
    <div>

      {/* 🔍 FILTER */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
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
          name="AcademicYear"
          value={form.AcademicYear}
          onChange={handleChange}
          placeholder="Academic Year (e.g. 202612)"
          className="border p-2 rounded"
        />
      </div>

      {/* ACTION */}
      <button
        onClick={fetchSummary}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Fetch Summary
      </button>

      {/* LOADING */}
      {loading && <p className="text-blue-500">Loading...</p>}

      {/* HEADER INFO */}
      {data && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="font-bold text-lg">
            Class {data.class} - {data.section || "-"}
          </h3>
          <p className="text-sm text-gray-500">
            Academic Year: {data.academicYear}
          </p>
        </div>
      )}

      {/* TABLE */}
      {data?.students?.length > 0 && (
        <div className="overflow-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">URN</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Present</th>
                <th className="p-2 border">Absent</th>
                <th className="p-2 border">Leave</th>
                <th className="p-2 border">%</th>
              </tr>
            </thead>

            <tbody>
              {data.students.map((s, i) => (
                <tr key={i}>
                  <td className="p-2 border">{s.urn}</td>
                  <td className="p-2 border">
                    {s.firstName} {s.lastName}
                  </td>
                  <td className="p-2 border">{s.daysPresent}</td>
                  <td className="p-2 border">{s.daysAbsent}</td>
                  <td className="p-2 border">{s.daysLeave}</td>
                  <td className="p-2 border">
                    {calculatePercentage(s)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* EMPTY */}
      {!loading && data && !data.students?.length && (
        <p className="text-center text-gray-500 mt-5">
          No attendance data found
        </p>
      )}
    </div>
  );
}

/* 🔥 CALCULATE % */
function calculatePercentage(s) {
  const total =
    (s.daysPresent || 0) +
    (s.daysAbsent || 0) +
    (s.daysLeave || 0);

  if (!total) return 0;

  return ((s.daysPresent / total) * 100).toFixed(1);
}