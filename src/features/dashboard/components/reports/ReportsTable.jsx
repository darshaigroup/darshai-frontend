import { FaEye, FaDownload, FaShareAlt } from "react-icons/fa";

const ReportsTable = () => {
  const data = [
    {
      name: "Aria Montgomery",
      type: "Prakriti Analysis",
      date: "Oct 12, 2023",
      status: "FINALIZED",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Julian Thorne",
      type: "Wellness Progress",
      date: "Oct 10, 2023",
      status: "FINALIZED",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      name: "Elena Vance",
      type: "Biomarker Audit",
      date: "Oct 08, 2023",
      status: "PENDING",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
  ];

  const statusStyle = (status) => {
    switch (status) {
      case "FINALIZED":
        return "bg-green-100 text-green-600";
      case "PENDING":
        return "bg-gray-200 text-gray-600";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="bg-white rounded-[32px] shadow-sm p-6">

      {/* SEARCH + FILTER */}
      <div className="flex justify-between mb-6">
        <input
          placeholder="Search reports..."
          className="w-[300px] px-4 py-2 rounded-full bg-gray-100 outline-none"
        />

        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-full border">Filter</button>
          <button className="px-4 py-2 rounded-full border">Date</button>
        </div>
      </div>

      {/* TABLE */}
      <table className="w-full text-sm">

        <thead className="text-gray-400 text-xs">
          <tr>
            <th className="text-left py-3">PATIENT</th>
            <th>REPORT TYPE</th>
            <th>GENERATED DATE</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, i) => (
            <tr key={i} className="border-t hover:bg-gray-50 transition">

              {/* PATIENT */}
              <td className="py-4 flex items-center gap-3">
                <img
                  src={item.avatar}
                  className="w-9 h-9 rounded-full"
                />
                {item.name}
              </td>

              <td>{item.type}</td>
              <td>{item.date}</td>

              {/* STATUS */}
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </td>

              {/* ACTIONS */}
              <td className="flex gap-4 text-gray-500">
                <FaEye className="cursor-pointer hover:text-black" />
                <FaDownload className="cursor-pointer hover:text-black" />
                <FaShareAlt className="cursor-pointer hover:text-black" />
              </td>

            </tr>
          ))}
        </tbody>

      </table>

      {/* FOOTER */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-400">
        <span>Securely stored in Darshai Clinical Cloud</span>

        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-full">Archive</button>
          <button className="px-4 py-2 border rounded-full">Next</button>
        </div>
      </div>

    </div>
  );
};

export default ReportsTable;