import {
  Sparkles,
  HeartHandshake,
  Leaf,
  ChevronRight,
} from "lucide-react";

import { motion } from "framer-motion";

const FlowCard = ({
  title,
  description,
  onNext,
}) => {

  return (

    <div
      className="
        min-h-screen
        relative
        overflow-hidden
        bg-[#F5FAF6]
        flex
        items-center
        justify-center
        px-6
        py-10
      "
    >

      {/* BACKGROUND GLOW */}
      <div
        className="
          absolute
          top-[-200px]
          right-[-120px]
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
          bottom-[-180px]
          left-[-100px]
          w-[420px]
          h-[420px]
          rounded-full
          bg-emerald-100/40
          blur-[120px]
        "
      />

      {/* CARD */}
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
          duration: 0.7,
        }}

        className="
          relative
          w-full
          max-w-[520px]
          rounded-[42px]
          overflow-hidden
          border border-white/40
          bg-white/70
          backdrop-blur-3xl
          shadow-[0_30px_90px_rgba(0,0,0,0.08)]
        "
      >

        {/* TOP PREMIUM HEADER */}
        <div
          className="
            relative
            px-10
            pt-12
            pb-20
            bg-gradient-to-br
            from-[#009E45]
            via-[#00B84F]
            to-[#00C853]
            overflow-hidden
          "
        >

          {/* HEADER GLOW */}
          <div
            className="
              absolute
              top-[-100px]
              right-[-80px]
              w-[240px]
              h-[240px]
              rounded-full
              bg-white/10
              blur-[60px]
            "
          />

          {/* ICON */}
          <motion.div

            animate={{
              y: [0, -4, 0],
            }}

            transition={{
              repeat: Infinity,
              duration: 4,
            }}

            className="
              w-20
              h-20
              rounded-[28px]
              bg-white/15
              backdrop-blur-xl
              flex
              items-center
              justify-center
              shadow-lg
            "
          >

            <Sparkles
              size={38}
              className="text-white"
            />

          </motion.div>

          {/* TITLE */}
          <h1
            className="
              mt-8
              text-[44px]
              leading-[1]
              font-black
              tracking-[-0.04em]
              text-white
            "
          >
            {title}
          </h1>

          {/* DESCRIPTION */}
          <p
            className="
              mt-5
              text-[17px]
              leading-8
              text-green-50
              max-w-[360px]
            "
          >
            {description}
          </p>

        </div>

        {/* FLOATING CONTENT CARD */}
        <div
          className="
            relative
            z-20
            mx-8
            -mt-12
            rounded-[32px]
            bg-white
            border border-gray-100
            shadow-[0_20px_60px_rgba(0,0,0,0.06)]
            p-7
          "
        >

          {/* HEADING */}
          <div className="mb-6">

            <p
              className="
                text-[22px]
                font-bold
                text-[#1D1D1F]
              "
            >
              Before Your Consultation
            </p>

            <p
              className="
                mt-2
                text-gray-500
                leading-7
              "
            >
              Complete your wellness assessment to
              help us understand your lifestyle,
              emotional wellbeing, and health goals
              before your consultation.
            </p>

          </div>

          {/* STEPS */}
          {/* STEPS */}
<div className="space-y-5">

  {/* SELF ASSESSMENT */}
  <div
    className="
      group
      relative
      overflow-hidden
      flex
      items-center
      gap-5
      rounded-[28px]
      border border-gray-100
      bg-white
      p-6
      shadow-[0_10px_30px_rgba(0,0,0,0.04)]
      transition-all
      hover:scale-[1.02]
      hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]
    "
  >

    {/* GLOW */}
    <div
      className="
        absolute
        top-[-50px]
        right-[-40px]
        w-[120px]
        h-[120px]
        rounded-full
        bg-green-100/40
        blur-[50px]
      "
    />

    {/* ICON */}
    <div
      className="
        relative
        z-10
        w-16
        h-16
        rounded-3xl
        bg-gradient-to-br
        from-green-500
        to-emerald-600
        flex
        items-center
        justify-center
        shadow-lg
      "
    >

      <Sparkles
        size={30}
        className="text-white"
      />

    </div>

    {/* CONTENT */}
    <div className="relative z-10">

      <h3
        className="
          text-xl
          font-bold
          text-[#1D1D1F]
        "
      >
        Self Assessment
      </h3>

      <p
        className="
          mt-2
          text-gray-500
          leading-7
        "
      >
        Share your wellness goals,
        lifestyle priorities, and
        overall health expectations.
      </p>

    </div>

  </div>

  {/* LIFESTYLE */}
  <div
    className="
      group
      relative
      overflow-hidden
      flex
      items-center
      gap-5
      rounded-[28px]
      border border-gray-100
      bg-white
      p-6
      shadow-[0_10px_30px_rgba(0,0,0,0.04)]
      transition-all
      hover:scale-[1.02]
      hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]
    "
  >

    <div
      className="
        absolute
        top-[-50px]
        right-[-40px]
        w-[120px]
        h-[120px]
        rounded-full
        bg-blue-100/40
        blur-[50px]
      "
    />

    <div
      className="
        relative
        z-10
        w-16
        h-16
        rounded-3xl
        bg-gradient-to-br
        from-sky-500
        to-cyan-500
        flex
        items-center
        justify-center
        shadow-lg
      "
    >

      <Leaf
        size={30}
        className="text-white"
      />

    </div>

    <div className="relative z-10">

      <h3
        className="
          text-xl
          font-bold
          text-[#1D1D1F]
        "
      >
        Lifestyle Routine
      </h3>

      <p
        className="
          mt-2
          text-gray-500
          leading-7
        "
      >
        Understand your sleep,
        food habits, hydration,
        movement, and daily routine.
      </p>

    </div>

  </div>

  {/* MENTAL & EMOTIONAL */}
  <div
    className="
      group
      relative
      overflow-hidden
      flex
      items-center
      gap-5
      rounded-[28px]
      border border-gray-100
      bg-white
      p-6
      shadow-[0_10px_30px_rgba(0,0,0,0.04)]
      transition-all
      hover:scale-[1.02]
      hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]
    "
  >

    <div
      className="
        absolute
        top-[-50px]
        right-[-40px]
        w-[120px]
        h-[120px]
        rounded-full
        bg-purple-100/40
        blur-[50px]
      "
    />

    <div
      className="
        relative
        z-10
        w-16
        h-16
        rounded-3xl
        bg-gradient-to-br
        from-violet-500
        to-fuchsia-500
        flex
        items-center
        justify-center
        shadow-lg
      "
    >

      <HeartHandshake
        size={30}
        className="text-white"
      />

    </div>

    <div className="relative z-10">

      <h3
        className="
          text-xl
          font-bold
          text-[#1D1D1F]
        "
      >
        Mental & Emotional
      </h3>

      <p
        className="
          mt-2
          text-gray-500
          leading-7
        "
      >
        Explore emotional wellbeing,
        stress patterns, environment,
        and mental balance.
      </p>

    </div>

  </div>

  {/* READINESS */}
  <div
    className="
      group
      relative
      overflow-hidden
      flex
      items-center
      gap-5
      rounded-[28px]
      border border-gray-100
      bg-white
      p-6
      shadow-[0_10px_30px_rgba(0,0,0,0.04)]
      transition-all
      hover:scale-[1.02]
      hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]
    "
  >

    <div
      className="
        absolute
        top-[-50px]
        right-[-40px]
        w-[120px]
        h-[120px]
        rounded-full
        bg-amber-100/40
        blur-[50px]
      "
    />

    <div
      className="
        relative
        z-10
        w-16
        h-16
        rounded-3xl
        bg-gradient-to-br
        from-amber-500
        to-orange-500
        flex
        items-center
        justify-center
        shadow-lg
      "
    >

      <ChevronRight
        size={30}
        className="text-white"
      />

    </div>

    <div className="relative z-10">

      <h3
        className="
          text-xl
          font-bold
          text-[#1D1D1F]
        "
      >
        Readiness Assessment
      </h3>

      <p
        className="
          mt-2
          text-gray-500
          leading-7
        "
      >
        Evaluate your commitment,
        motivation, and readiness
        for wellness transformation.
      </p>

    </div>

  </div>

</div>

          {/* BUTTON */}
          <motion.button

            whileHover={{
              scale: 1.02,
            }}

            whileTap={{
              scale: 0.98,
            }}

            onClick={onNext}

            className="
              group
              relative
              w-full
              mt-8
              overflow-hidden
              rounded-2xl
              bg-gradient-to-r
              from-[#009E45]
              to-[#00C853]
              py-5
              text-lg
              font-semibold
              text-white
              shadow-[0_12px_30px_rgba(16,185,129,0.25)]
            "
          >

            <div
              className="
                absolute
                inset-0
                bg-white/10
                opacity-0
                transition
                group-hover:opacity-100
              "
            />

            <div
              className="
                relative
                flex
                items-center
                justify-center
                gap-2
              "
            >

              Begin Assessment

              <ChevronRight
                size={20}
                className="
                  transition-transform
                  group-hover:translate-x-1
                "
              />

            </div>

          </motion.button>

        </div>

        {/* FOOTER */}
        <div className="px-10 py-8">

          <p
            className="
              text-center
              text-sm
              leading-7
              text-gray-400
            "
          >
            Your responses help us personalize your
            consultation experience and wellness
            recommendations.
          </p>

        </div>

      </motion.div>

    </div>
  );
};

export default FlowCard;