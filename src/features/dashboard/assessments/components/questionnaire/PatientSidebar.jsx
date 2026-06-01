import { useState, useEffect } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Check,
  Leaf,
} from "lucide-react";

const PatientSidebar = ({
  sections,
  activeSection,
  activeQuestion,
  answers,
  onNavigate,
}) => {

  /* ACTIVE OPEN SECTION */
  const [expandedSection, setExpandedSection] =
    useState(activeSection);

  /* AUTO OPEN CURRENT ACTIVE SECTION */
  useEffect(() => {

    setExpandedSection(activeSection);

  }, [activeSection]);

  return (

    <div className="sticky top-6 h-[calc(100vh-48px)]">

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

        className="
          relative
          h-full
          overflow-hidden
          rounded-[40px]
          border border-white/40
          bg-white/55
          backdrop-blur-3xl
          shadow-[0_25px_90px_rgba(0,0,0,0.08)]
        "
      >

        {/* BACKGROUND */}

        <div
          className="
            absolute inset-0
            bg-gradient-to-b
            from-[#F8FFF8]
            via-white/70
            to-[#F4FFF5]
          "
        />

        {/* GLOW */}

        <div
          className="
            absolute
            top-[-120px]
            right-[-100px]
            w-[240px]
            h-[240px]
            rounded-full
            bg-green-300/20
            blur-[80px]
          "
        />

        {/* CONTENT */}

        <div className="relative z-10 h-full flex flex-col">

          {/* HEADER */}

          <div className="px-8 pt-9 pb-6">

            <h1
              className="
                text-[34px]
                font-bold
                tracking-[-0.03em]
                text-[#1D1D1F]
              "
            >
              Wellness Journey
            </h1>

            <p className="text-gray-500 mt-2 text-sm">
              Patient Assessment Flow
            </p>

          </div>

          {/* SCROLL AREA */}

          <div
            className="
              flex-1
              overflow-y-auto
              px-5
              pb-8
              space-y-5
            "
          >

            {sections.map((section) => {

              const isSectionActive =
                section.id === activeSection;

              const isExpanded =
                expandedSection === section.id;

              const completedCount =
                section.questions.filter(
                  (q) => answers[q.id]
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

                  className="
                    relative
                    rounded-[30px]
                    overflow-hidden
                  "
                >

                  {/* ACTIVE GLOW */}

                  {isSectionActive && (

                    <motion.div

                      layoutId="sectionGlow"

                      className="
                        absolute inset-0
                        rounded-[30px]
                        bg-gradient-to-br
                        from-[#00B140]
                        via-[#00C853]
                        to-[#00A63E]
                        shadow-[0_20px_50px_rgba(16,185,129,0.35)]
                      "
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

                    className={`
                      relative z-10
                      w-full
                      px-5 py-5
                      transition-all
                      text-left
                      ${
                        isSectionActive
                          ? "text-white"
                          : `
                            bg-white/70
                            border border-white/50
                            text-[#1D1D1F]
                          `
                      }
                    `}
                  >

                    <div className="flex items-start justify-between">

                      <div>

                        <h2 className="font-semibold text-[18px]">
                          {section.title}
                        </h2>

                        <p
                          className={`
                            mt-2 text-sm
                            ${
                              isSectionActive
                                ? "text-green-100"
                                : "text-gray-400"
                            }
                          `}
                        >
                          {completedCount}/
                          {
                            section.questions.length
                          } completed
                        </p>

                      </div>

                      {/* ICON */}

                      <motion.div

                        animate={{
                          rotate: isExpanded
                            ? 180
                            : 0,
                        }}

                        transition={{
                          duration: 0.3,
                        }}

                        className={`
                          w-11 h-11 rounded-full
                          flex items-center justify-center
                          ${
                            isSectionActive
                              ? "bg-white/20"
                              : "bg-green-50"
                          }
                        `}
                      >

                        <Leaf
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

                        className={`
                          relative
                          overflow-hidden
                          px-5
                          pb-5
                          space-y-4
                          ${
                            isSectionActive
                              ? "bg-white/10"
                              : "bg-white/40"
                          }
                        `}
                      >

                        {/* CONNECTING LINE */}

                        <div
                          className="
                            absolute
                            left-[24px]
                            top-0
                            bottom-5
                            w-[2px]
                            bg-gradient-to-b
                            from-green-300
                            via-green-400
                            to-transparent
                          "
                        />

                        {section.questions.map(
                          (q) => {

                            const active =
                              activeQuestion === q.id;

                            const completed =
                              answers[q.id];

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

                                className="
                                  relative
                                  flex
                                  items-center
                                  gap-4
                                  w-full
                                  text-left
                                "
                              >

                                {/* NODE */}

                                <div className="relative z-20">

                                  {active && (

                                    <motion.div

                                      layoutId="movingNode"

                                      transition={{
                                        type: "spring",
                                        stiffness: 220,
                                        damping: 20,
                                      }}

                                      className="
                                        absolute
                                        -inset-3
                                        rounded-full
                                        bg-green-200/60
                                        blur-md
                                      "
                                    />

                                  )}

                                  <div
                                    className={`
                                      relative
                                      w-5
                                      h-5
                                      rounded-full
                                      border-2
                                      flex
                                      items-center
                                      justify-center
                                      transition-all
                                      ${
                                        active
                                          ? `
                                            bg-green-500
                                            border-green-500
                                            shadow-[0_0_18px_rgba(16,185,129,0.6)]
                                          `
                                          : completed
                                          ? `
                                            bg-emerald-500
                                            border-emerald-500
                                          `
                                          : `
                                            bg-white
                                            border-gray-300
                                          `
                                      }
                                    `}
                                  >

                                    {completed ? (

                                      <Check
                                        size={10}
                                        className="text-white"
                                      />

                                    ) : (

                                      <div
                                        className={`
                                          w-2 h-2 rounded-full
                                          ${
                                            active
                                              ? "bg-white"
                                              : "bg-gray-300"
                                          }
                                        `}
                                      />

                                    )}

                                  </div>

                                </div>

                                {/* QUESTION CARD */}

                                <div
                                  className={`
                                    flex-1
                                    rounded-2xl
                                    px-4 py-3
                                    transition-all
                                    ${
                                      active
                                        ? `
                                          bg-white
                                          border border-green-200
                                          shadow-lg
                                        `
                                        : completed
                                        ? `
                                          bg-green-50
                                          border border-green-100
                                        `
                                        : `
                                          bg-white/70
                                          border border-white/50
                                        `
                                    }
                                  `}
                                >

                                  <p
                                    className={`
                                      text-sm font-medium
                                      ${
                                        active
                                          ? "text-[#1D1D1F]"
                                          : completed
                                          ? "text-green-700"
                                          : "text-gray-500"
                                      }
                                    `}
                                  >
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
            })}

          </div>

        </div>

      </motion.div>

    </div>
  );
};

export default PatientSidebar;