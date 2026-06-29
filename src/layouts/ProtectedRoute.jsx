// import { Navigate, Outlet, useLocation } from "react-router-dom";

// const ProtectedRoute = () => {
//   const token = localStorage.getItem("token");
//   const location = useLocation();

//   const isValidToken =
//     token && token !== "undefined" && token !== "null";

//   // ❌ NOT LOGGED IN → redirect to login
//   if (!isValidToken) {
//     return (
//       <Navigate
//         to="/login"
//         state={{ from: location }}
//         replace
//       />
//     );
//   }

//   // ✅ LOGGED IN → allow access
//   return <Outlet />;
// };

// export default ProtectedRoute;

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