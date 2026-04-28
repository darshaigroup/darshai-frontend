import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "@/layouts/MainLayout";
import DashboardLayout from "@/layouts/DoctorDashboardLayout";

// Public Pages
import Home from "@/pages/Home/HomeMain";
import OurStory from "@/pages/OurStory/StoryMain";
import OurProgram from "@/pages/OurProgram/ProgramMain";
import Explore from "@/pages/Explore/ExploreMain";
import ContactUs from "@/pages/Contact/ContactMain";
import PrivacyPolicy from "@/pages/LegalFile/PrivacyPolicy";
import TermsConditions from "@/pages/LegalFile/TermsConditions";


// Dashboard Pages
import Overview from "@/features/dashboard/pages/Overview";
import Analysis from "@/features/dashboard/pages/Analysis";
import Patients from "@/features/dashboard/pages/Patients";
import GeoWellness from "@/features/dashboard/pages/GeoWellness";
import Reports from "@/features/dashboard/pages/Reports";
import Questionnaires from "@/features/dashboard/pages/Questionnaires";
import PatientProfile from "@/features/dashboard/pages/PatientProfile";
import RouteLoader from "@/layouts/RouteLoader";
// Auth
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PUBLIC */}
     
      <Route element={<MainLayout />}>
       <Route element={<RouteLoader />}>
        <Route path="/" element={<Home />} />
        <Route path="/story" element={<OurStory />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* ✅ FIXED */}
        <Route path="/program" element={<OurProgram />} />
        <Route path="/program/:category" element={<OurProgram />} />
        <Route path="/program/treatment" element={<OurProgram />} /> 

        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/:category" element={<Explore />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsConditions />} />
      </Route>
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
