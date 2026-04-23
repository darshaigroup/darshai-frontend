import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
 import DashboardLayout from "../layouts/DoctorDashboardLayout";

// Public Pages
import Home from "../pages/Home/HomeMain";
import OurStory from "../pages/OurStory/StoryMain";
import OurProgram from "../pages/OurProgram/ProgramMain";
import Explore from "../pages/Explore/ExploreMain";
import ContactUs from "../pages/Contact/ContactMain";

//Dashboard Pages (NEW)
import {
  Overview,
  Analysis,
  Patients,
  GeoWellness,
  Reports,
  Questionnaires,
} from "../features/dashboard";

// Auth
import Login from "../pages/Auth/Login";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🔐 AUTH */}
      <Route path="/login" element={<Login />} />

      {/* 🌐 PUBLIC WEBSITE */}
      <Route element={<MainLayout />}>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* STORY */}
        <Route path="/story" element={<OurStory />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/program" element={<OurProgram />} />
        <Route path="/program/geo-wellness" element={<OurProgram />} />
        <Route path="/program/treatment" element={<OurProgram />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/:category" element={<Explore />} />
      </Route>

      {/* 🩺 DOCTOR DASHBOARD */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="analysis" element={<Analysis />} />
        <Route path="patients" element={<Patients />} />
        <Route path="reports" element={<Reports />} />
        <Route path="geowellness" element={<GeoWellness />} />
        <Route path="questionnaires" element={<Questionnaires />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;