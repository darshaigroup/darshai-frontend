import {
  Phone,
  Mail,
  MapPin,
  CalendarClock,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

export default function LeadCard({ lead, onView }) {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="rounded-[28px] border border-[#ECE7DD] bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-[#173C68]">
            {lead.name}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {lead.occupation || "Client"}
          </p>
        </div>

        <span className="rounded-full bg-[#EDF9F0] px-3 py-1 text-xs font-semibold text-[#1E7A3A]">
          {lead.lead_status || lead.status}
        </span>
      </div>

      {/* Client ID */}
      <div className="mt-5 rounded-2xl border border-[#ECE7DD] bg-[#F8F6F2] px-4 py-3">
        <p className="text-xs font-medium text-slate-500">Client ID</p>
        <p className="mt-1 font-semibold text-[#173C68] break-all">
          {lead.client_id || "-"}
        </p>
      </div>

      <div className="mt-5 space-y-3 text-sm text-slate-600">
        <div className="flex items-center gap-3">
          <Mail size={16} className="text-[#1E7A3A]" />
          <span>{lead.email}</span>
        </div>

        <div className="flex items-center gap-3">
          <Phone size={16} className="text-[#1E7A3A]" />
          <span>{lead.phone}</span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin size={16} className="text-[#1E7A3A]" />
          <span>{lead.location || "-"}</span>
        </div>

        <div className="flex items-center gap-3">
          <CalendarClock size={16} className="text-[#1E7A3A]" />
          <span>
            {lead.followup_date || lead.follow_up || "No follow-up scheduled"}
          </span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          onClick={() => setShowContact(!showContact)}
          className="rounded-full border border-[#173C68] px-4 py-2 text-sm font-medium text-[#173C68] transition hover:bg-[#173C68] hover:text-white"
        >
          {showContact ? "Hide Contact" : "Contact"}
        </button>

        <button
          onClick={() => onView?.(lead)}
          className="flex items-center gap-2 rounded-full bg-[#173C68] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#1E7A3A]"
        >
          View
          <ArrowRight size={16} />
        </button>
      </div>

      {showContact && (
        <div className="mt-4 rounded-2xl bg-[#F8F6F2] p-4 text-sm text-slate-600">
          <p>
            <strong>Email:</strong> {lead.email}
          </p>
          <p className="mt-1">
            <strong>Phone:</strong> {lead.phone}
          </p>
        </div>
      )}
    </div>
  );
}