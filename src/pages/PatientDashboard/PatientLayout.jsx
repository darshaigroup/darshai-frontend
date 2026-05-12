import { Outlet } from "react-router-dom";
import PatientSidebar from "./PatientSidebar";
import TopNavbar from "./TopNavbar";

export default function PatientLayout() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <PatientSidebar />
      <div className="flex-1 flex flex-col">
        <TopNavbar />
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

