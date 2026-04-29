import { useState } from "react";
import api from "../../api/axios";

export default function BulkAbsent() {
  const [date, setDate] = useState("");
  const [urnCsv, setUrnCsv] = useState("");
  const [reasonCode, setReasonCode] = useState("");

  const handleSubmit = async () => {
    if (!date || !urnCsv) {
      alert("Date & URNs required");
      return;
    }

    try {
      const res = await api.post("/attendance/bulk-absent", {
        date: new Date(date).toISOString(), // ✅ IMPORTANT
        urnCsv,
        reasonCode,
      });

      alert(res.data?.message || "Success");
    } catch (err) {
      console.log(err);
      alert("Failed to mark absentees");
    }
  };

  return (
    <div>
      <h2 className="font-bold mb-3">Bulk Absent</h2>

      <div className="flex flex-col gap-3 max-w-md">
        <input type="date" onChange={(e) => setDate(e.target.value)} className="border p-2" />

        <textarea
          placeholder="Enter URNs (comma separated)"
          onChange={(e) => setUrnCsv(e.target.value)}
          className="border p-2"
        />

        <input
          placeholder="Reason Code"
          onChange={(e) => setReasonCode(e.target.value)}
          className="border p-2"
        />

        <button onClick={handleSubmit} className="bg-red-600 text-white p-2">
          Submit
        </button>
      </div>
    </div>
  );
}