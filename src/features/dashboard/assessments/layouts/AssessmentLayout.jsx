import { motion } from "framer-motion";

const AssessmentLayout = ({
  sidebar,
  children,
}) => {
  return (
    <div
      className="
        min-h-screen
        relative
        overflow-hidden
        bg-[#F5F7F4]
      "
    >

      {/* PREMIUM BACKGROUND */}

      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-[#F6FFF8]
          via-[#F8F7F3]
          to-[#EDF7EE]
        "
      />

      {/* GLOW ORBS */}

      <div
        className="
          absolute
          top-[-200px]
          left-[-120px]
          w-[500px]
          h-[500px]
          rounded-full
          bg-green-200/30
          blur-[120px]
        "
      />

      <div
        className="
          absolute
          bottom-[-200px]
          right-[-100px]
          w-[500px]
          h-[500px]
          rounded-full
          bg-emerald-300/20
          blur-[120px]
        "
      />

      {/* NOISE TEXTURE */}

      <div
        className="
          absolute inset-0
          opacity-[0.03]
          mix-blend-overlay
          bg-[url('https://grainy-gradients.vercel.app/noise.svg')]
        "
      />

      {/* MAIN CONTENT */}

      <div
        className="
          relative z-10
          flex
          gap-10
          px-10
          py-10
          max-w-[1700px]
          mx-auto
        "
      >

        {/* SIDEBAR */}

        <motion.div
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="
            w-[360px]
            shrink-0
          "
        >
          {sidebar}
        </motion.div>

        {/* PAGE */}

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
            duration: 0.5,
          }}
          className="
            flex-1
            min-w-0
          "
        >
          {children}
        </motion.div>

      </div>

    </div>
  );
};

export default AssessmentLayout;