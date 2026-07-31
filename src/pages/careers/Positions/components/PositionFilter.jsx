import {motion} from "framer-motion";

const categories=["All","Sales/Marketing","Consultant"];

const PositionFilter=({active,onChange})=>(
<div className="mt-12 flex flex-wrap items-center justify-center gap-3">
{categories.map(category=>(
<motion.button
key={category}
whileTap={{scale:.96}}
whileHover={{y:-2}}
onClick={()=>onChange(category)}
className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${active===category?"border-[#1E7A3A] bg-[#1E7A3A] text-white shadow-lg shadow-[#1E7A3A]/25":"border-[#DDE5DF] bg-white text-[#33443A] hover:border-[#1E7A3A] hover:text-[#1E7A3A]"}`}
>
{category}
</motion.button>
))}
</div>
);

export default PositionFilter;