import { useState } from "react";
import api from "../../api/axios";

const RELATION_OPTIONS = [
  "Parent",
  "Grandparent",
  "Driver",
  "Guardian",
  "Other"
];

const REASON_OPTIONS = [
  "MedicalAppointment",
  "FamilyEmergency",
  "VehicleBreakdown",
  "TrafficDelay",
  "MissedBus",
  "PersonalIllness",
  "Other"
];

export default function AddLate() {
  const [form, setForm] = useState({
    urn: "",
    actualArrivalTime: "",
    adultName: "",
    adultRelationship: "Parent",
    primaryReason: "TrafficDelay",
  });

  const handleSubmit = async () => {
    try {
      const res = await api.post("/late-entries", {
        ...form,
        urn: Number(form.urn),
      });

      alert("Late entry created");
      console.log(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to create");
    }
  };

  return (
    <div className="max-w-md flex flex-col gap-3">

      <input
        placeholder="URN"
        onChange={(e) => setForm({ ...form, urn: e.target.value })}
        className="border p-2"
      />

      <input
        type="time"
        onChange={(e) =>
          setForm({ ...form, actualArrivalTime: e.target.value })
        }
        className="border p-2"
      />

      <input
        placeholder="Adult Name"
        onChange={(e) =>
          setForm({ ...form, adultName: e.target.value })
        }
        className="border p-2"
      />

      {/* Dropdown */}
      <select
        onChange={(e) =>
          setForm({ ...form, adultRelationship: e.target.value })
        }
        className="border p-2"
      >
        {RELATION_OPTIONS.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>

      {/* Dropdown */}
      <select
        onChange={(e) =>
          setForm({ ...form, primaryReason: e.target.value })
        }
        className="border p-2"
      >
        {REASON_OPTIONS.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white p-2"
      >
        Submit
      </button>
    </div>
  );
}