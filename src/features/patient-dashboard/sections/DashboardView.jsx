import WellnessHero from "../components/wellness/WellnessHero";
import WellnessMetrics from "../components/wellness/WellnessMetrics";
import VitalsGrid from "../components/wellness/VitalsGrid";
import DoshaBodyMap from "../components/anatomy/DoshaBodyMap";
import AnatomicalBioMap from "../components/anatomy/AnatomicalBioMap";
import AppointmentList from "../components/appointment/AppointmentList";

export default function DashboardView({
  activePatient,
  appointments,
  onJoinAppointment,
  onRescheduleAppointment,
}) {
  return (
    <div className="space-y-6">
      <WellnessHero
        patientName={activePatient?.full_name}
        vitalityScore={activePatient?.vitalityScore || 88}
      />

      <WellnessMetrics />

      <VitalsGrid />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DoshaBodyMap />
        <AnatomicalBioMap />
      </div>

      <AppointmentList
        appointments={appointments}
        onJoin={onJoinAppointment}
        onReschedule={onRescheduleAppointment}
      />
    </div>
  );
}