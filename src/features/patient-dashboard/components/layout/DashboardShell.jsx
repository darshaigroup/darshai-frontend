import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AppleDock from "./AppleDock";
import MobileSidebar from "./MobileSidebar";

export default function DashboardShell({
  children,
  activePatient,
  currentTab,
  setCurrentTab,
  searchQuery,
  setSearchQuery,
  onLogout,
  patients,
  onSelectPatient,
  isDarkMode,
  onToggleTheme,
  onRestartTour,
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          activePatient={activePatient}
          onLogout={onLogout}
          isDarkMode={isDarkMode}
          onToggleTheme={onToggleTheme}
        />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        activePatient={activePatient}
        onLogout={onLogout}
      />

      <div className="flex-1 lg:ml-72 min-w-0">
        <Header
          activePatient={activePatient}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onLogout={onLogout}
          patients={patients}
          onSelectPatient={onSelectPatient}
          currentTab={currentTab}
          isDarkMode={isDarkMode}
          onToggleTheme={onToggleTheme}
          onRestartTour={onRestartTour}
          onOpenSidebar={() => setMobileSidebarOpen(true)}
        />

        <main className="p-4 md:p-6 lg:p-8 pb-28">
          {children}
        </main>

        <AppleDock
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          activePatient={activePatient}
        />
      </div>
    </div>
  );
}