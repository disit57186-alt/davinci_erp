import { useState } from "react";
import api from "../../api/axios";
import Table from "../../components/Table";

export default function EarlyExitList({ onView }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 applied filters (API)
  const [filters, setFilters] = useState({
    date: "",
    class: "",
    section: "",
    status: "",
    page: 1,
    pageSize: 10,
  });

  // 🔥 temp filters (UI input)
  const [temp, setTemp] = useState(filters);

  const [totalPages, setTotalPages] = useState(1);

  // ✅ FETCH API
  const fetchData = async () => {
    setLoading(true);

    try {
      const params = {
        Page: filters.page,
        PageSize: filters.pageSize,
      };

      if (filters.date) params.Date = filters.date;
      if (filters.class) params.Class = Number(filters.class);
      if (filters.section) params.Section = filters.section;
      if (filters.status) params.Status = filters.status;

      const res = await api.get("/early-exits", { params });

      const result = res.data?.data;

      setData(result?.items || []);
      setTotalPages(result?.totalPages || 1);

    } catch (err) {
      console.log(err);
      setData([]);
      setTotalPages(1);

      alert(
        err.response?.data?.message ||
        "Failed to load early exits"
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ APPLY FILTERS
  const applyFilters = () => {
    setFilters({
      ...temp,
      page: 1,
    });
  };

  const handleChange = (e) => {
    setTemp({
      ...temp,
      [e.target.name]: e.target.value,
    });
  };

  // pagination
  const nextPage = () => {
    if (filters.page < totalPages) {
      setFilters({ ...filters, page: filters.page + 1 });
    }
  };

  const prevPage = () => {
    if (filters.page > 1) {
      setFilters({ ...filters, page: filters.page - 1 });
    }
  };

  return (
    <div>

      <h2 className="font-bold mb-3">Early Exit List</h2>

      {/* 🔥 FILTERS */}
      <div className="flex flex-wrap gap-3 mb-4">

        <input
          type="date"
          name="date"
          value={temp.date}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="number"
          name="class"
          placeholder="Class"
          value={temp.class}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="text"
          name="section"
          placeholder="Section"
          value={temp.section}
          onChange={handleChange}
          className="border p-2"
        />

        <select
          name="status"
          value={temp.status}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Completed">Completed</option>
        </select>

        <button
          onClick={applyFilters}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Apply
        </button>

        <button
          onClick={fetchData}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Load
        </button>

      </div>

      {/* 🔄 LOADING */}
      {loading && <p>Loading...</p>}

      {/* 📊 TABLE */}
      {!loading && (
        <Table
          data={data.map((item) => ({
            ID: item.earlyExitId,
            URN: item.urn,
            Name: item.studentName,
            Class: item.class,
            Section: item.section,
            Status: item.overallStatus,
            Slip: item.slipNumber,
            Action: (
              <button
                onClick={() => onView?.(item.earlyExitId)}
                className="text-blue-600 underline"
              >
                View
              </button>
            ),
          }))}
        />
      )}

      {/* 📄 PAGINATION */}
      <div className="flex justify-between mt-4">

        <button
          onClick={prevPage}
          disabled={filters.page === 1}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Prev
        </button>

        <span>
          Page {filters.page} / {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={filters.page === totalPages}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Next
        </button>

      </div>

    </div>
  );
}