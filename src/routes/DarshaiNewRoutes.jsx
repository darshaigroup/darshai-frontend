// import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
// import { useReducedMotion } from "motion/react";
// import { PageTransition } from "../components/darshaiNew/animations";
// import HomePage from "../pages/DarshaiNew/HomePage";
// import GeoWellnessPage from "../pages/DarshaiNew/GeoWellnessPage";
// import ProgramsPage from "../pages/DarshaiNew/ProgramsPage";
// import ProgramDetailPage from "../pages/DarshaiNew/ProgramDetailPage";
// import CentresPage from "../pages/DarshaiNew/CentresPage";
// import CentreDetailPage from "../pages/DarshaiNew/CentreDetailPage";
// import CorporatePage from "../pages/DarshaiNew/CorporatePage";
// import InternationalPage from "../pages/DarshaiNew/InternationalPage";
// import InsightsPage from "../pages/DarshaiNew/InsightsPage";
// import FeaturedArticlePage from "../pages/DarshaiNew/FeaturedArticlePage";
// import { PillarArticlePage } from "../pages/DarshaiNew/PillarArticlePage";
// import SeriesChapterPage from "../pages/DarshaiNew/SeriesChapterPage";
// import AboutPage from "../pages/DarshaiNew/AboutPage";
// import GovernancePage from "../pages/DarshaiNew/GovernancePage";
// import ContactPage from "../pages/DarshaiNew/ContactPage";
// import CareersPage from "../pages/DarshaiNew/CareersPage";
// import PrivacyPolicyPage from "../pages/DarshaiNew/PrivacyPolicyPage";
// import TermsPage from "../pages/DarshaiNew/TermsPage";
// import BookingCancellationPage from "../pages/DarshaiNew/BookingCancellationPage";
// import ClinicalWellnessDisclaimerPage from "../pages/DarshaiNew/ClinicalWellnessDisclaimerPage";
// import PartnerWithDarshaiPage from "../pages/DarshaiNew/PartnerWithDarshaiPage";
// import JourneyInvestmentPage from "../pages/DarshaiNew/JourneyInvestmentPage";

// const PAGE_TO_ROUTE = { home: "/", "geo-wellness": "/geo-wellness", programs: "/programs", centres: "/centres", corporate: "/corporate", international: "/international", insights: "/insights", about: "/about", governance: "/trust-governance", contact: "/contact", careers: "/careers", privacy: "/privacy", "privacy-policy": "/privacy", terms: "/terms-of-service", "terms-of-service": "/terms-of-service", "journey-investment": "/journey-investment", investment: "/journey-investment", beyond: "/programs", partner: "/partner-with-darshai", "partner-with-darshai": "/partner-with-darshai", "cancellation-policy": "/booking-cancellation", "booking-cancellation": "/booking-cancellation", disclaimer: "/clinical-wellness-disclaimer", "clinical-wellness-disclaimer": "/clinical-wellness-disclaimer" };

// export default function DarshaiNewRoutes() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const reduce = useReducedMotion();
//   const onNavigate = (pageId) => {
//     const [base, search] = String(pageId).split("?");
//     const targetBase = base.startsWith("/") ? base : PAGE_TO_ROUTE[base] || "/";
//     const target = `/darshai-new${targetBase}${search ? `?${search}` : ""}`;
//     if (target === location.pathname + location.search) { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
//     if (document.startViewTransition && !reduce) document.startViewTransition(() => navigate(target));
//     else navigate(target);
//   };
//   return <PageTransition key={location.pathname} page={location.pathname}>
//     <Routes>
//       <Route index element={<HomePage onNavigate={onNavigate} />} />
//       <Route path="geo-wellness" element={<GeoWellnessPage onNavigate={onNavigate} />} />
//       <Route path="programs" element={<ProgramsPage onNavigate={onNavigate} />} />
//       <Route path="programs/:slug" element={<ProgramDetailPage onNavigate={onNavigate} />} />
//       <Route path="program/:slug" element={<ProgramDetailPage onNavigate={onNavigate} />} />
//       <Route path="centres" element={<CentresPage onNavigate={onNavigate} />} />
//       <Route path="centres/:slug" element={<CentreDetailPage onNavigate={onNavigate} />} />
//       <Route path="center/:slug" element={<CentreDetailPage onNavigate={onNavigate} />} />
//       <Route path="corporate" element={<CorporatePage onNavigate={onNavigate} />} />
//       <Route path="international" element={<InternationalPage onNavigate={onNavigate} />} />
//       <Route path="insights" element={<InsightsPage onNavigate={onNavigate} />} />
//       <Route path="insights/the-missing-variable-in-wellness-may-be-geography" element={<FeaturedArticlePage onNavigate={onNavigate} />} />
//       <Route path="insights/featured" element={<FeaturedArticlePage onNavigate={onNavigate} />} />
//       <Route path="insights/article/:articleSlug" element={<PillarArticlePage onNavigate={onNavigate} />} />
//       <Route path="insights/pillar/:articleSlug" element={<PillarArticlePage onNavigate={onNavigate} />} />
//       <Route path="insights/series/:chapterSlug" element={<SeriesChapterPage onNavigate={onNavigate} />} />
//       <Route path="series/:chapterSlug" element={<SeriesChapterPage onNavigate={onNavigate} />} />
//       <Route path="geo-wellness-series/:chapterSlug" element={<SeriesChapterPage onNavigate={onNavigate} />} />
//       <Route path="about" element={<AboutPage onNavigate={onNavigate} />} />
//       <Route path="trust-governance" element={<GovernancePage onNavigate={onNavigate} />} />
//       <Route path="contact" element={<ContactPage onNavigate={onNavigate} />} />
//       <Route path="careers" element={<CareersPage onNavigate={onNavigate} />} />
//       <Route path="privacy" element={<PrivacyPolicyPage onNavigate={onNavigate} />} />
//       <Route path="privacy-policy" element={<PrivacyPolicyPage onNavigate={onNavigate} />} />
//       <Route path="terms" element={<TermsPage onNavigate={onNavigate} />} />
//       <Route path="terms-of-service" element={<TermsPage onNavigate={onNavigate} />} />
//       <Route path="booking-cancellation" element={<BookingCancellationPage onNavigate={onNavigate} />} />
//       <Route path="cancellation-policy" element={<BookingCancellationPage onNavigate={onNavigate} />} />
//       <Route path="clinical-wellness-disclaimer" element={<ClinicalWellnessDisclaimerPage onNavigate={onNavigate} />} />
//       <Route path="disclaimer" element={<ClinicalWellnessDisclaimerPage onNavigate={onNavigate} />} />
//       <Route path="partner-with-darshai" element={<PartnerWithDarshaiPage onNavigate={onNavigate} />} />
//       <Route path="journey-investment" element={<JourneyInvestmentPage onNavigate={onNavigate} />} />
//       <Route path="investment" element={<JourneyInvestmentPage onNavigate={onNavigate} />} />
//       <Route path="*" element={<HomePage onNavigate={onNavigate} />} />
//     </Routes>
//   </PageTransition>;
// }

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useReducedMotion } from "motion/react";
import { PageTransition } from "../components/darshaiNew/animations";
import HomePage from "../pages/DarshaiNew/HomePage";
import GeoWellnessPage from "../pages/DarshaiNew/GeoWellnessPage";
import ProgramsPage from "../pages/DarshaiNew/ProgramsPage";
import ProgramDetailPage from "../pages/DarshaiNew/ProgramDetailPage";
import CentresPage from "../pages/DarshaiNew/CentresPage";
import CentreDetailPage from "../pages/DarshaiNew/CentreDetailPage";
import CorporatePage from "../pages/DarshaiNew/CorporatePage";
import InternationalPage from "../pages/DarshaiNew/InternationalPage";
import InsightsPage from "../pages/DarshaiNew/InsightsPage";
import FeaturedArticlePage from "../pages/DarshaiNew/FeaturedArticlePage";
import { PillarArticlePage } from "../pages/DarshaiNew/PillarArticlePage";
import SeriesChapterPage from "../pages/DarshaiNew/SeriesChapterPage";
import AboutPage from "../pages/DarshaiNew/AboutPage";
import GovernancePage from "../pages/DarshaiNew/GovernancePage";
import ContactPage from "../pages/DarshaiNew/ContactPage";
import CareersPage from "../pages/DarshaiNew/CareersPage";
import PrivacyPolicyPage from "../pages/DarshaiNew/PrivacyPolicyPage";
import TermsPage from "../pages/DarshaiNew/TermsPage";
import BookingCancellationPage from "../pages/DarshaiNew/BookingCancellationPage";
import ClinicalWellnessDisclaimerPage from "../pages/DarshaiNew/ClinicalWellnessDisclaimerPage";
import PartnerWithDarshaiPage from "../pages/DarshaiNew/PartnerWithDarshaiPage";
import JourneyInvestmentPage from "../pages/DarshaiNew/JourneyInvestmentPage";

const PAGE_TO_ROUTE = {
  home: "/",
  "geo-wellness": "/geo-wellness",
  programs: "/programs",
  centres: "/centres",
  corporate: "/corporate",
  international: "/international",
  insights: "/insights",
  about: "/about",
  governance: "/trust-governance",
  contact: "/contact",
  careers: "/careers",
  privacy: "/privacy",
  "privacy-policy": "/privacy",
  terms: "/terms-of-service",
  "terms-of-service": "/terms-of-service",
  "journey-investment": "/journey-investment",
  investment: "/journey-investment",
  beyond: "/programs",
  partner: "/partner-with-darshai",
  "partner-with-darshai": "/partner-with-darshai",
  "cancellation-policy": "/booking-cancellation",
  "booking-cancellation": "/booking-cancellation",
  disclaimer: "/clinical-wellness-disclaimer",
  "clinical-wellness-disclaimer": "/clinical-wellness-disclaimer",
};

export default function DarshaiNewRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  const onNavigate = (pageId) => {
    const [base, search] = String(pageId).split("?");
    const targetBase = base.startsWith("/")
      ? base
      : PAGE_TO_ROUTE[base] || "/";

    const target = `/legacy${targetBase}${search ? `?${search}` : ""}`;

    if (target === location.pathname + location.search) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (document.startViewTransition && !reduce) {
      document.startViewTransition(() => navigate(target));
    } else {
      navigate(target);
    }
  };

  return (
    <PageTransition key={location.pathname} page={location.pathname}>
      <Routes>
        <Route index element={<HomePage onNavigate={onNavigate} />} />
        <Route path="geo-wellness" element={<GeoWellnessPage onNavigate={onNavigate} />} />
        <Route path="programs" element={<ProgramsPage onNavigate={onNavigate} />} />
        <Route path="programs/:slug" element={<ProgramDetailPage onNavigate={onNavigate} />} />
        <Route path="program/:slug" element={<ProgramDetailPage onNavigate={onNavigate} />} />
        <Route path="centres" element={<CentresPage onNavigate={onNavigate} />} />
        <Route path="centres/:slug" element={<CentreDetailPage onNavigate={onNavigate} />} />
        <Route path="center/:slug" element={<CentreDetailPage onNavigate={onNavigate} />} />
        <Route path="corporate" element={<CorporatePage onNavigate={onNavigate} />} />
        <Route path="international" element={<InternationalPage onNavigate={onNavigate} />} />
        <Route path="insights" element={<InsightsPage onNavigate={onNavigate} />} />
        <Route path="insights/the-missing-variable-in-wellness-may-be-geography" element={<FeaturedArticlePage onNavigate={onNavigate} />} />
        <Route path="insights/featured" element={<FeaturedArticlePage onNavigate={onNavigate} />} />
        <Route path="insights/article/:articleSlug" element={<PillarArticlePage onNavigate={onNavigate} />} />
        <Route path="insights/pillar/:articleSlug" element={<PillarArticlePage onNavigate={onNavigate} />} />
        <Route path="insights/series/:chapterSlug" element={<SeriesChapterPage onNavigate={onNavigate} />} />
        <Route path="series/:chapterSlug" element={<SeriesChapterPage onNavigate={onNavigate} />} />
        <Route path="geo-wellness-series/:chapterSlug" element={<SeriesChapterPage onNavigate={onNavigate} />} />
        <Route path="about" element={<AboutPage onNavigate={onNavigate} />} />
        <Route path="trust-governance" element={<GovernancePage onNavigate={onNavigate} />} />
        <Route path="contact" element={<ContactPage onNavigate={onNavigate} />} />
        <Route path="careers" element={<CareersPage onNavigate={onNavigate} />} />
        <Route path="privacy" element={<PrivacyPolicyPage onNavigate={onNavigate} />} />
        <Route path="privacy-policy" element={<PrivacyPolicyPage onNavigate={onNavigate} />} />
        <Route path="terms" element={<TermsPage onNavigate={onNavigate} />} />
        <Route path="terms-of-service" element={<TermsPage onNavigate={onNavigate} />} />
        <Route path="booking-cancellation" element={<BookingCancellationPage onNavigate={onNavigate} />} />
        <Route path="cancellation-policy" element={<BookingCancellationPage onNavigate={onNavigate} />} />
        <Route path="clinical-wellness-disclaimer" element={<ClinicalWellnessDisclaimerPage onNavigate={onNavigate} />} />
        <Route path="disclaimer" element={<ClinicalWellnessDisclaimerPage onNavigate={onNavigate} />} />
        <Route path="partner-with-darshai" element={<PartnerWithDarshaiPage onNavigate={onNavigate} />} />
        <Route path="journey-investment" element={<JourneyInvestmentPage onNavigate={onNavigate} />} />
        <Route path="investment" element={<JourneyInvestmentPage onNavigate={onNavigate} />} />
        <Route path="*" element={<HomePage onNavigate={onNavigate} />} />
      </Routes>
    </PageTransition>
  );
}