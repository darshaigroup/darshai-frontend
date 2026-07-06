import { motion } from "framer-motion";
import {
CalendarDays,
MessageSquare,
Clock3,
Phone,
HeartHandshake,
ShoppingBag,
UserCheck,
CheckCircle2,
XCircle
} from "lucide-react";

const ICONS={
Lead:CalendarDays,
Contacted:Phone,
Interested:HeartHandshake,
Purchased:ShoppingBag,
Assigned:UserCheck,
Closed:CheckCircle2,
"Not Interested":XCircle
};

const COLORS={
Lead:"bg-[#173C68]",
Contacted:"bg-[#2563EB]",
Interested:"bg-[#1E7A3A]",
Purchased:"bg-[#C6A75E]",
Assigned:"bg-[#7C3AED]",
Closed:"bg-[#16A34A]",
"Not Interested":"bg-[#DC2626]"
};

export default function TimelineItem({
item,
index=0,
last=false
}){

const Icon=ICONS[item.lead_status]||CalendarDays;
const color=COLORS[item.lead_status]||"bg-slate-500";

return(

<motion.div
initial={{opacity:0,x:-20}}
whileInView={{opacity:1,x:0}}
viewport={{once:true}}
transition={{delay:index*.08}}
className="relative flex gap-5"
>

<div className="relative flex flex-col items-center">

<div className={`z-10 flex h-12 w-12 items-center justify-center rounded-full ${color} shadow-lg`}>

<Icon
size={20}
className="text-white"
/>

</div>

{!last&&(
<div className="mt-2 h-full w-[2px] flex-1 bg-[#E5E7EB]"/>
)}

</div>

<div className="flex-1 rounded-[28px] border border-[#ECE7DD] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,.05)]">

<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

<div>

<h3 className="text-xl font-semibold text-[#173C68]">
{item.lead_status}
</h3>

<p className="mt-1 text-sm text-slate-500">
{new Date(item.created_at).toLocaleString()}
</p>

</div>

<div className={`rounded-full px-4 py-2 text-sm font-semibold text-white ${color}`}>

{item.lead_status}

</div>

</div>

<div className="mt-5 grid gap-4 md:grid-cols-2">

<div className="rounded-2xl bg-[#F8F6F2] p-4">

<div className="flex items-center gap-2">

<CalendarDays
size={17}
className="text-[#173C68]"
/>

<p className="text-sm font-medium text-slate-500">
Follow-up Date
</p>

</div>

<p className="mt-3 font-semibold text-[#173C68]">

{item.followup_date
?new Date(item.followup_date).toLocaleDateString()
:"Not Scheduled"}

</p>

</div>

<div className="rounded-2xl bg-[#F8F6F2] p-4">

<div className="flex items-center gap-2">

<Clock3
size={17}
className="text-[#173C68]"
/>

<p className="text-sm font-medium text-slate-500">
Updated At
</p>

</div>

<p className="mt-3 font-semibold text-[#173C68]">

{new Date(item.created_at).toLocaleTimeString()}

</p>

</div>

</div>

<div className="mt-5 rounded-2xl bg-[#FCFBF9] p-5">

<div className="mb-3 flex items-center gap-2">

<MessageSquare
size={18}
className="text-[#173C68]"
/>

<h4 className="font-medium text-[#173C68]">
Sales Remark
</h4>

</div>

<p className="leading-7 text-slate-600">

{item.remark||
item.sales_notes||
"No remarks added."}

</p>

</div>

</div>

</motion.div>

);

}