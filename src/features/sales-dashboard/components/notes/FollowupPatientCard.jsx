import { motion } from "framer-motion";
import {
User,
MapPin,
Phone,
CalendarDays,
Clock3,
MessageSquare,
ArrowRight,
BadgeCheck,
AlertTriangle
} from "lucide-react";

import LeadStatusBadge from "../leads/LeadStatusBadge";
import GradientButton from "../ui/GradientButton";

export default function FollowupPatientCard({
lead,
onView,
onContact
}){

const today=new Date().toISOString().split("T")[0];

const status=
!lead.followup_date
?"Not Scheduled"
:lead.followup_date.slice(0,10)<today
?"Overdue"
:lead.followup_date.slice(0,10)===today
?"Today"
:"Upcoming";

const statusStyle={
Today:"bg-[#FFF7E5] text-[#C58A00]",
Upcoming:"bg-[#EDF9F0] text-[#1E7A3A]",
Overdue:"bg-[#FDECEC] text-[#D64545]",
"Not Scheduled":"bg-slate-100 text-slate-500"
};

return(

<motion.div
whileHover={{y:-6}}
transition={{duration:.25}}
className="
group
overflow-hidden
rounded-[34px]
border border-[#ECE7DD]
bg-white
shadow-[0_20px_60px_rgba(0,0,0,.06)]
transition-all
hover:shadow-[0_35px_90px_rgba(0,0,0,.12)]
"
>

<div className="h-2 bg-gradient-to-r from-[#173C68] via-[#1E7A3A] to-[#C6A75E]"/>

<div className="p-6 lg:p-7">

<div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

<div className="flex items-start gap-4">

<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#173C68]/10">

<User
size={28}
className="text-[#173C68]"
/>

</div>

<div className="space-y-2">

<h2 className="font-serif text-2xl text-[#173C68]">
{lead.name}
</h2>

<div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">

<div className="flex items-center gap-2">

<Phone size={15}/>

{lead.phone}

</div>

<div className="flex items-center gap-2">

<MapPin size={15}/>

{lead.location||"Not Available"}

</div>

</div>

</div>

</div>

<div className="flex flex-wrap gap-3">

<LeadStatusBadge
status={lead.lead_status}
/>

<span className={`rounded-full px-4 py-2 text-sm font-semibold ${statusStyle[status]}`}>

{status==="Today"&&<Clock3 size={15} className="mr-2 inline"/>}

{status==="Upcoming"&&<BadgeCheck size={15} className="mr-2 inline"/>}

{status==="Overdue"&&<AlertTriangle size={15} className="mr-2 inline"/>}

{status}

</span>

</div>

</div>

<div className="mt-7 grid gap-5 md:grid-cols-2">

<div className="rounded-2xl bg-[#F8F6F2] p-5">

<div className="flex items-center gap-3">

<CalendarDays
size={18}
className="text-[#173C68]"
/>

<p className="text-sm font-medium text-slate-500">
Next Follow-up
</p>

</div>

<h3 className="mt-3 text-xl font-semibold text-[#173C68]">

{lead.followup_date
?new Date(lead.followup_date).toLocaleDateString()
:"Not Scheduled"}

</h3>

</div>

<div className="rounded-2xl bg-[#F8F6F2] p-5">

<div className="flex items-center gap-3">

<MessageSquare
size={18}
className="text-[#173C68]"
/>

<p className="text-sm font-medium text-slate-500">
Last Remark
</p>

</div>

<p className="mt-3 line-clamp-3 leading-7 text-slate-600">

{lead.sales_notes||"No remarks available."}

</p>

</div>

</div>

<div className="mt-7 flex flex-col gap-4 sm:flex-row">

<GradientButton
onClick={onContact}
className="flex-1"
icon={<Phone size={18}/>}
>

Contact Patient

</GradientButton>

<button
onClick={onView}
className="
flex flex-1 items-center justify-center gap-3
rounded-full
border border-[#173C68]
py-3
font-medium
text-[#173C68]
transition-all
hover:bg-[#173C68]
hover:text-white
"
>

View History

<ArrowRight
size={18}
className="transition-transform group-hover:translate-x-1"
/>

</button>

</div>

</div>

</motion.div>

);

}