import { useOutletContext } from "react-router-dom";
import WellnessHero from "../components/wellness/WellnessHero";
import VitalsGrid from "../components/wellness/VitalsGrid";
import DoshaBodyMap from "../components/anatomy/DoshaBodyMap";
import AnatomicalBioMap from "../components/anatomy/AnatomicalBioMap";
import AgniMap from "../components/anatomy/AgniMap";
import AmaCard from "../components/anatomy/AmaCard";
import CompletedReports from "../components/reports/CompletedReports";

export default function DashboardPage() {
  const { patientData, refreshDashboard } = useOutletContext();

  const profile = patientData?.profile?.patient ?? {};
  const report = patientData?.report?.patient ?? {};
  const assessment = patientData?.assessment?.data ?? {};
  const progress = patientData?.progress ?? {};

  const score = Number(
    report.composite_score ?? assessment.composite_score ?? 0
  );

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
    biometrics: { vitalityScore: score },
    vitalityScore: score,
    compositeScore: score,
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
    <main className="space-y-8 lg:space-y-10">
      <WellnessHero patient={patient} />

      <VitalsGrid patient={patient} report={patientData?.report} />

      <section className="grid grid-cols-1 gap-8 2xl:grid-cols-12">
        <div className="min-w-0 space-y-8 2xl:col-span-8">
          <DoshaBodyMap patient={patient} />
          <AnatomicalBioMap patient={patient} />
        </div>

        <aside className="min-w-0 space-y-8 2xl:col-span-4">
          <AgniMap patient={patient} />
          <AmaCard patient={patient} />
        </aside>
      </section>

      <CompletedReports
        progress={progress}
        report={report}
        patient={patient}
        onRefresh={refreshDashboard}
      />
    </main>
  );
}