// src/pages/Attendance/Unmarked.jsx
import { useEffect, useState } from "react";
import api from "../../api/axios";
import Table from "../../components/Table";

export default function Unmarked() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/attendance/unmarked").then((res) => {
      setData(res.data?.data || []);
    });
  }, []);

  return <Table data={data} />;
}