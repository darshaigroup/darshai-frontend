import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import WelcomeModal from "./WelcomeModal";
import TourStep from "./TourStep";

export default function OnboardingOverlay({
  steps,
  setCurrentTab,
  isMobileSidebarOpen,
  setMobileSidebarOpen,
  onComplete,
}) {
  const [phase, setPhase] = useState("welcome");
  const [stepIndex, setStepIndex] = useState(0);
  const [position, setPosition] = useState({ top: 100, left: 100 });

  const currentStep = steps[stepIndex];

  const updatePosition = () => {
    const element = document.getElementById(currentStep?.elementId);

    if (!element) {
      setPosition({
        top: window.innerHeight / 2 - 150,
        left: window.innerWidth < 768 ? 16 : window.innerWidth / 2 - 180,
      });
      return;
    }

    const rect = element.getBoundingClientRect();

    if (window.innerWidth < 1024) {
      setPosition({
        top: rect.bottom + 12,
        left: 16,
      });
    } else {
      setPosition({
        top: rect.top,
        left: rect.right + 20,
      });
    }
  };

  useEffect(() => {
    if (phase !== "tour" || !currentStep) return;

    setCurrentTab(currentStep.tab);

    if (window.innerWidth < 1024 && !isMobileSidebarOpen) {
      setMobileSidebarOpen(true);
    }

    const timer = setTimeout(updatePosition, 250);

    return () => clearTimeout(timer);
  }, [phase, stepIndex]);

  useEffect(() => {
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [phase, stepIndex]);

  const finishTour = () => {
    localStorage.setItem("darshai-tour-completed", "true");
    onComplete();
  };

  const nextStep = () => {
    if (stepIndex >= steps.length - 1) {
      finishTour();
      return;
    }

    setStepIndex(prev => prev + 1);
  };

  const prevStep = () => {
    if (stepIndex > 0) setStepIndex(prev => prev - 1);
  };

  return (
    <AnimatePresence mode="wait">
      {phase === "welcome" && (
        <WelcomeModal
          onStart={() => setPhase("tour")}
          onSkip={finishTour}
        />
      )}

      {phase === "tour" && (
        <>
          <div className="fixed inset-0 z-[99] bg-black/50 backdrop-blur-sm" />

          <TourStep
            step={currentStep}
            current={stepIndex}
            total={steps.length}
            position={position}
            isLast={stepIndex === steps.length - 1}
            onNext={nextStep}
            onPrev={prevStep}
            onSkip={finishTour}
          />
        </>
      )}
    </AnimatePresence>
  );
}