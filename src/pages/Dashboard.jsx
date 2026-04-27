import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Dynamic states
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedClass, setSelectedClass] = useState(6);
  const [section, setSection] = useState("A");

  const fetchAttendance = async () => {
    try {
      setLoading(true);

      const res = await api.get("/attendance/daily", {
        params: {
          date,
          class: selectedClass,
          section,
        },
      });

      setStudents(res.data?.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Auto fetch when filters change
  useEffect(() => {
    fetchAttendance();
  }, [date, selectedClass, section]);

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">
        Attendance
      </h2>

      {/* 🎛 Filters */}
      <div className="flex gap-4 mb-4 flex-wrap">

        {/* Date */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />

        {/* Class */}
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border p-2 rounded"
        >
          {[1,2,3,4,5,6,7,8,9,10].map((c) => (
            <option key={c} value={c}>
              Class {c}
            </option>
          ))}
        </select>

        {/* Section */}
        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="border p-2 rounded"
        >
          {["A", "B", "C", "D"].map((s) => (
            <option key={s} value={s}>
              Section {s}
            </option>
          ))}
        </select>

      </div>

      {/* 📊 Table */}
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">URN</th>
              <th>Name</th>
              <th>Class</th>
              <th>Section</th>
              <th>Father Mobile</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : students.length ? (
              students.map((s) => (
                <tr key={s.urn} className="text-center border-t">
                  <td>{s.urn}</td>
                  <td>{s.firstName} {s.lastName}</td>
                  <td>{s.class}</td>
                  <td>{s.section}</td>
                  <td>{s.fatherMobile}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}