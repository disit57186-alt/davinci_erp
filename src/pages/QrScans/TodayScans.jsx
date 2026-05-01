import { useState } from "react";
import api from "../../api/axios";
import Table from "../../components/Table";

export default function TodayScans() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);

      const res = await api.get("/QrStudentScans/today");
      setData(res.data?.data || []);

    } catch (err) {
      console.log(err);
      alert("Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <button
        onClick={load}
        className="bg-green-600 text-white px-4 py-2 rounded mb-3"
      >
        {loading ? "Loading..." : "Load Today"}
      </button>

      <Table data={data} />

    </div>
  );
}