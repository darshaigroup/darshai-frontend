import WellnessHero from "../components/wellness/WellnessHero";
import WellnessMetrics from "../components/wellness/WellnessMetrics";
import VitalsGrid from "../components/wellness/VitalsGrid";
import DoshaBodyMap from "../components/anatomy/DoshaBodyMap";
import AnatomicalBioMap from "../components/anatomy/AnatomicalBioMap";
import AgniMap from "../components/anatomy/AgniMap";
import AppointmentList from "../components/appointments/AppointmentList";

export default function DashboardPage({
  activePatient,
  appointments,
  onJoinAppointment,
  onRescheduleAppointment,
}) {
  return (
    <div className="space-y-6 md:space-y-8">
      <WellnessHero
        patientName={activePatient?.name}
        vitalityScore={activePatient?.biometrics?.vitalityScore || 88}
      />

      <WellnessMetrics />

      <VitalsGrid />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-6">
          <DoshaBodyMap />
        </div>

        <div className="xl:col-span-6">
          <AgniMap />
        </div>
      </div>

      <AnatomicalBioMap />

      <AppointmentList
        appointments={appointments}
        onJoin={onJoinAppointment}
        onReschedule={onRescheduleAppointment}
      />
    </div>
  );
}