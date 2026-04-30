import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "@/features/dashboard/components/layout/Sidebar";
import RightPanel from "@/components/RightPanel";
import TopNavbar from "@/features/dashboard/components/layout/TopNavBar";
import AddPatientModal from "@/features/dashboard/components/patients/AddPatientModal"; // ✅ ADD THIS
import { ChevronLeft, ChevronRight } from "lucide-react";

const DoctorDashboardLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(false);

  // 🔥 NEW: MODAL STATE
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative h-screen bg-[#F6F9F8] overflow-hidden">

      {/* LEFT SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full z-40 transform transition-all duration-500 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* RIGHT PANEL */}
      <div
        className={`fixed top-0 right-0 h-full z-40 transform transition-all duration-500 ${
          showRightPanel ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <RightPanel />
      </div>

      {/* FLOAT BUTTONS */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="fixed top-20 left-3 z-50 bg-white shadow-lg rounded-full p-2"
      >
        {showSidebar ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      <button
        onClick={() => setShowRightPanel(!showRightPanel)}
        className="fixed top-20 right-3 z-50 bg-white shadow-lg rounded-full p-2"
      >
        {showRightPanel ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* MAIN CONTENT */}
      <div
        className={`
          flex flex-col h-full transition-all duration-500
          ${showSidebar ? "ml-64" : ""}
          ${showRightPanel ? "mr-[320px]" : ""}
        `}
      >
        {/* 🔥 PASS OPEN MODAL */}
        <TopNavbar openModal={() => setShowModal(true)} />

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <Outlet />
        </div>
      </div>

      {/* OVERLAY */}
      {(showSidebar || showRightPanel) && (
        <div
          className="fixed inset-0 bg-black/10 z-30"
          onClick={() => {
            setShowSidebar(false);
            setShowRightPanel(false);
          }}
        />
      )}

      {/* 🔥 MODAL AT ROOT LEVEL */}
      {showModal && (
        <AddPatientModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default DoctorDashboardLayout;