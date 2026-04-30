import { useState } from "react";
import api from "../../api/axios";

export default function CheckLate() {
  const [urn, setUrn] = useState("");
  const [result, setResult] = useState(null);

  const handleCheck = async () => {
    try {
      const res = await api.get(`/late-entries/check/${urn}`);
      setResult(res.data);
    } catch (err) {
      console.log(err);
      alert("Check failed");
    }
  };

  return (
    <div className="max-w-md flex flex-col gap-3">

      <input
        placeholder="Enter URN"
        onChange={(e) => setUrn(e.target.value)}
        className="border p-2"
      />

      <button
        onClick={handleCheck}
        className="bg-purple-600 text-white p-2"
      >
        Check
      </button>

      {result && (
        <pre className="bg-gray-100 p-2">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}