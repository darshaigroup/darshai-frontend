import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

export function Button({
  variant = "primary",
  children,
  showArrow = true,
  className = "",
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  ...props
}) {
  const resetTimer = useRef(null);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const handlePointerDown = (event) => {
    onPointerDown?.(event);

    if (event.pointerType === "touch") {
      if (resetTimer.current) clearTimeout(resetTimer.current);
      setIsPressed(true);
    }
  };

  const handlePointerUp = (event) => {
    onPointerUp?.(event);

    if (event.pointerType !== "touch") return;

    resetTimer.current = setTimeout(() => {
      setIsPressed(false);
    }, 140);
  };

  const handlePointerCancel = (event) => {
    onPointerCancel?.(event);

    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }

    setIsPressed(false);
  };

  let variantClass = "darshai-btn-primary";

  if (variant === "secondary") {
    variantClass = "darshai-btn-secondary";
  } else if (variant === "secondary-dark") {
    variantClass = "darshai-btn-secondary-dark";
  } else if (variant === "link") {
    variantClass = "darshai-btn-link";
  } else if (variant === "link-dark") {
    variantClass = "darshai-btn-link-dark";
  }

  const isLink = variant === "link" || variant === "link-dark";

  return (
    <button
      {...props}
      type={props.type || "button"}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      className={`group ${variantClass} touch-manipulation transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4D3A] focus-visible:ring-offset-2 ${
        isPressed ? "scale-[0.98]" : ""
      } ${className}`.trim()}
    >
      <span>{children}</span>

      {showArrow && (
        <ArrowRight
          className={`w-3.5 h-3.5 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[3px] ${
            isLink
              ? "text-[#1D1D1F]/70"
              : variant === "primary"
                ? "text-[#C6A660]"
                : variant === "secondary-dark" || variant === "link-dark"
                  ? "text-white/80"
                  : "text-[#1D1D1F]/70"
          } ${isPressed ? "translate-x-[2px]" : ""}`}
          aria-hidden="true"
        />
      )}
    </button>
  );
}

export default Button;