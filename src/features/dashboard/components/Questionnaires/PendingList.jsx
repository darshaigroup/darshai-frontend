import { useNavigate } from "react-router-dom";

const PendingList = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/90 backdrop-blur rounded-[32px] p-6 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-lg font-semibold text-[#1E293B]">
            Patient Submissions
          </h2>
          <p className="text-sm text-gray-400">
            Review and evaluate patient responses
          </p>
        </div>

        {/* <button className="text-sm text-[#1E7A3A] font-medium">
          VIEW ALL →
        </button> */}
      </div>

      {/* List */}
      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center p-4 rounded-2xl bg-[#F7F9F8]"
          >
            <div>
              <p className="font-medium text-[#1E293B]">{item.patientName}</p>
              <p className="text-xs text-gray-400">
                {item.type} • {item.time}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* <span
                className={`text-xs px-3 py-1 rounded-full ${
                  item.risk === "Low"
                    ? "bg-green-100 text-green-600"
                    : item.risk === "Medium"
                    ? "bg-orange-100 text-orange-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {item.risk} Risk
              </span> */}

              <button
                onClick={() => navigate(`/dashboard/patients/${item.id}`)}
                className="text-sm text-[#1E7A3A] font-medium"
              >
                Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingList;
