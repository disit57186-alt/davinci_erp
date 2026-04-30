import { useState } from "react";
import api from "../../api/axios";

export default function ApproveLate() {
  const [id, setId] = useState("");
  const [approved, setApproved] = useState(true);

  const handleSubmit = async () => {
    try {
      await api.post("/late-entries/approve", {
        lateEntryId: Number(id),
        isApproved: approved,
      });

      alert("Updated");
    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  return (
    <div className="max-w-md flex flex-col gap-3">

      <input
        placeholder="Late Entry ID"
        onChange={(e) => setId(e.target.value)}
        className="border p-2"
      />

      <select
        onChange={(e) => setApproved(e.target.value === "true")}
        className="border p-2"
      >
        <option value="true">Approve</option>
        <option value="false">Reject</option>
      </select>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white p-2"
      >
        Submit
      </button>
    </div>
  );
}