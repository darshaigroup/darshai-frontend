import { useOutletContext } from "react-router-dom";
import WellnessHero from "../components/wellness/WellnessHero";
import VitalsGrid from "../components/wellness/VitalsGrid";
import DoshaBodyMap from "../components/anatomy/DoshaBodyMap";
import AnatomicalBioMap from "../components/anatomy/AnatomicalBioMap";
import AgniMap from "../components/anatomy/AgniMap";
import AppointmentList from "../components/appointment/AppointmentList";
import CompletedReports from "../components/reports/CompletedReports";

export default function DashboardPage() {
  const { patientData, appointments = [], refreshDashboard } = useOutletContext();

  const profile = patientData?.profile?.patient ?? {};
  const report = patientData?.report?.patient ?? {};
  const assessment = patientData?.assessment?.data ?? {};
  const progress = patientData?.progress ?? {};

  const patient = {
    id: profile.id,
    name: profile.name ?? profile.full_name,
    full_name: profile.full_name ?? profile.name,
    first_name: profile.first_name,
    last_name: profile.last_name,
    email: profile.email,
    phone: profile.phone,
    gender: profile.gender,
    dob: profile.dob,
    occupation: profile.occupation,
    location: profile.location,
    city: profile.city ?? profile.location,
    avatar: profile.profile_image,
    biometrics: { vitalityScore: Number(report.composite_score ?? assessment.composite_score ?? 0) },
    vitalityScore: Number(report.composite_score ?? assessment.composite_score ?? 0),
    compositeScore: Number(report.composite_score ?? assessment.composite_score ?? 0),
    riskBand: report.risk_band ?? assessment.risk_band,
    aiResponse: assessment.ai_response ?? report.ai_response,
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

      <VitalsGrid patient={patient} report={patientData.report}/>

      <section className="grid grid-cols-1 gap-8 2xl:grid-cols-12">
        <div className="space-y-8 2xl:col-span-8">
          <DoshaBodyMap patient={patient} />
          <AnatomicalBioMap patient={patient} />
        </div>

        <div className="space-y-8 2xl:col-span-4">
          <AgniMap patient={patient} />
          {/* <AppointmentList
            appointments={appointments}
            onJoin={appointment => console.log("Join", appointment)}
            onReschedule={appointment => console.log("Reschedule", appointment)}
          /> */}
        </div>
      </section>

      <CompletedReports
        progress={progress}
        report={report}
        patient={patient}
        onRefresh={refreshDashboard}
      />
    </div>
  );
}