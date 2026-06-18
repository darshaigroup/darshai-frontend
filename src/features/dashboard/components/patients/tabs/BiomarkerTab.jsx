// import { FaHeartbeat, FaLungs, FaThermometerHalf, FaTint } from "react-icons/fa";

// const BiomarkerTab = () => {
//   return (
//     <div className="space-y-6">

//       {/* CARDS */}
//       <div className="grid grid-cols-4 gap-6">

//         <div className="bg-white p-6 rounded-3xl shadow-sm">
//           <p className="text-xs text-gray-400">AVG. HEART RATE</p>
//           <h2 className="text-lg font-semibold mt-2">72 bpm</h2>
//         </div>

//         <div className="bg-white p-6 rounded-3xl shadow-sm">
//           <p className="text-xs text-gray-400">RESPIRATION</p>
//           <h2 className="text-lg font-semibold mt-2">16 br/m</h2>
//         </div>

//         <div className="bg-white p-6 rounded-3xl shadow-sm">
//           <p className="text-xs text-gray-400">BODY TEMP</p>
//           <h2 className="text-lg font-semibold mt-2">98.6 °F</h2>
//         </div>

//         <div className="bg-white p-6 rounded-3xl shadow-sm">
//           <p className="text-xs text-gray-400">HYDRATION</p>
//           <h2 className="text-lg font-semibold mt-2">84%</h2>
//         </div>

//       </div>

//       {/* TREND SECTION */}
//       <div className="bg-white p-6 rounded-3xl shadow-sm">

//         <h2 className="text-lg font-semibold mb-2">
//           Biomarker Trends
//         </h2>

//         <p className="text-sm text-gray-500 mb-4">
//           Continuous physiological monitoring data
//         </p>

//         {/* Placeholder chart */}
//         <div className="h-40 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
//           Chart Coming Soon
//         </div>

//       </div>

//     </div>
//   );
// };

// export default BiomarkerTab;

import {
  FaHeartbeat,
  FaWeight,
  FaPills,
  FaVenusMars,
  FaBed,
  FaUsers,
  FaExclamationCircle,
  FaRulerVertical,
  FaBalanceScale,
  FaStethoscope,
} from "react-icons/fa";
import { useEffect,useState } from "react";
import { getPatientReport } from "../../../Services/reportService";
const BiomarkerTab = ({ patient }) => {
  const [reportData,setReportData]=useState(null);

  useEffect(() => {
    if(patient?.id) loadReport();
  },[patient?.id]);

  const loadReport = async () => {
    try{
      const data =
        await getPatientReport(patient.id);

      setReportData(data.patient);
    }catch(err){
      console.error(err);
    }
  };

  const clinical =
    reportData?.clinical_answers || {};
const cards = [
  {
    title:"Blood Pressure History",
    value:clinical.bloodPressureKnown,
    icon:<FaHeartbeat />,
    color:"from-red-500 to-rose-500"
  },
  {
    title:"Taking Medication",
    value:clinical.takingMedication,
    icon:<FaPills />,
    color:"from-cyan-500 to-blue-500"
  },
  {
    title:"Libido",
    value:clinical.libido,
    icon:<FaVenusMars />,
    color:"from-purple-500 to-pink-500"
  },
  {
    title:"Fatigue Pattern",
    value:clinical.fatiguePattern,
    icon:<FaBed />,
    color:"from-indigo-500 to-violet-500"
  },
  {
    title:"Androgen Symptoms",
    value:clinical.androgenSymptoms,
    icon:<FaHeartbeat />,
    color:"from-violet-500 to-fuchsia-500"
  },
  {
    title:"Family History",
    value:Array.isArray(clinical.familyHistory)
      ? clinical.familyHistory.join(", ")
      : clinical.familyHistory,
    icon:<FaUsers />,
    color:"from-emerald-500 to-green-500"
  },
  {
    title:"Allergies",
    value:clinical.hasAllergies,
    icon:<FaExclamationCircle />,
    color:"from-yellow-500 to-orange-500"
  },
  {
    title:"Height",
    value:clinical.height
      ? `${clinical.height} cm`
      : null,
    icon:<FaRulerVertical />,
    color:"from-sky-500 to-cyan-500"
  },
  {
    title:"Weight",
    value:clinical.weight
      ? `${clinical.weight} kg`
      : null,
    icon:<FaBalanceScale />,
    color:"from-teal-500 to-emerald-500"
  },
  {
    title:"Surgery History",
    value:clinical.surgeryHistory,
    icon:<FaStethoscope />,
    color:"from-red-600 to-pink-600"
  }
].filter(
  card =>
    card.value &&
    card.value !== "No" &&
    card.value !== "None"
);


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
  {cards.map(card => (
    <div
      key={card.title}
      className={`
        bg-gradient-to-br ${card.color}
        min-h-[220px]
        rounded-[32px]
        p-8
        text-white
        shadow-[0_20px_50px_rgba(0,0,0,0.12)]
        hover:scale-[1.03]
        hover:-translate-y-1
        transition-all duration-300
        flex flex-col justify-center items-center text-center
      `}
    >
      <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl backdrop-blur-sm">
        {card.icon}
      </div>

      <p className="mt-5 text-base font-medium text-white/90">
        {card.title}
      </p>

      <h2 className="mt-3 text-4xl font-bold leading-tight break-words">
        {card.value}
      </h2>
    </div>
  ))}
</div>
  );
};

export default BiomarkerTab;