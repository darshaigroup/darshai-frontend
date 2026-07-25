import { motion } from "framer-motion";
import { User, CalendarDays, Cake, Mail, Phone, MapPin, Briefcase, VenusAndMars, Stethoscope } from "lucide-react";
import InfoCard from "./InfoCard";

const formatDate = d => d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "--";

export default function PatientInformation({ patient = {} }) {
  const {full_name,name,email,phone,gender,dob,age,occupation,location,blood_group,patient_id,doctor_name} = patient;

  return (
    <motion.section initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }} className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-3xl font-bold text-white shadow-lg">
              {(full_name ?? name ?? "P").charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">{full_name ?? name ?? "--"}</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {patient_id && <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">ID : {patient_id}</span>}
                {blood_group && <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">{blood_group}</span>}
                {age && <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">{age} Years</span>}
              </div>
            </div>
          </div>

          {doctor_name && (
            <div className="rounded-2xl bg-emerald-50 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[.2em] text-slate-500">Consulting Doctor</p>
              <p className="mt-2 text-lg font-bold text-emerald-700">{doctor_name}</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <InfoCard icon={Mail} label="Email" value={email} color="blue" />
        <InfoCard icon={Phone} label="Phone Number" value={phone} color="emerald" />
        <InfoCard icon={VenusAndMars} label="Gender" value={gender} color="rose" />
        <InfoCard icon={Cake} label="Date of Birth" value={formatDate(dob)} color="amber" />
        <InfoCard icon={Briefcase} label="Occupation" value={occupation} color="slate" />
        <InfoCard icon={MapPin} label="Location" value={location} color="blue" />
        
      </div>
    </motion.section>
  );
}