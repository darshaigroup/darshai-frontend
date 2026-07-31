import {motion} from "framer-motion";
import {Sparkles} from "lucide-react";

const fadeUp={
  hidden:{opacity:0,y:40},
  show:{
    opacity:1,
    y:0,
    transition:{duration:.8,ease:[.22,1,.36,1]}
  }
};

const stagger={
  hidden:{},
  show:{
    transition:{
      staggerChildren:.12,
      delayChildren:.15
    }
  }
};

const float={
  animate:{y:[0,-30,0]},
  transition:{
    duration:10,
    repeat:Infinity,
    ease:"easeInOut"
  }
};

const hero={
  badge:"INTRODUCING DARSHAI",
  title:[
    "Unifying 5,000 years of classical",
    "Ayurvedic wisdom with",
    "continuous bio-telemetry and",
    "generative AI algorithms."
  ],
  quote:"Reclaiming biological sovereignty through mathematical precision and evidence-based preventive longevity."
};

const glowBlobs=[
  {
    size:"w-[34rem] h-[34rem]",
    cls:"-top-44 -left-52 bg-emerald-300/18 blur-[170px]"
  },
  {
    size:"w-[30rem] h-[30rem]",
    cls:"top-20 right-0 bg-lime-200/15 blur-[150px]"
  },
  {
    size:"w-[18rem] h-[18rem]",
    cls:"bottom-10 left-1/2 bg-yellow-100/25 blur-[120px]"
  }
];

const HeroSection=()=>{

return(
<section id="about" className="relative overflow-hidden bg-[#FBF8F1]">

  {/* Background */}

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#EEF8EA_0%,#FBF8F1_48%,#FBF8F1_100%)]"/>

  <div className="absolute inset-0 opacity-[.035] [background-image:linear-gradient(to_right,#166534_1px,transparent_1px),linear-gradient(to_bottom,#166534_1px,transparent_1px)] [background-size:80px_80px]"/>


  {/* Floating Lights */}

  {glowBlobs.map((item,index)=>(
    <motion.div
      key={index}
      {...float}
      transition={{
        ...float.transition,
        delay:index*1.4
      }}
      className={`absolute rounded-full ${item.size} ${item.cls}`}
    />
  ))}

  <div className="relative z-20 mx-auto flex min-h-[78vh] max-w-7xl flex-col items-center justify-center px-6 pt-36 pb-28 text-center">

    {/* Premium Badge */}

    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="inline-flex items-center gap-2 rounded-full border border-emerald-700/10 bg-white/70 px-6 py-3 shadow-sm backdrop-blur-xl"
    >
      <Sparkles
        size={14}
        className="text-[#C89A2B]"
      />

      <span className="text-[11px] font-semibold uppercase tracking-[.28em] text-emerald-700">
        {hero.badge}
      </span>

    </motion.div>

    {/* Editorial Heading */}

    <motion.h1
      variants={stagger}
      initial="hidden"
      animate="show"
      className="mt-12 max-w-6xl font-serif text-[clamp(3.2rem,7vw,6.4rem)] font-semibold leading-[0.93] tracking-[-0.055em] text-[#18251D]"
    >

      {hero.title.map((line,index)=>(
        <motion.span
          key={index}
          variants={fadeUp}
          className="block"
        >
          {line}
        </motion.span>
      ))}

    </motion.h1>

    {/* Quote */}

    <motion.p
      variants={fadeUp}
      initial="hidden"
      animate="show"
      transition={{delay:.7}}
      className="mt-10 max-w-3xl font-serif text-[clamp(1.2rem,2vw,1.7rem)] italic leading-relaxed text-emerald-700/90"
    >
      “{hero.quote}”
    </motion.p>

  </div>

  {/* Smooth Transition */}

  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#FBF8F1] via-[#FBF8F1]/80 to-transparent"/>

</section>
)
};
export default HeroSection;