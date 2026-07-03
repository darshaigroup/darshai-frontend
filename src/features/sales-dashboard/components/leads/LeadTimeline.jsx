import { motion } from "framer-motion";
import {
  CalendarDays,
  User,
  Mail,
  ClipboardList,
} from "lucide-react";

export default function LeadTimeline({ lead }) {
  if (!lead) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[32px] border border-[#ECE7DD] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,.06)]"
    >
      <div className="mb-8">
        <h2 className="font-serif text-3xl text-[#173C68]">
          Lead Summary
        </h2>

        <p className="mt-2 text-slate-500">
          Latest information received from the patient.
        </p>
      </div>

      <div className="space-y-6">

        <div className="flex items-start gap-4">
          <User className="mt-1 text-[#1E7A3A]" size={18} />

          <div>
            <p className="text-sm text-slate-500">
              Registered User
            </p>

            <h4 className="font-semibold text-[#173C68]">
              {lead.user_name || "-"}
            </h4>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Mail className="mt-1 text-[#1E7A3A]" size={18} />

          <div>
            <p className="text-sm text-slate-500">
              User Email
            </p>

            <h4 className="font-semibold text-[#173C68]">
              {lead.user_email || "-"}
            </h4>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <CalendarDays
            className="mt-1 text-[#1E7A3A]"
            size={18}
          />

          <div>
            <p className="text-sm text-slate-500">
              Lifestyle Assessment
            </p>

            <h4 className="font-semibold text-[#173C68]">
              {lead.lifestyle_completed
                ? new Date(
                    lead.lifestyle_completed
                  ).toLocaleDateString()
                : "Not Completed"}
            </h4>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <ClipboardList
            className="mt-1 text-[#1E7A3A]"
            size={18}
          />

          <div>
            <p className="text-sm text-slate-500">
              Assessment Data
            </p>

            <h4 className="font-semibold text-[#173C68]">
              {lead.matrix_answers
                ? "Available"
                : "Not Submitted"}
            </h4>
          </div>
        </div>

      </div>
    </motion.div>
  );
}