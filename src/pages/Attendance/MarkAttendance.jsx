import { useState } from "react";
import api from "../../api/axios";

export default function MarkAttendance() {
  const [form, setForm] = useState({
    date: "",
    urn: "",
    status: "",
    reasonCode: "",
    remarks: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.date || !form.urn || !form.status) {
      return alert("Required fields missing");
    }

    setLoading(true);

    try {
      const res = await api.put("/attendance/status", {
        ...form,
        date: form.date, // ✅ FIXED
        urn: Number(form.urn),
      });

      alert(res.data?.message || "Success");

      setForm({
        date: "",
        urn: "",
        status: "",
        reasonCode: "",
        remarks: "",
      });

    } catch (err) {
      console.error(err);
      alert("Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="font-bold mb-3">Update Attendance</h2>

      <div className="grid grid-cols-2 gap-3 max-w-lg">
        <input type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border p-2"
        />

        <input type="number"
          value={form.urn}
          onChange={(e) => setForm({ ...form, urn: e.target.value })}
          className="border p-2"
        />

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="border p-2"
        >
          <option value="">Select Status</option>
          <option value="PRESENT">Present</option>
          <option value="ABSENT">Absent</option>
          <option value="LATE">Late</option>
          <option value="HALFDAY">Half Day</option>
        </select>

        <input
          value={form.reasonCode}
          onChange={(e) => setForm({ ...form, reasonCode: e.target.value })}
          className="border p-2"
        />

        <input
          value={form.remarks}
          onChange={(e) => setForm({ ...form, remarks: e.target.value })}
          className="border p-2 col-span-2"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-600 text-white p-2 col-span-2"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
}