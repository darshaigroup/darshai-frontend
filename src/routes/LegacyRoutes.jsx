import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import CareerLayout from "@/layouts/CareerLayout";
import RouteLoader from "@/layouts/RouteLoader";

import Home from "@/pages/Home/HomeMain";
import Philosophy from "@/pages/Home/Philosophy";
import OurStory from "@/pages/OurStory/StoryMain";
import OurProgram from "@/pages/OurProgram/ProgramMain";
import ProgramDetail from "@/pages/OurProgram/ProgramDetail";
import GeoWellnessCentres from "@/pages/GeoWellness/GeoWellnessCentres";
import GeoWellnessCentreDetail from "@/pages/GeoWellness/GeoWellnessCentreDetail";
import InternationalWellnessIndia from "@/pages/InternationalWellness/InternationalWellnessIndia";
import CareerLanding from "@/pages/careers/CareerLanding/CareerLanding";
import Explore from "@/pages/Explore/ExploreMain";
import BlogArticle from "@/pages/Explore/BlogArticle";
import FlipBookPage from "@/components/Explore/FlipBookPage";
import ComingSoon from "@/components/Explore/ComingSoon";
import ContactUs from "@/pages/Contact/ContactMain";
import PrivacyPolicy from "@/pages/LegalFile/PrivacyPolicy";
import TermsConditions from "@/pages/LegalFile/TermsConditions";
import Register from "@/pages/Auth/Register";
import EnquiryPage from "@/pages/Enquiry/WellnessEnquiry";

export default function LegacyRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<RouteLoader />}>
          <Route index element={<Home />} />
          <Route path="philosophy" element={<Philosophy />} />
          <Route path="story" element={<OurStory />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="program" element={<OurProgram />} />
          <Route path="program/:slug" element={<ProgramDetail />} />
          <Route path="geo-wellness-centres" element={<GeoWellnessCentres />} />
          <Route path="geo-wellness-centres/:slug" element={<GeoWellnessCentreDetail />} />
          <Route path="international-wellness-india" element={<InternationalWellnessIndia />} />
          <Route path="insights" element={<Explore />} />
          <Route path="insights/:slug" element={<BlogArticle />} />
          <Route path="explore" element={<Explore />} />
          <Route path="explore/:category" element={<Explore />} />
          <Route path="blog/:slug" element={<BlogArticle />} />
          <Route path="begin-your-journey" element={<Register />} />
          <Route path="pdf/:file" element={<FlipBookPage />} />
          <Route path="coming-soon/:type" element={<ComingSoon />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-and-conditions" element={<TermsConditions />} />
        </Route>
      </Route>
        <Route path="/enquiry" element={<EnquiryPage/>}/>
      <Route element={<CareerLayout />}>
        <Route element={<RouteLoader />}>
          <Route path="careers" element={<CareerLanding />} />
        </Route>
      </Route>
    </Routes>
  );
}
