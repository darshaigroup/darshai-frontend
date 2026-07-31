import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Stepper from "./Stepper";
import ProgressBar from "./ProgressBar";

const TITLES = {
  1: "Personal Information",
  2: "Educational Background",
  3: "Position & Application Alignment",
  4: "Resume Upload",
  5: "Review & Final Declaration",
};

const SUBTITLES = {
  1: "Tell us about yourself before we begin.",
  2: "Share your educational qualifications.",
  3: "Choose the position that best fits your profile.",
  4: "Upload your latest resume for evaluation.",
  5: "Review every detail before submitting your application.",
};

const FormHeader = ({ step, total, onStepClick }) => {
  const progress = Math.round((step / total) * 100);

  return (
    <div className="space-y-8">
      

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="overflow-hidden rounded-[34px] border border-[#E7DBC2] bg-white p-8 shadow-[0_30px_70px_rgba(41,43,34,.12)] md:p-10"
      >
        <Stepper step={step} total={total} onStepClick={onStepClick} />

        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm font-semibold text-[#5E6A61]">
            Step {step} of {total}: {TITLES[step]}
          </p>

          <p className="text-sm font-bold text-[#1E7A3A]">
            {progress}% Completed
          </p>
        </div>

        <ProgressBar step={step} total={total} className="mt-4" />

        
      </motion.div>
    </div>
  );
};

export default FormHeader;
