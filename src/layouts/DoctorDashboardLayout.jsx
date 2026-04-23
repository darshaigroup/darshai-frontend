import { Outlet } from "react-router-dom";
import Sidebar from "../features/dashboard/components/Sidebar";
import TopNavbar from "../features/dashboard/components/TopNavbar";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <TopNavbar />

        <div className="p-4">
          <Outlet />   {/* 🔥 THIS IS IMPORTANT */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;