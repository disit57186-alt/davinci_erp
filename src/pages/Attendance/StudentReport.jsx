import { useState } from "react";
import api from "../../api/axios";
import { getData } from "../../utils/apiResponse";

export default function StudentReport() {
  const [urn, setUrn] = useState("");
  const [report, setReport] = useState(null);
  const [monthly, setMonthly] = useState([]);

  const fetchReport = async () => {
    if (!urn) return alert("Enter URN");

    try {
      const [ytd, m] = await Promise.all([
        api.get(`/attendance/student/${urn}/ytd`),
        api.get(`/attendance/student/${urn}/monthly`, {
          params: { year: 2026 },
        }),
      ]);

      setReport(getData(ytd, null));
      setMonthly(getData(m));
    } catch (err) {
      console.error(err);
      alert("Failed to fetch report");
    }
  };

  return (
    <div>
      <div className="flex gap-3 mb-3">
        <input value={urn} onChange={(e) => setUrn(e.target.value)} className="border p-2" />
        <button onClick={fetchReport} className="bg-blue-600 text-white px-3">
          Get Report
        </button>
      </div>

      {report && (
        <div className="grid grid-cols-3 gap-4 mb-4">
          <Card title="Present" value={report.totalPresent} />
          <Card title="Absent" value={report.totalAbsent} />
          <Card title="%" value={report.attendancePct} />
        </div>
      )}

      {monthly.length > 0 && (
        <table className="w-full">
          <thead>
            <tr>
              <th>Month</th>
              <th>Present</th>
              <th>Absent</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            {monthly.map((m, i) => (
              <tr key={i}>
                <td>{m.yearMonth}</td>
                <td>{m.daysPresent}</td>
                <td>{m.daysAbsent}</td>
                <td>{m.attendancePct}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 shadow rounded">
      <p>{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
}