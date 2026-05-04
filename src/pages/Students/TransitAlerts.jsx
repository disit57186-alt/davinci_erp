// src/pages/Students/TransitAlerts.jsx
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function TransitAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/student-status/in-transit-alerts");
      setAlerts(res.data?.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch alerts ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <div>

      <h3 className="font-semibold mb-3">🚨 In-Transit Alerts</h3>

      {loading && <p>Loading...</p>}

      <div className="space-y-3">
        {alerts.length ? (
          alerts.map((a, i) => (
            <div key={i} className="bg-red-50 p-3 rounded border">
              <p className="font-bold">{a.studentName}</p>
              <p className="text-sm">
                Status: {a.currentStatus}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(a.statusChangedAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            No alerts
          </p>
        )}
      </div>

    </div>
  );
}