import { useState } from "react";
import api from "../../api/axios";
import Table from "../../components/Table";
import { getData } from "../../utils/apiResponse";

export default function LowAttendance() {
  const [threshold, setThreshold] = useState(75);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await api.get("/attendance/low", {
        params: { threshold },
      });

      setData(getData(res));
    } catch (err) {
      console.error(err);
      alert("Failed to fetch data");
    }
  };

  return (
    <div>
      <div className="flex gap-3 mb-4">
        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="border p-2"
        />
        <button onClick={fetchData} className="bg-red-500 text-white px-4">
          Get Low Attendance
        </button>
      </div>

      <Table data={data} />
    </div>
  );
}