import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import { ChevronDown, AlertTriangle } from "lucide-react";

import "react-circular-progressbar/dist/styles.css";

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const data = state?.data?.data || state?.data || {};

  const patient = state?.patient;

  console.log("RESULT STATE", state);
  console.log("PATIENT", patient);
  console.log("DATA", data);

  const [openBlock, setOpenBlock] = useState(null);

  //console.log("RESULT DATA", JSON.stringify(data, null, 2));

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        No Assessment Data Found
      </div>
    );
  }

  const getRiskColor = (score = 0) => {
    if (score >= 66) return "#EF4444";

    if (score >= 50) return "#F59E0B";

    return "#22C55E";
  };

  const blocks = data?.blocks || [];

  const alertBlocks = blocks.filter((block) => {
    const risk =
      block.risk_level?.toLowerCase() || block.risk_band?.toLowerCase();

    return risk === "high";
  });

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
                    data.compositeScore >= 66
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
        {alertBlocks.length > 0 && (
          <div className="bg-white rounded-[36px] shadow-xl p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  Risk Band Alerts
                </h2>

                <p className="text-slate-500 mt-2">
                  Wellness domains requiring clinical monitoring and
                  intervention
                </p>
              </div>

              <div className="px-5 py-3 rounded-full bg-red-50 border border-red-200 text-red-700 font-semibold">
                🚨 {alertBlocks.length} Active Alerts
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {alertBlocks.map((block) => (
                <div
                  key={block.id}
                  className="relative overflow-hidden rounded-[30px] border border-red-200 bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-red-500 to-rose-600" />

                  <div className="p-8">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-red-500 flex items-center justify-center shadow-lg">
                          <AlertTriangle className="text-white" size={24} />
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-slate-900">
                            {block.block_title || block.title || block.id}
                          </h3>

                          <p className="text-slate-500 text-sm mt-1">
                            Wellness Domain
                          </p>
                        </div>
                      </div>

                      <div className="px-4 py-2 rounded-full text-sm font-semibold bg-red-100 text-red-700">
                        High Risk
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl p-4 bg-red-50">
                      <p className="font-semibold text-red-700">
                        Immediate attention recommended
                      </p>
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
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">
                                    Question
                                  </p>

                                  <h4 className="font-semibold text-lg text-[#1D1D1F]">
                                    {parameter.label}
                                  </h4>
                                </div>

                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    percent >= 70
                                      ? "bg-red-100 text-red-600"
                                      : percent >= 40
                                        ? "bg-amber-100 text-amber-600"
                                        : "bg-green-100 text-green-600"
                                  }`}
                                >
                                  {percent >= 70
                                    ? "Critical"
                                    : percent >= 40
                                      ? "Normal"
                                      : "Healthy"}
                                </span>
                              </div>

                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-slate-500">
                                    Status
                                  </span>
                                </div>

                                <div>
                                  <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-500">
                                      Risk Contribution
                                    </span>

                                    <span className="font-semibold">
                                      {Math.round(percent)}%
                                    </span>
                                  </div>

                                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full transition-all duration-700 ${
                                        percent >= 70
                                          ? "bg-red-500"
                                          : percent >= 40
                                            ? "bg-amber-500"
                                            : "bg-green-500"
                                      }`}
                                      style={{
                                        width: `${percent}%`,
                                      }}
                                    />
                                  </div>
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
        {/* CONTINUE AYURVEDIC ASSESSMENT */}

        <div className="bg-white rounded-[32px] shadow-xl p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#1D1D1F] mb-3">
              Continue Consultation
            </h2>

            <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
              Your wellness risk assessment is complete. Continue with the
              Ayurvedic consultation to evaluate Prakriti, Vikriti, Agni and
              Ama.
            </p>

            <button
              onClick={() =>
                navigate("/dashboard/ayurveda-assessment", {
                  state: {
                     patient,
                     riskReport: data,
                  },
                })
              }
              className="px-10 py-5 rounded-2xl text-lg font-semibold bg-gradient-to-r from-[#0F766E] to-[#14B8A6] text-white shadow-lg hover:scale-[1.02] transition-all"
            >
              Continue Ayurvedic Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
