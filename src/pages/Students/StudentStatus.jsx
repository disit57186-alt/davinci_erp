import { useState } from "react";
import api from "../../api/axios";

export default function StudentStatus() {
  const [urn, setUrn] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ NEW: update form
  const [form, setForm] = useState({
    newStatus: "",
    location: "",
    updateReason: "",
    expectedReturnTime: "",
  });

  // 🔍 GET STATUS
  const fetchStatus = async () => {
    if (!urn) return;

    setLoading(true);
    try {
      const res = await api.get(`/student-status/${urn}`);
      setData(res.data?.data);
    } catch (err) {
      console.log(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // ✏️ PUT STATUS (IMPORTANT FIXED)
  const updateStatus = async () => {
    if (!urn || !form.newStatus) {
      return alert("URN and status required");
    }

    try {
      await api.put("/student-status", {
        dto: {
          urn: Number(urn),
          newStatus: form.newStatus,
          location: form.location,
          updateReason: form.updateReason,
          expectedReturnTime:
            form.expectedReturnTime || null, // ⚠️ FIX
        },
      });

      alert("Status updated ✅");

      fetchStatus(); // refresh
    } catch (err) {
      console.log(err.response?.data || err);
      alert("Update failed ❌");
    }
  };

  return (
    <div>

      {/* 🔍 SEARCH */}
      <div className="flex gap-2 mb-4">
        <input
          value={urn}
          onChange={(e) => setUrn(e.target.value)}
          placeholder="Enter URN"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={fetchStatus}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Check
        </button>
      </div>

      {/* LOADING */}
      {loading && <p className="text-blue-500">Loading...</p>}

      {/* DATA */}
      {data && (
        <div className="space-y-4">

          {/* 🔥 PROFILE */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-lg font-bold">
              {data.studentName}
            </h3>

            <p className="text-gray-500 text-sm">
              Class {data.class} - {data.section || "-"}
            </p>

            <div className="mt-3">
              <StatusBadge status={data.currentStatus} />
            </div>

            <p className="text-xs text-gray-400 mt-2">
              Updated at: {formatDate(data.statusChangedAt)}
            </p>
          </div>

          {/* 📍 INFO */}
          <div className="bg-white p-4 rounded-xl shadow grid grid-cols-2 gap-3 text-sm">
            <Info label="Location" value={data.location} />
            <Info label="Updated By" value={data.statusChangedBy} />
            <Info label="Expected Return" value={data.expectedReturn} />
          </div>

          {/* ✏️ UPDATE FORM */}
          <div className="bg-white p-4 rounded-xl shadow space-y-3">
            <h4 className="font-semibold">Update Status</h4>

            <select
              value={form.newStatus}
              onChange={(e) =>
                setForm({ ...form, newStatus: e.target.value })
              }
              className="border p-2 rounded w-full"
            >
              <option value="">Select Status</option>
              <option value="Present">Present</option>
              <option value="Late">Late</option>
              <option value="Absent">Absent</option>
              <option value="EarlyExit">EarlyExit</option>
              <option value="NotYetArrived">NotYetArrived</option>
            </select>

            <input
              placeholder="Location"
              className="border p-2 rounded w-full"
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
            />

            <input
              placeholder="Reason"
              className="border p-2 rounded w-full"
              onChange={(e) =>
                setForm({ ...form, updateReason: e.target.value })
              }
            />

            <input
              type="time"
              className="border p-2 rounded w-full"
              onChange={(e) =>
                setForm({
                  ...form,
                  expectedReturnTime: e.target.value,
                })
              }
            />

            <button
              onClick={updateStatus}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Update Status
            </button>
          </div>

          {/* 📊 TIMELINE */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-3">📊 Timeline</h4>

            {data.todayTimeline?.length ? (
              <div className="space-y-3">
                {data.todayTimeline.map((t, i) => (
                  <div key={i} className="border-l-4 border-blue-500 pl-3">
                    <p className="font-medium">{t.status}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(t.eventTime)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {t.location || "-"} • {t.updatedBy}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                No activity today
              </p>
            )}
          </div>

        </div>
      )}
    </div>
  );
}

/* 🎨 STATUS */
function StatusBadge({ status }) {
  const colors = {
    Present: "bg-green-100 text-green-700",
    Late: "bg-yellow-100 text-yellow-700",
    Absent: "bg-red-100 text-red-700",
    NotYetArrived: "bg-gray-200 text-gray-700",
    EarlyExit: "bg-blue-100 text-blue-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${colors[status]}`}>
      {status}
    </span>
  );
}

/* ℹ️ INFO */
function Info({ label, value }) {
  return (
    <p>
      <b>{label}:</b> {value || "-"}
    </p>
  );
}

/* 📅 DATE */
function formatDate(date) {
  if (!date) return "-";
  return new Date(date).toLocaleString();
}