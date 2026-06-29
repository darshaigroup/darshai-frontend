import { motion } from "framer-motion";

export default function ChoiceCard({ icon: Icon, title, description, selected, onClick }) {
  return (
    <motion.button
      whileHover={{ y: -4 }}
      whileTap={{ scale: .98 }}
      onClick={onClick}
      className={`w-full rounded-[28px] border p-6 text-left transition-all duration-300 ${
        selected
          ? "border-[#83C341] shadow-[0_10px_35px_rgba(131,195,65,.18)]"
          : "border-[#E7E8EB] hover:border-[#83C341]/40 hover:shadow-lg"
      } bg-white`}
    >
      <motion.div
        animate={
          selected
            ? { scale: [1, 1.15, 1], rotate: [0, -3, 3, 0] }
            : { scale: 1, rotate: 0 }
        }
        transition={{
          duration: 1.6,
          repeat: selected ? Infinity : 0,
          ease: "easeInOut",
        }}
        className={`relative flex h-16 w-16 items-center justify-center rounded-full transition-all duration-500 ${
          selected
            ? "bg-[#F4FFE8]"
            : "bg-[#F8F8F5]"
        }`}
      >
        {selected && (
          <>
            <span className="absolute inset-0 rounded-full border-2 border-[#A7DA58] animate-ping opacity-30" />
            <span className="absolute -inset-1 rounded-full shadow-[0_0_25px_rgba(131,195,65,.45)]" />
          </>
        )}

        {Icon && (
          <Icon
            size={30}
            strokeWidth={1.8}
            className={`relative transition-all duration-500 ${
              selected
                ? "text-[#74B72E]"
                : "text-[#7D8B79]"
            }`}
          />
        )}
      </motion.div>

      <h3 className="mt-5 text-lg font-semibold text-[#173C68]">
        {title}
      </h3>

      {description && (
        <p className="mt-2 text-sm text-slate-500">
          {description}
        </p>
      )}
    </motion.button>
  );
}