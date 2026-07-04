import { useState } from "react";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import Header from "./Header";
import AppleDock from "./AppleDock";
import useTour from "../onbaording/useTour";

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
  const { isOpen } = useTour();

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${
        isDarkMode ? "bg-[#071426]" : "bg-[#F6F3EC]"
      }`}
    >
      {/* Decorative Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute -bottom-56 -left-56 w-[640px] h-[640px] rounded-full bg-sky-500/5 blur-3xl" />
      </div>

      {/* Desktop + Tablet Sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 z-40 h-screen w-[290px]">
        <Sidebar
          idPrefix="sidebar"
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          activePatient={activePatient}
          onLogout={onLogout}
        />
      </aside>

      {/* Mobile Sidebar */}
      <MobileSidebar
          open={mobileSidebarOpen || isOpen}
        onClose={() => setMobileSidebarOpen(false)}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        activePatient={activePatient}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <div className="md:pl-[290px] flex min-h-screen flex-col">
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
          setMobileSidebarOpen={setMobileSidebarOpen}
        />

        <main className="flex-1 pb-32">
          <div className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8 xl:px-10 xl:py-8">
            {children}
          </div>
        </main>

        {/* Mobile Dock Only */}
        <div className="md:hidden">
          <AppleDock
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            activePatient={activePatient}
          />
        </div>
      </div>
    </div>
  );
}
