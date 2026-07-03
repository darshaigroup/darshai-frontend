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
          (lead) => lead.lead_status !== "Assigned"
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
        lead.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, leads]);

  if (loading) return <Loading />;

  return (
    <div className="space-y-8">

      <SectionTitle
        title="Assign Doctor"
        subtitle="Assign qualified wellness experts to new leads."
      />

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search patient..."
      />

      {!filteredLeads.length ? (
        <EmptyState
          title="No Pending Assignments"
          description="All eligible leads have already been assigned."
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