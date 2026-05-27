// ExpandableQuestion.jsx

import React from "react";

import { ChevronDown, Check } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

const ExpandableQuestion = ({
  icon,
  question,
  options = [],
  selected,
  isOpen,
  onOpen,
  onSelect,
}) => {

  const selectedLabel =
    typeof selected === "object"
      ? selected?.label
      : selected;

  return (

    <motion.div
      layout
      transition={{ duration: 0.35 }}
      whileHover={{ y: -2 }}
      className={`overflow-hidden rounded-[36px] border transition-all backdrop-blur-2xl ${
        selected
          ? "border-green-300 bg-gradient-to-br from-green-50/90 to-emerald-50/90 shadow-[0_15px_50px_rgba(16,185,129,0.15)]"
          : "border-white/50 bg-white/75 shadow-[0_10px_40px_rgba(0,0,0,0.05)]"
      }`}
    >

      {/* HEADER */}

      <motion.button
        whileTap={{ scale: 0.995 }}
        onClick={onOpen}
        className="w-full p-7 flex items-center justify-between"
      >

        {/* LEFT */}

        <div className="flex items-center gap-5">

          {/* ICON */}

          <div
            className={`w-16 h-16 rounded-[22px] flex items-center justify-center transition-all ${
              selected
                ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg shadow-green-200"
                : "bg-[#F4F4F5] text-gray-600"
            }`}
          >

            {icon &&
              React.createElement(icon, {
                size: 28,
              })}

          </div>

          {/* TEXT */}

          <div className="text-left">

            <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-[#1D1D1F]">
              {question}
            </h3>

            <AnimatePresence>

              {selected && (

                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 mt-3 text-green-700 text-sm font-medium"
                >

                  <Check size={15} />

                  {selectedLabel}

                </motion.div>

              )}

            </AnimatePresence>

          </div>

        </div>

        {/* CHEVRON */}

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-gray-400"
        >

          <ChevronDown size={24} />

        </motion.div>

      </motion.button>

      {/* OPTIONS */}

      <AnimatePresence>

        {isOpen && (

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-7 pb-7"
          >

            <div className="space-y-4">

              {options.map((option, index) => {

                const optionData =
                  typeof option === "object"
                    ? option
                    : {
                        label: option,
                        score: null,
                      };

                const active =
                  selectedLabel ===
                  optionData.label;

                return (

                  <motion.button
                    key={`${optionData.label}-${index}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      onSelect(optionData)
                    }
                    className={`w-full p-5 rounded-[22px] border text-left transition-all relative overflow-hidden ${
                      active
                        ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white border-green-500 shadow-lg shadow-green-200"
                        : "bg-white/80 border-gray-200 hover:border-green-300 hover:bg-green-50"
                    }`}
                  >

                    <div className="flex items-center justify-between">

                      <span className="font-medium text-[16px]">
                        {optionData.label}
                      </span>

                      {active && (
                        <Check size={18} />
                      )}

                    </div>

                  </motion.button>
                );
              })}

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </motion.div>
  );
};

export default ExpandableQuestion;