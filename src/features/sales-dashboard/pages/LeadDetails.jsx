import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import SectionTitle from "../components/ui/SectionTitle";
import LeadCard from "../components/card/LeadCard";
import FollowupCard from "../components/notes/FollowupCard";
import NotesEditor from "../components/notes/NotesEditor";
import AssignDoctorModal from "../components/leads/AssignDoctorModal";
import Loading from "../components/common/Loading";
import EmptyState from "../components/common/EmptyState";

import { getLeadDetails,updateLeadStatus, getFollowupHistory } from "../services/salesService";

export default function LeadDetails() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [lead, setLead] = useState(null);
  const [followupHistory, setFollowupHistory] = useState([]);
  const [assignOpen, setAssignOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
const [nextStatus, setNextStatus] = useState("");
const [confirmTitle, setConfirmTitle] = useState("");
const [confirmMessage, setConfirmMessage] = useState("");

  useEffect(() => {
    loadLead();
  }, [id]);

  async function loadLead() {
    try {
     const [leadData, historyData] = await Promise.all([
  getLeadDetails(id),
  getFollowupHistory(id),
]);

setLead(leadData);
setFollowupHistory(historyData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function changeStatus() {
  try {
    await updateLeadStatus(lead.id, nextStatus);
    setConfirmOpen(false);
    loadLead();
  } catch (err) {
    console.error(err);
  }
}

function openConfirmation(status) {
  setNextStatus(status);

  switch (status) {
    case "Contacted":
      setConfirmTitle("Mark as Contacted");
      setConfirmMessage(
        "Confirm that the sales team has contacted this patient."
      );
      break;

    case "Interested":
      setConfirmTitle("Mark as Interested");
      setConfirmMessage(
        "Confirm that the patient is interested in the wellness package."
      );
      break;

    case "Purchased":
      setConfirmTitle("Package Purchased");
      setConfirmMessage(
        "Confirm that the patient has successfully purchased the package."
      );
      break;

    case "Closed":
      setConfirmTitle("Close Lead");
      setConfirmMessage(
        "This sale has been completed successfully."
      );
      break;

    case "Not Interested":
      setConfirmTitle("Mark as Not Interested");
      setConfirmMessage(
        "The patient is not interested. This lead will be moved to Closed (Lost Opportunity)."
      );
      break;

    default:
      break;
  }

  setConfirmOpen(true);
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
      onView={() => {
        if (lead.lead_status === "Purchased") {
          setAssignOpen(true);
        }
      }}
    />

    {/* Sales Workflow */}
    <div className="rounded-[32px] border border-[#ECE7DD] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,.06)]">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-serif text-2xl text-[#173C68]">
            Sales Workflow
          </h2>

          <p className="mt-1 text-slate-500">
            Current Status :
            <span className="ml-2 rounded-full bg-[#EDF9F0] px-3 py-1 font-semibold text-[#1E7A3A]">
              {lead.lead_status}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap gap-3">

  {lead.lead_status === "Lead" && (
    <button
      onClick={() => openConfirmation("Contacted")}
      className="rounded-full bg-[#173C68] px-6 py-3 text-white hover:bg-[#1E7A3A]"
    >
      Mark Contacted
    </button>
  )}

  {lead.lead_status === "Contacted" && (
    <>
      <button
        onClick={() => openConfirmation("Interested")}
        className="rounded-full bg-[#173C68] px-6 py-3 text-white hover:bg-[#1E7A3A]"
      >
        Mark Interested
      </button>

      <button
        onClick={() => openConfirmation("Not Interested")}
        className="rounded-full bg-red-500 px-6 py-3 text-white hover:bg-red-600"
      >
        Not Interested
      </button>
    </>
  )}

  {lead.lead_status === "Interested" && (
    <button
      onClick={() => openConfirmation("Purchased")}
      className="rounded-full bg-[#C6A75E] px-6 py-3 text-white hover:bg-[#b99646]"
    >
      Package Purchased
    </button>
  )}

  {lead.lead_status === "Purchased" && (
    <button
      onClick={() => setAssignOpen(true)}
      className="rounded-full bg-[#1E7A3A] px-6 py-3 text-white hover:bg-[#16612f]"
    >
      Assign Doctor
    </button>
  )}

  {lead.lead_status === "Assigned" && (
    <button
      onClick={() => openConfirmation("Closed")}
      className="rounded-full bg-[#173C68] px-6 py-3 text-white hover:bg-[#1E7A3A]"
    >
      Close Sale
    </button>
  )}

  {lead.lead_status === "Closed" && (
    <div className="rounded-full bg-[#EDF9F0] px-6 py-3 font-semibold text-[#1E7A3A]">
      ✓ Lead Closed
    </div>
  )}

  {lead.lead_status === "Not Interested" && (
    <div className="rounded-full bg-red-50 px-6 py-3 font-semibold text-red-600">
      Lost Opportunity
    </div>
  )}

</div>
      </div>

      {/* Progress */}
      <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
        {[
          "Lead",
          "Contacted",
          "Interested",
          "Purchased",
          "Assigned",
        ].map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`rounded-full px-4 py-2 font-medium ${
                lead.lead_status === step
                  ? "bg-[#1E7A3A] text-white"
                  : "bg-[#F5F5F5] text-slate-500"
              }`}
            >
              {step}
            </div>

            {index !== 4 && (
              <div className="mx-2 h-[2px] w-8 bg-[#D8D8D8]" />
            )}
          </div>
        ))}
      </div>
    </div>

    <div className="grid gap-8 xl:grid-cols-2">
      <FollowupCard
  leadId={lead.id}
  initialDate={lead.followup_date}
  initialRemark={lead.sales_notes || ""}
  history={followupHistory}
  onSaved={loadLead}
/>

      <NotesEditor
        leadId={lead.id}
        initialNotes={lead.sales_notes || ""}
        onSaved={loadLead}
      />
    </div>
     <AnimatePresence>
  {confirmOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-2xl"
      >
        <h2 className="text-3xl font-serif text-center text-[#173C68]">
  {confirmTitle}
</h2>

       <p className="mt-5 text-center leading-7 text-slate-600">
  {confirmMessage}
</p>

        {nextStatus === "Purchased" && (
          <p className="mt-3 text-center text-sm text-[#C58A00] font-medium">
            This confirms that the client has purchased the package.
          </p>
        )}

        <p className="mt-3 text-center text-sm text-red-500 font-medium">
          Once confirmed, this action cannot be undone.
        </p>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => setConfirmOpen(false)}
            className="flex-1 rounded-full border border-slate-300 py-3 hover:border-[#173C68]"
          >
            Cancel
          </button>

          <button
            onClick={changeStatus}
            className="flex-1 rounded-full bg-[#1E7A3A] py-3 text-white hover:bg-[#16612f]"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
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