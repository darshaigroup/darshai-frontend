import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4EFE6] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full bg-white rounded-[48px] p-12 shadow-[0_30px_100px_rgba(0,0,0,0.08)]"
      >
        <div className="w-20 h-20 rounded-full bg-[#1E7A3A]/10 flex items-center justify-center mx-auto mb-8">
          <Sparkles size={34} className="text-[#1E7A3A]" />
        </div>

        <h1 className="text-center text-6xl font-serif text-[#173C68] leading-tight">
          Reclaim Your <span className="italic text-[#C6A75E]">Wellness</span>
        </h1>

        <p className="text-center text-slate-500 max-w-2xl mx-auto mt-8 text-lg">
          We'll understand your lifestyle, preferences and wellness goals to create a personalized Darshai Wellness Blueprint.
        </p>

        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate("/lifestyle/onboard")}
            className="px-10 py-5 rounded-full bg-[#1E7A3A] text-white flex items-center gap-3 hover:bg-[#14532d] transition-all"
          >
            Begin Journey
            <ArrowRight size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}