import { useState } from "react";
import api from "../../api/axios";
import Table from "../../components/Table";

export default function BusScans() {
  const [busId, setBusId] = useState("");
  const [type, setType] = useState("entry");
  const [data, setData] = useState([]);

  const load = async () => {
    try {
      const res = await api.get(
        `/QrStudentScans/bus/${busId}/${type}`
      );

      setData(res.data?.data || []);
    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  return (
    <div className="space-y-3">

      <div className="flex gap-2">

        <input
          placeholder="Bus ID"
          value={busId}
          onChange={(e) => setBusId(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="entry">Entry</option>
          <option value="exit">Exit</option>
        </select>

        <button
          onClick={load}
          className="bg-indigo-600 text-white px-4 rounded"
        >
          Load
        </button>

      </div>

      <Table data={data} />

    </div>
  );
}