import { motion } from "framer-motion";

export default function ChoiceCard({ icon:Icon, title, description, selected, onClick }) {
  return (
    <motion.button
      whileHover={{ y:-4, scale:1.02 }}
      whileTap={{ scale:0.98 }}
      onClick={onClick}
      className={`w-full text-left p-6 rounded-[28px] border transition-all duration-300 ${
        selected
          ? "bg-[#1E7A3A] border-[#1E7A3A] text-white shadow-[0_20px_60px_rgba(30,122,58,0.25)]"
          : "bg-white border-[#E6E8EC] text-[#173C68] hover:border-[#1E7A3A]/30 hover:shadow-xl"
      }`}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
        selected
          ? "bg-white/10 text-white"
          : "bg-[#F3F8F4] text-[#1E7A3A]"
      }`}>
        {Icon && <Icon size={26} />}
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>

      {description && (
        <p className={`mt-2 text-sm ${
          selected
            ? "text-white/80"
            : "text-slate-500"
        }`}>
          {description}
        </p>
      )}
    </motion.button>
  );
}