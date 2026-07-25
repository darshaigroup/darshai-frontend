// import { Calendar, CheckCircle2 } from "lucide-react";
// import { motion } from "motion/react";

// export default function ReportCard({ report }) {
//   const Icon = report.icon;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 12 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.3 }}
//       className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-emerald-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
//     >
//       <div className="flex items-start justify-between">
//         <div className="flex gap-4">
//           <div
//             className={`flex h-14 w-14 items-center justify-center rounded-2xl ${report.color}`}
//           >
//             <Icon className="h-7 w-7" />
//           </div>

//           <div>
//             <h3 className="text-base font-semibold text-slate-900 dark:text-white">
//               {report.name}
//             </h3>

//             <p className="mt-1 text-sm text-slate-500">
//               {report.type} Assessment
//             </p>

//             <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
//               <Calendar className="h-4 w-4" />
//               <span>Completed on {report.date}</span>
//             </div>

//             <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
//               <CheckCircle2 className="h-3.5 w-3.5" />
//               Completed
//             </span>
//           </div>
//         </div>

//         <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10">
//           <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
//         </div>
//       </div>
//     </motion.div>
//   );
// }

import PatientInformation from "./PatientInformation";
import RiskAssessment from "./RiskAssessment";
import ClinicalAssessment from "./ClinicalAssessment";
import LifestyleAssessment from "./LifestyleAssessment";
import AyurvedaAssessment from "./AyurvedaAssessment";
import DoctorNotes from "./DoctorNotes";

export default function ReportCard({ patientData = {} }) {
  const patient = patientData?.profile?.patient ?? {};
  const report = patientData?.report?.patient ?? {};
  const assessment = patientData?.assessment?.data ?? {};
  const progress = patientData?.progress ?? {};

  const clinical = report?.clinical_answers ?? {};
  const lifestyle = report?.matrix_answers ?? {};
  const ayurveda = report?.final_ayurveda_result ?? {};
  const ai = assessment?.ai_response ?? report?.ai_response ?? {};

  return (
    <div className="space-y-8">
      <PatientInformation patient={patient} />

      <RiskAssessment
        assessment={assessment}
        ai={ai}
        progress={progress}
      />

      <ClinicalAssessment clinical={clinical} />

      <LifestyleAssessment lifestyle={lifestyle} />

      <AyurvedaAssessment ayurveda={ayurveda} />

      <DoctorNotes doctor={report} />
    </div>
  );
}