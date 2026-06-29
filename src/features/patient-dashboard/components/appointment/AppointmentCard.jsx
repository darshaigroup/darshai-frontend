import { CalendarDays, Clock, MapPin, Video, Phone, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

export default function AppointmentCard({
  appointment,
  onJoin,
  onReschedule,
}) {
  const statusColors = {
    confirmed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    completed: "bg-slate-500/10 text-slate-600 border-slate-500/20",
    cancelled: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="flex gap-4 min-w-0">
          <img
            src={appointment.avatar}
            alt={appointment.doctor}
            className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
          />

          <div className="min-w-0">
            <h3 className="font-semibold text-slate-900 dark:text-white truncate">
              {appointment.doctor}
            </h3>

            <p className="text-sm text-slate-500">
              {appointment.speciality}
            </p>

            <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <CalendarDays className="w-3 h-3" />
                {appointment.date}
              </span>

              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {appointment.time}
              </span>

              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {appointment.location}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-3">
          <span
            className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.15em] font-semibold border ${
              statusColors[appointment.status]
            }`}
          >
            {appointment.status}
          </span>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onJoin?.(appointment)}
              className="h-10 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm flex items-center gap-2"
            >
              {appointment.mode === "video" ? (
                <Video className="w-4 h-4" />
              ) : (
                <Phone className="w-4 h-4" />
              )}
              Join
            </button>

            <button
              onClick={() => onReschedule?.(appointment)}
              className="h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-sm flex items-center gap-2"
            >
              Reschedule
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}