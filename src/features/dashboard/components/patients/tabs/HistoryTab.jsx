import { FaCheckCircle } from "react-icons/fa";

const HistoryTab = () => {
  const history = [
    {
      id: 1,
      date: "Oct 12, 2023",
      title: "Prakriti Analysis",
      desc: "Initial wellness assessment completed",
    },
    {
      id: 2,
      date: "Oct 05, 2023",
      title: "Wellness Consultation",
      desc: "Doctor consultation and treatment planning",
    },
    {
      id: 3,
      date: "Sep 28, 2023",
      title: "Blood Test",
      desc: "Routine biomarker analysis",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm">

      {/* HEADER */}
      <h2 className="text-lg font-semibold mb-6">
        Clinical History
      </h2>

      {/* TIMELINE */}
      <div className="space-y-6">

        {history.map((item, index) => (
          <div key={item.id} className="flex gap-4">

            {/* TIMELINE DOT */}
            <div className="flex flex-col items-center">
              <FaCheckCircle className="text-green-500" />

              {/* LINE */}
              {index !== history.length - 1 && (
                <div className="w-[2px] h-full bg-gray-200 mt-1"></div>
              )}
            </div>

            {/* CONTENT */}
            <div>
              <p className="text-xs text-gray-400">
                {item.date}
              </p>

              <p className="font-medium text-[#1E293B]">
                {item.title}
              </p>

              <p className="text-sm text-gray-500">
                {item.desc}
              </p>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default HistoryTab;