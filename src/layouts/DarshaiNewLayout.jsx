import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/darshaiNew/Navbar";
import Footer from "../components/darshaiNew/Footer";
import MobileFloatingCTA from "../components/darshaiNew/MobileFloatingCTA";
import ScrollProgress from "../components/darshaiNew/ScrollProgress";
import "../styles/darshaiNew.css";

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

const ROUTE_TO_PAGE = Object.fromEntries(
  Object.entries(PAGE_TO_ROUTE).map(([page, route]) => [route, page])
);

export default function DarshaiNewLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const relativePath = location.pathname || "/";

  const currentPage =
    ROUTE_TO_PAGE[relativePath] ||
    (relativePath.startsWith("/insights")
      ? "insights"
      : relativePath.startsWith("/centres") || relativePath.startsWith("/center")
        ? "centres"
        : relativePath.startsWith("/programs") || relativePath.startsWith("/program")
          ? "programs"
          : "home");

  const onNavigate = (pageId) => {
    const [basePage, search] = String(pageId).split("?");
    const basePath = basePage.startsWith("/")
      ? basePage
      : basePage.includes("/")
        ? `/${basePage}`
        : PAGE_TO_ROUTE[basePage] || "/";
    const target = search ? `${basePath}?${search}` : basePath;

    if (target === location.pathname + location.search) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }

    navigate(target);
  };

  return (
    <div className="darshai-new-site min-h-screen flex flex-col bg-[#F5F5F7]">
      <ScrollProgress />
      <Navbar currentPage={currentPage} onNavigate={onNavigate} />
      <main
        id="darshai-new-main-content"
        className="flex-1 focus:outline-none"
        tabIndex={-1}
        aria-label="Main Content"
      >
        <Outlet />
      </main>
      <MobileFloatingCTA currentPage={currentPage} onNavigate={onNavigate} />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
