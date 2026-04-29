import { useEffect, useState } from "react";
import api from "../../api/axios";
import Table from "../../components/Table";
import { getData } from "../../utils/apiResponse";

export default function Daily() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDaily = async () => {
      setLoading(true);
      try {
        const res = await api.get("/attendance/daily");
        setData(getData(res));
      } catch (err) {
        console.error(err);
        alert("Failed to load daily attendance");
      } finally {
        setLoading(false);
      }
    };

    fetchDaily();
  }, []);

  if (loading) return <p>Loading...</p>;

  return <Table data={data} />;
}