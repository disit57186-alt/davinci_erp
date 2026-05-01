export default function Table({ data = [] }) {
  if (!data.length) {
    return (
      <div className="text-center text-gray-500 py-10">
        📭 No data found
      </div>
    );
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="w-full">

      {/* 🧾 DESKTOP TABLE */}
      <div className="hidden md:block overflow-auto rounded-xl border shadow-sm">
        <table className="w-full text-sm">

          {/* HEADER */}
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="p-3 text-left text-gray-600 font-semibold border-b whitespace-nowrap"
                >
                  {formatHeader(h)}
                </th>
              ))}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {data.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-gray-50 transition"
              >
                {headers.map((h, j) => (
                  <td
                    key={j}
                    className="p-3 border-b text-gray-700 whitespace-nowrap"
                  >
                    {formatCell(row[h])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* 📱 MOBILE CARDS */}
      <div className="md:hidden space-y-3">
        {data.map((row, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow border"
          >
            {headers.map((h, j) => (
              <div
                key={j}
                className="flex justify-between text-sm py-1"
              >
                <span className="text-gray-500">
                  {formatHeader(h)}
                </span>
                <span className="font-medium text-gray-800">
                  {formatCell(row[h])}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
}

/* 🔥 HEADER FORMATTER */
function formatHeader(text) {
  return text
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}

/* 🔥 CELL FORMATTER */
function formatCell(value) {
  if (value === null || value === undefined) return "-";

  // Boolean styling
  if (typeof value === "boolean") {
    return value ? (
      <span className="text-green-600 font-semibold">Yes</span>
    ) : (
      <span className="text-red-500 font-semibold">No</span>
    );
  }

  return value;
}