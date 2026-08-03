import { Navigate, Outlet } from "react-router-dom";

export default function DoctorProtectedRoute() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "doctor") {
    return <Navigate to="/patient-dashboard" replace />;
  }

  return <Outlet />;
}