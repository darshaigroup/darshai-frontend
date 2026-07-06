import {
  Clock3,
  Phone,
 HeartHandshake,
  ShoppingBag,
  UserCheck,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const STATUS_MAP = {
  lead: {
    label: "Lead",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: Clock3,
  },

  contacted: {
    label: "Contacted",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Phone,
  },

  interested: {
    label: "Interested",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: HeartHandshake,
  },

  purchased: {
    label: "Purchased",
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
    icon: ShoppingBag,
  },

  assigned: {
    label: "Assigned",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    icon: UserCheck,
  },

  closed: {
    label: "Closed",
    color: "bg-[#EDF9F0] text-[#1E7A3A] border-[#CDE8D3]",
    icon: CheckCircle2,
  },

  "not interested": {
    label: "Not Interested",
    color: "bg-red-50 text-red-700 border-red-200",
    icon: XCircle,
  },
};

export default function LeadStatusBadge({ status }) {
  const key = (status || "Lead").toLowerCase();
  const item = STATUS_MAP[key] || STATUS_MAP.lead;
  const Icon = item.icon;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${item.color}`}
    >
      <Icon size={14} />
      {item.label}
    </span>
  );
}