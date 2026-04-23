const PendingList = ({ data }) => {
  return (
    <div className="bg-white rounded-[32px] p-6 shadow-sm">

      <div className="flex justify-between mb-4">
        <div>
          <h2 className="font-semibold text-[#1E3A5F]">
            Pending Submissions
          </h2>
          <p className="text-sm text-gray-400">
            Review and evaluate patient responses
          </p>
        </div>

        <button className="text-sm text-green-600">
          VIEW ALL →
        </button>
      </div>

      <div className="space-y-3">

        {data.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-4 rounded-full bg-gray-50"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-gray-400">{item.subtitle}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-xs ${
                item.risk === "Low"
                  ? "bg-green-100 text-green-600"
                  : item.risk === "Medium"
                  ? "bg-orange-100 text-orange-600"
                  : "bg-red-100 text-red-600"
              }`}>
                {item.risk} Risk
              </span>

              <button className="text-sm text-[#1E3A5F]">
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