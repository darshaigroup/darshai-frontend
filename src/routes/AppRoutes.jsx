import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "@/layouts/MainLayout";
import DashboardLayout from "@/layouts/DoctorDashboardLayout";
import RouteLoader from "@/layouts/RouteLoader";
import ProtectedRoute from "@/layouts/ProtectedRoute";
import PatientProtectedRoute from "@/routes/PatientProtectedRoute";

// Public
const Home = lazy(() => import("@/pages/Home/HomeMain"));
const Philosophy = lazy(() => import("@/pages/Home/Philosophy"));
const OurStory = lazy(() => import("@/pages/OurStory/StoryMain"));
const OurProgram = lazy(() => import("@/pages/OurProgram/ProgramMain"));
const ProgramDetail = lazy(() => import("@/pages/OurProgram/ProgramDetail"));
const GeoWellnessCenter = lazy(() => import("@/pages/OurProgram/GeoWellnessCenter"));
const GeoWellnessCategory = lazy(() =>
  import("@/pages/OurProgram/GeoWellnessCenter").then((m) => ({
    default: m.GeoWellnessCategory,
  }))
);
const Explore = lazy(() => import("@/pages/Explore/ExploreMain"));
const BlogArticle = lazy(() => import("@/pages/Explore/BlogArticle"));
const FlipBookPage = lazy(() => import("@/components/Explore/FlipBookPage"));
const ComingSoon = lazy(() => import("@/components/Explore/ComingSoon"));
const ContactUs = lazy(() => import("@/pages/Contact/ContactMain"));
const PrivacyPolicy = lazy(() => import("@/pages/LegalFile/PrivacyPolicy"));
const TermsConditions = lazy(() => import("@/pages/LegalFile/TermsConditions"));
const Welcome = lazy(() => import("@/pages/Lifestyle/Welcome"));
const OnboardingFlow = lazy(() => import("@/pages/Lifestyle/OnboardingFlow"));
const Review = lazy(() => import("@/pages/Lifestyle/Review"));
const WellnessBlueprint = lazy(() => import("@/pages/Lifestyle/WellnessBlueprint"));

// Dashboard
const Overview = lazy(() => import("@/features/dashboard/pages/Overview"));
const Analysis = lazy(() => import("@/features/dashboard/pages/Analysis"));
const Patients = lazy(() => import("@/features/dashboard/pages/Patients"));
const PatientProfile = lazy(() => import("@/features/dashboard/pages/PatientProfile"));
const Reports = lazy(() => import("@/features/dashboard/pages/Reports"));
const GeoWellness = lazy(() => import("@/features/dashboard/pages/GeoWellness"));
const Questionnaires = lazy(() => import("@/features/dashboard/pages/Questionnaires"));
const PatientReportSummary = lazy(() => import("@/features/dashboard/pages/PatientReportSummary"));

const ReportDisplay = lazy(() => import("@/features/dashboard/components/reports/ReportDisplay"));
const Assessment = lazy(() => import("@/features/dashboard/assessments/pages/Assessment"));
const Result = lazy(() => import("@/features/dashboard/assessments/pages/Result"));
const LifestyleMatrixAssessment = lazy(() => import("@/features/dashboard/assessments/pages/LifestyleMatrixAssessment"));
const LifestyleMatrixResult = lazy(() => import("@/features/dashboard/assessments/pages/LifestyleMatrixResult"));
const AyurvedaAssessment = lazy(() => import("@/features/dashboard/assessments/pages/AyurvedaAssessment"));
const AyurvedaResult = lazy(() => import("@/features/dashboard/assessments/pages/AyurvedaResult"));
const ClinicalDataAssessment = lazy(() => import("@/features/dashboard/assessments/pages/ClinicalDataAssessment"));
const ClinicalDataResult = lazy(() => import("@/features/dashboard/assessments/pages/ClinicalDataResult"));
const ResultSummary = lazy(() => import("@/features/dashboard/assessments/pages/ResultSummary"));
const LabReportViewer = lazy(() => import("@/features/dashboard/assessments/pages/LabReportViewer"));

// Patient Dashboard
const PatientDashboardLayout = lazy(() =>
  import("@/features/patient-dashboard/layouts/PatientDashboardLayout")
);

// Auth
const Login = lazy(() => import("@/pages/Auth/Login"));
const Register = lazy(() => import("@/pages/Auth/Register"));

const AppRoutes = () => {
  return (

    <Suspense fallback={<RouteLoader />}>
    <Routes>
      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/lifestyle/welcome" element={<Welcome />} />
      <Route path="/lifestyle/onboarding" element={<OnboardingFlow />} />
      <Route path="/lifestyle/review" element={<Review />} />
      <Route path="/lifestyle/blueprint" element={<WellnessBlueprint />} />

      {/* PUBLIC */}
      <Route element={<MainLayout />}>
        <Route element={<RouteLoader />}>
          <Route path="/" element={<Home />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/story" element={<OurStory />} />
          <Route path="/contact" element={<ContactUs />} />

          <Route path="/program" element={<OurProgram />} />

          <Route path="/program/:slug" element={<ProgramDetail />} />
          <Route
            path="/program/geo-wellness-center"
            element={<GeoWellnessCenter />}
          />
          <Route
            path="/program/geo-wellness-center/:category"
            element={<GeoWellnessCategory />}
          />

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
            <Route
              path="report-display/:patientId"
              element={<ReportDisplay />}
            />
            <Route
              path="patient-report-summary/:patientId"
              element={<PatientReportSummary />}
            />
            <Route path="geowellness" element={<GeoWellness />} />
            <Route path="questionnaires" element={<Questionnaires />} />
            <Route
              path="lifestyle-matrix-assessment"
              element={<LifestyleMatrixAssessment />}
            />
            <Route
              path="lifestyle-matrix-result"
              element={<LifestyleMatrixResult />}
            />
            <Route path="assessments" element={<Assessment />} />
            <Route path="result" element={<Result />} />
            <Route
              path="ayurveda-assessment"
              element={<AyurvedaAssessment />}
            />
            <Route path="ayurveda-result" element={<AyurvedaResult />} />
            <Route
              path="clinical-data-assessment"
              element={<ClinicalDataAssessment />}
            />
            <Route
              path="clinical-data-result"
              element={<ClinicalDataResult />}
            />
            <Route path="result-summary" element={<ResultSummary />} />
            <Route
              path="result-summary/:patientId"
              element={<ResultSummary />}
            />
            <Route path="lab-reports/:id" element={<LabReportViewer />} />
          </Route>
        </Route>
      </Route>

      <Route element={<PatientProtectedRoute />}>
        <Route path="/patient-dashboard" element={<PatientDashboardLayout />} />
      </Route>
    </Routes>
    </Suspense>

  );
};

export default AppRoutes;
