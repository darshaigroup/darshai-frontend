import {useEffect,useState} from "react";
import {useNavigate,Outlet} from "react-router-dom";
import DashboardShell from "../components/layout/DashboardShell";
import {TourProvider} from "../components/onbaording/TourContext";
import TourHelper from "../components/onbaording/TourHelper";
import logo from "@/assets/images/logos.png";
import {getMyProfile,getMyReport,getMyAssessment,getAssessmentProgress} from "../services/patientDashboardService";

export default function PatientDashboardLayout(){
  const navigate=useNavigate();
  const [currentTab,setCurrentTab]=useState("dashboard");
  const [searchQuery,setSearchQuery]=useState("");
  const [isDarkMode,setIsDarkMode]=useState(false);
  const [activePatient,setActivePatient]=useState(null);
  const [reports,setReports]=useState([]);
  const [assessment,setAssessment]=useState(null);
  const [patientData,setPatientData]=useState(null);
  const [appointments]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const loadDashboard=async()=>{
      try{
        const profile=await getMyProfile();
        const patientId=profile?.patient?.id;

        const [report,assessmentData,progress]=await Promise.all([
          getMyReport(),
          getMyAssessment(),
          patientId?getAssessmentProgress(patientId):Promise.resolve(null)
        ]);

        const mergedPatient={
          ...(profile?.patient||{}),
          ...(report?.patient||{})
        };

        setPatientData({
          profile,
          report,
          assessment:assessmentData,
          progress
        });

        setActivePatient(mergedPatient);
        setReports(report?.labReports||[]);
        setAssessment(assessmentData?.data||null);
      }catch(err){
        console.error("Dashboard Error:",err);
      }finally{
        setLoading(false);
      }
    };

    loadDashboard();
  },[]);

  const handleLogout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    sessionStorage.clear();
    navigate("/login",{replace:true});
  };

  const handleToggleTheme=()=>{
    setIsDarkMode(prev=>!prev);
  };

  if(loading||!patientData){
    return(
      <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#F8F6F1] px-5">
        <div className="absolute h-[260px] w-[260px] rounded-full bg-emerald-400/10 blur-3xl animate-pulse sm:h-[340px] sm:w-[340px] lg:h-[420px] lg:w-[420px]"/>
        <div className="absolute h-[220px] w-[220px] rounded-full bg-[#C9A75B]/10 blur-3xl animate-pulse delay-500 sm:h-[280px] sm:w-[280px] lg:h-[320px] lg:w-[320px]"/>

        <div className="relative flex w-full max-w-md flex-col items-center">
          <div className="relative flex items-center justify-center scale-[.78] sm:scale-90 lg:scale-100">
            <div className="absolute h-40 w-40 rounded-full border-2 border-emerald-300/40 animate-ping"/>
            <div className="absolute h-52 w-52 rounded-full border border-[#C9A75B]/20"/>
            <div className="absolute h-44 w-44 rounded-full border border-emerald-500/30 animate-spin [animation-duration:8s]"/>
            <div className="absolute h-32 w-32 rounded-full border border-[#C9A75B]/40 animate-spin [animation-duration:5s] [animation-direction:reverse]"/>

            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#06152A] to-[#0B2442] shadow-[0_0_45px_rgba(30,122,58,.35)]">
              <img src={logo} alt="DarshAI" className="h-16 w-16 object-contain"/>
            </div>
          </div>

          <h2 className="mt-6 text-center font-serif text-2xl font-bold leading-tight text-[#06152A] sm:text-3xl lg:text-4xl">
            Initializing Your<br/>Wellness Dashboard
          </h2>

          <p className="mt-4 max-w-xs text-center text-sm leading-7 text-slate-500 sm:max-w-md sm:text-base">
            Securely retrieving your health records, biomarkers and personalized Ayurvedic intelligence.
          </p>

          <div className="mt-8 w-full max-w-xs sm:max-w-sm">
            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-emerald-500 via-[#C9A75B] to-emerald-500 animate-[loading_2.2s_linear_infinite]"/>
            </div>

            <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[.18em] text-slate-400 sm:text-xs">
              <span>Geo Wellness</span>
              <span>Loading...</span>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes loading{
            0%{transform:translateX(-100%)}
            100%{transform:translateX(100%)}
          }
        `}</style>
      </div>
    );
  }

  return(
    <TourProvider>
      <DashboardShell
        profile={patientData?.profile}
        report={patientData?.report}
        assessment={patientData?.assessment}
        progress={patientData?.progress}
        activePatient={activePatient}
        currentTab={currentTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        patients={activePatient?[activePatient]:[]}
        onSelectPatient={()=>{}}
        onLogout={handleLogout}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      >
        <Outlet
          context={{
            patientData,
            activePatient,
            reports,
            assessment,
            appointments,
            isDarkMode,
            onToggleTheme:handleToggleTheme
          }}
        />
      </DashboardShell>

      <TourHelper
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
    </TourProvider>
  );
}