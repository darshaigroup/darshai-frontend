import { motion } from "framer-motion";
import { ClipboardCheck, FileText, Stethoscope, UserRound } from "lucide-react";
import NoteCard from "./NoteCard";

export default function DoctorNotes({ doctor = {} }) {
  const {
    
    primary_diagnosis,
    secondary_contributors,
    priority_intervention,
    protocol_tier,
    follow_up_timeline,
    root_cause,
    recommendations,
    ai_summary,
    doctor_notes,
    observations,
    diagnosis,
    treatment_plan,
    precautions,
    follow_up,
    medications,
    additional_notes,
  } = doctor;

  const notes = [
   
    { title: "Primary Diagnosis", value: primary_diagnosis, icon: Stethoscope, color: "emerald" },
    { title: "Secondary Contributors", value: secondary_contributors, icon: FileText, color: "amber" },
    { title: "Priority Intervention", value: priority_intervention, icon: ClipboardCheck, color: "rose" },
    { title: "Protocol Tier", value: protocol_tier, icon: UserRound, color: "blue" },
    { title: "Follow-up Timeline", value: follow_up_timeline, icon: ClipboardCheck, color: "emerald" },
    { title: "Root Cause", value: root_cause, icon: FileText, color: "amber" },

    { title: "AI Health Summary", value: ai_summary, icon: ClipboardCheck, color: "blue" },
    { title: "Doctor Observation", value: observations, icon: Stethoscope, color: "emerald" },
    { title: "Diagnosis", value: diagnosis, icon: FileText, color: "amber" },
    { title: "Treatment Plan", value: treatment_plan, icon: ClipboardCheck, color: "blue" },
    { title: "Recommendations", value: recommendations, icon: UserRound, color: "emerald" },
    { title: "Medications", value: medications, icon: Stethoscope, color: "rose" },
    { title: "Precautions", value: precautions, icon: FileText, color: "amber" },
    { title: "Follow-up", value: follow_up, icon: ClipboardCheck, color: "blue" },
    { title: "Doctor Notes", value: doctor_notes, icon: Stethoscope, color: "emerald" },
    { title: "Additional Notes", value: additional_notes, icon: FileText, color: "slate" },
  ].filter(({ value }) => value !== undefined && value !== null && value !== "");

  if (!notes.length)
    return (
      <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
          <ClipboardCheck className="mx-auto h-14 w-14 text-slate-300" />
          <h3 className="mt-4 text-xl font-semibold text-slate-700">Doctor Notes</h3>
          <p className="mt-2 text-sm text-slate-500">No clinical notes or recommendations are available for this assessment.</p>
        </div>
      </motion.section>
    );

  return (
    <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Doctor Notes & Recommendations</h2>
        <p className="mt-1 text-sm text-slate-500">Clinical observations, AI insights and personalized recommendations.</p>
      </div>

      <div className="grid gap-5">
        {notes.map(note => <NoteCard key={note.title} {...note} />)}
      </div>
    </motion.section>
  );
}