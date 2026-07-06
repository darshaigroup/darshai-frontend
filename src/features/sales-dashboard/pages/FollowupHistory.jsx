import { useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";

import SectionTitle from "../components/ui/SectionTitle";
import FollowupHistoryCard from "../components/notes/FollowupHistoryCard";
import FollowupTimeline from "../components/notes/FollowupTimeline";
import Loading from "../components/common/Loading";
import EmptyState from "../components/common/EmptyState";

import {
getLeadDetails,
getFollowupHistory
} from "../services/salesService";

export default function FollowupHistory(){

const {id}=useParams();
const navigate=useNavigate();

const [loading,setLoading]=useState(true);
const [lead,setLead]=useState(null);
const [history,setHistory]=useState([]);

useEffect(()=>{
loadData();
},[id]);

async function loadData(){

try{

setLoading(true);

const [leadData,historyData]=await Promise.all([
getLeadDetails(id),
getFollowupHistory(id)
]);

setLead(leadData);

setHistory(
(historyData||[]).sort(
(a,b)=>new Date(b.created_at)-new Date(a.created_at)
)
);

}catch(err){

console.error(err);

}finally{

setLoading(false);

}

}

const goBack=()=>navigate("/sales-dashboard/followups");

const contactPatient=()=>{
navigate(`/sales-dashboard/leads/${lead.id}`);
};

if(loading) return <Loading/>;

if(!lead)
return(
<EmptyState
title="Patient Not Found"
description="Unable to load follow-up history."
/>
)
return(

<div className="space-y-8">

<SectionTitle
title="Follow-up History"
subtitle="Complete communication timeline and patient follow-up journey."
/>

<FollowupHistoryCard
lead={lead}
onBack={goBack}
onContact={contactPatient}
/>

<div className="grid gap-8 xl:grid-cols-12">

<div className="xl:col-span-8">

<FollowupTimeline
history={history}
patientName={lead.name}
/>

</div>

<div className="space-y-6 xl:col-span-4">

<div className="overflow-hidden rounded-[34px] border border-[#ECE7DD] bg-white shadow-[0_20px_60px_rgba(0,0,0,.06)]">

<div className="h-2 bg-gradient-to-r from-[#173C68] via-[#1E7A3A] to-[#C6A75E]"/>

<div className="p-6">

<h2 className="font-serif text-2xl text-[#173C68]">
Patient Summary
</h2>

<div className="mt-6 space-y-5">

<div className="flex items-center justify-between">

<span className="text-slate-500">
Current Status
</span>

<span className="rounded-full bg-[#EDF9F0] px-4 py-2 text-sm font-semibold text-[#1E7A3A]">
{lead.lead_status}
</span>

</div>

<div className="flex items-center justify-between">

<span className="text-slate-500">
Follow-ups
</span>

<span className="font-semibold text-[#173C68]">
{history.length}
</span>

</div>

<div className="flex items-center justify-between">

<span className="text-slate-500">
Next Follow-up
</span>

<span className="font-medium text-[#173C68]">

{lead.followup_date
?new Date(lead.followup_date).toLocaleDateString()
:"Not Scheduled"}

</span>

</div>

<div className="flex items-center justify-between">

<span className="text-slate-500">
Assigned Doctor
</span>

<span className="font-medium text-[#173C68]">

{lead.doctor_name||"Not Assigned"}

</span>

</div>

<div className="flex items-center justify-between">

<span className="text-slate-500">
Registered
</span>

<span className="font-medium text-[#173C68]">

{lead.created_at
?new Date(lead.created_at).toLocaleDateString()
:"-"}

</span>

</div>

</div>

</div>

</div>

<div className="overflow-hidden rounded-[34px] border border-[#ECE7DD] bg-white shadow-[0_20px_60px_rgba(0,0,0,.06)]">

<div className="h-2 bg-gradient-to-r from-[#1E7A3A] via-[#173C68] to-[#C6A75E]"/>

<div className="p-6">

<h2 className="font-serif text-2xl text-[#173C68]">
Latest Remark
</h2>

<div className="mt-5 rounded-3xl bg-[#F8F6F2] p-5">

<p className="leading-8 text-slate-600">

{history.length
?history[0].remark||history[0].sales_notes||"No remarks available."
:"No follow-up remarks available."}

</p>

</div>

</div>

</div>

<div className="overflow-hidden rounded-[34px] border border-[#ECE7DD] bg-white shadow-[0_20px_60px_rgba(0,0,0,.06)]">

<div className="h-2 bg-gradient-to-r from-[#C6A75E] via-[#173C68] to-[#1E7A3A]"/>

<div className="p-6">

<h2 className="font-serif text-2xl text-[#173C68]">
Quick Actions
</h2>

<div className="mt-6 space-y-4">

<button
onClick={contactPatient}
className="
w-full
rounded-full
bg-[#173C68]
py-3
font-medium
text-white
transition
hover:bg-[#1E7A3A]
"
>

Contact Patient

</button>

<button
onClick={goBack}
className="
w-full
rounded-full
border border-[#173C68]
py-3
font-medium
text-[#173C68]
transition
hover:bg-[#173C68]
hover:text-white
"
>

Back to Follow-ups

</button>

</div>

</div>

</div>

</div>

</div>

</div>

);

}