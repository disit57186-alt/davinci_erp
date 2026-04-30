import { useState } from "react";
import Layout from "../../components/Layout";

import EarlyExitList from "./EarlyExitList";
import AddEarlyExit from "./AddEarlyExit";
import EarlyExitDetail from "./EarlyExitDetail";
import ApproveEarlyExit from "./ApproveEarlyExit";
import CheckEarlyExit from "./CheckEarlyExit";

export default function EarlyExit() {
  const [tab, setTab] = useState("list");
  const [selectedId, setSelectedId] = useState(null);

  const renderTab = () => {
    switch (tab) {
      case "list":
        return (
          <EarlyExitList
            onView={(id) => {
              setSelectedId(id);
              setTab("detail");
            }}
          />
        );

      case "add":
        return (
          <AddEarlyExit
            onSuccess={() => setTab("list")}
          />
        );

      case "detail":
        return (
          <EarlyExitDetail
            id={selectedId}
            onBack={() => setTab("list")}
          />
        );

      case "approve":
        return <ApproveEarlyExit />;

      case "check":
        return <CheckEarlyExit />;

      default:
        return <EarlyExitList />;
    }
  };

  return (
    <Layout>

      <h1 className="text-xl font-bold mb-4">
        Early Exit Management
      </h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-4 border-b pb-2 flex-wrap">

        <Tab label="Exit List" value="list" tab={tab} setTab={setTab} />
        <Tab label="Add Exit" value="add" tab={tab} setTab={setTab} />
        <Tab label="Approve" value="approve" tab={tab} setTab={setTab} />
        <Tab label="Check URN" value="check" tab={tab} setTab={setTab} />

      </div>

      {/* Content */}
      {renderTab()}

    </Layout>
  );
}

/* 🔥 TAB COMPONENT */
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