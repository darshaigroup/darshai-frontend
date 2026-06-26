import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardShell from "../components/layout/DashboardShell";

import DashboardPage from "../pages/DashboardPage";
import AssessmentPage from "../pages/AssessmentPage";
import ReportsPage from "../pages/ReportsPage";
import ResultsPage from "../pages/ResultsPage";
import SettingsPage from "../pages/SettingsPage";

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

  /* -------------------------------------------------------------------------- */
  /* Temporary Demo Patient (Replace with API later)                             */
  /* -------------------------------------------------------------------------- */

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

  /* -------------------------------------------------------------------------- */

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
      onRestartTour={() => {}}
    >
      {renderPage()}
    </DashboardShell>
  );
}