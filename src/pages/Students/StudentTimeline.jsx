// src/pages/Students/StudentTimeline.jsx
import { useState } from "react";
import api from "../../api/axios";

export default function StudentTimeline() {
  const [urn, setUrn] = useState("");
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTimeline = async () => {
    if (!urn) return;

    setLoading(true);
    try {
      const res = await api.get(`/student-status/${urn}/timeline`);
      setTimeline(res.data?.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load timeline ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <div className="flex gap-2 mb-4">
        <input
          value={urn}
          onChange={(e) => setUrn(e.target.value)}
          placeholder="Enter URN"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={fetchTimeline}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Load
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <div className="space-y-3">
        {timeline.length ? (
          timeline.map((t, i) => (
            <div key={i} className="border-l-4 border-blue-500 pl-3">
              <p className="font-medium">{t.status}</p>
              <p className="text-xs text-gray-500">
                {new Date(t.eventTime).toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">
                {t.location || "-"} • {t.updatedBy}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            No timeline data
          </p>
        )}
      </div>

    </div>
  );
}