import { motion } from "framer-motion";

export default function GlassCard({
  children,
  className="",
  hover=true
}){

  return(
    <motion.div
      whileHover={hover?{y:-4}:{}}
      transition={{duration:.25}}
      className={`
        rounded-[32px]
        border border-white/40
        bg-white/70
        backdrop-blur-xl
        shadow-[0_20px_60px_rgba(0,0,0,.06)]
        ${className}
      `}
    >
      {children}
    </motion.div>
  );

}