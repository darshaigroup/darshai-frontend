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
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDarkMode
          ? "bg-[#071426]"
          : "bg-[#F6F3EC]"
      }`}
    >
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 h-screen z-40">
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          activePatient={activePatient}
          onLogout={onLogout}
        />
      </aside>

      {/* Mobile Sidebar */}
      <MobileSidebar
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        activePatient={activePatient}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <div className="lg:pl-72 min-h-screen flex flex-col">

        {/* Sticky Header */}
        <Header
          activePatient={activePatient}
          currentTab={currentTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          patients={patients}
          onSelectPatient={onSelectPatient}
          onLogout={onLogout}
          isDarkMode={isDarkMode}
          onToggleTheme={onToggleTheme}
          onRestartTour={onRestartTour}
          onOpenSidebar={() => setMobileSidebarOpen(true)}
        />

        {/* Dashboard Body */}
        <main className="flex-1 pb-36">
          <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6 lg:py-8">
            {children}
          </div>
        </main>

        {/* Floating Apple Dock */}
        <AppleDock
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          activePatient={activePatient}
        />
      </div>

      {/* Decorative Background Blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-140px] right-[-120px] w-[520px] h-[520px] rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute bottom-[-200px] left-[-180px] w-[620px] h-[620px] rounded-full bg-sky-500/5 blur-3xl" />
      </div>
    </div>
  );
}