import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import AppleDock from "../components/layout/AppleDock";

export default function PatientDashboardLayout({
  children,
  currentTab,
  setCurrentTab,
  activePatient,
}) {
  return (
    <div className="min-h-screen flex bg-[#FAF9F5]">
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        activePatient={activePatient}
      />

      <div className="flex-1 ml-72">
        <Header activePatient={activePatient} />

        <main className="p-8 pb-28">
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