const RiskSummary = ({ riskReport }) => {
  const blocks =
    riskReport?.data?.blocks ||
    riskReport?.blocks ||
    [];

  const compositeScore =
    riskReport?.data?.compositeScore ||
    riskReport?.compositeScore;

  const riskBand =
    riskReport?.data?.riskBand ||
    riskReport?.riskBand;

  return (
    <div className="bg-white rounded-[32px] shadow-xl p-8 mb-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold">
            Risk Summary
          </h2>

          <p className="text-slate-500 mt-1">
            Wellness risk overview
          </p>

        </div>

        <div className="text-right">

          <div className="text-4xl font-bold text-[#173C68]">
            {compositeScore || 0}
          </div>

          <div className="text-slate-500">
            {riskBand}
          </div>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-5">

        {blocks.map((block) => (

          <div
            key={block.id}
            className="border border-slate-200 rounded-3xl p-5"
          >

            <div className="flex justify-between mb-3">

              <h3 className="font-bold">
                {block.title}
              </h3>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  block.risk_level === "High"
                    ? "bg-red-100 text-red-700"
                    : block.risk_level === "Moderate"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {block.risk_level}
              </span>

            </div>

            <div className="mb-2 flex justify-between">

              <span>Risk Score</span>

              <span>{block.score}%</span>

            </div>

            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">

              <div
                className={`h-full ${
                  block.risk_level === "High"
                    ? "bg-red-500"
                    : block.risk_level === "Moderate"
                    ? "bg-amber-500"
                    : "bg-green-500"
                }`}
                style={{
                  width: `${block.score}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default RiskSummary;