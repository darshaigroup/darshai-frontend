import { useEffect, useMemo, useState } from "react";

import SectionTitle from "../components/ui/SectionTitle";
import SearchBar from "../components/filters/SearchBar";
import LeadCard from "../components/card/LeadCard";
import DoctorCard from "../components/card/DoctorCard";
import AssignDoctorModal from "../components/leads/AssignDoctorModal";
import Loading from "../components/common/Loading";
import EmptyState from "../components/common/EmptyState";

import {
  getLeads,
  getDoctors,
} from "../services/salesService";

export default function AssignDoctor() {
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);
  const [doctors,setDoctors]=useState([]);
  const [waitingCount,setWaitingCount]=useState(0);
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [leadData, doctorData] = await Promise.all([
        getLeads(),
        getDoctors(),
      ]);

 const waiting=(leadData||[]).filter(
  lead=>
    lead.lead_status==="Purchased" &&
    !lead.doctor_id
);

setLeads(waiting);
setWaitingCount(waiting.length);
setDoctors(doctorData||[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredLeads = useMemo(() => {
    return leads.filter(
      (lead) =>
        lead.name?.toLowerCase().includes(search.toLowerCase()) ||
        lead.email?.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone?.includes(search)
    );
  }, [search, leads]);

  if (loading) return <Loading />;

return (
  <div className="space-y-8">
    <SectionTitle
      title="Assign Doctor"
      subtitle="Assign doctors only after the wellness package has been purchased."
    />

    <div className="grid gap-6 lg:grid-cols-2">
  <div className="rounded-[30px] border border-[#DCE9DD] bg-gradient-to-br from-[#F8FCF8] to-white p-8 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-500">
          Available Doctors
        </p>

        <h2 className="mt-3 text-5xl font-bold text-[#173C68]">
          {doctors.length}
        </h2>

        <p className="mt-2 text-[#1E7A3A]">
          Ready for Assignment
        </p>
      </div>

      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EDF9F0] text-4xl">
        👨‍⚕️
      </div>
    </div>
  </div>

  <div className="rounded-[30px] border border-[#F0DFC8] bg-gradient-to-br from-[#FFFDF7] to-white p-8 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-500">
          Waiting Patients
        </p>

        <h2 className="mt-3 text-5xl font-bold text-[#173C68]">
          {waitingCount}
        </h2>

        <p className="mt-2 text-[#C58A00]">
          Purchased • Pending Assignment
        </p>
      </div>

      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF5DF] text-4xl">
        ⏳
      </div>
    </div>
  </div>
</div>

    <div className="rounded-[32px] border border-[#ECE7DD] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,.05)]">
  <div className="mb-8 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
    <div className="max-w-xl">
      <h2 className="font-serif text-3xl text-[#173C68]">
        Patients Waiting to Assign a Doctor
      </h2>

      <p className="mt-3 text-slate-500">
        Purchased patients who are waiting to be assigned to an Ayurveda
        specialist.
      </p>
    </div>

    <div className="w-full xl:w-[420px]">
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search patient..."
      />
    </div>
  </div>

  {!filteredLeads.length ? (
    <EmptyState
      title="No Purchased Patients"
      description="Patients who purchase a package will appear here for doctor assignment."
    />
  ) : (
    <div className="grid gap-8 xl:grid-cols-2 2xl:grid-cols-2">
      {filteredLeads.map(lead => (
        <LeadCard
          key={lead.id}
          lead={lead}
          onView={() => setSelectedLead(lead)}
          onCall={() => window.open(`tel:${lead.phone}`)}
        />
      ))}
    </div>
  )}
</div>

    <AssignDoctorModal
      open={!!selectedLead}
      leadId={selectedLead?.id}
      onClose={() => setSelectedLead(null)}
      onAssigned={() => {
        setSelectedLead(null);
        loadData();
      }}
    />
  </div>
);
}