import { motion } from "framer-motion";
import { Activity, Brain, HeartPulse, ShieldAlert, Stethoscope, Target } from "lucide-react";
import MetricCard from "./MetricCard";
import InfoCard from "./InfoCard";

export default function ClinicalAssessment({ clinical={} }) {
  const {
    height,
    weight,
    primaryGoal,
    fatiguePattern,
    libido,
    medicalConditions=[],
    familyHistory=[],
    bloodPressureKnown,
    takingMedication,
    hasAllergies,
    surgeryHistory,
    hairSkin,
    hairSkinDetails,
  }=clinical;

  const metrics=[
    {title:"Height",value:height?`${height} cm`:null,icon:Activity,color:"info"},
    {title:"Weight",value:weight?`${weight} kg`:null,icon:Activity,color:"success"},
    {title:"Primary Goal",value:primaryGoal,icon:Target,color:"primary"},
    {title:"Fatigue Pattern",value:fatiguePattern,icon:Brain,color:"warning"},
    {title:"Libido",value:libido,icon:HeartPulse,color:"danger"},
    {title:"Blood Pressure Known",value:bloodPressureKnown,icon:HeartPulse,color:"primary"},
    {title:"Taking Medication",value:takingMedication,icon:Stethoscope,color:"warning"},
    {title:"Allergies",value:hasAllergies,icon:ShieldAlert,color:"danger"},
    {title:"Surgery History",value:surgeryHistory,icon:Stethoscope,color:"info"},
    {title:"Hair / Skin Issues",value:hairSkin,icon:Activity,color:"primary"},
  ].filter(({value})=>value);

  return (
    <motion.section initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.35}} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Clinical Assessment</h2>
        <p className="mt-1 text-sm text-slate-500">Clinical information collected during patient assessment.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {metrics.map(card=><MetricCard key={card.title} {...card}/>)}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <InfoCard
          title="Basic Information"
          items={[
            {label:"Height",value:height?`${height} cm`:"-"},
            {label:"Weight",value:weight?`${weight} kg`:"-"},
            {label:"Primary Goal",value:primaryGoal},
            {label:"Fatigue Pattern",value:fatiguePattern},
            {label:"Libido",value:libido}
          ]}
        />

        <InfoCard
          title="Medical Assessment"
          items={[
            {label:"Blood Pressure Known",value:bloodPressureKnown},
            {label:"Taking Medication",value:takingMedication},
            {label:"Has Allergies",value:hasAllergies},
            {label:"Surgery History",value:surgeryHistory},
            {label:"Hair / Skin Issues",value:hairSkin},
            {label:"Hair / Skin Details",value:hairSkinDetails}
          ]}
        />
      </div>

      {!!medicalConditions.length&&(
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Medical Conditions</h3>
          <div className="flex flex-wrap gap-2">
            {medicalConditions.map(item=>(
              <span key={item} className="rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700">{item}</span>
            ))}
          </div>
        </div>
      )}

      {!!familyHistory.length&&(
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Family History</h3>
          <div className="flex flex-wrap gap-2">
            {familyHistory.map(item=>(
              <span key={item} className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">{item}</span>
            ))}
          </div>
        </div>
      )}
    </motion.section>
  );
}