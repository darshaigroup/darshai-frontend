import { useEffect, useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";

import SectionTitle from "../components/ui/SectionTitle";
import StatsCard from "../components/card/StatsCard";
import SearchBar from "../components/filters/SearchBar";
import DateFilter from "../components/filters/DateFilter";
import LeadTable from "../components/leads/LeadTable";
import Loading from "../components/common/Loading";
import EmptyState from "../components/common/EmptyState";

import { getLeads } from "../services/salesService";

export default function ClosedLeads() {
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);

  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    loadClosedLeads();
  }, []);

  async function loadClosedLeads() {
    try {
      const data = await getLeads();

      setLeads(
        (data || []).filter(
          (lead) => lead.lead_status === "Closed"
        )
      );
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

      const date = lead.created_at?.slice(0, 10);

      return (
        keyword &&
        (!from || date >= from) &&
        (!to || date <= to)
      );
    });
  }, [leads, search, from, to]);

  if (loading) return <Loading />;

  return (
    <div className="space-y-8">

      <SectionTitle
        title="Closed Leads"
        subtitle="Successfully converted wellness enquiries."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatsCard
          title="Closed Leads"
          value={filtered.length}
          icon={CheckCircle2}
          color="#1E7A3A"
        />

      </div>

      <div className="grid gap-4 lg:grid-cols-3">

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search closed leads..."
        />

        <DateFilter
          from={from}
          to={to}
          onFromChange={setFrom}
          onToChange={setTo}
        />

      </div>

      {filtered.length ? (
        <LeadTable leads={filtered} />
      ) : (
        <EmptyState
          title="No Closed Leads"
          description="Closed leads will appear here."
        />
      )}

    </div>
  );
}