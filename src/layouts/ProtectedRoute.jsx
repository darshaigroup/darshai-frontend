import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  const isValidToken =
    token && token !== "undefined" && token !== "null";

  // ❌ NOT LOGGED IN → redirect to login
  if (!isValidToken) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // ✅ LOGGED IN → allow access
  return <Outlet />;
};

export default ProtectedRoute;