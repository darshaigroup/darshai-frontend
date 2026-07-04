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
  const [doctors, setDoctors] = useState([]);
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

      setLeads(
        (leadData || []).filter(
          (lead) =>
            lead.lead_status === "Purchased" &&
            !lead.doctor_name
        )
      );

      setDoctors(doctorData || []);
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

      <div className="rounded-2xl border border-[#D8EAD9] bg-[#F6FCF7] p-5">
        <h3 className="text-lg font-semibold text-[#1E7A3A]">
          Ready for Doctor Assignment
        </h3>

        <p className="mt-2 text-sm text-slate-600">
          Only patients who have completed the package purchase are shown
          here. After assigning a doctor, the lead will move to
          <span className="font-semibold text-[#173C68]"> Assigned</span>.
        </p>
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search purchased patient..."
      />

      {!filteredLeads.length ? (
        <EmptyState
          title="No Purchased Patients"
          description="Patients who purchase a package will appear here for doctor assignment."
        />
      ) : (
        <div className="grid gap-8 xl:grid-cols-2">

          <div className="space-y-6">
            {filteredLeads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onView={() => setSelectedLead(lead)}
                onCall={() => window.open(`tel:${lead.phone}`)}
              />
            ))}
          </div>

          <div className="space-y-6">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
              />
            ))}
          </div>

        </div>
      )}

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