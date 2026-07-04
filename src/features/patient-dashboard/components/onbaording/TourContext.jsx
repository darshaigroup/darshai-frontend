import { createContext, useContext, useMemo, useState, useEffect } from "react";

const TourContext = createContext(null);

export function TourProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const finished = localStorage.getItem("dashboard-tour-completed") === "true";
    setCompleted(finished);
  }, []);

  const startTour = () => {
    setStep(0);
    setCompleted(false);
    setIsOpen(true);
  };

  const restartTour = () => {
    localStorage.removeItem("dashboard-tour-completed");
    setStep(0);
    setCompleted(false);
    setIsOpen(true);
  };

  const nextStep = total => {
    if (step >= total - 1) return finishTour();
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(prev => prev - 1);
  };

  const goToStep = index => {
    if (index >= 0) setStep(index);
  };

  const closeTour = () => setIsOpen(false);

  const finishTour = () => {
    localStorage.setItem("dashboard-tour-completed", "true");
    setCompleted(true);
    setIsOpen(false);
    setStep(0);
  };

  const skipTour = () => finishTour();

  const resetTour = () => {
    localStorage.removeItem("dashboard-tour-completed");
    setCompleted(false);
    setStep(0);
    setIsOpen(false);
  };

  const value = useMemo(
    () => ({
      isOpen,
      step,
      completed,
      startTour,
      restartTour,
      nextStep,
      prevStep,
      goToStep,
      closeTour,
      finishTour,
      skipTour,
      resetTour,
    }),
    [isOpen, step, completed]
  );

  return (
    <TourContext.Provider value={value}>
      {children}
    </TourContext.Provider>
  );
}

export const useTourContext = () => {
  const context = useContext(TourContext);

  if (!context)
    throw new Error("useTourContext must be used inside TourProvider");

  return context;
};

export default TourContext;