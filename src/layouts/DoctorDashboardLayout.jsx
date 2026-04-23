import { Outlet } from "react-router-dom";
import Sidebar from "@/features/dashboard/components/layout/Sidebar";
import TopNavbar from "@/features/dashboard/components/layout/TopNavbar";
import RightPanel from "@/components/RightPanel"; // 👈 already exists

const DashboardLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main + Right Panel */}
      <div className="flex-1 flex bg-gray-100 min-h-screen">
        
        {/* MAIN CONTENT */}
        <div className="flex-1">
          <TopNavbar />

          <div className="p-6 flex-1 bg-[#F4F7F6] min-h-screen">
            <Outlet />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-[300px] border-l bg-white hidden lg:block">
          <RightPanel />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;