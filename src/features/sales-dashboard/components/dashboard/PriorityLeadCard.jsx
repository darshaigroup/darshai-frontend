import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  CalendarDays,
  Wallet,
  Leaf,
  ArrowRight,
} from "lucide-react";

export default function PriorityLeadCard({ lead }) {

  const navigate=useNavigate();

  const answers=lead.matrix_answers||{};

  const goal=Array.isArray(answers.retreat_goal)
    ?answers.retreat_goal.join(", ")
    :answers.retreat_goal||"-";

  return(
    <motion.div
      whileHover={{y:-6}}
      transition={{duration:.25}}
      className="overflow-hidden rounded-[32px] border border-[#ECE7DD] bg-white shadow-[0_20px_60px_rgba(0,0,0,.06)]"
    >

      <div className="h-2 bg-gradient-to-r from-[#173C68] via-[#1E7A3A] to-[#C6A75E]" />

      <div className="p-7">

        {/* Header */}

        <div className="flex items-start justify-between gap-4">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EDF9F0] text-2xl font-bold text-[#1E7A3A]">
              {lead.name?.charAt(0)}
            </div>

            <div>

              <h2 className="font-serif text-2xl text-[#173C68]">
                {lead.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Lifestyle Prospect
              </p>

            </div>

          </div>

          <span className="rounded-full bg-[#EDF9F0] px-4 py-2 text-xs font-semibold text-[#1E7A3A]">
            {lead.lead_status}
          </span>

        </div>

        {/* Contact */}

        <div className="mt-7 space-y-3">

          <div className="flex items-center gap-3 text-sm text-slate-600">
            <Phone size={16}/>
            {lead.phone}
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-600">
            <Mail size={16}/>
            {lead.email}
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-600">
            <MapPin size={16}/>
            {lead.location||"Not Available"}
          </div>

        </div>

        {/* Lifestyle */}

        <div className="mt-8">

          <h3 className="mb-4 font-semibold text-[#173C68]">
            Lifestyle Summary
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">

            <div className="rounded-2xl bg-[#F8F6F2] p-4">

              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-[#173C68]">
                <Leaf size={15}/>
                Goal
              </div>

              <p className="mt-2 text-sm font-medium">
                {goal}
              </p>

            </div>

            <div className="rounded-2xl bg-[#F8F6F2] p-4">

              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-[#173C68]">
                <Wallet size={15}/>
                Budget
              </div>

              <p className="mt-2 text-sm font-medium">
                {answers.budget_range||"-"}
              </p>

            </div>

            <div className="rounded-2xl bg-[#F8F6F2] p-4">

              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-[#173C68]">
                <CalendarDays size={15}/>
                Timeline
              </div>

              <p className="mt-2 text-sm font-medium">
                {answers.travel_timeline||"-"}
              </p>

            </div>

            <div className="rounded-2xl bg-[#F8F6F2] p-4">

              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-[#173C68]">
                <Leaf size={15}/>
                Food
              </div>

              <p className="mt-2 text-sm font-medium">
                {answers.food_style||"-"}
              </p>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-8 flex flex-col gap-5 border-t border-[#ECE7DD] pt-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <p className="text-xs uppercase tracking-wider text-slate-500">
              Next Follow-up
            </p>

            <p className="mt-2 font-semibold text-[#173C68]">
              {lead.followup_date
                ?new Date(lead.followup_date).toLocaleDateString()
                :"Not Scheduled"}
            </p>

          </div>

          <div className="flex gap-3">

            <button
              onClick={()=>window.open(`tel:${lead.phone}`)}
              className="rounded-full border border-[#173C68] px-5 py-3 text-sm font-semibold text-[#173C68] transition hover:bg-[#173C68] hover:text-white"
            >
              Call
            </button>

            <button
              onClick={()=>navigate(`/sales-dashboard/leads/${lead.id}`)}
              className="flex items-center gap-2 rounded-full bg-[#1E7A3A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#16612F]"
            >
              View More
              <ArrowRight size={16}/>
            </button>

          </div>

        </div>

      </div>

    </motion.div>
  );
}