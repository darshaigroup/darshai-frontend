import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/HomeMain";
import OurStory from "../pages/OurStory/StoryMain";
import ProgramMain from "../pages/OurProgram/ProgramMain";

import Explore from "../pages/Explore/ExploreMain";
import ContactUs from "../pages/Contact/ContactMain";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* STORY */}
        <Route path="/story" element={<OurStory />} />

        {/* PROGRAM (ONE FILE HANDLES ALL) */}
        <Route path="/program">
          <Route index element={<ProgramMain />} />
          <Route path=":category" element={<ProgramMain />} />
        </Route>

        {/* EXPLORE */}
        <Route path="/explore">
          <Route index element={<Explore />} />
          <Route path=":category" element={<Explore />} />
        </Route>

        {/* CONTACT */}
        <Route path="/contact" element={<ContactUs />} />

      </Route>
    </Routes>
  );
};

export default AppRoutes;