import WelcomeModal from "./WelcomeModal";
import TourPortal from "./TourPortal";
import TourOverlay from "./TourOverlay";
import TourSpotlight from "./TourSpotlight";
import TourStep from "./TourStep";
import useTour from "./useTour";

const prefix = window.innerWidth < 768 ? "mobile-sidebar": "sidebar";
const steps = [
  {
    id: 1,
    tab: "dashboard",
    target: `#${prefix}-dashboard`,
    category: "Navigation",
    title: "Wellness Overview",
    description:
      "Monitor your vitality score, wellness summary and personalized health intelligence from one place.",
  },
  {
    id: 2,
    tab: "assessment",
    target: `#${prefix}-assessment`,
    category: "Assessment",
    title: "My Assessments",
    description:
      "Complete Geo-Prakriti assessments and clinical questionnaires.",
  },
  {
    id: 3,
    tab: "report",
    target: `#${prefix}-report`,
    category: "Reports",
    title: "Health Reports",
    description:
      "View AI reports, downloadable summaries and wellness analytics.",
  },
  {
    id: 4,
    tab: "result",
    target: `#${prefix}-result`,
    category: "Insights",
    title: "Health Insights",
    description:
      "Review personalized AI recommendations and longevity trends.",
  },
  {
    id: 5,
    tab: "settings",
    target: `#${prefix}-settings`,
    category: "Settings",
    title: "Profile & Preferences",
    description:
      "Manage your profile, preferences and account settings.",
  },
];

export default function TourHelper({
  currentTab,
  setCurrentTab,
}) {
  const tour = useTour(steps, setCurrentTab);

  if (!tour.completed && !tour.isOpen)
    return (
      <WelcomeModal
        open
        onStart={tour.startTour}
        onSkip={tour.finishTour}
      />
    );

  if (!tour.isOpen || !tour.currentStep)
    return null;

  return (
    <TourPortal>
      <TourOverlay
        open={tour.isOpen}
        target={tour.targetElement}
      />

      <TourSpotlight
        target={tour.targetElement}
      />

      <TourStep
        step={tour.currentStep}
        total={tour.totalSteps}
        target={tour.targetRect}
        onBack={tour.prevStep}
        onNext={() => tour.nextStep(tour.totalSteps)}
        onSkip={tour.finishTour}
      />
    </TourPortal>
  );
}