import { useLocation } from "react-router-dom";
import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import { ChevronDown, AlertTriangle } from "lucide-react";

import "react-circular-progressbar/dist/styles.css";

const Result = () => {
  const { state } = useLocation();

  const data = state?.data || state;

  const [openBlock, setOpenBlock] = useState(null);

  console.log("RESULT DATA", JSON.stringify(data, null, 2));

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        No Assessment Data Found
      </div>
    );
  }

  const getRiskColor = (score = 0) => {
    if (score >= 80) return "#EF4444";

    if (score >= 50) return "#F59E0B";

    return "#22C55E";
  };

  const criticalBlocks = (data.blocks || []).filter(
    (block) => block.score >= 80 || block.is_critical,
  );

  return (
    <div className="min-h-screen bg-[#F5F7F4] px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* OVERVIEW */}

        <div className="bg-white rounded-[32px] shadow-xl p-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl font-bold text-[#1D1D1F]">
                Wellness Risk Overview
              </h1>

              <p className="mt-3 text-gray-500">
                Complete wellness assessment report
              </p>
            </div>

            <div className="w-[220px] mx-auto">
              <CircularProgressbar
                value={data.compositeScore || 0}
                text={`${data.compositeScore || 0}`}
                styles={buildStyles({
                  pathColor: getRiskColor(data.compositeScore),
                  textColor: "#111827",
                  trailColor: "#E5E7EB",
                })}
              />

              <div className="text-center mt-4">
                <span
                  className={`px-5 py-2 rounded-full font-semibold ${
                    data.compositeScore >= 80
                      ? "bg-red-100 text-red-700"
                      : data.compositeScore >= 50
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                  }`}
                >
                  {data.riskBand || "Unknown"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CRITICAL FINDINGS */}

        {criticalBlocks.length > 0 && (
          <div className="bg-white rounded-[32px] shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Critical Findings</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {criticalBlocks.map((block) => (
                <div
                  key={block.id}
                  className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl p-4"
                >
                  <AlertTriangle className="text-red-500" />

                  <div>
                    <div className="font-semibold">
                      {block.block_title || block.title || block.id}
                    </div>

                    <div className="text-red-600 text-sm">
                      Score: {block.score}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BLOCKS */}

        <div className="space-y-6">
          {(data.blocks || []).map((block) => (
            <motion.div
              key={block.id}
              layout
              className="bg-white rounded-[32px] shadow-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenBlock(openBlock === block.id ? null : block.id)
                }
                className="w-full p-8 text-left"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold">
                      {block.block_title || block.title || block.id}
                    </h3>

                    <div className="mt-2 text-gray-500">
                      Risk Band: {block.risk_band || block.risk_level || "N/A"}
                    </div>
                  </div>

                  <ChevronDown
                    className={`transition-transform ${
                      openBlock === block.id ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <span>Score</span>

                    <span>{block.score}%</span>
                  </div>

                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${block.score}%`,
                        backgroundColor: getRiskColor(block.score),
                      }}
                    />
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {openBlock === block.id && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    className="px-8 pb-8"
                  >
                    <div className="grid md:grid-cols-4 gap-4 mb-8">
                      <div className="bg-gray-50 rounded-2xl p-4">
                        <div className="text-xs text-gray-500">Risk Level</div>

                        <div className="font-bold mt-1">
                          {block.risk_level || block.risk_band}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-4">
                        <div className="text-xs text-gray-500">Completion</div>

                        <div className="font-bold mt-1">
                          {block.answered || 0}/{block.total || 0}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-4">
                        <div className="text-xs text-gray-500">Weight</div>

                        <div className="font-bold mt-1">
                          {block.composite_weight || 0}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-4">
                        <div className="text-xs text-gray-500">Safety Flag</div>

                        <div className="font-bold mt-1">
                          {block.safety_flag ? "Yes" : "No"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-5">
                      <h4 className="text-xl font-bold text-[#1D1D1F]">
                        Parameters Affecting This Score
                      </h4>

                      <span className="text-sm text-gray-500">
                        {(block.params || []).length} Parameters
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      {(block.params || [])
                        .sort((a, b) => (b.score || 0) - (a.score || 0))
                        .map((parameter, index) => {
                          const percent =
                            parameter.max_score > 0
                              ? (parameter.score / parameter.max_score) * 100
                              : 0;

                          const affected = parameter.score > 0;

                          return (
                            <motion.div
                              key={index}
                              whileHover={{
                                y: -4,
                              }}
                              className="bg-gray-50 border border-gray-100 rounded-3xl p-5"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="font-semibold text-lg text-[#1D1D1F]">
                                  {parameter.label}
                                </h4>

                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    affected
                                      ? "bg-red-100 text-red-600"
                                      : "bg-green-100 text-green-600"
                                  }`}
                                >
                                  {affected ? "Affected" : "Healthy"}
                                </span>
                              </div>

                              <div className="space-y-2 text-sm text-gray-600">
                                <div>
                                  <strong>Selected:</strong> {parameter.option}
                                </div>

                                <div>
                                  <strong>Level:</strong> {parameter.selected}
                                </div>

                                <div>
                                  <strong>Weight:</strong> {parameter.weight}
                                </div>

                                <div>
                                  <strong>Impact:</strong> {parameter.score}/
                                  {parameter.max_score}
                                </div>
                              </div>

                              <div className="mt-5">
                                <div className="flex justify-between text-xs text-gray-500 mb-2">
                                  <span>Risk Contribution</span>

                                  <span>{Math.round(percent)}%</span>
                                </div>

                                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all duration-700 ${
                                      percent >= 70
                                        ? "bg-red-500"
                                        : percent >= 40
                                          ? "bg-yellow-500"
                                          : "bg-green-500"
                                    }`}
                                    style={{
                                      width: `${percent}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* AI SUMMARY */}

        {data.aiResponse && (
          <div className="bg-white rounded-[32px] shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-5">AI Clinical Summary</h2>

            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {data.aiResponse}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
