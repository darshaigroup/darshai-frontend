const RiskDomains = ({blocks=[]}) => {

  const sortedBlocks =
    [...blocks].sort(
      (a,b) => b.score - a.score
    );

  return (

    <div className="bg-white rounded-[32px] shadow-xl p-8 mb-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold text-[#173C68]">

            Risk Domain Analysis

          </h2>

          <p className="text-slate-500 mt-1">

            Wellness Risk Breakdown

          </p>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-5">

        {

          sortedBlocks.map((block,index) => (

            <div
              key={index}
              className="border border-slate-200 rounded-[28px] p-6 bg-[#F8FAFC]"
            >

              <div className="flex justify-between items-center mb-4">

                <h3 className="font-bold text-[#173C68]">

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

              <div className="flex justify-between mb-2 text-sm">

                <span>

                  Risk Score

                </span>

                <span className="font-semibold">

                  {block.score}%

                </span>

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
                    width:`${block.score}%`
                  }}
                />

              </div>

              {

                block.recommendation && (

                  <div className="mt-4 bg-white rounded-2xl p-4 border">

                    <p className="text-sm text-slate-600">

                      {block.recommendation}

                    </p>

                  </div>

                )

              }

            </div>

          ))

        }

      </div>

    </div>

  );

};

export default RiskDomains;