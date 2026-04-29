import { Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "../layouts/MainLayout";

// Public Pages
import Home from "../pages/Home/HomeMain";
import Philosophy from "../pages/Home/Philosophy";
import OurStory from "../pages/OurStory/StoryMain";
import OurProgram from "../pages/OurProgram/ProgramMain";
import Explore from "../pages/Explore/ExploreMain";
import ContactUs from "../pages/Contact/ContactMain";

// Patient Dashboard
import PatientLayout from "../pages/PatientDashboard/PatientLayout";
import Assessment from "../pages/PatientDashboard/Assessment";
import Result from "../pages/PatientDashboard/Result";
import PatientDetails from "../pages/PatientDashboard/PatientDetails";

// Auth
import Login from "../pages/Auth/Login";

const AppRoutes = () => {
  return (
    <Routes>

      {/* AUTH */}
      <Route path="/login" element={<Login />} />

      {/* MAIN WEBSITE */}
      <Route element={<MainLayout />}>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* PHILOSOPHY (Your swipe page stays here) */}
        <Route path="/philosophy" element={<Philosophy />} />

        {/* STORY */}
        <Route path="/story" element={<OurStory />} />

        {/* CONTACT */}
        <Route path="/contact" element={<ContactUs />} />

        {/* PROGRAM */}
        <Route path="/program" element={<OurProgram />} />
        <Route path="/program/:category" element={<OurProgram />} />

        {/* EXPLORE */}
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/:category" element={<Explore />} />

        {/* PATIENT DASHBOARD */}
        <Route path="/patient-dashboard/*" element={<PatientLayout />}>
          <Route index element={<PatientDetails />} />
          <Route path="profile" element={<PatientDetails />} />
          <Route path="assessment" element={<Assessment />} />
          <Route path="result" element={<Result />} />

          {/* Future Pages */}
          <Route path="biometrics" element={<div>Biometrics Coming Soon</div>} />
          <Route path="reports" element={<div>Reports Coming Soon</div>} />
          <Route path="settings" element={<div>Settings Coming Soon</div>} />
        </Route>

      </Route>

    </Routes>
  );
};

export default AppRoutes;