export default function Table({ data = [] }) {
  if (!data.length) {
    return <p className="text-gray-500 text-center">No data found</p>;
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-auto">
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="p-2 text-left border">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t">
              {headers.map((h, j) => (
                <td key={j} className="p-2 border">
                  {row[h]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}