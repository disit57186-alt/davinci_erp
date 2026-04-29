import { useState } from "react";
import api from "../../api/axios";
import Table from "../../components/Table";

export default function Consecutive() {
  const [days, setDays] = useState(3);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!days || days < 1) {
      alert("Enter valid number of days");
      return;
    }

    setLoading(true);

    try {
      const res = await api.get("/attendance/consecutive", {
        params: { days },
      });

      setData(res.data?.data || []);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex gap-3 mb-4 flex-wrap">
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="border p-2"
        />

        <button
          onClick={fetchData}
          className="bg-yellow-500 text-white px-4 rounded"
        >
          {loading ? "Loading..." : "Fetch"}
        </button>
      </div>

      {data.length > 0 ? (
        <Table data={data} />
      ) : (
        <p className="text-gray-500">No data found</p>
      )}
    </div>
  );
}