import { useState } from "react";
import api from "../../api/axios";

export default function AutoPresent() {
  const [date, setDate] = useState("");

  const handleAuto = async () => {
    if (!date) {
      alert("Select date");
      return;
    }

    try {
      const res = await api.post("/attendance/auto-mark-present", null, {
        params: {
          date: new Date(date).toISOString(), // ✅ important
        },
      });

      alert(res.data?.message || "Done");
    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  return (
    <div>
      <h2 className="font-bold mb-3">Auto Mark Present</h2>

      <div className="flex gap-3">
        <input type="date"
          onChange={(e) => setDate(e.target.value)}
          className="border p-2"
        />

        <button onClick={handleAuto} className="bg-purple-600 text-white px-4">
          Run
        </button>
      </div>
    </div>
  );
}