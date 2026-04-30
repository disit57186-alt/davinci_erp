// src/pages/LateEntry/LateEntry.jsx
import { useState } from "react";
import Layout from "../../components/Layout";

import LateList from "./LateList";
import AddLate from "./AddLate";
import LateDetail from "./LateDetail";
import ApproveLate from "./ApproveLate";
import CheckLate from "./CheckLate";

export default function LateEntry() {
  const [tab, setTab] = useState("list");

  const renderTab = () => {
    switch (tab) {
      case "list": return <LateList />;
      case "add": return <AddLate />;
     
      case "approve": return <ApproveLate />;
      case "check": return <CheckLate />;
      default: return <LateList />;
    }
  };

  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">Late Entry</h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-4 border-b pb-2 flex-wrap">

        <Tab label="Late List" value="list" tab={tab} setTab={setTab} />
        <Tab label="Add Late Entry" value="add" tab={tab} setTab={setTab} />
   
        <Tab label="Approve" value="approve" tab={tab} setTab={setTab} />
        <Tab label="Check URN" value="check" tab={tab} setTab={setTab} />

      </div>

      {/* Content */}
      {renderTab()}
    </Layout>
  );
}

function Tab({ label, value, tab, setTab }) {
  return (
    <button
      onClick={() => setTab(value)}
      className={`px-4 py-2 rounded transition ${
        tab === value
          ? "bg-blue-600 text-white shadow"
          : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      {label}
    </button>
  );
}