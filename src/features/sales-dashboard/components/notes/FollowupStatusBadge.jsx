import {
Clock3,
CalendarDays,
AlertTriangle,
CheckCircle2,
XCircle
} from "lucide-react";

const MAP={
Today:{
label:"Today",
icon:Clock3,
color:"bg-[#FFF7E5] text-[#C58A00] border-[#F5D67A]"
},
Upcoming:{
label:"Upcoming",
icon:CalendarDays,
color:"bg-[#EDF9F0] text-[#1E7A3A] border-[#B8E4C3]"
},
Overdue:{
label:"Overdue",
icon:AlertTriangle,
color:"bg-[#FDECEC] text-[#D64545] border-[#F6B7B7]"
},
Completed:{
label:"Completed",
icon:CheckCircle2,
color:"bg-[#EAF8EE] text-[#15803D] border-[#B8E4C3]"
},
Cancelled:{
label:"Cancelled",
icon:XCircle,
color:"bg-slate-100 text-slate-600 border-slate-200"
},
"Not Scheduled":{
label:"Not Scheduled",
icon:CalendarDays,
color:"bg-slate-100 text-slate-600 border-slate-200"
}
};

export default function FollowupStatusBadge({status="Not Scheduled"}){

const item=MAP[status]||MAP["Not Scheduled"];
const Icon=item.icon;

return(

<span
className={`
inline-flex items-center gap-2
rounded-full
border
px-4 py-2
text-xs font-semibold
${item.color}
`}
>

<Icon size={15}/>

{item.label}

</span>

);

}