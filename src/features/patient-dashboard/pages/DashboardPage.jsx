import WellnessHero from "../components/wellness/WellnessHero";
import VitalsGrid from "../components/wellness/VitalsGrid";
import DoshaBodyMap from "../components/anatomy/DoshaBodyMap";
import AnatomicalBioMap from "../components/anatomy/AnatomicalBioMap";
import AgniMap from "../components/anatomy/AgniMap";
import WellnessMetrics from "../components/wellness/WellnessMetrics";
import AppointmentList from "../components/appointment/AppointmentList";
import ReportsTable from "../components/reports/ReportTable";

export default function DashboardPage({
  activePatient,
  appointments = [],
  reports = [],
  onJoinAppointment,
  onRescheduleAppointment,
}) {
  return (
    <div className="space-y-8 lg:space-y-10">

      {/* Hero */}
      <WellnessHero
        patientName={activePatient?.full_name || "Patient"}
        vitalityScore={activePatient?.biometrics?.vitalityScore || 88}
      />

      {/* Live Vitals */}
      <VitalsGrid patient={activePatient} />

      {/* Main Clinical Section */}
      <section className="grid grid-cols-1 2xl:grid-cols-12 gap-8">

        {/* Left */}
        <div className="2xl:col-span-8 space-y-8">

          <DoshaBodyMap patient={activePatient} />

          <AnatomicalBioMap patient={activePatient} />

        </div>

        {/* Right */}
        <div className="2xl:col-span-4 space-y-8">

          <AgniMap patient={activePatient} />

          <AppointmentList
            appointments={appointments}
            onJoin={onJoinAppointment}
            onReschedule={onRescheduleAppointment}
          />

        </div>

      </section>

      {/* Snapshot */}
      <WellnessMetrics patient={activePatient} />

      {/* Reports */}
      <ReportsTable
        reports={reports}
        patient={activePatient}
      />

    </div>
  );
}