const PlacementTable = ({ data }) => {
  return (
    <div className="bg-white rounded-[32px] shadow-soft p-6">

      <h2 className="mb-4 font-semibold text-primary">
        Patient Placements
      </h2>

      <table className="w-full text-sm">

        <thead className="text-gray-400 text-xs">
          <tr>
            <th className="text-left py-2">Patient</th>
            <th>Selected Center</th>
            <th>Request Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, i) => (
            <tr key={i} className="border-t">

              <td className="py-3 flex items-center gap-2">
                <img src={item.avatar} className="w-8 h-8 rounded-full" />
                {item.name}
              </td>

              <td>{item.center}</td>
              <td>{item.date}</td>

              <td>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  item.status === "CONFIRMED"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {item.status}
                </span>
              </td>

              <td>⋯</td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default PlacementTable;