import OverviewTab from "./tabs/OverviewTab";
import BiomarkerTab from "./tabs/BiomarkerTab";
import ReportsTab from "./tabs/ReportsTab";
import HistoryTab from "./tabs/HistoryTab";

import {
  FaUser,
  FaHeartbeat,
  FaFileMedical,
  FaHistory,
} from "react-icons/fa";

const PatientTabs = ({ activeTab, setActiveTab, patient }) => {
  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: <FaUser />,
    },
    {
      id: "biomarkers",
      label: "Biomarkers",
      icon: <FaHeartbeat />,
    },
    {
      id: "reports",
      label: "Reports",
      icon: <FaFileMedical />,
    },
    {
      id: "history",
      label: "History",
      icon: <FaHistory />,
    },
  ];

  return (
    <div className="space-y-6">

      {/* 🔹 TAB HEADER */}
      <div className="bg-white p-2 rounded-full shadow-sm flex items-center gap-2 w-fit">

        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm transition-all duration-200
              
              ${
                activeTab === tab.id
                  ? "bg-[#F1F5F4] text-[#1E293B] font-medium shadow-inner"
                  : "text-gray-500 hover:bg-gray-100"
              }
            `}
          >
            <span className="text-xs">{tab.icon}</span>
            {tab.label}
          </button>
        ))}

      </div>

      {/* 🔹 TAB CONTENT */}
      <div className="transition-all duration-300">

        {activeTab === "overview" && (
          <OverviewTab patient={patient} />
        )}

        {activeTab === "biomarkers" && (
          <BiomarkerTab patient={patient} />
        )}

        {activeTab === "reports" && (
          <ReportsTab patient={patient} />
        )}

        {activeTab === "history" && (
          <HistoryTab patient={patient} />
        )}

      </div>

    </div>
  );
};

export default PatientTabs;