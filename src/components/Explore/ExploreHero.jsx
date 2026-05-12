import { motion } from "framer-motion";

export default function ExploreHero({
  title,
  image,
}) {
  return (
    <section className="relative h-[60vh] overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#071A13] via-[#1E7A3A] to-[#174EA6]">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">

        <img
          src={image}
          className="w-full h-full object-cover opacity-20"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/30" />

      </div>

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

      {/* CONTENT */}
      <div className="relative z-10 text-center px-6">

        {/* SMALL LABEL */}
        <p className="text-[11px] uppercase tracking-[0.45em] text-white/60 mb-5">
          DARSHAI ARCHIVE
        </p>

        {/* TITLE */}
        <h1 className="text-5xl md:text-7xl lg:text-[90px] leading-[0.92] tracking-[-0.05em] font-serif text-white capitalize">
          {title}
        </h1>

      </div>

    </section>
  );
}