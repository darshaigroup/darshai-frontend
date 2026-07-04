import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardShell from "../components/layout/DashboardShell";
import { TourProvider } from "../components/onbaording/TourContext";
import DashboardPage from "../pages/DashboardPage";
import AssessmentPage from "../pages/AssessmentPage";
import ReportsPage from "../pages/ReportsPage";
import ResultsPage from "../pages/ResultsPage";
import SettingsPage from "../pages/SettingsPage";
import TourHelper from "../components/onbaording/TourHelper";
export default function PatientDashboardLayout() {
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  /* -------------------------------------------------------------------------- */
  /* Logout                                                                      */
  /* -------------------------------------------------------------------------- */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    sessionStorage.clear();

    navigate("/login", { replace: true });
  };
  const activePatient = useMemo(
    () => ({
      id: 1,
      full_name: "Rupesh Dash",
      avatar: "https://i.pravatar.cc/300?img=12",
      email: "rupesh@darshai.com",
      vitalityScore: 88,
      primaryDosha: "Pitta • Vata",
      risk: "Low",
      alerts: [],
      city: "Bangalore",
      biometrics: {
        vitalityScore: 88,
      },
    }),
    []
  );

  const appointments = [];
  const reports = [];


  const renderPage = () => {
    switch (currentTab) {
      case "assessment":
        return <AssessmentPage activePatient={activePatient} />;

      case "report":
        return <ReportsPage reports={reports} />;

      case "result":
        return <ResultsPage activePatient={activePatient} />;

      case "settings":
        return <SettingsPage activePatient={activePatient} />;

      default:
        return (
          <DashboardPage
            activePatient={activePatient}
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
    patients={[activePatient]}
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