import WellnessHero from "../components/wellness/WellnessHero";
import VitalsGrid from "../components/wellness/VitalsGrid";
import DoshaBodyMap from "../components/anatomy/DoshaBodyMap";
import AnatomicalBioMap from "../components/anatomy/AnatomicalBioMap";
import AgniMap from "../components/anatomy/AgniMap";
import WellnessMetrics from "../components/wellness/WellnessMetrics";
import AppointmentList from "../components/appointment/AppointmentList";
import ReportsTable from "../components/reports/ReportTable";

export default function DashboardPage({
  patientData,
  appointments = [],
  reports = [],
  onJoinAppointment,
  onRescheduleAppointment,
}) {
  const profile = patientData?.profile?.patient || {};
  const report = patientData?.report?.patient || {};
  const assessment = patientData?.assessment?.data || {};
  const progress = patientData?.progress || {};

  const patient = {
    id: profile.id,
    name: profile.name,
    full_name: profile.name,
    email: profile.email,
    phone: profile.phone,
    gender: profile.gender,
    dob: profile.dob,
    occupation: profile.occupation,
    location: profile.location,
    city: profile.location,
    avatar: profile.profile_image,

    biometrics: {
      vitalityScore: Number(
        report.composite_score || assessment.composite_score || 0,
      ),
    },

    vitalityScore: Number(
      report.composite_score || assessment.composite_score || 0,
    ),
    compositeScore: report.composite_score,
    riskBand: report.risk_band,
    aiResponse: report.ai_response,

    primaryDosha: report.primary_dosha,
    secondaryDosha: report.secondary_dosha,
    primaryLevel: report.primary_level,
    secondaryLevel: report.secondary_level,

    riskTier: report.risk_tier,
    clinicalSummary: report.clinical_summary,
    finalAyurvedaResult: report.final_ayurveda_result,

    practitioner: {
      name: report.practitioner_name,
      designation: report.designation,
      signature: report.signature_url,
    },

    assessment,
    report,
    progress,
  };

  return (
    <div className="space-y-8 lg:space-y-10">
      <WellnessHero patient={patient} />

      <VitalsGrid patient={patient} />

      <section className="grid grid-cols-1 2xl:grid-cols-12 gap-8">
        <div className="2xl:col-span-8 space-y-8">
          <DoshaBodyMap patient={patient} />
          <AnatomicalBioMap patient={patient} />
        </div>

        <div className="2xl:col-span-4 space-y-8">
          <AgniMap patient={patient} />
          <AppointmentList
            appointments={appointments}
            onJoin={onJoinAppointment}
            onReschedule={onRescheduleAppointment}
          />
        </div>
      </section>

      <ReportsTable progress={progress} />
    </div>
  );
}
