import { useState } from "react";
import api from "../../api/axios";

export default function StudentsByClass() {
  const [cls, setCls] = useState("");
  const [section, setSection] = useState("");
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    if (!cls) return alert("Select class");

    setLoading(true);
    setError("");
    setStudents([]);

    try {
      const res = await api.get(`/students/class/${cls}`, {
        params: { section },
      });

      setStudents(res.data?.data || []);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">

      {/* 🎯 FILTERS */}
      <div className="bg-gray-50 p-4 rounded-xl flex flex-wrap gap-3 items-end">

        {/* CLASS */}
        <div>
          <label className="text-xs text-gray-500">Class</label>
          <select
            value={cls}
            onChange={(e) => setCls(e.target.value)}
            className="border p-2 rounded-lg w-32"
          >
            <option value="">Select</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>
                Class {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* SECTION */}
        <div>
          <label className="text-xs text-gray-500">Section</label>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="border p-2 rounded-lg w-32"
          >
            <option value="">All</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleFetch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Get Students
        </button>

      </div>

      {/* 🔄 STATES */}
      {loading && (
        <p className="text-blue-500 text-center">Loading...</p>
      )}

      {error && (
        <p className="text-red-500 text-center">{error}</p>
      )}

      {/* 📊 TABLE */}
      {!loading && !error && (
        <div className="bg-white rounded-xl shadow overflow-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">URN</th>
                <th>Name</th>
                <th>Class</th>
                <th>Sec</th>
                <th>Gender</th>
                <th>Bus</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {students.length ? (
                students.map((s, i) => (
                  <tr
                    key={i}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-3 font-medium">{s.urn}</td>

                    <td>
                      {s.firstName} {s.lastName}
                    </td>

                    <td>{s.class}</td>
                    <td>{s.section}</td>

                    <td>
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                        {s.gender}
                      </span>
                    </td>

                    <td>{s.busNumber || "-"}</td>
                    <td>{s.fatherMobile || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-6 text-gray-500"
                  >
                    No students found
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>
      )}
    </div>
  );
}