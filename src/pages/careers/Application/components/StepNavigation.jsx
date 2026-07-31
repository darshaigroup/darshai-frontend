import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, Sparkles } from "lucide-react";

const StepNavigation = ({
  step,
  total = 5,
  isLoading = false,
  onBack,
  onNext,
}) => {
  const isFirst = step === 1;
  const isLast = step === total;

  return (
    <div className="border-t border-[#ECEFEC] bg-white px-8 py-7">
      <div
        className={`flex flex-col gap-4 sm:flex-row ${isFirst ? "justify-end" : "justify-between"} items-center`}
      >
        {!isFirst && (
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            disabled={isLoading}
            onClick={onBack}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-[#F1F3F2] px-7 text-sm font-semibold text-[#46564B] transition hover:bg-[#E7EBE8]"
          >
            <ChevronLeft size={18} />
            Back
          </motion.button>
        )}

        <motion.button
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type={isLast ? "submit" : "button"}
          onClick={!isLast ? onNext : undefined}
          disabled={isLoading}
          className={`inline-flex h-14 min-w-[220px] items-center justify-center gap-2 rounded-full px-8 text-[15px] font-semibold text-white shadow-lg transition

          ${
            isLast
              ? "bg-gradient-to-r from-[#D5A11C] via-[#E0B337] to-[#C89516] hover:shadow-[0_18px_40px_rgba(214,163,33,.35)]"
              : "bg-gradient-to-r from-[#1E7A3A] via-[#258741] to-[#2F964A] hover:shadow-[0_18px_40px_rgba(30,122,58,.30)]"
          }`}
        >
          {isLoading
            ? isLast
              ? "Submitting..."
              : "Please Wait..."
            : isLast
              ? "Submit Application"
              : `Continue Step ${step + 1}`}

          {isLast ? <Sparkles size={18} /> : <ArrowRight size={18} />}
        </motion.button>
      </div>
    </div>
  );
};

export default StepNavigation;
