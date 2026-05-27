import { motion } from "framer-motion";

const WellnessSectionCard = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
      }}
      className="
        relative
        overflow-hidden
        rounded-[40px]
        border border-white/30
        bg-white/70
        backdrop-blur-2xl
        shadow-[0_20px_60px_rgba(0,0,0,0.08)]
      "
    >

      {/* TOP GRADIENT */}

      <div
        className="
          h-[140px]
          bg-gradient-to-r
          from-[#00A63E]
          via-[#00B140]
          to-[#00C853]
          relative
          overflow-hidden
        "
      >

        {/* LIGHT */}

        <div
          className="
            absolute
            top-[-60px]
            right-[-50px]
            w-[220px]
            h-[220px]
            rounded-full
            bg-white/10
            blur-3xl
          "
        />

        <div className="relative z-10 p-12">

          <h1
            className="
              text-5xl
              font-bold
              tracking-tight
              text-white
            "
          >
            {title}
          </h1>

        </div>

      </div>

      {/* BODY */}

      <div className="p-12">

        <p
          className="
            text-[22px]
            text-[#475467]
            mb-10
          "
        >
          {subtitle}
        </p>

        {children}

      </div>

    </motion.div>
  );
};

export default WellnessSectionCard;