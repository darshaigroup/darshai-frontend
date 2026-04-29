import { Outlet } from "react-router-dom";

export default function PatientLayout() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

