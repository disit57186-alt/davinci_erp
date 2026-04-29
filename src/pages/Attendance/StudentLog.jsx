import { useState } from "react";
import api from "../../api/axios";
import Table from "../../components/Table";
import { getData } from "../../utils/apiResponse";

export default function StudentLog() {
  const [urn, setUrn] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLog = async () => {
    if (!urn) return alert("Enter URN");

    if (from && to && new Date(from) > new Date(to)) {
      return alert("Invalid date range");
    }

    setLoading(true);

    try {
      const res = await api.get(`/attendance/student/${urn}/log`, {
        params: { from, to },
      });

      setData(getData(res));
    } catch (err) {
      console.error(err);
      alert("Failed to fetch log");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex gap-3 mb-4 flex-wrap">
        <input type="number" value={urn} onChange={(e) => setUrn(e.target.value)} className="border p-2" />
        <input type="date" onChange={(e) => setFrom(e.target.value)} className="border p-2" />
        <input type="date" onChange={(e) => setTo(e.target.value)} className="border p-2" />

        <button onClick={fetchLog} className="bg-blue-600 text-white px-4">
          {loading ? "Loading..." : "Fetch"}
        </button>
      </div>

      <Table data={data} />
    </div>
  );
}