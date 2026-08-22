import { Navigate, Outlet } from "react-router-dom";

export default function PatientProtectedRoute() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.role || localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!["client", "patient"].includes(String(role).toLowerCase())) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}