import {motion} from "framer-motion";
import {Sparkles} from "lucide-react";

const fadeUp={hidden:{opacity:0,y:35},show:{opacity:1,y:0,transition:{duration:.7,ease:[.22,1,.36,1]}}};

const PositionHeader=()=>(
<motion.div
variants={fadeUp}
initial="hidden"
whileInView="show"
viewport={{once:true}}
className="mx-auto max-w-4xl text-center"
>

<div className="inline-flex items-center gap-2 rounded-full border border-[#BFD5BF] bg-[#EEF5EE] px-5 py-2.5">

<Sparkles size={14} className="text-[#C89C37]"/>

<span className="text-[11px] font-semibold uppercase tracking-[.28em] text-[#C89C37]">
Join Our Mission
</span>

</div>

<h2 className="mt-8 font-['Playfair_Display'] text-[2.6rem] font-semibold leading-none tracking-[-.03em] text-[#162A1E] sm:text-[3.3rem] lg:text-[4.25rem]">
Current Open Positions
</h2>

<p className="mx-auto mt-6 max-w-3xl text-[17px] leading-8 text-[#66746B]">
Explore high-impact opportunities across AI, preventive healthcare, strategic partnerships, client experience, and wellness innovation. Join a mission-driven team building the future of AI-native HealthTech.
</p>

</motion.div>
);

export default PositionHeader;