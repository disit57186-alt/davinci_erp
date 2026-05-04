import { useState } from "react";
import api from "../../api/axios";

export default function StudentByUrn() {
  const [urn, setUrn] = useState("");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!urn) return alert("Enter URN");

    setLoading(true);
    setError("");
    setStudent(null);

    try {
      const res = await api.get(`/students/${urn}`);
      setStudent(res.data?.data || null);
    } catch (err) {
      console.log(err);
      setError("Student not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">

      {/* 🔍 SEARCH BOX */}
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          placeholder="Enter URN"
          value={urn}
          onChange={(e) => setUrn(e.target.value)}
          className="flex-1 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* 🔄 STATES */}
      {loading && (
        <p className="text-blue-500 text-center">Loading...</p>
      )}

      {error && (
        <p className="text-red-500 text-center">{error}</p>
      )}

      {/* 🎓 STUDENT CARD */}
      {student && (
        <div className="bg-white rounded-xl shadow p-5 space-y-3">

          {/* NAME */}
          <h2 className="text-xl font-bold text-gray-800">
            {student.firstName} {student.lastName}
          </h2>

          {/* BASIC INFO */}
          <div className="grid grid-cols-2 gap-3 text-sm">

            <Info label="URN" value={student.urn} />
            <Info label="Gender" value={student.gender} />
            <Info label="Class" value={student.class} />
            <Info label="Section" value={student.section} />
            <Info label="Batch" value={student.batch} />
            <Info label="House" value={student.house} />

            <Info label="Academic Year" value={student.academicYear} />
            <Info label="Bus Route" value={student.busRoute || "-"} />
            <Info label="Bus Number" value={student.busNumber || "-"} />

            <Info label="Father Mobile" value={student.fatherMobile || "-"} />
            <Info label="Mother Mobile" value={student.motherMobile || "-"} />

          </div>

        </div>
      )}
    </div>
  );
}

/* 🔹 REUSABLE FIELD */
function Info({ label, value }) {
  return (
    <div className="bg-gray-50 p-2 rounded">
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-medium text-gray-800">{value || "-"}</p>
    </div>
  );
}