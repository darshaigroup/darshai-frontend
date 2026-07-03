import { Navigate, Outlet } from "react-router-dom";

export default function SalesProtectedRoute() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "sales") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}