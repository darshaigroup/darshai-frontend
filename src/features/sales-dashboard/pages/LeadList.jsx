import { useEffect, useMemo, useState } from "react";

import SectionTitle from "../components/ui/SectionTitle";
import SearchBar from "../components/filters/SearchBar";
import StatusFilter from "../components/filters/StatusFilter";
import DateFilter from "../components/filters/DateFilter";
import LeadTable from "../components/leads/LeadTable";
import AssignDoctorModal from "../components/leads/AssignDoctorModal";
import Loading from "../components/common/Loading";
import EmptyState from "../components/common/EmptyState";
import { getLeads } from "../services/salesService";

export default function LeadList() {
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    try {
      const data = await getLeads();
      setLeads(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    return leads.filter((lead) => {
      const keyword =
        lead.name?.toLowerCase().includes(search.toLowerCase()) ||
        lead.email?.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone?.includes(search);

      const statusMatch =
        status === "All" || lead.lead_status === status;

      const created = lead.created_at?.slice(0, 10);

      const fromMatch = !from || created >= from;
      const toMatch = !to || created <= to;

      return keyword && statusMatch && fromMatch && toMatch;
    });
  }, [leads, search, status, from, to]);

  if (loading) return <Loading />;

  return (
    <div className="space-y-8">

      <SectionTitle
        title="Lead Management"
        subtitle="Manage and assign wellness enquiries."
      />

      <div className="grid gap-4 lg:grid-cols-4">

        <div className="lg:col-span-2">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search leads..."
          />
        </div>

        <StatusFilter
          value={status}
          onChange={setStatus}
        />

        <DateFilter
          from={from}
          to={to}
          onFromChange={setFrom}
          onToChange={setTo}
        />

      </div>

      {filtered.length ? (
        <LeadTable
          leads={filtered}
          onAssign={setSelectedLead}
        />
      ) : (
        <EmptyState
          title="No Leads Found"
          description="No leads match the selected filters."
        />
      )}

      <AssignDoctorModal
        open={!!selectedLead}
        leadId={selectedLead?.id}
        onClose={() => setSelectedLead(null)}
        onAssigned={() => {
          setSelectedLead(null);
          loadLeads();
        }}
      />

    </div>
  );
}