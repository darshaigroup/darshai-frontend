import { useEffect, useMemo, useState } from "react";
import { useTourContext } from "./TourContext";
import {
  getElement,
  getRect,
  waitForElement,
  scrollToElement,
  pulseElement,
} from "./tourUtils";

export default function useTour(steps = [], onStepChange) {
  const tour = useTourContext();

  const [targetElement, setTargetElement] = useState(null);
  const [targetRect, setTargetRect] = useState(null);

  const currentStep = useMemo(
    () => steps[tour.step] || null,
    [steps, tour.step],
  );

  useEffect(() => {
    if (!tour.isOpen || !currentStep) return;

    const run = async () => {
      if (currentStep.tab && onStepChange) onStepChange(currentStep.tab);

      const el = await waitForElement(currentStep.target);
      //console.log("Current Target:", currentStep.target);

      if (!el) {
        setTargetElement(null);
        setTargetRect(null);
        return;
      }

      scrollToElement(currentStep.target);

      setTargetElement(el);
      setTargetRect(getRect(currentStep.target));   

      setTimeout(() => {
        pulseElement(currentStep.target);
      }, 300);
    };

    run();
  }, [tour.isOpen, tour.step, currentStep, onStepChange]);

  return {
    ...tour,
    currentStep,
    targetElement,
    targetRect,
    totalSteps: steps.length,
    isFirstStep: tour.step === 0,
    isLastStep: tour.step === steps.length - 1,
  };
}
