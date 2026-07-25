import { motion } from "framer-motion";

export default function DoshaNode({ color="#10B981", active=false, label="", onClick }) {
  return (
    <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: .25 }} onClick={onClick} className="relative flex h-5 w-5 cursor-pointer items-center justify-center">
      {active && (
        <motion.span
          animate={{ scale: [1, 1.35, 1], opacity: [.2, .45, .2] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full"
          style={{ background: color }}
        />
      )}

      <span className="relative z-10 h-4 w-4 rounded-full border-2 border-white" style={{ background: color }} />

      <span className="absolute -top-6 whitespace-nowrap text-[10px] font-semibold text-slate-500">
        {label}
      </span>
    </motion.div>
  );
}