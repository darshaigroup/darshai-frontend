import { motion } from "framer-motion";
import { ClipboardList } from "lucide-react";

import TimelineItem from "./TimelineItem";

export default function FollowupTimeline({
history=[],
patientName=""
}){

return(

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
className="
overflow-hidden
rounded-[34px]
border border-[#ECE7DD]
bg-white
shadow-[0_20px_60px_rgba(0,0,0,.06)]
"
>

<div className="h-2 bg-gradient-to-r from-[#173C68] via-[#1E7A3A] to-[#C6A75E]"/>

<div className="p-6 lg:p-8">

<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

<div>

<h2 className="font-serif text-3xl text-[#173C68]">
Follow-up Timeline
</h2>

<p className="mt-2 text-slate-500">
Complete communication history for
<span className="ml-1 font-semibold text-[#173C68]">
{patientName}
</span>
</p>

</div>

<div className="flex items-center gap-3 rounded-full bg-[#F8F6F2] px-5 py-3">

<ClipboardList
size={18}
className="text-[#173C68]"
/>

<span className="text-sm font-medium text-slate-600">
{history.length} Records
</span>

</div>

</div>

{!history.length?(
<div className="py-20 text-center">

<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#173C68]/10">

<ClipboardList
size={34}
className="text-[#173C68]"
/>

</div>

<h3 className="mt-6 font-serif text-2xl text-[#173C68]">
No Follow-up History
</h3>

<p className="mx-auto mt-3 max-w-lg leading-7 text-slate-500">
No follow-up activities have been recorded for this patient yet.
Once the sales team schedules follow-ups, contacts the patient,
or updates remarks, the complete timeline will appear here.
</p>

</div>
):(

<div className="mt-10">

<div className="space-y-8">

{history.map((item,index)=>(

<TimelineItem
key={item.id||index}
item={item}
index={index}
last={index===history.length-1}
/>

))}

</div>

</div>

)}

</div>

</motion.div>

);

}