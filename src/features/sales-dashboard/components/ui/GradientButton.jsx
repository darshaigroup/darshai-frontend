import { motion } from "framer-motion";

export default function GradientButton({
  children,
  onClick,
  icon,
  type="button",
  disabled=false,
  className=""
}){

  return(
    <motion.button
      whileHover={!disabled?{scale:1.02}:{}}
      whileTap={!disabled?{scale:.98}:{}}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-2
        px-6 py-3
        rounded-full
        font-medium
        text-white
        bg-gradient-to-r
        from-[#173C68]
        to-[#1E7A3A]
        hover:shadow-xl
        transition-all
        disabled:opacity-60
        disabled:pointer-events-none
        ${className}
      `}
    >
      {children}
      {icon}
    </motion.button>
  );

}