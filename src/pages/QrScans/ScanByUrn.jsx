import { useState } from "react";
import api from "../../api/axios";

export default function ScanByUrn() {
  const [urn, setUrn] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!urn) return alert("Enter URN");

    try {
      setLoading(true);

      const res = await api.get(`/QrStudentScans/urn/${urn}`);
      setData(res.data?.data || null);

    } catch (err) {
      console.log(err);
      alert("Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md space-y-4">

      <h2 className="font-bold text-lg">🔍 Scan by URN</h2>

      <input
        value={urn}
        onChange={(e) => setUrn(e.target.value)}
        placeholder="Enter URN"
        className="border p-2 w-full rounded"
      />

      <button
        onClick={handleCheck}
        className="bg-blue-600 text-white p-2 w-full rounded"
      >
        {loading ? "Loading..." : "Check"}
      </button>

      {data && (
        <div className="bg-gray-100 p-3 rounded text-sm">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

    </div>
  );
}