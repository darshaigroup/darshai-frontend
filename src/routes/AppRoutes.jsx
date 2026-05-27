import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "@/layouts/MainLayout";
import DashboardLayout from "@/layouts/DoctorDashboardLayout";
import RouteLoader from "@/layouts/RouteLoader";
import ProtectedRoute from "@/layouts/ProtectedRoute";


// Public Pages
import Home from "@/pages/Home/HomeMain";
import Philosophy from "@/pages/Home/Philosophy";
import OurStory from "@/pages/OurStory/StoryMain";
import OurProgram from "@/pages/OurProgram/ProgramMain";
import ProgramDetail from "@/pages/OurProgram/ProgramDetail";
import GeoWellnessCenter, { GeoWellnessCategory } from "@/pages/OurProgram/GeoWellnessCenter";
import Explore from "@/pages/Explore/ExploreMain";
import BlogArticle from "@/pages/Explore/BlogArticle";
import FlipBookPage from "@/components/Explore/FlipBookPage";
import ComingSoon from "@/components/Explore/ComingSoon";
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
import Assessment from "@/features/dashboard/assessments/pages/Assessment";

// Auth
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";

const AppRoutes = () => {
  return (
    <Routes>

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PUBLIC */}
      <Route element={<MainLayout />}>
        <Route element={<RouteLoader />}>
          <Route path="/" element={<Home />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/story" element={<OurStory />} />
          <Route path="/contact" element={<ContactUs />} />

          <Route path="/program" element={<OurProgram />} />

          <Route
            path="/program/:slug"
            element={<ProgramDetail />}
          />
          <Route path="/program/geo-wellness-center" element={<GeoWellnessCenter />} />
          <Route path="/program/geo-wellness-center/:category" element={<GeoWellnessCategory />} />

          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/:category" element={<Explore />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/pdf/:file" element={<FlipBookPage />} />
          <Route path="/coming-soon/:type" element={<ComingSoon />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
        </Route>
      </Route>

      {/* PROTECTED DASHBOARD */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>

          <Route element={<RouteLoader />}>
            <Route index element={<Overview />} />
            <Route path="analysis" element={<Analysis />} />
            <Route path="patients" element={<Patients />} />
            <Route path="patients/:id" element={<PatientProfile />} />
            <Route path="reports" element={<Reports />} />
            <Route path="geowellness" element={<GeoWellness />} />
            <Route path="questionnaires" element={<Questionnaires />} />
            <Route path="/dashboard/assessments" element={<Assessment />} />
          </Route>

        </Route>
      </Route>

    </Routes>
  );
};

export default AppRoutes;