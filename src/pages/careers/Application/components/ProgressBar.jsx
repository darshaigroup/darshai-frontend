import { motion } from "framer-motion";

const ProgressBar = ({ step, total, className = "" }) => {
  const progress = Math.round((step / total) * 100);

  return (
    <div
      className={`relative h-[8px] overflow-hidden rounded-full bg-[#ECEFEC] ${className}`}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-y-0 left-0 rounded-full bg-[#1E7A3A]"
      />
    </div>
  );
};

export default ProgressBar;
