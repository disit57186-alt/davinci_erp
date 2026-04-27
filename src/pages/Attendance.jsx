// src/pages/Attendance.jsx
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

export default function Attendance() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Filters (dynamic)
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedClass, setSelectedClass] = useState(2);
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

  useEffect(() => {
    fetchAttendance();
  }, [date, selectedClass, section]);

  return (
    <Layout>

      {/* Header */}
      <h1 className="text-2xl font-bold mb-1">Attendance</h1>
      <p className="text-gray-500 mb-6">
        Manage and view daily attendance
      </p>

      {/* 🎛 Filters Card */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <div className="flex flex-wrap gap-4">

          {/* Date */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded-lg"
          />

          {/* Class */}
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border p-2 rounded-lg"
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
            className="border p-2 rounded-lg"
          >
            {["A", "B", "C", "D"].map((s) => (
              <option key={s} value={s}>
                Section {s}
              </option>
            ))}
          </select>

        </div>
      </div>

      {/* 📊 Table Card */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="p-4 border-b">
          <h3 className="font-semibold">Student List</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">URN</th>
                <th className="text-left">Name</th>
                <th className="text-left">Class</th>
                <th className="text-left">Section</th>
                <th className="text-left">Father Mobile</th>
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
                  <tr key={s.urn} className="border-t hover:bg-gray-50">
                    <td className="p-3">{s.urn}</td>
                    <td>{s.firstName} {s.lastName}</td>
                    <td>{s.class}</td>
                    <td>{s.section}</td>
                    <td>{s.fatherMobile}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>

    </Layout>
  );
}