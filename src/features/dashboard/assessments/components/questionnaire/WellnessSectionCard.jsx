import { motion } from "framer-motion";

const WellnessSectionCard = ({
  title,
  subtitle,
  children,
}) => {

  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-[24px] md:rounded-[32px] lg:rounded-[40px] border border-white/30 bg-white/70 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
    >

      {/* TOP GRADIENT */}

      <div className="relative overflow-hidden h-[110px] sm:h-[120px] md:h-[130px] lg:h-[150px] bg-gradient-to-r from-[#00A63E] via-[#00B140] to-[#00C853]">

        {/* GLOW EFFECT */}

        <div className="absolute top-[-80px] right-[-60px] w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] lg:w-[260px] lg:h-[260px] rounded-full bg-white/10 blur-3xl" />

        <div className="absolute bottom-[-60px] left-[-60px] w-[160px] h-[160px] rounded-full bg-white/5 blur-3xl" />

        {/* TITLE */}

        <div className="relative z-10 h-full flex items-center px-5 sm:px-6 md:px-8 lg:px-12">

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight break-words">
            {title}
          </h1>

        </div>

      </div>

      {/* BODY */}

      <div className="p-5 sm:p-6 md:p-8 lg:p-12">

        <p className="text-sm sm:text-base md:text-lg lg:text-[22px] text-[#475467] leading-relaxed mb-6 md:mb-8 lg:mb-10">
          {subtitle}
        </p>

        {children}

      </div>

    </motion.div>

  );

};

export default WellnessSectionCard;