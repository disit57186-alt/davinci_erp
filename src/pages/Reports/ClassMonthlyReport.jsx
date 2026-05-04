import { useState } from "react";
import api from "../../api/axios";

export default function ClassMonthlyReport() {
  const [filters, setFilters] = useState({
    year: 2026,
    month: 1,
    classNo: "",
    section: "",
  });

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    if (!filters.classNo) return alert("Enter class");

    setLoading(true);
    try {
      const res = await api.get("/reports/register/class-monthly", {
        params: {
          Year: filters.year,
          Month: filters.month,
          Class: filters.classNo,
          Section: filters.section || undefined,
        },
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

      {/* 🔍 FILTERS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
        <input
          type="number"
          placeholder="Year"
          value={filters.year}
          onChange={(e) =>
            setFilters({ ...filters, year: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Month (1-12)"
          value={filters.month}
          onChange={(e) =>
            setFilters({ ...filters, month: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Class"
          value={filters.classNo}
          onChange={(e) =>
            setFilters({ ...filters, classNo: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          placeholder="Section (optional)"
          value={filters.section}
          onChange={(e) =>
            setFilters({ ...filters, section: e.target.value })
          }
          className="border p-2 rounded"
        />

        <button
          onClick={fetchReport}
          className="bg-blue-600 text-white rounded"
        >
          Load
        </button>
      </div>

      {/* LOADING */}
      {loading && <p className="text-blue-500">Loading...</p>}

      {/* DATA */}
      {data && (
        <div className="space-y-4">

          {/* 🔥 SUMMARY */}
          <div className="bg-white p-4 rounded-xl shadow grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <Info label="Month" value={data.monthLabel} />
            <Info label="Class" value={`${data.classNo} - ${data.section}`} />
            <Info label="Students" value={data.totalStudents} />
            <Info label="Working Days" value={data.workingDays} />
          </div>

          {/* 📊 TABLE */}
          <div className="overflow-auto bg-white rounded-xl shadow">
            <table className="min-w-full text-sm border">

              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Name</th>

                  {/* Days Header */}
                  {Array.from({ length: data.daysInMonth }, (_, i) => (
                    <th key={i} className="p-1 border text-xs">
                      {i + 1}
                    </th>
                  ))}

                  <th className="p-2 border">P</th>
                  <th className="p-2 border">A</th>
                </tr>
              </thead>

              <tbody>
                {data.students.map((s) => (
                  <tr key={s.urn} className="text-center">

                    <td className="border p-1">{s.slNo}</td>

                    <td className="border p-1 text-left">
                      {s.firstName} {s.lastName}
                    </td>

                    {/* DAILY */}
                    {Array.from({ length: data.daysInMonth }, (_, i) => {
                      const day = i + 1;
                      const val = s.dailyAttendance?.[day];

                      return (
                        <td
                          key={day}
                          className={`border text-xs ${
                            val === "P"
                              ? "bg-green-100"
                              : val === "A"
                              ? "bg-red-100"
                              : val === "H"
                              ? "bg-gray-200"
                              : ""
                          }`}
                        >
                          {val || "-"}
                        </td>
                      );
                    })}

                    <td className="border">{s.daysPresent}</td>
                    <td className="border">{s.daysAbsent}</td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
      )}
    </div>
  );
}

/* SMALL INFO */
function Info({ label, value }) {
  return (
    <p>
      <b>{label}:</b> {value || "-"}
    </p>
  );
}