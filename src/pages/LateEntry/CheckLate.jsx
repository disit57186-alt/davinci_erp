import { useState } from "react";
import api from "../../api/axios";

export default function CheckLate() {
  const [urn, setUrn] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!urn || isNaN(urn)) {
      alert("Enter valid URN");
      return;
    }

    try {
      setLoading(true);

      const res = await api.get(`/late-entries/check/${urn}`);
      setResult(res.data?.data);

    } catch (err) {
      console.log(err);
      setResult(null);
      alert(err?.response?.data?.message || "Check failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md flex flex-col gap-3">

      <h2 className="font-bold">Check Late Entry</h2>

      <input
        placeholder="Enter URN"
        value={urn}
        onChange={(e) => setUrn(e.target.value)}
        className="border p-2"
      />

      <button
        onClick={handleCheck}
        disabled={loading}
        className="bg-purple-600 text-white p-2 disabled:opacity-50"
      >
        {loading ? "Checking..." : "Check"}
      </button>

      {/* ✅ RESULT CARD */}
      {result && (
        <div className="bg-white shadow rounded-xl p-4 mt-3 space-y-2">

          <p><b>URN:</b> {result.urn}</p>

          <Status label="Entered Today" value={result.hasEnteredToday} />
          <Status label="Late Entry Today" value={result.hasLateEntryToday} />

          <p>
            <b>Weekly Late Count:</b> {result.weeklyLateCount}
          </p>

          {/* 🔥 Decision */}
          <div
            className={`p-3 rounded text-center font-semibold ${
              result.canCreateLateEntry
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {result.canCreateLateEntry
              ? "✅ Eligible for Late Entry"
              : "❌ Not Allowed for Late Entry"}
          </div>

        </div>
      )}

    </div>
  );
}

/* 🔥 Reusable status */
function Status({ label, value }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span
        className={
          value
            ? "text-green-600 font-semibold"
            : "text-red-600 font-semibold"
        }
      >
        {value ? "Yes" : "No"}
      </span>
    </div>
  );
}