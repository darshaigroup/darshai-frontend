import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

export default function ComingSoon() {
  const { type } = useParams();

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#071A13] via-[#1E7A3A] to-[#174EA6]">

      {/* PREMIUM LIGHTS */}
      <div className="absolute inset-0 overflow-hidden">

        {/* BLUE GLOW */}
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
          }}
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#174EA6]/30 rounded-full blur-[140px]"
        />

        {/* GREEN GLOW */}
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
          }}
          className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#1E7A3A]/30 rounded-full blur-[140px]"
        />

        {/* GRID */}
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:60px_60px]" />

      </div>

      {/* CENTER MESSAGE */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative z-10 text-center px-6"
      >

        {/* SMALL LABEL */}
        <p className="text-[11px] uppercase tracking-[0.45em] text-white/60 mb-6">
          DARSHAI EXPERIENCE
        </p>

        {/* TITLE */}
        <h1 className="text-[48px] md:text-[100px] leading-[0.92] tracking-[-0.05em] font-serif text-white mb-8">

          {type === "video"
            ? "Videos Launching Soon"
            : "Images Launching Soon"}

        </h1>

        {/* SUBTEXT */}
        <p className="max-w-2xl mx-auto text-[17px] md:text-[22px] leading-[2] text-white/70 font-light">
          Curating immersive luxury visual experiences for the DARSHAI archive.
        </p>

      </motion.div>

    </section>
  );
}