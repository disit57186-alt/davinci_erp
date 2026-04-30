import { useState } from "react";
import api from "../../api/axios";

export default function GateVerifyEarlyExit() {
  const [earlyExitId, setEarlyExitId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleVerify = async () => {
    if (!earlyExitId) {
      alert("Enter Early Exit ID");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/early-exits/gate-verify", {
        earlyExitId: Number(earlyExitId),
      });

      setResult(res.data?.data);

      alert("Gate Verified Successfully");

      console.log("Gate Verify Response:", res.data);

      setEarlyExitId("");

    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message ||
        "Gate verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md flex flex-col gap-3">

      <h2 className="font-bold">Gate Exit Verification</h2>

      {/* ID INPUT */}
      <input
        placeholder="Early Exit ID"
        value={earlyExitId}
        onChange={(e) => setEarlyExitId(e.target.value)}
        className="border p-2"
      />

      {/* VERIFY BUTTON */}
      <button
        onClick={handleVerify}
        disabled={loading}
        className="bg-red-600 text-white p-2 disabled:opacity-50"
      >
        {loading ? "Verifying..." : "Verify Exit"}
      </button>

      {/* RESULT CARD */}
      {result && (
        <div className="border p-3 rounded bg-gray-50 mt-3">

          <p><b>Name:</b> {result.studentName}</p>
          <p><b>Class:</b> {result.class} - {result.section}</p>
          <p><b>URN:</b> {result.urn}</p>
          <p><b>Status:</b> {result.overallStatus}</p>
          <p><b>Slip:</b> {result.slipNumber}</p>
          <p><b>Exit Time:</b> {result.exitedAt}</p>

        </div>
      )}

    </div>
  );
}