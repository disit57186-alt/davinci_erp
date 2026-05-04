// src/pages/Students/StudentsList.jsx
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function StudentsList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await api.get("/students");
      setData(res.data?.data || []);
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h3 className="font-semibold mb-4">📋 All Students</h3>

      {loading ? (
        <p className="text-blue-500">Loading...</p>
      ) : data.length ? (
        <div className="overflow-auto rounded-xl border shadow">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-2 text-left">URN</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2">Class</th>
                <th className="p-2">Section</th>
                <th className="p-2">Bus</th>
                <th className="p-2">Father</th>
                <th className="p-2">Mother</th>
              </tr>
            </thead>

            <tbody>
              {data.map((s, i) => (
                <tr
                  key={i}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-2 font-medium">{s.urn}</td>

                  {/* 🔥 FULL NAME */}
                  <td className="p-2">
                    {s.firstName} {s.lastName}
                  </td>

                  <td className="p-2 text-center">{s.class}</td>

                  {/* HANDLE NULL */}
                  <td className="p-2 text-center">
                    {s.section || "-"}
                  </td>

                  <td className="p-2 text-center">
                    {s.busRoute || "-"}
                  </td>

                  <td className="p-2">
                    {s.fatherMobile || "-"}
                  </td>

                  <td className="p-2">
                    {s.motherMobile || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          No students found
        </p>
      )}
    </div>
  );
}