import { Eye, Phone, Mail, CalendarDays, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LifestyleModal from "../common/LifestyleModel";
import LeadStatusBadge from "./LeadStatusBadge";

export default function LeadTable({ leads = [] }) {
  const navigate = useNavigate();
  const [openLifestyle, setOpenLifestyle] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const handleOpenLifestyle = (lead) => {
    setSelectedLead(lead);
    setOpenLifestyle(true);
  };
  if (!leads.length) {
    return (
      <div className="rounded-[32px] border border-[#ECE7DD] bg-white p-16 text-center shadow-[0_20px_60px_rgba(0,0,0,.06)]">
        <h3 className="font-serif text-2xl text-[#173C68]">No Leads Found</h3>

        <p className="mt-3 text-slate-500">
          New lifestyle assessments will appear here.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-[32px] border border-[#ECE7DD] bg-white shadow-[0_20px_60px_rgba(0,0,0,.06)]"
    >
      {/* Desktop */}

      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full">
          <thead className="bg-[#F8F6F2]">
            <tr className="text-left text-sm font-semibold text-[#173C68]">
              <th className="px-8 py-5">Patient</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Program</th>
              <th>Status</th>
              <th>Created</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-t border-[#F1ECE4] transition hover:bg-[#FBFAF7]"
              >
                <td className="px-8 py-6">
                  <h4 className="font-semibold text-[#173C68]">{lead.name}</h4>

                  <p className="text-sm text-slate-500">#{lead.id}</p>
                </td>

                <td>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail size={15} />
                    {lead.email}
                  </div>
                </td>

                <td>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone size={15} />
                    {lead.phone}
                  </div>
                </td>

                <td>
                  <button
                    onClick={() => handleOpenLifestyle(lead)}
                    className="flex items-center gap-2 rounded-full bg-[#EDF9F0] px-4 py-2 text-xs font-semibold text-[#1E7A3A] transition hover:bg-[#1E7A3A] hover:text-white"
                  >
                    <Leaf size={14} />
                    Lifestyle
                  </button>
                </td>

                <td>
                  <LeadStatusBadge status={lead.lead_status} />
                </td>

                <td>
                  <div className="flex items-center gap-2 text-slate-500">
                    <CalendarDays size={15} />
                    {new Date(lead.created_at).toLocaleDateString()}
                  </div>
                </td>

                <td>
                  <div className="flex justify-center">
                    <button
                      onClick={() =>
                        navigate(`/sales-dashboard/leads/${lead.id}`)
                      }
                      className="flex items-center gap-2 rounded-full bg-[#173C68] px-5 py-2 text-white transition hover:bg-[#1E7A3A]"
                    >
                      <Eye size={16} />
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}

      <div className="divide-y lg:hidden">
        {leads.map((lead) => (
          <div key={lead.id} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-[#173C68]">{lead.name}</h3>

                <p className="mt-1 text-sm text-slate-500">{lead.email}</p>

                <button
                  onClick={() => handleOpenLifestyle(lead)}
                  className="mt-2 flex items-center gap-2 rounded-full bg-[#EDF9F0] px-3 py-2 text-xs font-semibold text-[#1E7A3A]"
                >
                  <Leaf size={14} />
                  Lifestyle Assessment
                </button>
              </div>

              <LeadStatusBadge status={lead.lead_status} />
            </div>

            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Phone size={15} />
                {lead.phone}
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays size={15} />
                {new Date(lead.created_at).toLocaleDateString()}
              </div>
            </div>

            <button
              onClick={() => navigate(`/sales-dashboard/leads/${lead.id}`)}
              className="mt-5 w-full rounded-full bg-[#173C68] py-3 text-white transition hover:bg-[#1E7A3A]"
            >
              View Lead
            </button>
          </div>
        ))}
      </div>
      <LifestyleModal
        open={openLifestyle}
        lead={selectedLead}
        onClose={() => setOpenLifestyle(false)}
      />
    </motion.div>
  );
}
