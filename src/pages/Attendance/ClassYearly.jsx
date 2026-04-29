import { useState } from "react";
import api from "../../api/axios";
import Table from "../../components/Table";

export default function ClassYearly() {
  const [cls, setCls] = useState("");
  const [section, setSection] = useState("");
  const [year, setYear] = useState("2026");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!cls || !section) {
      alert("Please enter Class and Section");
      return;
    }

    setLoading(true);

    try {
      const res = await api.get(
        `/attendance/class/${cls}/${section}/yearly`,
        {
          params: {
            ...(year && { year }),
          },
        }
      );

      setData(res.data?.data || []);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch yearly data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex gap-3 mb-4 flex-wrap">
        <input
          type="number"
          placeholder="Class"
          onChange={(e) => setCls(Number(e.target.value))}
          className="border p-2"
        />

        <input
          placeholder="Section"
          onChange={(e) => setSection(e.target.value)}
          className="border p-2"
        />

        <input
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2"
        />

        <button
          onClick={fetchData}
          className="bg-blue-600 text-white px-4 rounded"
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