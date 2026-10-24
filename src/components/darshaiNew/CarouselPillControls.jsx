import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
export function CarouselPillControls({
  total,
  currentIndex,
  onChange,
  onPrev,
  onNext,
  layout = "split",
  variant = "light",
  showArrows = true,
  showBorder = true,
  className = "",
}) {
  if (total <= 1) return null;
  const handlePrev = () => {
    if (onPrev) {
      onPrev();
    } else {
      onChange(currentIndex === 0 ? total - 1 : currentIndex - 1);
    }
  };
  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      onChange(currentIndex === total - 1 ? 0 : currentIndex + 1);
    }
  };
  const isDark = variant === "dark";
  // Dash color tokens matching Apple design in screenshot
  const activeDashColor = isDark
    ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]"
    : "bg-[#1D1D1F]";
  const inactiveDashColor = isDark
    ? "bg-white/30 hover:bg-white/50"
    : "bg-[#C7C7CC] hover:bg-[#A1A1A6]";
  const arrowBtnColor = isDark
    ? "bg-[#1C1C1E] hover:bg-[#2C2C2E] active:scale-95 text-white border border-white/15"
    : "bg-white hover:bg-[#F5F5F7] active:scale-95 text-[#1D1D1F] border border-[#D2D2D7] shadow-xs";
  const borderColor = isDark ? "border-white/15" : "border-[#D2D2D7]";
  if (layout === "centered") {
    return (
      <div
        className={`flex items-center justify-center gap-3.5 sm:gap-4.5 ${showBorder ? `pt-4 sm:pt-5 border-t ${borderColor}` : ""} ${className}`}
      >
        {showArrows && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${arrowBtnColor} flex items-center justify-center transition-all cursor-pointer shrink-0`}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </button>
        )}
        <div className="flex items-center gap-1.5 sm:gap-2 py-1">
          {Array.from({ length: total }).map((_, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                type="button"
                onClick={() => onChange(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="cursor-pointer transition-all duration-300 focus:outline-none flex items-center justify-center py-1.5 px-0.5"
                key={idx}
              >
                <div
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive
                      ? `w-7 sm:w-9 ${activeDashColor}`
                      : `w-3 sm:w-3.5 ${inactiveDashColor}`
                  }`}
                />
              </button>
            );
          })}
        </div>
        {showArrows && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${arrowBtnColor} flex items-center justify-center transition-all cursor-pointer shrink-0`}
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </button>
        )}
      </div>
    );
  }
  // Exact split design as shown in Screenshot (176).png:
  // Hairline top border, horizontal dashes on the left, circular prev/next buttons on the right.
  return (
    <div
      className={`w-full flex items-center justify-between gap-4 ${showBorder ? `pt-4 sm:pt-5 border-t ${borderColor}` : ""} ${className}`}
    >
      <div className="flex items-center gap-1.5 sm:gap-2 py-1">
        {Array.from({ length: total }).map((_, idx) => {
          const isActive = currentIndex === idx;
          return (
            <button
              type="button"
              onClick={() => onChange(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="cursor-pointer transition-all duration-300 focus:outline-none flex items-center justify-center py-1.5 px-0.5"
              key={idx}
            >
              <div
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isActive
                    ? `w-7 sm:w-9 ${activeDashColor}`
                    : `w-3 sm:w-3.5 ${inactiveDashColor}`
                }`}
              />
            </button>
          );
        })}
      </div>
      {showArrows && (
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${arrowBtnColor} flex items-center justify-center transition-all cursor-pointer shrink-0`}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${arrowBtnColor} flex items-center justify-center transition-all cursor-pointer shrink-0`}
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </button>
        </div>
      )}
    </div>
  );
}
export default CarouselPillControls;
