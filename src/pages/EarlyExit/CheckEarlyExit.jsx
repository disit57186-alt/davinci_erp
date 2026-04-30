import { useState } from "react";
import api from "../../api/axios";

export default function CheckEarlyExit() {
  const [urn, setUrn] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!urn) {
      alert("Enter URN");
      return;
    }

    try {
      setLoading(true);

      const res = await api.get(`/early-exits/check/${urn}`);

      // ⚠️ API returns string in data
      setResult(res.data?.data || "No record found");

      console.log("Check Response:", res.data);

    } catch (err) {
      console.log(err);
      setResult("");
      alert(
        err.response?.data?.message ||
        "Check failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md flex flex-col gap-3">

      <h2 className="font-bold">Check Early Exit by URN</h2>

      {/* URN INPUT */}
      <input
        placeholder="Enter URN"
        value={urn}
        onChange={(e) => setUrn(e.target.value)}
        className="border p-2"
      />

      {/* BUTTON */}
      <button
        onClick={handleCheck}
        disabled={loading}
        className="bg-purple-600 text-white p-2 disabled:opacity-50"
      >
        {loading ? "Checking..." : "Check"}
      </button>

      {/* RESULT */}
      {result && (
        <div className="bg-gray-100 p-3 rounded mt-3 text-sm">
          {result}
        </div>
      )}

    </div>
  );
}