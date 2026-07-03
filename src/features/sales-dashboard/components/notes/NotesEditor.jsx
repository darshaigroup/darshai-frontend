import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Save,
  FileText,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import GradientButton from "../ui/GradientButton";
import { updateSalesNotes } from "../../services/salesService";

export default function NotesEditor({
  leadId,
  initialNotes = "",
  onSaved,
}) {
  const [notes, setNotes] = useState(initialNotes);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setNotes(initialNotes);
  }, [initialNotes]);

  const handleSave = async () => {
    if (loading) return;

    try {
      setLoading(true);
      setSaved(false);

      await updateSalesNotes(leadId, notes);

      setSaved(true);

      onSaved?.();

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (err) {
      alert(err.message || "Unable to save notes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[32px] border border-[#ECE7DD] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,.06)] md:p-8"
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#173C68]/10">
            <FileText size={20} className="text-[#173C68]" />
          </div>

          <div>
            <h2 className="font-serif text-2xl text-[#173C68]">
              Sales Notes
            </h2>

            <p className="text-sm text-slate-500">
              Internal notes visible only to the sales team.
            </p>
          </div>
        </div>

        {saved && (
          <div className="flex items-center gap-2 font-medium text-[#1E7A3A]">
            <CheckCircle2 size={18} />
            Saved
          </div>
        )}
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={10}
        placeholder="Write discussion summary, objections, budget, follow-up details..."
        className="w-full resize-none rounded-[24px] border border-[#E8E3DA] bg-[#FCFBF9] p-5 text-[15px] leading-7 outline-none focus:border-[#1E7A3A] focus:ring-4 focus:ring-[#1E7A3A]/10"
      />

      <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="text-sm text-slate-400">
          {notes.length} Characters
        </span>

        <GradientButton
          onClick={handleSave}
          disabled={loading}
          icon={
            loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )
          }
        >
          {loading ? "Saving..." : "Save Notes"}
        </GradientButton>
      </div>
    </motion.div>
  );
}