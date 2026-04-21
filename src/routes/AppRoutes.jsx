import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/HomeMain";
import OurStory from "../pages/OurStory/StoryMain";
import OurProgram from "../pages/OurProgram/ProgramMain";
import Explore from "../pages/Explore/ExploreMain";
import ContactUs from "../pages/Contact/ContactMain";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/story" element={<OurStory />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/program" element={<OurProgram />} />
        <Route path="/program/geo-wellness" element={<OurProgram />} />
        <Route path="/program/treatment" element={<OurProgram />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/:category" element={<Explore />} />

      </Route>
    </Routes>
  );
};

export default AppRoutes;