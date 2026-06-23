import AppointmentCard from "./AppointmentCard";

export default function AppointmentList({
  appointments,
  onJoin,
  onReschedule,
}) {
  if (!appointments?.length) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-10 text-center">
        <h3 className="font-semibold text-slate-900 dark:text-white">
          No Upcoming Appointments
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Your scheduled consultations will appear here.
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