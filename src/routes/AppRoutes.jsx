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

// Dashboard Pages
import Overview from "../features/dashboard/pages/Overview";
import Analysis from "../features/dashboard/pages/Analysis";
import Patients from "../features/dashboard/pages/Patients";
import GeoWellness from "../features/dashboard/pages/GeoWellness";
import Reports from "../features/dashboard/pages/Reports";
import Questionnaires from "../features/dashboard/pages/Questionnaires";
import PatientProfile from "../features/dashboard/pages/PatientProfile";

// Auth
import Login from "../pages/Auth/Login";

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />

      {/* PUBLIC */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/story" element={<OurStory />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/program" element={<OurProgram />} />
        <Route path="/explore" element={<Explore />} />
      </Route>

      {/* DASHBOARD */}
      <Route path="/dashboard" element={<DashboardLayout />}>

        <Route index element={<Overview />} />

        <Route path="analysis" element={<Analysis />} />
        <Route path="patients" element={<Patients />} />

        {/* ✅ THIS IS CRITICAL */}
        <Route path="patients/:id" element={<PatientProfile />} />

        <Route path="reports" element={<Reports />} />
        <Route path="geowellness" element={<GeoWellness />} />
        <Route path="questionnaires" element={<Questionnaires />} />

      </Route>

    </Routes>
  );
};

export default AppRoutes;