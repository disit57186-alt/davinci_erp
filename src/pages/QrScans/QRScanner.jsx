// src/pages/QrScans/QRScanner.jsx
import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { openDB } from "idb";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import api from "../../api/axios";

export default function QRScanner({ qrBoxSize = 250, fps = 25 }) {
  const [history, setHistory] = useState([]);
  const [lastScan, setLastScan] = useState("");
  const [status, setStatus] = useState("");
  const [scanning, setScanning] = useState(false);

  const scannerRef = useRef(null);
  const dbRef = useRef(null);
  const scannedSet = useRef(new Set());

  // 🔥 INIT DB
  useEffect(() => {
    const initDB = async () => {
      const db = await openDB("qr-scans-db", 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("scans")) {
            db.createObjectStore("scans", {
              keyPath: "id",
              autoIncrement: true,
            });
          }
        },
      });

      dbRef.current = db;

      const all = await db.getAll("scans");
      setHistory(all);
      scannedSet.current = new Set(all.map((x) => x.value));
    };

    initDB();
  }, []);

  // 🔥 SEND TO API
  const sendToAPI = async (parsed) => {
    try {
      await api.post("/QrStudentScans", {
        urn: Number(parsed.urn),
        firstName: parsed.firstName || "",
        class: Number(parsed.class || 0),
        busNo: Number(parsed.busNo || 0),
        leavingAt250: 0,
        deviceId: 1,
        entryExit: Number(parsed.entryExit || 0),
        scanTime: new Date().toISOString(),
      });

      setStatus("✅ Sent to server");
    } catch (err) {
      console.log("API error:", err);
      setStatus("❌ Failed to sync (saved locally)");
    }
  };

  // 🔥 START SCANNER
  const startScanning = async () => {
    if (!dbRef.current || scannerRef.current) return;

    const scanner = new Html5Qrcode("qr-reader");

    try {
      await scanner.start(
        { facingMode: "environment" },
        { fps, qrbox: qrBoxSize },
        async (decodedText) => {
          if (scannedSet.current.has(decodedText)) {
            setStatus("⚠️ Duplicate Scan");
            return;
          }

          scannedSet.current.add(decodedText);

          let parsed;
          try {
            parsed = JSON.parse(decodedText);
          } catch {
            setStatus("❌ Invalid QR format");
            return;
          }

          const entry = {
            value: decodedText,
            time: new Date().toLocaleString(),
          };

          await dbRef.current.add("scans", entry);
          setHistory((prev) => [entry, ...prev]);

          setLastScan(parsed.urn || decodedText);

          // 🔥 API CALL
          await sendToAPI(parsed);
        },
        () => {}
      );

      scannerRef.current = scanner;
      setScanning(true);
    } catch (err) {
      console.error(err);
      alert("Camera error. Allow permissions.");
    }
  };

  // 🔥 STOP SCANNER
  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.stop().then(() => {
        scannerRef.current = null;
        setScanning(false);
      });
    }
  };

  // 📥 EXPORT
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(history);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Scans");

    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    saveAs(
      new Blob([buffer]),
      `QR_Scans_${Date.now()}.xlsx`
    );
  };

  // 🧹 CLEAR
  const clearHistory = async () => {
    await dbRef.current.clear("scans");
    setHistory([]);
    setLastScan("");
    scannedSet.current = new Set();
    setStatus("🧹 Cleared");
  };

  return (
    <div className="max-w-xl mx-auto">

      {/* CAMERA BOX */}
      <div
        id="qr-reader"
        className="border-2 border-gray-400 rounded-xl mb-4 mx-auto"
        style={{ width: qrBoxSize }}
      />

      {/* BUTTONS */}
      <div className="flex gap-3 flex-wrap justify-center mb-4">

        {!scanning ? (
          <button
            onClick={startScanning}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
          >
            ▶ Start
          </button>
        ) : (
          <button
            onClick={stopScanning}
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700"
          >
            ⏹ Stop
          </button>
        )}

        <button
          onClick={exportToExcel}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
        >
          ⬇ Export
        </button>

        <button
          onClick={clearHistory}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow"
        >
          🧹 Clear
        </button>

      </div>

      {/* LAST SCAN */}
      <div className="bg-gray-100 p-3 rounded-lg text-center mb-3">
        <p className="text-sm text-gray-500">Last Scan</p>
        <p className="font-bold text-lg">{lastScan || "Waiting..."}</p>
        <p className="text-sm mt-1">{status}</p>
      </div>

      {/* HISTORY */}
      <div className="bg-white shadow rounded-lg p-3 max-h-60 overflow-auto">
        <p className="font-semibold mb-2">
          Total: {history.length}
        </p>

        {history.map((item) => (
          <div
            key={item.id}
            className="border-b py-1 text-sm"
          >
            <b>{item.value}</b>
            <div className="text-gray-500 text-xs">
              {item.time}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}