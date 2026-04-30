import { useState } from "react";
import api from "../../api/axios";

const RETURN_STATUS = ["NotReturning", "Returning"];

const RELATION_OPTIONS = [
  "Parent",
  "Grandparent",
  "Driver",
  "Guardian",
  "Other",
];

const REASON_OPTIONS = [
  "MedicalAppointment",
  "FamilyEmergency",
  "VehicleBreakdown",
  "TrafficDelay",
  "PersonalReason",
  "Other",
];

export default function AddEarlyExit({ onSuccess }) {
  const [form, setForm] = useState({
    urn: "",
    returnStatus: "NotReturning",
    pickupPersonName: "",
    pickupRelationship: "Parent",
    primaryReason: "MedicalAppointment",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        ...form,
        urn: Number(form.urn),
      };

      const res = await api.post("/early-exits", payload);

      alert(
        `Early Exit Created: ${res.data?.data?.earlyExitId || "Success"}`
      );

      console.log("Response:", res.data);

      // reset form
      setForm({
        urn: "",
        returnStatus: "NotReturning",
        pickupPersonName: "",
        pickupRelationship: "Parent",
        primaryReason: "MedicalAppointment",
      });

      if (onSuccess) onSuccess();

    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message || "Failed to create early exit"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md flex flex-col gap-3">

      {/* URN */}
      <input
        placeholder="URN"
        value={form.urn}
        onChange={(e) => handleChange("urn", e.target.value)}
        className="border p-2"
      />

      {/* Return Status */}
      <select
        value={form.returnStatus}
        onChange={(e) => handleChange("returnStatus", e.target.value)}
        className="border p-2"
      >
        {RETURN_STATUS.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      {/* Pickup Person */}
      <input
        placeholder="Pickup Person Name"
        value={form.pickupPersonName}
        onChange={(e) =>
          handleChange("pickupPersonName", e.target.value)
        }
        className="border p-2"
      />

      {/* Relationship */}
      <select
        value={form.pickupRelationship}
        onChange={(e) =>
          handleChange("pickupRelationship", e.target.value)
        }
        className="border p-2"
      >
        {RELATION_OPTIONS.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      {/* Reason */}
      <select
        value={form.primaryReason}
        onChange={(e) => handleChange("primaryReason", e.target.value)}
        className="border p-2"
      >
        {REASON_OPTIONS.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white p-2 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}