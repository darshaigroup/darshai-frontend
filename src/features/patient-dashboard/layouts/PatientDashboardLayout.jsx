import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardShell from "../components/layout/DashboardShell";
import { TourProvider } from "../components/onbaording/TourContext";
import DashboardPage from "../pages/DashboardPage";
import AssessmentPage from "../pages/AssessmentPage";
import ReportsPage from "../pages/ReportsPage";
import ResultsPage from "../pages/ResultsPage";
import SettingsPage from "../pages/SettingsPage";
import TourHelper from "../components/onbaording/TourHelper";
import logo from "@/assets/images/logos.png"
import {getMyProfile,getMyReport,getMyAssessment,} from "../services/patientDashboardService";

export default function PatientDashboardLayout() {
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [activePatient, setActivePatient] = useState(null);
  const [reports, setReports] = useState([]);
  const [assessment, setAssessment] = useState(null);
  const [patientData,setPatientData]=useState(null);
  const [appointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
       const [profile,report,assessmentData]=await Promise.all([
  getMyProfile(),
  getMyReport(),
  getMyAssessment(),
]);

setPatientData({profile,report,assessment:assessmentData,});

       setActivePatient({...(profile.patient||{}),...(report.patient||{}),});
        setReports(report.labReports || []);
        setAssessment(assessmentData.data || null);
      } catch (err) {
        console.error("Dashboard Error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

if(loading||!patientData){
  return(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#F8F6F1] px-5">

      {/* Background Glow */}
      <div className="absolute w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px] rounded-full bg-emerald-400/10 blur-3xl animate-pulse"/>
      <div className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] lg:w-[320px] lg:h-[320px] rounded-full bg-[#C9A75B]/10 blur-3xl animate-pulse delay-500"/>

      <div className="relative flex w-full max-w-md flex-col items-center">

        {/* Scanner */}
        <div className="relative flex items-center justify-center scale-[.78] sm:scale-90 lg:scale-100">

          <div className="absolute h-40 w-40 rounded-full border-2 border-emerald-300/40 animate-ping"/>
          <div className="absolute h-52 w-52 rounded-full border border-[#C9A75B]/20"/>
          <div className="absolute h-44 w-44 rounded-full border border-emerald-500/30 animate-spin [animation-duration:8s]"/>
          <div className="absolute h-32 w-32 rounded-full border border-[#C9A75B]/40 animate-spin [animation-duration:5s] [animation-direction:reverse]"/>

          {/* Logo */}
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#06152A] to-[#0B2442] shadow-[0_0_45px_rgba(30,122,58,.35)]">

            <img
              src={logo}
              alt="DarshAI"
              className="h-16 w-16 object-contain"
            />

          </div>

        </div>

        {/* Heading */}
        <h2 className="mt-6 text-center text-2xl sm:text-3xl lg:text-4xl font-serif font-bold leading-tight text-[#06152A]">
          Initializing Your
          <br/>
          Wellness Dashboard
        </h2>

        {/* Description */}
        <p className="mt-4 max-w-xs sm:max-w-md text-center text-sm sm:text-base leading-7 text-slate-500">
          Securely retrieving your health records, AI insights,
          biomarkers and personalized Ayurvedic intelligence.
        </p>

        {/* Progress */}
        <div className="mt-8 w-full max-w-xs sm:max-w-sm">

          <div className="h-2 overflow-hidden rounded-full bg-slate-200">

            <div className="h-full w-full rounded-full bg-gradient-to-r from-emerald-500 via-[#C9A75B] to-emerald-500 animate-[loading_2.2s_linear_infinite]"/>

          </div>

          <div className="mt-3 flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-[.18em] text-slate-400">

            <span>Geo Wellness AI</span>

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

  const renderPage = () => {
    switch (currentTab) {
      case "assessment":
        return (
          <AssessmentPage
            activePatient={activePatient}
            assessment={assessment}
          />
        );

      case "report":
        return (
          <ReportsPage
            activePatient={activePatient}
            reports={reports}
          />
        );

      case "result":
        return (
          <ResultsPage
            activePatient={activePatient}
            assessment={assessment}
            reports={reports}
          />
        );

      case "settings":
        return (
          <SettingsPage
            activePatient={activePatient}
          />
        );

      default:
        return (
          <DashboardPage
           patientData={patientData}
           appointments={appointments}
           reports={reports}
            
          />
        );
    }
  };

  return (
    <TourProvider>
      <DashboardShell
        activePatient={activePatient}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        patients={activePatient ? [activePatient] : []}
        onSelectPatient={() => {}}
        onLogout={handleLogout}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(v => !v)}
      >
        {renderPage()}
      </DashboardShell>

      <TourHelper
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
    </TourProvider>
  );
}