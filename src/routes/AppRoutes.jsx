import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import DoctorDashboard from "../pages/Dashboard/DoctorDashboard";
import Patients from "../pages/Dashboard/Patients";
import Biometrics from "../pages/Dashboard/Biometrics";
import Alerts from "../pages/Dashboard/Alerts";
import DoshaEngine from "../pages/Dashboard/DoshaEngine";
import Protocols from "../pages/Dashboard/Protocols";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Auth/Login";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Signup from "../pages/Auth/Signup";

import Retreats from "../pages/Dashboard/Retreats";
import Reports from "../pages/Dashboard/Reports";
import Messages from "../pages/Dashboard/Messages";
import Settings from "../pages/Dashboard/Settings";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="patients" element={<Patients />} />
        <Route path="biometrics" element={<Biometrics />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="dosha" element={<DoshaEngine />} />
        <Route path="protocols" element={<Protocols />} />
        <Route path="retreats" element={<Retreats />} />
        <Route path="reports" element={<Reports />} />
        <Route path="messages" element={<Messages />} />
        <Route path="settings" element={<Settings />} />
        <Route path="contact" element={<Contact />} />

      </Route>
<Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
};

export default AppRoutes;
