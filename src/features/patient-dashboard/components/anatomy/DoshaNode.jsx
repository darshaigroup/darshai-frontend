import { motion } from "framer-motion";

export default function DoshaNode({ color = "#10B981", active = false, label = "" }) {
  return (
    <motion.div
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: .94 }}
      transition={{ duration: .2 }}
      className="relative flex h-8 w-8 cursor-pointer items-center justify-center"
      style={active ? { filter: `drop-shadow(0 0 10px ${color})` } : undefined}
    >
      {active && <motion.span animate={{ scale: [1, 1.7, 1], opacity: [.45, .12, .45] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }} className="absolute h-8 w-8 rounded-full" style={{ background: color }} />}
      {active && <motion.span animate={{ scale: [1, 1.35, 1], opacity: [.7, .25, .7] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }} className="absolute h-6 w-6 rounded-full border-2" style={{ borderColor: color }} />}
      <span className="relative z-10 h-4 w-4 rounded-full border-2 border-white shadow-md" style={{ background: color, boxShadow: active ? `0 0 14px ${color}` : "0 2px 6px rgba(15,23,42,.2)" }} />
      <span className="absolute -top-5 whitespace-nowrap text-[9px] font-semibold text-slate-500 sm:text-[10px]">{label}</span>
    </motion.div>
  );
}