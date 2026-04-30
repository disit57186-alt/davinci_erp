import { useState } from "react";
import api from "../../api/axios";

export default function ApproveEarlyExit() {
  const [earlyExitId, setEarlyExitId] = useState("");
  const [isApproved, setIsApproved] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!earlyExitId) {
      alert("Please enter Early Exit ID");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/early-exits/approve", {
        earlyExitId: Number(earlyExitId),
        isApproved,
      });

      const data = res.data?.data;

      alert(
        isApproved
          ? `Approved: Slip ${data?.slipNumber || "Generated"}`
          : "Rejected Successfully"
      );

      console.log("Approval Response:", res.data);

      setEarlyExitId("");

    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message ||
        "Failed to process approval"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md flex flex-col gap-3">

      <h2 className="font-bold">Approve Early Exit</h2>

      {/* ID */}
      <input
        placeholder="Early Exit ID"
        value={earlyExitId}
        onChange={(e) => setEarlyExitId(e.target.value)}
        className="border p-2"
      />

      {/* Approve / Reject */}
      <select
        value={isApproved}
        onChange={(e) => setIsApproved(e.target.value === "true")}
        className="border p-2"
      >
        <option value="true">Approve</option>
        <option value="false">Reject</option>
      </select>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-green-600 text-white p-2 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Submit"}
      </button>

    </div>
  );
}