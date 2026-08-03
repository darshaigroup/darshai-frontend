import { Navigate, Outlet } from "react-router-dom";

export default function HRProtectedRoute() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "hr") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}