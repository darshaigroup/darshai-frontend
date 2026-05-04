import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
// import DashboardLayout from "../layouts/DashboardLayout";

// Public Pages
import Home from "../pages/Home/HomeMain";
import Philosophy from "../pages/Home/Philosophy";
import OurStory from "../pages/OurStory/StoryMain";
import OurProgram from "../pages/OurProgram/ProgramMain";
import GeoWellnessCenter from "../pages/OurProgram/GeoWellnessCenter";
import Explore from "../pages/Explore/ExploreMain";
import ContactUs from "../pages/Contact/ContactMain";

// Dashboard Pages (NEW)
// import {
//   Overview,
//   Analysis,
//   Patients,
//   Reports,
//   Schedule,
// } from "../features/dashboard";

// Auth
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import PatientProtectedRoute from "./PatientProtectedRoute";
import PatientLayout from "../pages/PatientDashboard/PatientLayout";
import Assessment from "../pages/PatientDashboard/Assessment";
import PatientDetails from "../pages/PatientDashboard/PatientDetails";
import Result from "../pages/PatientDashboard/Result";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🔐 AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 🌐 PUBLIC WEBSITE */}
      <Route element={<MainLayout />}>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* PHILOSOPHY */}
        <Route path="/philosophy" element={<Philosophy />} />

        {/* STORY */}
        <Route path="/story" element={<OurStory />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/program" element={<OurProgram />} />
        <Route path="/program/geo-wellness" element={<GeoWellnessCenter />} />
        <Route path="/program/treatment" element={<OurProgram />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/:category" element={<Explore />} />
      </Route>

      {/* 🩺 PATIENT DASHBOARD */}
      <Route path="/patient-dashboard/*" element={<PatientProtectedRoute />}>
        <Route path="" element={<PatientLayout />}>
          <Route index element={<PatientDetails />} />
          <Route path="assessment" element={<Assessment />} />
          <Route path="result" element={<Result />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;