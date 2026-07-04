import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import GradientButton from "../ui/GradientButton";
import { updateFollowup } from "../../services/salesService";

export default function FollowupCard({
  leadId,
  initialDate = "",
  initialRemark = "",
  onSaved,
}) {
  const [date, setDate] = useState(initialDate);
  const [remark, setRemark] = useState(initialRemark);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDate(initialDate);
    setRemark(initialRemark);
  }, [initialDate, initialRemark]);

  const handleSave = async () => {
    if (!date) {
      alert("Please select a follow-up date.");
      return;
    }

    try {
      setLoading(true);
      setSaved(false);

      await updateFollowup(leadId, date);

      setSaved(true);

      onSaved?.();

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (err) {
      alert(err.message || "Unable to schedule follow-up.");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const status =
    !date
      ? "Not Scheduled"
      : date < today
      ? "Overdue"
      : date === today
      ? "Today"
      : "Upcoming";

  const statusColor = {
    "Not Scheduled": "bg-slate-100 text-slate-600",
    Today: "bg-[#FFF7E5] text-[#C58A00]",
    Upcoming: "bg-[#EDF9F0] text-[#1E7A3A]",
    Overdue: "bg-[#FDECEC] text-[#D64545]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[32px] border border-[#ECE7DD] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,.06)] md:p-8"
    >
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-serif text-2xl text-[#173C68]">
            Follow-up Planner
          </h2>

          <p className="mt-2 text-slate-500">
            Schedule the next discussion with the client.
          </p>
        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${statusColor[status]}`}
        >
          {status}
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#173C68]">
            Follow-up Date
          </label>

          <div className="relative">
            <CalendarDays
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-12 w-full rounded-full border border-[#E8E3DA] bg-[#FCFBF9] pl-11 pr-4 outline-none focus:border-[#1E7A3A] focus:ring-4 focus:ring-[#1E7A3A]/10"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#173C68]">
            Reminder
          </label>

          <div className="flex h-12 items-center gap-3 rounded-full border border-[#E8E3DA] bg-[#FCFBF9] px-5">
            <Clock3 size={18} className="text-slate-400" />

            <span className="text-sm text-slate-600">
              {date || "No reminder scheduled"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <label className="mb-2 block text-sm font-medium text-[#173C68]">
          Follow-up Remarks
        </label>

        <textarea
          rows={5}
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="Example: Client wants to discuss the package with family before confirming..."
          className="w-full resize-none rounded-[24px] border border-[#E8E3DA] bg-[#FCFBF9] p-5 outline-none focus:border-[#1E7A3A] focus:ring-4 focus:ring-[#1E7A3A]/10"
        />
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
        {saved ? (
          <div className="flex items-center gap-2 text-[#1E7A3A]">
            <CheckCircle2 size={18} />

            <span className="font-medium">
              Follow-up Scheduled Successfully
            </span>
          </div>
        ) : (
          <div className="text-sm text-slate-500">
            Keep the patient engaged with timely follow-ups.
          </div>
        )}

        <GradientButton
          onClick={handleSave}
          disabled={loading}
          icon={
            loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <CalendarDays size={18} />
            )
          }
        >
          {loading ? "Saving..." : "Save Follow-up"}
        </GradientButton>
      </div>
    </motion.div>
  );
}