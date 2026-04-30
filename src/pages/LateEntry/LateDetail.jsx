import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

export default function LateDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/late-entries/${id}`);
        setData(res.data?.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="space-y-2">
      <p><b>URN:</b> {data.urn}</p>
      <p><b>Name:</b> {data.studentName}</p>
      <p><b>Class:</b> {data.class}</p>
      <p><b>Arrival:</b> {data.actualArrivalTime}</p>
      <p><b>Delay:</b> {data.delayDisplay}</p>
      <p><b>Status:</b> {data.approvalStatus}</p>
    </div>
  );
}