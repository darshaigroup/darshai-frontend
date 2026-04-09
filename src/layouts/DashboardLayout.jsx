// src/layouts/DashboardLayout.jsx

import { Outlet } from "react-router-dom";
import TopNavbar from "../pages/Doctor-Dashboard/TopNavbar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-900">

    

      {/* Main Section */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <TopNavbar />

        {/* Content */}
        <div className="p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
}