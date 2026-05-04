// src/pages/Students/SearchStudents.jsx
import { useState } from "react";
import api from "../../api/axios";

export default function SearchStudents() {
  const [q, setQ] = useState("");
  const [data, setData] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await api.get("/students/search", {
        params: { q },
      });
      setData(res.data?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3 className="font-semibold mb-3">Search Students</h3>

      <div className="flex gap-2 mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name / class"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      {data.length ? (
        <Table data={data} />
      ) : (
        <p className="text-gray-500">No results</p>
      )}
    </div>
  );
}

function Table({ data }) {
  const headers = Object.keys(data[0]);

  return (
    <table className="w-full text-sm border rounded">
      <thead className="bg-gray-100">
        <tr>
          {headers.map((h) => (
            <th key={h} className="p-2 text-left">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-t">
            {headers.map((h) => (
              <td key={h} className="p-2">
                {row[h]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}