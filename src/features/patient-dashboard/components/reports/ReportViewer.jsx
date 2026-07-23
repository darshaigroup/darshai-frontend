// import { X, Download, Printer } from "lucide-react";
// import { motion, AnimatePresence } from "motion/react";

// export default function ReportViewer({
//   report,
//   open,
//   onClose,
//   onDownload,
// }) {
//   return (
//     <AnimatePresence>
//       {open && report && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
//           />

//           <motion.div
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             className="fixed right-0 top-0 h-screen w-full md:w-[700px] bg-white dark:bg-slate-950 z-[100] shadow-2xl overflow-hidden flex flex-col"
//           >
//             <div className="h-16 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between">
//               <div>
//                 <h2 className="font-semibold text-slate-900 dark:text-white">
//                   {report.name}
//                 </h2>

//                 <p className="text-xs text-slate-500">
//                   {report.date}
//                 </p>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => onDownload(report)}
//                   className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center"
//                 >
//                   <Download className="w-4 h-4" />
//                 </button>

//                 <button
//                   onClick={() => window.print()}
//                   className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center"
//                 >
//                   <Printer className="w-4 h-4" />
//                 </button>

//                 <button
//                   onClick={onClose}
//                   className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>

//             <div className="flex-1 overflow-y-auto p-6 md:p-8">
//               <div className="prose dark:prose-invert max-w-none">
//                 <h1>{report.name}</h1>

//                 <p>{report.summary}</p>

//                 <h2>Clinical Findings</h2>

//                 <p>{report.findings}</p>

//                 <h2>Recommendations</h2>

//                 <p>{report.recommendations}</p>

//                 <h2>Next Actions</h2>

//                 <ul>
//                   {report.actions?.map((item, index) => (
//                     <li key={index}>{item}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

import ReportCard from "./ReportCard";

export default function ReportViewer({ patientData }) {
  if (!patientData) return null;

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <ReportCard patientData={patientData} />
    </div>
  );
}