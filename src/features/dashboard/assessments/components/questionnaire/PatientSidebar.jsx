import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  Check,
  ChevronDown,
} from "lucide-react";

const PatientSidebar = ({
  sections,
  activeSection,
  activeQuestion,
  answers = {},
  onNavigate,
}) => {

  const [
    expandedSection,
    setExpandedSection,
  ] = useState(activeSection);

  useEffect(() => {

    setExpandedSection(
      activeSection
    );

  }, [activeSection]);

  const totalQuestions =
    sections.reduce(
      (sum, section) =>
        sum +
        section.questions.length,
      0
    );

  const completedQuestions =
    sections.reduce(
      (sum, section) => {

        const sectionAnswers =
          answers?.[
            section.id
          ] || {};

        return (
          sum +
          Object.keys(
            sectionAnswers
          ).length
        );

      },
      0
    );

  const overallPercentage =
    totalQuestions > 0
      ? Math.round(
          (completedQuestions /
            totalQuestions) *
            100
        )
      : 0;

  return (

    <div className="w-full lg:sticky lg:top-6 lg:h-[calc(100vh-48px)]">

      <motion.div
        initial={{
          opacity: 0,
          x: -30,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="relative h-auto lg:h-full overflow-hidden rounded-[24px] md:rounded-[32px] lg:rounded-[40px] border border-white/40 bg-white/55 backdrop-blur-3xl shadow-[0_25px_90px_rgba(0,0,0,0.08)]"
      >

        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FFF8] via-white/70 to-[#F4FFF5]" />

        <div className="absolute top-[-120px] right-[-100px] w-[240px] h-[240px] rounded-full bg-green-300/20 blur-[80px]" />

        <div className="relative z-10 h-full flex flex-col">

          {/* HEADER */}

          <div className="px-4 sm:px-6 md:px-8 pt-5 md:pt-7 lg:pt-9 pb-4">

            <h1 className="text-2xl md:text-3xl lg:text-[34px] font-bold tracking-[-0.03em] text-[#1D1D1F]">
              Wellness Journey
            </h1>

            <p className="text-gray-500 mt-2 text-xs md:text-sm">
              Patient Assessment Flow
            </p>

          </div>

          {/* PROGRESS */}

          <div className="px-4 md:px-5 pb-5">

            <div className="rounded-[24px] bg-gradient-to-r from-[#00A63E] to-[#00C853] p-5 text-white shadow-[0_15px_40px_rgba(0,200,83,0.25)]">

              <p className="text-sm opacity-90">
                Overall Progress
              </p>

              <h2 className="text-3xl font-bold mt-1">
                {overallPercentage}%
              </h2>

              <p className="text-xs mt-2 opacity-80">
                {completedQuestions} of {totalQuestions} completed
              </p>

            </div>

          </div>

          {/* SECTIONS */}

          <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-5 pb-5 md:pb-8 space-y-4 md:space-y-5">

            {sections.map(
              (section) => {

                const isSectionActive =
                  section.id ===
                  activeSection;

                const isExpanded =
                  expandedSection ===
                  section.id;

                const sectionAnswers =
                  answers?.[
                    section.id
                  ] || {};

                const completedCount =
                  Object.keys(
                    sectionAnswers
                  ).length;

                return (

                  <motion.div
                    key={section.id}
                    layout
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 20,
                    }}
                    className="relative rounded-[22px] md:rounded-[26px] lg:rounded-[30px] overflow-hidden"
                  >

                    {isSectionActive && (

                      <motion.div
                        layoutId="sectionGlow"
                        className="absolute inset-0 rounded-[22px] md:rounded-[26px] lg:rounded-[30px] bg-gradient-to-br from-[#00B140] via-[#00C853] to-[#00A63E] shadow-[0_20px_50px_rgba(16,185,129,0.35)]"
                      />

                    )}

                    {/* SECTION HEADER */}

                    <motion.button
                      whileTap={{
                        scale: 0.99,
                      }}
                      onClick={() =>
                        setExpandedSection(
                          isExpanded
                            ? null
                            : section.id
                        )
                      }
                      className={`relative z-10 w-full px-4 md:px-5 py-4 md:py-5 text-left transition-all ${
                        isSectionActive
                          ? "text-white"
                          : "bg-white/70 border border-white/50 text-[#1D1D1F]"
                      }`}
                    >

                      <div className="flex items-start justify-between gap-3">

                        <div>

                          <h2 className="font-semibold text-base md:text-lg">
                            {section.title}
                          </h2>

                          <p className={`mt-2 text-xs md:text-sm ${
                            isSectionActive
                              ? "text-green-100"
                              : "text-gray-400"
                          }`}>
                            {completedCount}/{section.questions.length} completed
                          </p>

                        </div>

                        <motion.div
                          animate={{
                            rotate:
                              isExpanded
                                ? 180
                                : 0,
                          }}
                          transition={{
                            duration: 0.3,
                          }}
                          className={`w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center ${
                            isSectionActive
                              ? "bg-white/20"
                              : "bg-green-50"
                          }`}
                        >

                          <ChevronDown
                            size={18}
                            className={
                              isSectionActive
                                ? "text-white"
                                : "text-green-600"
                            }
                          />

                        </motion.div>

                      </div>

                    </motion.button>

                    {/* QUESTIONS */}

                    <AnimatePresence>

                      {isExpanded && (

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
                          transition={{
                            duration: 0.35,
                          }}
                          className={`relative overflow-hidden px-4 md:px-5 pb-4 md:pb-5 space-y-3 md:space-y-4 ${
                            isSectionActive
                              ? "bg-white/10"
                              : "bg-white/40"
                          }`}
                        >

                          <div className="absolute left-[24px] top-0 bottom-5 w-[2px] bg-gradient-to-b from-green-300 via-green-400 to-transparent" />

                          {section.questions.map(
                            (q) => {

                              const active =
                                activeQuestion ===
                                q.id;

                              const completed =
                                sectionAnswers[
                                  q.id
                                ];

                              return (

                                <motion.button
                                  key={q.id}
                                  whileHover={{
                                    x: 3,
                                  }}
                                  whileTap={{
                                    scale: 0.98,
                                  }}
                                  onClick={() =>
                                    onNavigate(
                                      q.id,
                                      section.id
                                    )
                                  }
                                  className="relative flex items-center gap-3 md:gap-4 w-full text-left"
                                >

                                  <div className={`relative w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                    active
                                      ? "bg-green-500 border-green-500"
                                      : completed
                                      ? "bg-emerald-500 border-emerald-500"
                                      : "bg-white border-gray-300"
                                  }`}>

                                    {completed ? (
                                      <Check size={10} className="text-white" />
                                    ) : (
                                      <div className={`w-2 h-2 rounded-full ${
                                        active
                                          ? "bg-white"
                                          : "bg-gray-300"
                                      }`} />
                                    )}

                                  </div>

                                  <div className={`flex-1 rounded-xl md:rounded-2xl px-3 md:px-4 py-2.5 md:py-3 ${
                                    active
                                      ? "bg-white border border-green-200 shadow-lg"
                                      : completed
                                      ? "bg-green-50 border border-green-100"
                                      : "bg-white/70 border border-white/50"
                                  }`}>

                                    <p className={`text-xs md:text-sm font-medium ${
                                      active
                                        ? "text-[#1D1D1F]"
                                        : completed
                                        ? "text-green-700"
                                        : "text-gray-500"
                                    }`}>
                                      {q.short}
                                    </p>

                                  </div>

                                </motion.button>

                              );

                            }
                          )}

                        </motion.div>

                      )}

                    </AnimatePresence>

                  </motion.div>

                );

              }
            )}

          </div>

        </div>

      </motion.div>

    </div>

  );

};

export default PatientSidebar;