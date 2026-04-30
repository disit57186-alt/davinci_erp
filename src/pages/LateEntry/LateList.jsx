// src/pages/LateEntry/LateList.jsx
import { useState } from "react";
import api from "../../api/axios";
import Table from "../../components/Table";

export default function LateList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Applied filters (used for API)
  const [filters, setFilters] = useState({
    date: "",
    class: "",
    section: "",
    status: "",
    page: 1,
    pageSize: 10,
  });

  // 🔥 Temporary filters (user typing)
  const [tempFilters, setTempFilters] = useState(filters);

  const [totalPages, setTotalPages] = useState(1);

  // ✅ Fetch Data (SAFE)
  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {
        Page: filters.page,
        PageSize: filters.pageSize,
      };

      // ✅ Only send filters if present
      if (filters.date) params.Date = filters.date;

      if (filters.class) {
        params.Class = Number(filters.class);
      }

      if (filters.section) {
        params.Section = filters.section.toLowerCase(); // 🔥 safe
      }

      if (filters.status) {
        params.Status = filters.status;
      }

      const res = await api.get("/late-entries", { params });

      const result = res.data?.data;

      setData(result?.items || []);
      setTotalPages(result?.totalPages || 1);

    } catch (err) {
      console.error("LateList Error:", err);

      setData([]);
      setTotalPages(1);

      alert(
        err.response?.data?.message ||
        "Server error while fetching late entries"
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Apply Filters Button
  const applyFilters = () => {
    setFilters({
      ...tempFilters,
      page: 1,
    });
  };

  // ✅ Handle Input Change (NO API CALL HERE)
  const handleChange = (e) => {
    setTempFilters({
      ...tempFilters,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Pagination
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

      <h2 className="font-bold mb-3">Late Entry List</h2>

      {/* ✅ Filters */}
      <div className="flex flex-wrap gap-3 mb-4">

        <input
          type="date"
          name="date"
          value={tempFilters.date}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="number"
          name="class"
          placeholder="Class"
          value={tempFilters.class}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="text"
          name="section"
          placeholder="Section"
          value={tempFilters.section}
          onChange={handleChange}
          className="border p-2"
        />

        <select
          name="status"
          value={tempFilters.status}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        {/* ✅ Apply Button */}
        <button
          onClick={applyFilters}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Apply Filters
        </button>

        {/* ✅ Load Button */}
        <button
          onClick={fetchData}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Load Data
        </button>

      </div>

      {/* ✅ Loading */}
      {loading && <p>Loading...</p>}

      {/* ✅ Table */}
      {!loading && <Table data={data} />}

      {/* ✅ Pagination */}
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