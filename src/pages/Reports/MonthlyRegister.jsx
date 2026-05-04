import { useState } from "react";
import api from "../../api/axios";

export default function MonthlyRegister() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [classNo, setClassNo] = useState("");
  const [section, setSection] = useState("");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= FETCH ================= */
  const fetchReport = async () => {
    if (!year || !month || !classNo) {
      alert("Enter Year, Month & Class");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await api.get("/reports/monthly-register", {
        params: {
          Year: Number(year),
          Month: Number(month),
          Class: Number(classNo),
          Section: section || undefined,
        },
      });

      if (!res.data?.success) {
        setError(res.data?.message || "Failed to load");
        return;
      }

      setData(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= PDF DOWNLOAD ================= */
  const downloadPDF = async () => {
    if (!year || !month || !classNo) {
      alert("Enter Year, Month & Class");
      return;
    }

    try {
      const res = await api.get("/reports/monthly-register/pdf", {
        params: {
          Year: Number(year),
          Month: Number(month),
          Class: Number(classNo),
          Section: section || undefined,
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = url;
      link.download = `monthly-register-${classNo}-${section || "all"}-${month}-${year}.pdf`;
      link.target = "_blank"; // fallback support
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("PDF download failed");
    }
  };

  const days = data?.header?.dayMeta || [];

  return (
    <div>
      {/* 🔍 FILTER */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          placeholder="Year (2026)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          placeholder="Month (1-12)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          placeholder="Class"
          value={classNo}
          onChange={(e) => setClassNo(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          placeholder="Section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={fetchReport}
          disabled={loading}
          className="bg-blue-600 text-white px-4 rounded"
        >
          {loading ? "Loading..." : "Load"}
        </button>

        <button
          onClick={downloadPDF}
          className="bg-green-600 text-white px-4 rounded"
        >
          PDF
        </button>
      </div>

      {/* ❌ ERROR */}
      {error && <p className="text-red-500">{error}</p>}

      {/* ⏳ LOADING */}
      {loading && <p className="text-blue-500">Loading...</p>}

      {/* 📊 DATA */}
      {data && (
        <div className="space-y-4">

          {/* 📌 HEADER INFO */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold text-lg">
              {data.header.month} - {data.header.year}
            </h2>
            <p className="text-sm">
              Class {data.header.class} - {data.header.section}
            </p>
            <p className="text-xs text-gray-500">
              Students: {data.header.totalStudents} | Working Days: {data.header.mtdWorkingDays}
            </p>
          </div>

          {/* 📅 TABLE */}
          <div className="overflow-auto border rounded">
            <table className="min-w-full text-xs text-center">

              {/* HEADER */}
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">URN</th>
                  <th className="p-2 border">Name</th>

                  {days.map((d) => (
                    <th key={d.day} className="p-1 border">
                      {d.day}
                    </th>
                  ))}

                  <th className="p-2 border">P</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {data.students?.length > 0 ? (
                  data.students.map((s) => (
                    <tr key={s.urn}>
                      <td className="border p-1">{s.urn}</td>

                      <td className="border p-1 text-left">
                        {s.firstName} {s.lastName}
                      </td>

                      {days.map((d) => {
                        const val = s.dailyAttendance[d.day];

                        return (
                          <td
                            key={d.day}
                            className={`border p-1 ${
                              val === "P"
                                ? "text-green-600"
                                : val === "A"
                                ? "text-red-600"
                                : "text-gray-400"
                            }`}
                          >
                            {val || "-"}
                          </td>
                        );
                      })}

                      <td className="border p-1 font-bold">
                        {s.daysPresent}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={days.length + 3} className="p-4 text-gray-500">
                      🚫 No data available
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

        </div>
      )}
    </div>
  );
}