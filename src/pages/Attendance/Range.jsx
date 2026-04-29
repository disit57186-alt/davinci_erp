import { useState } from "react";
import api from "../../api/axios";
import Table from "../../components/Table";
import { getData } from "../../utils/apiResponse";

export default function Range() {
  const [data, setData] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [cls, setCls] = useState("");
  const [section, setSection] = useState("");

  const fetchData = async () => {
    if (!from || !to) return alert("Select date range");

    if (new Date(from) > new Date(to)) {
      return alert("Invalid date range");
    }

    try {
      const res = await api.get("/attendance/absentees/range", {
        params: { from, to, class: cls, section },
      });

      setData(getData(res));
    } catch (err) {
      console.error(err);
      alert("Failed to fetch range data");
    }
  };

  return (
    <div>
      <div className="flex gap-3 mb-3 flex-wrap">
        <input type="date" onChange={(e) => setFrom(e.target.value)} className="border p-2" />
        <input type="date" onChange={(e) => setTo(e.target.value)} className="border p-2" />
        <input placeholder="Class" onChange={(e) => setCls(e.target.value)} className="border p-2" />
        <input placeholder="Section" onChange={(e) => setSection(e.target.value)} className="border p-2" />

        <button onClick={fetchData} className="bg-blue-600 text-white px-3">
          Fetch
        </button>
      </div>

      <Table data={data} />
    </div>
  );
}