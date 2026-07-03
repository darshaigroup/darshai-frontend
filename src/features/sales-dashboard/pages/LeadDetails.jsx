import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SectionTitle from "../components/ui/SectionTitle";
import LeadCard from "../components/card/LeadCard";
import FollowupCard from "../components/notes/FollowupCard";
import NotesEditor from "../components/notes/NotesEditor";
import AssignDoctorModal from "../components/leads/AssignDoctorModal";
import Loading from "../components/common/Loading";
import EmptyState from "../components/common/EmptyState";

import { getLeadDetails } from "../services/salesService";

export default function LeadDetails() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [lead, setLead] = useState(null);
  const [assignOpen, setAssignOpen] = useState(false);

  useEffect(() => {
    loadLead();
  }, [id]);

  async function loadLead() {
    try {
      const data = await getLeadDetails(id);
      setLead(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading />;

  if (!lead)
    return (
      <EmptyState
        title="Lead Not Found"
        description="Unable to load the selected lead."
      />
    );

  return (
    <div className="space-y-8">

      <SectionTitle
        title={lead.name}
        subtitle="Patient profile and sales information."
      />

      <LeadCard
        lead={lead}
        onCall={() => window.open(`tel:${lead.phone}`)}
        onView={() => setAssignOpen(true)}
      />

      <div className="grid gap-8 xl:grid-cols-2">

        <FollowupCard
          leadId={lead.id}
          initialDate={lead.followup_date}
          initialRemark={lead.sales_notes || ""}
          onSaved={loadLead}
        />

        <NotesEditor
          leadId={lead.id}
          initialNotes={lead.sales_notes || ""}
          onSaved={loadLead}
        />

      </div>

      <AssignDoctorModal
        open={assignOpen}
        leadId={lead.id}
        onClose={() => setAssignOpen(false)}
        onAssigned={() => {
          setAssignOpen(false);
          loadLead();
        }}
      />

    </div>
  );
}