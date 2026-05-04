import { useState } from "react";
import api from "../../api/axios";

export default function StudentYearReport() {
  const [urn, setUrn] = useState("");
  const [year, setYear] = useState("");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= FETCH REPORT ================= */
  const fetchReport = async () => {
    if (!urn || !year) {
      alert("Enter URN & Academic Year");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await api.get("/reports/register/student-year", {
        params: {
          Urn: Number(urn),
          AcademicYear: Number(year),
        },
      });

      console.log("API RESPONSE:", res.data);

      if (!res.data?.success) {
        setError(res.data?.message || "Failed to load report");
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

  /* ================= DOWNLOAD PDF ================= */
  const downloadPDF = async () => {
    if (!urn || !year) return;

    try {
      const res = await api.get(
        "/reports/register/student-year/pdf",
        {
          params: {
            Urn: Number(urn),
            AcademicYear: Number(year),
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = url;
      link.download = "student-report.pdf";
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Download failed");
    }
  };

  return (
    <div>

      {/* 🔍 FILTER */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          placeholder="Enter URN"
          value={urn}
          onChange={(e) => setUrn(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          placeholder="Academic Year (e.g. 202324)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={fetchReport}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Loading..." : "Load"}
        </button>

        <button
          onClick={downloadPDF}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>
      </div>

      {/* ❌ ERROR */}
      {error && (
        <p className="text-red-500 mb-3">{error}</p>
      )}

      {/* ⏳ LOADING */}
      {loading && (
        <p className="text-blue-500">Loading report...</p>
      )}

      {/* 📊 DATA */}
      {data && (
        <div className="space-y-4">

          {/* 👤 STUDENT INFO */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-bold text-lg">
              {data.firstName || "N/A"} {data.lastName}
            </h3>
            <p className="text-sm text-gray-500">
              Class {data.classNo} - {data.section || "-"}
            </p>
            <p className="text-xs text-gray-400">
              Academic Year: {data.academicYear}
            </p>
          </div>

          {/* 📈 SUMMARY */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <Info label="Working Days" value={data.totalWorkingDays} />
            <Info label="Present" value={data.totalPresent} />
            <Info label="Absent" value={data.totalAbsent} />
            <Info label="Leave" value={data.totalLeave} />
          </div>

          {/* 📅 MONTH TABLE */}
          <div className="overflow-auto border rounded bg-white">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Month</th>
                  <th className="p-2 border">Working</th>
                  <th className="p-2 border">P</th>
                  <th className="p-2 border">A</th>
                  <th className="p-2 border">L</th>
                </tr>
              </thead>

              <tbody>
                {data.months?.length > 0 ? (
                  data.months.map((m) => (
                    <tr key={m.slNo} className="text-center">
                      <td className="border p-1">{m.slNo}</td>
                      <td className="border p-1">{m.monthLabel}</td>
                      <td className="border p-1">{m.workingDays}</td>
                      <td className="border p-1 text-green-600">
                        {m.daysPresent}
                      </td>
                      <td className="border p-1 text-red-600">
                        {m.daysAbsent}
                      </td>
                      <td className="border p-1 text-yellow-600">
                        {m.daysLeave}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center p-4 text-gray-500"
                    >
                      🚫 No attendance data found for this student/year
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

/* 🔹 SMALL COMPONENT */
function Info({ label, value }) {
  return (
    <div className="bg-white p-3 rounded shadow text-center">
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-bold text-lg">{value ?? 0}</p>
    </div>
  );
}