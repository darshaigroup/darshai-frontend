import { CalendarX } from "lucide-react";
import AppointmentCard from "./AppointmentCard";

export default function AppointmentList({
  appointments = [],
  onJoin,
  onReschedule,
}) {
  if (!appointments.length) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-10 text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <CalendarX className="w-8 h-8 text-slate-400" />
        </div>

        <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
          No Upcoming Appointments
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Your consultations and wellness sessions will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map(appointment => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          onJoin={onJoin}
          onReschedule={onReschedule}
        />
      ))}
    </div>
  );
}