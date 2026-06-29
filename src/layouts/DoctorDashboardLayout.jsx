import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Sidebar from "@/features/dashboard/components/layout/Sidebar";
import TopNavbar from "@/features/dashboard/components/layout/TopNavBar";
import RightPanel from "@/components/RightPanel";
import AddPatientModal from "@/features/dashboard/components/patients/AddPatientModal";

const DoctorDashboardLayout = () => {
  const [expanded, setExpanded] = useState(false);
  const [pinned, setPinned] = useState(false);

  const [showRightPanel, setShowRightPanel] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

const hideSidebarRoutes = [
  "/dashboard/lifestyle-matrix",
  "/dashboard/lifestyle-matrix-result",
  "/dashboard/assessments",
  "/dashboard/prakriti",
  "/dashboard/vikriti",
  "/dashboard/agni",
  "/dashboard/ama",
  "/dashboard/result-summary",
];

const isAssessmentPage = hideSidebarRoutes.some((route) =>
  location.pathname.startsWith(route)
);

  return (
    <div className="h-screen bg-[#F6F9F8] overflow-hidden">

      {/* Sidebar */}
     {!isAssessmentPage && (
  <div
    className="fixed left-0 top-0 z-40 h-screen"
    onMouseEnter={() => !pinned && setExpanded(true)}
    onMouseLeave={() => !pinned && setExpanded(false)}
  >
    <Sidebar expanded={expanded} />
  </div>
)}

      {/* Right Panel */}
     {!isAssessmentPage && (
  <div
    className={`
      fixed top-0 right-0 h-screen z-40
      transition-transform duration-300
      ${showRightPanel ? "translate-x-0" : "translate-x-full"}
    `}
  >
    <RightPanel />
  </div>
)}

      {/* Sidebar Toggle */}
      {/* <button
        onClick={() => {
          setPinned(!pinned);
          setExpanded(!pinned);
        }}
        className="
          fixed top-20 z-50
          bg-white rounded-full
          shadow-lg p-2
          transition-all duration-300
        "
        style={{
          left: expanded ? "248px" : "20px",
        }}
      >
        {expanded ? (
          <ChevronLeft size={18} />
        ) : (
          <ChevronRight size={18} />
        )}
      </button> */}

      {/* Right Panel Toggle */}
      {/* <button
        onClick={() => setShowRightPanel(!showRightPanel)}
        className="
          fixed top-20 z-50
          bg-white rounded-full
          shadow-lg p-2
          transition-all duration-300
        "
        style={{
          right: showRightPanel ? "308px" : "12px",
        }}
      >
        {showRightPanel ? (
          <ChevronRight size={18} />
        ) : (
          <ChevronLeft size={18} />
        )}
      </button> */}

      {/* Main Content */}
      <div
  className={`
    h-screen flex flex-col
    transition-all duration-300 ease-out
    ${
      isAssessmentPage
        ? "ml-0"
        : expanded
          ? "ml-[280px]"
          : "ml-[72px]"
    }
    ${
      isAssessmentPage
        ? "mr-0"
        : showRightPanel
          ? "mr-[320px]"
          : "mr-0"
    }
  `}
>
        <TopNavbar openModal={() => setShowModal(true)} />

        <main className="flex-1 overflow-y-auto px-6 pb-6">
          <Outlet />
        </main>
      </div>

      {/* Overlay for Right Panel */}
      {showRightPanel && (
        <div
          className="fixed inset-0 bg-black/10 z-30"
          onClick={() => setShowRightPanel(false)}
        />
      )}

      {/* Add Patient Modal */}
      {showModal && (
        <AddPatientModal
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default DoctorDashboardLayout;