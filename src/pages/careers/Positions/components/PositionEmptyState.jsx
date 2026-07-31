import {motion} from "framer-motion";
import {BriefcaseBusiness,RefreshCw} from "lucide-react";

const PositionEmptyState=({onReset})=>(
<motion.div
initial={{opacity:0,y:30}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{duration:.45}}
className="mx-auto flex max-w-2xl flex-col items-center rounded-[30px] border border-[#E7ECE8] bg-white px-8 py-16 text-center shadow-[0_12px_40px_rgba(16,24,40,.05)]"
>

<div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EEF8F2] text-[#1E7A3A]">
<BriefcaseBusiness size={36}/>
</div>

<h3 className="mt-8 font-['Playfair_Display'] text-3xl font-semibold text-[#162A1E]">
No Open Positions Found
</h3>

<p className="mt-4 max-w-lg text-[16px] leading-8 text-[#66746B]">
We couldn't find any opportunities matching your selected category. Try another filter or browse all available positions.
</p>

<button
onClick={onReset}
className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#1E7A3A] px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#17622F] hover:shadow-lg hover:shadow-[#1E7A3A]/20"
>

<RefreshCw size={16}/>

View All Positions

</button>

</motion.div>
);

export default PositionEmptyState;