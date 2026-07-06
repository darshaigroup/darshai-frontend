import { motion } from "framer-motion";
import {
User,
Phone,
Mail,
MapPin,
CalendarDays,
UserCheck,
HeartHandshake,
Stethoscope,
ArrowLeft
} from "lucide-react";

import LeadStatusBadge from "../leads/LeadStatusBadge";
import GradientButton from "../ui/GradientButton";

export default function FollowupHistoryCard({
lead,
onBack,
onContact
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

<div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

<div className="flex items-start gap-5">

<div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#173C68]/10">

<User
size={38}
className="text-[#173C68]"
/>

</div>

<div>

<h1 className="font-serif text-3xl text-[#173C68]">
{lead.name}
</h1>

<p className="mt-1 text-slate-500">
Complete Follow-up History
</p>

<div className="mt-5 flex flex-wrap gap-3">

<LeadStatusBadge
status={lead.lead_status}
/>

{lead.doctor_name&&(

<span className="inline-flex items-center gap-2 rounded-full bg-[#EDF9F0] px-4 py-2 text-sm font-medium text-[#1E7A3A]">

<Stethoscope size={15}/>

{lead.doctor_name}

</span>

)}

</div>

</div>

</div>

<div className="flex flex-col gap-3 sm:flex-row">

<button
onClick={onBack}
className="
inline-flex items-center justify-center gap-2
rounded-full
border border-[#173C68]
px-6 py-3
font-medium
text-[#173C68]
transition
hover:bg-[#173C68]
hover:text-white
"
>

<ArrowLeft size={18}/>

Back

</button>

<GradientButton
onClick={onContact}
icon={<Phone size={18}/>}
>

Contact Patient

</GradientButton>

</div>

</div>

<div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

<div className="rounded-3xl bg-[#F8F6F2] p-5">

<div className="flex items-center gap-3">

<Phone
size={18}
className="text-[#173C68]"
/>

<p className="text-sm text-slate-500">
Phone
</p>

</div>

<h3 className="mt-3 text-lg font-semibold text-[#173C68]">
{lead.phone||"-"}
</h3>

</div>

<div className="rounded-3xl bg-[#F8F6F2] p-5">

<div className="flex items-center gap-3">

<Mail
size={18}
className="text-[#173C68]"
/>

<p className="text-sm text-slate-500">
Email
</p>

</div>

<h3 className="mt-3 break-all text-[15px] font-medium text-[#173C68]">
{lead.email||"-"}
</h3>

</div>

<div className="rounded-3xl bg-[#F8F6F2] p-5">

<div className="flex items-center gap-3">

<MapPin
size={18}
className="text-[#173C68]"
/>

<p className="text-sm text-slate-500">
Location
</p>

</div>

<h3 className="mt-3 text-lg font-medium text-[#173C68]">
{lead.location||"-"}
</h3>

</div>

<div className="rounded-3xl bg-[#F8F6F2] p-5">

<div className="flex items-center gap-3">

<CalendarDays
size={18}
className="text-[#173C68]"
/>

<p className="text-sm text-slate-500">
Next Follow-up
</p>

</div>

<h3 className="mt-3 text-lg font-semibold text-[#173C68]">

{lead.followup_date
?new Date(lead.followup_date).toLocaleDateString()
:"Not Scheduled"}

</h3>

</div>

</div>

<div className="mt-8 rounded-[28px] border border-[#ECE7DD] bg-[#FCFBF9] p-6">

<div className="flex items-center gap-3">

<HeartHandshake
size={22}
className="text-[#173C68]"
/>

<h2 className="font-serif text-2xl text-[#173C68]">
Latest Discussion
</h2>

</div>

<p className="mt-5 leading-8 text-slate-600">

{lead.sales_notes||
"No discussion notes available yet."}

</p>

</div>

<div className="mt-8 flex flex-wrap gap-4">

<div className="rounded-full bg-[#173C68]/10 px-5 py-3 text-sm font-medium text-[#173C68]">

Registered :
{" "}
{lead.created_at
?new Date(lead.created_at).toLocaleDateString()
:"-"}

</div>

<div className="rounded-full bg-[#1E7A3A]/10 px-5 py-3 text-sm font-medium text-[#1E7A3A]">

Updated :
{" "}
{lead.updated_at
?new Date(lead.updated_at).toLocaleDateString()
:"-"}

</div>

{lead.assigned_at&&(

<div className="rounded-full bg-[#C6A75E]/15 px-5 py-3 text-sm font-medium text-[#A47B18]">

Assigned :
{" "}
{new Date(lead.assigned_at).toLocaleDateString()}

</div>

)}

{lead.doctor_name&&(

<div className="rounded-full bg-[#EDF9F0] px-5 py-3 text-sm font-medium text-[#1E7A3A]">

<UserCheck
size={15}
className="mr-2 inline"
/>

Doctor Assigned

</div>

)}

</div>

</div>

</motion.div>

);

}