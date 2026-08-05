import {motion} from "framer-motion";
import {Target} from "lucide-react";

const fadeUp={hidden:{opacity:0,y:40},show:{opacity:1,y:0,transition:{duration:.75,ease:[.22,1,.36,1]}}},
stagger={hidden:{},show:{transition:{staggerChildren:.12,delayChildren:.15}}},
float={animate:{y:[0,-20,0]},transition:{duration:8,repeat:Infinity,ease:"easeInOut"}};

const sectionClass="relative overflow-hidden bg-[#FBF8F1] py-20 sm:py-24 lg:py-32";
const containerClass="relative z-20 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12";

const mission={
  badge:"OUR MISSION",
  title:"To combine Ayurvedic knowledge, modern health insights, environmental intelligence, and AI to make personalized preventive wellness more accessible.",
  description:" We are building a connected ecosystem of technology, wellness experts, trusted centres, and personalized wellness services."
};

const blobs=[
  {id:1,size:"h-[30rem] w-[30rem]",cls:"-left-40 top-10 bg-emerald-300/20 blur-[170px]"},
  {id:2,size:"h-[24rem] w-[24rem]",cls:"right-0 top-0 bg-lime-200/20 blur-[150px]"},
  {id:3,size:"h-[18rem] w-[18rem]",cls:"bottom-0 left-1/2 -translate-x-1/2 bg-yellow-100/25 blur-[120px]"}
];

const MissionSection=()=>(
<section className={sectionClass}>

<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#EEF8EA_0%,#FBF8F1_48%,#FBF8F1_100%)]"/>
<div className="absolute inset-0 opacity-[.03] [background-image:linear-gradient(to_right,#166534_1px,transparent_1px),linear-gradient(to_bottom,#166534_1px,transparent_1px)] [background-size:72px_72px]"/>

{blobs.map(({id,size,cls})=>(
<motion.div
key={id}
{...float}
transition={{...float.transition,delay:id*.8}}
className={`absolute rounded-full ${size} ${cls}`}
/>
))}

<div className={containerClass}>

<motion.div
variants={stagger}
initial="hidden"
whileInView="show"
viewport={{once:true,amount:.3}}
className="flex justify-center"
>

<motion.div
variants={fadeUp}
className="relative w-full max-w-[1700px] overflow-hidden rounded-[34px] bg-[#082F17] px-6 py-10 shadow-[0_40px_120px_rgba(0,0,0,.18)] sm:px-10 sm:py-12 lg:px-24 lg:py-14 xl:px-28 xl:py-16"
>

<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1D5A33_0%,transparent_42%)]"/>
<div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#0D4421_0%,transparent_40%)]"/>

<div className="relative flex flex-col items-center text-center">

<motion.div
variants={fadeUp}
className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2 backdrop-blur-xl"
>

<Target size={15} className="text-[#D8B35D]"/>

<span className="text-[11px] font-semibold uppercase tracking-[.32em] text-[#D8B35D]">
{mission.badge}
</span>

</motion.div>
<motion.h2
variants={fadeUp}
className="mt-7 max-w-6xl font-['Playfair_Display'] text-[1.9rem] font-semibold leading-[1.2] tracking-[-.03em] text-white sm:text-[2.5rem] lg:text-[3.5rem] xl:text-[4rem]"
>
{mission.title}
</motion.h2>

<motion.p
variants={fadeUp}
className="mx-auto mt-5 max-w-5xl text-[15px] leading-7 text-white/70 sm:text-base lg:mt-6 lg:text-[17px]"
>
{mission.description}
</motion.p>

<motion.div
variants={fadeUp}
className="mt-6 h-px w-20 rounded-full bg-gradient-to-r from-transparent via-[#D8B35D] to-transparent lg:mt-7"
/>

<motion.div
variants={fadeUp}
className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:mt-8"
>

<div className="rounded-full border border-white/10 bg-white/10 px-5 py-2 backdrop-blur-xl">
<span className="text-xs font-medium tracking-[.2em] uppercase text-white/80">AI-Powered</span>
</div>

<div className="rounded-full border border-white/10 bg-white/10 px-5 py-2 backdrop-blur-xl">
<span className="text-xs font-medium tracking-[.2em] uppercase text-white/80">Clinical Intelligence</span>
</div>

<div className="rounded-full border border-white/10 bg-white/10 px-5 py-2 backdrop-blur-xl">
<span className="text-xs font-medium tracking-[.2em] uppercase text-white/80">Ayurvedic Precision</span>
</div>

</motion.div>

</div>

<div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/[.03] via-transparent to-transparent"/>

<div className="pointer-events-none absolute -left-28 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full border border-white/5"/>
<div className="pointer-events-none absolute -right-24 top-16 h-44 w-44 rounded-full border border-white/5"/>
<div className="pointer-events-none absolute bottom-12 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full border border-white/5"/>

</motion.div>

</motion.div>

</div>

</section>
);

export default MissionSection;