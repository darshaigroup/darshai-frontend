import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFilePdf,FaUpload } from "react-icons/fa";
import { getPatientReport } from "../../../services/reportService";

const ReportsTab = ({ patient }) => {
  const navigate=useNavigate();

  const [reportData,setReportData]=useState(null);
  const [loading,setLoading]=useState(true);
  const reports=[
  {
    key:"risk_report",
    title:"Risk Assessment",
    description:"Domain risk analysis & critical factors",
    type:"risk",
    color:"bg-red-500"
  },
  {
    key:"clinical_report",
    title:"Clinical Assessment",
    description:"Clinical findings, vitals and health indicators",
    type:"clinical",
    color:"bg-blue-500"
  },
  {
    key:"ayurveda_report",
    title:"Ayurveda Assessment",
    description:"Prakriti, dosha and constitution analysis",
    type:"ayurveda",
    color:"bg-emerald-500"
  },
  {
    key:"lifestyle_report",
    title:"Lifestyle Assessment",
    description:"Lifestyle habits and wellness recommendations",
    type:"lifestyle",
    color:"bg-violet-500"
  }
];

const availableReports=[
  reportData?.ai_response &&
    Object.keys(reportData.ai_response).length > 0 && {
      title:"Risk Assessment",
      description:"Domain risk analysis & critical factors",
      type:"risk",
      color:"bg-red-500"
    },

  reportData?.clinical_answers &&
    Object.keys(reportData.clinical_answers).length > 0 && {
      title:"Clinical Assessment",
      description:"Clinical findings, vitals and health indicators",
      type:"clinical",
      color:"bg-blue-500"
    },

  reportData?.prakriti_answers &&
    Object.keys(reportData.prakriti_answers).length > 0 && {
      title:"Ayurveda Assessment",
      description:"Prakriti, dosha and constitution analysis",
      type:"ayurveda",
      color:"bg-emerald-500"
    },

  reportData?.matrix_answers &&
    Object.keys(reportData.matrix_answers).length > 0 && {
      title:"Lifestyle Assessment",
      description:"Lifestyle habits and wellness recommendations",
      type:"lifestyle",
      color:"bg-violet-500"
    }
].filter(Boolean);

  useEffect(() => {
    if(patient?.id) loadReport();
  },[patient?.id]);

  const loadReport=async()=>{

    try{

      const data=
        await getPatientReport(patient.id);

      setReportData(data.patient);

    }catch(err){

      console.error(err);

    }finally{

      setLoading(false);

    }

  };

  const handleUpload=(e)=>{
    const file=e.target.files?.[0];
    if(!file) return;

    console.log("Upload:",file);
  };

  const ReportButton=({
    label,
    type,
    color
  })=>(
    <button
      onClick={()=>{

        if(type==="summary"){

          navigate(
            `/dashboard/patient-report-summary/${patient.id}`
          );

        }else{

          navigate(
            `/dashboard/report-display/${patient.id}`,
            {
              state:{
                reportType:type
              }
            }
          );

        }

      }}
      className={`
        px-4 py-2 rounded-full
        text-sm font-medium
        transition hover:scale-105
        ${color}
      `}
    >
      {label}
    </button>
  );

  if(loading){
    return(
      <div className="bg-white rounded-3xl p-8">
        Loading Reports...
      </div>
    );
  }
  const ReportCard=({
  title,
  description,
  type,
  color
})=>(
  <div className="flex items-center justify-between p-5 rounded-[24px] bg-[#F8FAFC] border border-slate-100 hover:shadow-md transition-all">

    <div className="flex items-center gap-4">

      <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-white font-bold`}>
        PDF
      </div>

      <div>

        <h3 className="font-semibold text-[#173C68]">
          {title}
        </h3>

        <p className="text-sm text-slate-500">
          {description}
        </p>

      </div>

    </div>

    <button
      onClick={() => {

        if(type==="summary"){

          navigate(
            `/dashboard/patient-report-summary/${patient.id}`
          );

        }else{

          navigate(
            `/dashboard/report-display/${patient.id}`,
            {
              state:{
                reportType:type
              }
            }
          );

        }

      }}
      className="
        px-5 py-2.5
        rounded-full
        bg-[#173C68]
        text-white
        text-sm
        font-medium
        hover:bg-[#102B4A]
        transition-all
      "
    >
      View Report
    </button>

  </div>
);

  return(
    <div className="space-y-6">

      {/* Upload */}
      <div className="bg-white p-8 rounded-3xl border-2 border-dashed text-center">

        <div className="flex flex-col items-center">

          <FaUpload className="text-2xl text-gray-400 mb-3"/>

          <h2 className="text-lg font-semibold">
            Upload Clinical Reports
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Drag & drop PDF, JPG or PNG files. Max size 10MB.
          </p>

          <label className="mt-5 cursor-pointer">

            <input
              type="file"
              className="hidden"
              onChange={handleUpload}
            />

            <span className="px-5 py-2 rounded-full bg-gradient-to-r from-[#173C68] to-[#3BAA9D] text-white text-sm">
              Select Files
            </span>

          </label>

        </div>

      </div>

      {/* Available Reports */}
    <div className="bg-white p-8 rounded-[32px] shadow-sm">

  <div className="flex justify-between items-center mb-6">

    <div>
      <h2 className="text-2xl font-semibold text-[#173C68]">
        Assessment Reports
      </h2>

      <p className="text-sm text-slate-500">
        Available patient wellness reports
      </p>
    </div>

    <span className="px-4 py-2 rounded-full bg-[#F6F9F8] text-[#173C68] text-sm font-medium">
      {availableReports.length + 1} Reports
    </span>

  </div>

  <div className="space-y-4">

    <ReportCard
      title="Executive Summary"
      description="Complete patient wellness assessment summary"
      type="summary"
      color="bg-[#173C68]"
    />

    {availableReports.map(report => (
      <ReportCard
        key={report.type}
        title={report.title}
        description={report.description}
        type={report.type}
        color={report.color}
      />
    ))}

  </div>

</div>

      {/* Assessment Info */}
      <div className="bg-white p-6 rounded-3xl shadow-sm">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500">
            <FaFilePdf />
          </div>

          <div>

            <h3 className="font-semibold text-[#173C68]">
              Assessment Report
            </h3>

            <p className="text-sm text-slate-500">
              Assessment ID: {reportData?.assessment_id?.slice(0,8)}
            </p>

            <p className="text-sm text-slate-500">
              Risk Band: {reportData?.risk_band}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ReportsTab;