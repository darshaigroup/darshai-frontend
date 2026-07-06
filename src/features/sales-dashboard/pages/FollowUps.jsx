import { useEffect,useMemo,useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarClock,CalendarDays,Clock3,AlertTriangle } from "lucide-react";

import SectionTitle from "../components/ui/SectionTitle";
import SearchBar from "../components/filters/SearchBar";
import DateFilter from "../components/filters/DateFilter";
import FollowupPatientCard from "../components/notes/FollowupPatientCard";
import Loading from "../components/common/Loading";
import EmptyState from "../components/common/EmptyState";

import { getLeads,searchLeads } from "../services/salesService";

export default function FollowUps(){

const navigate=useNavigate();

const [loading,setLoading]=useState(true);
const [leads,setLeads]=useState([]);
const [search,setSearch]=useState("");
const [from,setFrom]=useState("");
const [to,setTo]=useState("");

useEffect(()=>{
  loadFollowups();
},[]);

useEffect(()=>{

  const timer=setTimeout(()=>{

    loadFollowups(search);

  },300);

  return()=>clearTimeout(timer);

},[search]);

async function loadFollowups(keyword = "") {
  try {
    const data = keyword.trim()
      ? await searchLeads(keyword)
      : await getLeads();

      console.log("Search API:", data);

    const list = (data || []).sort(
  (a,b)=>
    new Date(a.followup_date || "9999-12-31") -
    new Date(b.followup_date || "9999-12-31")
);

setLeads(list);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}

const filtered = useMemo(() => {
  return leads.filter(lead => {
    const date = lead.followup_date?.slice(0, 10);

    return (
      (!from || date >= from) &&
      (!to || date <= to)
    );
  });
}, [leads, from, to]);

const today=new Date().toISOString().split("T")[0];

const todayList=filtered.filter(
l=>l.followup_date?.slice(0,10)===today
);

const upcomingList=filtered.filter(
l=>l.followup_date?.slice(0,10)>today
);

const overdueList=filtered.filter(
l=>l.followup_date?.slice(0,10)<today
);

const openHistory=id=>{
navigate(`/sales-dashboard/followups/${id}`);
};

const contactPatient=id=>{
navigate(`/sales-dashboard/leads/${id}`);
};

if(loading) return <Loading/>;

// if(!filtered.length)
// return(
// <EmptyState
// title="No Follow-ups"
// description="No scheduled follow-ups available."
// />
// )
return(
<div className="space-y-8">

<SectionTitle
title="Follow-up Management"
subtitle="Track, review and manage all scheduled patient follow-ups."
/>

<div className="grid gap-4 lg:grid-cols-4">

<div className="lg:col-span-2">
<SearchBar
value={search}
onChange={setSearch}
onSearch={()=>loadFollowups(search)}
placeholder="Search patient, email or phone..."
/>
</div>

<DateFilter
from={from}
to={to}
onFromChange={setFrom}
onToChange={setTo}
/>
{!filtered.length&&(
  <div className="lg:col-span-4">
    <EmptyState
      title="No Follow-ups"
      description={
        search
          ? "No patients match your search."
          : "No scheduled follow-ups available."
      }
    />
  </div>
)}
</div>

{!!filtered.length&&(
<>

<div className="grid gap-5 md:grid-cols-3">

<div className="rounded-[28px] border border-[#ECE7DD] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,.06)]">

<div className="flex items-center justify-between">

<div>

<p className="text-sm text-slate-500">
Today's Follow-ups
</p>

<h2 className="mt-2 text-4xl font-bold text-[#173C68]">
{todayList.length}
</h2>

</div>

<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#173C68]/10">
<CalendarDays className="text-[#173C68]"/>
</div>

</div>

</div>

<div className="rounded-[28px] border border-[#ECE7DD] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,.06)]">

<div className="flex items-center justify-between">

<div>

<p className="text-sm text-slate-500">
Upcoming
</p>

<h2 className="mt-2 text-4xl font-bold text-[#1E7A3A]">
{upcomingList.length}
</h2>

</div>

<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1E7A3A]/10">
<Clock3 className="text-[#1E7A3A]"/>
</div>

</div>

</div>

<div className="rounded-[28px] border border-[#ECE7DD] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,.06)]">

<div className="flex items-center justify-between">

<div>

<p className="text-sm text-slate-500">
Overdue
</p>

<h2 className="mt-2 text-4xl font-bold text-red-500">
{overdueList.length}
</h2>

</div>

<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
<AlertTriangle className="text-red-500"/>
</div>

</div>

</div>

</div>

{!!todayList.length&&(
<div className="space-y-5">

<div className="flex items-center gap-3">

<div className="h-10 w-1 rounded-full bg-[#173C68]"/>

<h2 className="font-serif text-3xl text-[#173C68]">
Today's Follow-ups
</h2>

</div>

<div className="grid gap-6 xl:grid-cols-2">

{todayList.map(lead=>(
<FollowupPatientCard
key={lead.id}
lead={lead}
onView={()=>openHistory(lead.id)}
onContact={()=>contactPatient(lead.id)}
/>
))}

</div>

</div>
)}

{!!upcomingList.length&&(
<div className="space-y-5">

<div className="flex items-center gap-3">

<div className="h-10 w-1 rounded-full bg-[#1E7A3A]"/>

<h2 className="font-serif text-3xl text-[#173C68]">
Upcoming Follow-ups
</h2>

</div>

<div className="grid gap-6 xl:grid-cols-2">

{upcomingList.map(lead=>(
<FollowupPatientCard
key={lead.id}
lead={lead}
onView={()=>openHistory(lead.id)}
onContact={()=>contactPatient(lead.id)}
/>
))}

</div>

</div>
)}

{!!overdueList.length&&(
<div className="space-y-5">

<div className="flex items-center gap-3">

<div className="h-10 w-1 rounded-full bg-red-500"/>

<h2 className="font-serif text-3xl text-[#173C68]">
Overdue Follow-ups
</h2>

</div>

<div className="grid gap-6 xl:grid-cols-2">

{overdueList.map(lead=>(
<FollowupPatientCard
key={lead.id}
lead={lead}
onView={()=>openHistory(lead.id)}
onContact={()=>contactPatient(lead.id)}
/>
))}

</div>

</div>
)}
</>
)}
</div>
);

}