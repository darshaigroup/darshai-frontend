// src/routes/AppRoutes.jsx

import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Auth
import ProtectedRoute from "./ProtectedRoute";

// Public Pages
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";

// Auth Pages
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import ForgotPassword from "../pages/Auth/ForgotPassword";

// Dashboard Pages
import DoctorDashboard from "../pages/Doctor-Dashboard/DoctorDashboard";
import Patients from "../pages/Doctor-Dashboard/Patients/Patients";
import Biometrics from "../pages/Doctor-Dashboard/Biometrics";
import Alerts from "../pages/Doctor-Dashboard/Alerts";
import Reports from "../pages/Doctor-Dashboard/Reports";

import Messages from "../pages/Doctor-Dashboard/Messages";
import Settings from "../pages/Doctor-Dashboard/Settings";
import QuestionnaireFlow from "../pages/Doctor-Dashboard/Questionnaire/QuestionnaireFlow";
import Loading from "../pages/Doctor-Dashboard/Questionnaire/Loading";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/biometrics" element={<Biometrics />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dashboard/patient-question" element={<QuestionnaireFlow />} />
        <Route path="/loading" element={<Loading />} />
      </Route>

    </Routes>
  );
}