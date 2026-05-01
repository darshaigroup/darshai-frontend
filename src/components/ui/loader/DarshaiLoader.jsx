import { motion } from "framer-motion";
import logo from "../../../assets/images/logos.png"

const DarshaiLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-radial from-[#0f2d1f] to-[#020805] overflow-hidden">

      {/* Glow Aura */}
      <div className="absolute w-[300px] h-[300px] bg-[#d4af37]/20 blur-[100px] rounded-full animate-pulse" />

      {/* Logo */}
      <motion.img
        src={logo}
        alt="Darshai"
        className="w-[150px] drop-shadow-[0_0_12px_rgba(212,175,55,0.5)] z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.9, 1.05, 0.95], opacity: 1 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      
    </div>
  );
};

export default DarshaiLoader;