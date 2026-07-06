import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  Phone,
  CalendarDays,
  MapPin,
  ArrowRight,
  Leaf,
  Loader2,
  X,
  Heart,
  Trees,
  Utensils,
  IndianRupee,
  Plane,
} from "lucide-react";

import { getLifestyleAssessment } from "../../services/salesService";

export default function RecentRegistrations({ leads = [] }) {
  const navigate = useNavigate();

  const [loadingLifestyle, setLoadingLifestyle] = useState(false);
  const [openLifestyle, setOpenLifestyle] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [lifestyle, setLifestyle] = useState(null);

  const patients = [...(leads || [])]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 8);

  const openLifestyleDrawer = async (patient) => {
    try {
      setLoadingLifestyle(true);
      setSelectedPatient(patient);

      const data = await getLifestyleAssessment(patient.id);

      setLifestyle(data?.matrix_answers || data || {});
      setOpenLifestyle(true);
    } catch (err) {
      console.error(err);
      alert("Unable to load lifestyle assessment.");
    } finally {
      setLoadingLifestyle(false);
    }
  };

  const closeLifestyleDrawer = () => {
    setOpenLifestyle(false);
    setSelectedPatient(null);
    setLifestyle(null);
  };

  const getValue = (key, fallback = "Not Provided") => {
    if (!lifestyle) return fallback;

    const value = lifestyle[key];

    if (Array.isArray(value)) return value.join(", ");

    return value || fallback;
  };

 const renderChip=(value,split=true)=>{

  if(!value){
    return(
      <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-500">
        Not Provided
      </span>
    );
  }

  const values=Array.isArray(value)
    ?value
    :split
      ?String(value).split(",")
      :[String(value)];

  return(
    <div className="flex flex-wrap gap-2">
      {values.map((item,index)=>(
        <span
          key={index}
          className="rounded-full bg-[#EDF9F0] px-4 py-2 text-sm font-medium text-[#1E7A3A]"
        >
          {item.trim()}
        </span>
      ))}
    </div>
  );

};

  const badgeColor = (status) => {
    switch (status) {
      case "Lead":
        return "bg-blue-50 text-blue-600";

      case "Contacted":
        return "bg-cyan-50 text-cyan-600";

      case "Interested":
        return "bg-emerald-50 text-emerald-600";

      case "Purchased":
        return "bg-amber-50 text-amber-700";

      case "Assigned":
        return "bg-indigo-50 text-indigo-700";

      case "Closed":
        return "bg-[#EDF9F0] text-[#1E7A3A]";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[34px] border border-[#ECE7DD] bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,.05)]"
    >
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="rounded-full bg-[#EEF6FF] px-4 py-2 text-xs font-semibold uppercase tracking-[2px] text-[#173C68]">
            New Patients
          </span>

          <h2 className="mt-4 font-serif text-3xl text-[#173C68]">
            Recent Registrations
          </h2>

          <p className="mt-2 text-slate-500">
            Latest lifestyle enquiries received in the CRM.
          </p>
        </div>

        <span className="rounded-full bg-[#173C68] px-5 py-3 text-sm font-semibold text-white">
          {patients.length} Patients
        </span>
      </div>

      {!patients.length ? (
        <div className="rounded-[28px] border border-dashed border-[#D8D8D8] bg-[#FCFBF9] p-12 text-center">
          <UserRound size={44} className="mx-auto text-[#173C68]" />

          <h3 className="mt-5 font-serif text-2xl text-[#173C68]">
            No Registrations
          </h3>

          <p className="mt-2 text-slate-500">
            New patient registrations will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {patients.map((patient) => (
            <motion.div
              key={patient.id}
              whileHover={{ y: -3 }}
              className="rounded-[28px] border border-[#ECE7DD] bg-[#FCFBF9] p-6"
            >
              <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex items-start gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EDF9F0]">
                    <UserRound size={28} className="text-[#1E7A3A]" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-serif text-2xl text-[#173C68]">
                        {patient.name}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeColor(patient.lead_status)}`}
                      >
                        {patient.lead_status}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3 text-sm text-slate-500 md:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <Mail size={15} />
                        {patient.email}
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone size={15} />
                        {patient.phone}
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin size={15} />
                        {patient.location || "Not Available"}
                      </div>

                      <div className="flex items-center gap-2">
                        <CalendarDays size={15} />
                        {new Date(patient.created_at).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => openLifestyleDrawer(patient)}
                        disabled={loadingLifestyle}
                        className="group flex items-center gap-2 rounded-full border border-[#CDE7D2] bg-gradient-to-r from-[#EDF9F0] to-[#F8FCF8] px-5 py-3 text-sm font-semibold text-[#1E7A3A] transition-all duration-300 hover:-translate-y-1 hover:border-[#1E7A3A] hover:bg-[#1E7A3A] hover:text-green hover:shadow-[0_12px_30px_rgba(30,122,58,.28)]"
                      >
                        {loadingLifestyle &&
                        selectedPatient?.id === patient.id ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Leaf
                            size={16}
                            className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                          />
                        )}
                        Lifestyle Wellness
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    navigate(`/sales-dashboard/leads/${patient.id}`)
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#173C68] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-[#1E7A3A] sm:w-auto"
                >
                  View Details
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      <AnimatePresence>
        {openLifestyle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[36px] bg-white shadow-[0_40px_120px_rgba(0,0,0,.25)]"
            >
              {/* ---------- Header ---------- */}

              <div className="border-b border-[#ECE7DD] bg-gradient-to-r from-[#173C68] to-[#1E7A3A] p-7 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[2px]">
                      Lifestyle Assessment
                    </span>

                    <h2 className="mt-4 font-serif text-4xl">
                      {selectedPatient?.name}
                    </h2>

                    <p className="mt-2 text-white/80">
                      Lifestyle Questionnaire Summary
                    </p>
                  </div>

                  <button
                    onClick={closeLifestyleDrawer}
                    className="rounded-full bg-white/10 p-3 transition hover:bg-white/20"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* ---------- Body ---------- */}

              <div className="flex-1 overflow-y-auto p-7">
                {/* ---------- Patient Overview ---------- */}

                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-[24px] bg-[#FCFBF9] p-5">
                    <p className="text-xs font-semibold uppercase tracking-[2px] text-slate-500">
                      Lead Status
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-[#173C68]">
                      {selectedPatient?.lead_status || "-"}
                    </h3>
                  </div>

                  <div className="rounded-[24px] bg-[#FCFBF9] p-5">
                    <p className="text-xs font-semibold uppercase tracking-[2px] text-slate-500">
                      Preferred Program
                    </p>
                    <div className="mt-3">
                      {renderChip(lifestyle?.preferred_experience)}
                    </div>
                  </div>

                  <div className="rounded-[24px] bg-[#FCFBF9] p-5">
                    <p className="text-xs font-semibold uppercase tracking-[2px] text-slate-500">
                      Budget
                    </p>
                    <div className="mt-3">
                      {renderChip(lifestyle?.budget_range,false)}
                    </div>
                  </div>

                  <div className="rounded-[24px] bg-[#FCFBF9] p-5">
                    <p className="text-xs font-semibold uppercase tracking-[2px] text-slate-500">
                      Travel Timeline
                    </p>
                    <div className="mt-3">
                      {renderChip(lifestyle?.travel_timeline)}
                    </div>
                  </div>
                </div>

                {/* ---------- Lifestyle Summary ---------- */}

                <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  <div className="rounded-[28px] border border-[#ECE7DD] bg-[#FCFBF9] p-6">
                    <Heart size={28} className="text-[#1E7A3A]" />
                    <h3 className="mt-4 font-semibold text-[#173C68]">
                      Retreat Goal
                    </h3>
                    <div className="mt-4">
                      {renderChip(lifestyle?.retreat_goal)}
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-[#ECE7DD] bg-[#FCFBF9] p-6">
                    <Leaf size={28} className="text-[#1E7A3A]" />
                    <h3 className="mt-4 font-semibold text-[#173C68]">
                      Preferred Program
                    </h3>
                    <div className="mt-4">
                      {renderChip(lifestyle?.preferred_experience)}
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-[#ECE7DD] bg-[#FCFBF9] p-6">
                    <IndianRupee size={28} className="text-[#1E7A3A]" />
                    <h3 className="mt-4 font-semibold text-[#173C68]">
                      Budget
                    </h3>
                    <div className="mt-4">
                      {renderChip(lifestyle?.budget_range,false)}
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-[#ECE7DD] bg-[#FCFBF9] p-6">
                    <Plane size={28} className="text-[#1E7A3A]" />
                    <h3 className="mt-4 font-semibold text-[#173C68]">
                      Travel Timeline
                    </h3>
                    <div className="mt-4">
                      {renderChip(lifestyle?.travel_timeline)}
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-[#ECE7DD] bg-[#FCFBF9] p-6">
                    <Utensils size={28} className="text-[#1E7A3A]" />
                    <h3 className="mt-4 font-semibold text-[#173C68]">
                      Food Preference
                    </h3>
                    <div className="mt-4">
                      {renderChip(lifestyle?.food_style)}
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-[#ECE7DD] bg-[#FCFBF9] p-6">
                    <Trees size={28} className="text-[#1E7A3A]" />
                    <h3 className="mt-4 font-semibold text-[#173C68]">
                      Natural Environment
                    </h3>
                    <div className="mt-4">
                      {renderChip(lifestyle?.natural_environment)}
                    </div>
                  </div>
                </div>

                {/* ---------- Wellness Preferences ---------- */}

                <div className="mt-8 rounded-[30px] border border-[#ECE7DD] bg-[#FCFBF9] p-7">
                  <h3 className="font-serif text-2xl text-[#173C68]">
                    Wellness Preferences
                  </h3>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="font-semibold text-[#173C68]">
                        Mind Body Practice
                      </p>
                      <div className="mt-3">
                        {renderChip(lifestyle?.mind_body_practice)}
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold text-[#173C68]">
                        Therapeutic Experience
                      </p>
                      <div className="mt-3">
                        {renderChip(lifestyle?.therapeutic_experience)}
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold text-[#173C68]">
                        Creative Activity
                      </p>
                      <div className="mt-3">
                        {renderChip(lifestyle?.creative_activity)}
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold text-[#173C68]">
                        Wellness Learning
                      </p>
                      <div className="mt-3">
                        {renderChip(lifestyle?.wellness_learning)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---------- Sales Recommendation ---------- */}

                <div className="mt-8 rounded-[32px] bg-gradient-to-r from-[#173C68] to-[#1E7A3A] p-8 text-white">
                  <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[2px]">
                    Sales Recommendation
                  </span>

                  <h2 className="mt-5 font-serif text-3xl">
                    Recommended Sales Pitch
                  </h2>

                  <ul className="mt-6 space-y-3 text-white/90">
                    <li>
                      ✓ Focus on <strong>{getValue("retreat_goal")}</strong>
                    </li>

                    <li>
                      ✓ Recommend{" "}
                      <strong>{getValue("preferred_experience")}</strong>
                    </li>

                    <li>
                      ✓ Budget: <strong>{getValue("budget_range")}</strong>
                    </li>

                    <li>
                      ✓ Follow-up:{" "}
                      <strong>{getValue("travel_timeline")}</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
