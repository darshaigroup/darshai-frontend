import { useEffect, useMemo, useState } from "react";

import SectionTitle from "../components/ui/SectionTitle";
import SearchBar from "../components/filters/SearchBar";
import DateFilter from "../components/filters/DateFilter";
import LeadCard from "../components/card/LeadCard";
import FollowupCard from "../components/notes/FollowupCard";
import Loading from "../components/common/Loading";
import EmptyState from "../components/common/EmptyState";

import { getLeads } from "../services/salesService";

export default function FollowUps() {
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);

  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadFollowups();
  }, []);

  async function loadFollowups() {
    try {
      const data = await getLeads();

      setLeads(
        (data || []).filter(
          (lead) => lead.followup_date
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

      const date = lead.followup_date?.slice(0, 10);

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
        title="Follow-ups"
        subtitle="Track and manage scheduled patient follow-ups."
      />

      <div className="grid gap-4 lg:grid-cols-3">

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search patient..."
        />

        <DateFilter
          from={from}
          to={to}
          onFromChange={setFrom}
          onToChange={setTo}
        />

      </div>

      {filtered.length ? (
        <div className="grid gap-6 xl:grid-cols-2">

          {filtered.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onView={() => setSelected(lead)}
              onCall={() => window.open(`tel:${lead.phone}`)}
            />
          ))}

        </div>
      ) : (
        <EmptyState
          title="No Follow-ups"
          description="No scheduled follow-ups found."
        />
      )}

      {selected && (
        <FollowupCard
          leadId={selected.id}
          initialDate={selected.followup_date}
          initialRemark=""
          onSaved={() => {
            setSelected(null);
            loadFollowups();
          }}
        />
      )}

    </div>
  );
}