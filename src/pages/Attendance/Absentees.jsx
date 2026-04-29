import { useEffect, useState } from "react";
import api from "../../api/axios";
import Table from "../../components/Table";
import { getData } from "../../utils/apiResponse";

export default function Absentees() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get("/attendance/absentees");
        setData(getData(res));
      } catch (err) {
        console.error(err);
        alert("Failed to fetch absentees");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return <Table data={data} />;
}