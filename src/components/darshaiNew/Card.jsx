import React, { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

export function Card({
  children,
  variant = "default",
  padding = "standard",
  bordered = false,
  interactive = false,
  cursorHighlight = true,
  className = "",
  as: Component = "div",
  onPointerMove,
  onPointerLeave,
  onPointerDown,
  onPointerUp,
  ...props
}) {
  const cardRef = useRef(null);
  const rafId = useRef(null);
  const touchResetTimer = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const [coords, setCoords] = useState({
    x: 0,
    y: 0,
    active: false,
  });

  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isTouchPressed, setIsTouchPressed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(pointer: fine)");

    const updatePointerType = () => {
      setIsFinePointer(mediaQuery.matches);
    };

    updatePointerType();
    mediaQuery.addEventListener?.("change", updatePointerType);

    return () => {
      mediaQuery.removeEventListener?.("change", updatePointerType);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (touchResetTimer.current) clearTimeout(touchResetTimer.current);
    };
  }, []);

  const updateTouchPosition = useCallback((event) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    setCoords({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      active: true,
    });
  }, []);

  const handlePointerMove = useCallback(
    (event) => {
      onPointerMove?.(event);

      if (
        !interactive ||
        !cursorHighlight ||
        shouldReduceMotion ||
        !isFinePointer
      ) {
        return;
      }

      if (rafId.current) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        updateTouchPosition(event);
      });
    },
    [
      cursorHighlight,
      interactive,
      isFinePointer,
      onPointerMove,
      shouldReduceMotion,
      updateTouchPosition,
    ],
  );

  const handlePointerDown = useCallback(
    (event) => {
      onPointerDown?.(event);

      if (
        !interactive ||
        shouldReduceMotion ||
        event.pointerType !== "touch"
      ) {
        return;
      }

      if (touchResetTimer.current) {
        clearTimeout(touchResetTimer.current);
      }

      updateTouchPosition(event);
      setIsTouchPressed(true);
    },
    [
      interactive,
      onPointerDown,
      shouldReduceMotion,
      updateTouchPosition,
    ],
  );

  const handlePointerUp = useCallback(
    (event) => {
      onPointerUp?.(event);

      if (event.pointerType !== "touch") return;

      touchResetTimer.current = setTimeout(() => {
        setIsTouchPressed(false);
        setCoords((prev) => ({ ...prev, active: false }));
      }, 140);
    },
    [onPointerUp],
  );

  const handlePointerCancel = useCallback((event) => {
    if (event.pointerType !== "touch") return;

    if (touchResetTimer.current) {
      clearTimeout(touchResetTimer.current);
    }

    setIsTouchPressed(false);
    setCoords((prev) => ({ ...prev, active: false }));
  }, []);

  const handlePointerLeave = useCallback(
    (event) => {
      onPointerLeave?.(event);

      if (rafId.current) cancelAnimationFrame(rafId.current);

      if (event.pointerType !== "touch") {
        setCoords((prev) => ({ ...prev, active: false }));
      }
    },
    [onPointerLeave],
  );

  const classes = [
    "relative overflow-hidden",
    "transition-all duration-500",
    "ease-[cubic-bezier(0.22,1,0.36,1)]",
    "rounded-[20px] md:rounded-[24px]",
  ];

  if (variant === "dark") {
    classes.push(
      "bg-[#1D1D1F] text-white",
      "border border-white/10",
      "shadow-[0_4px_24px_-2px_rgba(0,0,0,0.25)]",
    );
  } else if (variant === "subtle") {
    classes.push(
      "bg-[#F5F5F7] text-[#1D1D1F]",
      "shadow-[0_2px_12px_-2px_rgba(29,29,31,0.03)]",
    );
  } else if (variant === "bordered") {
    classes.push(
      "bg-white text-[#1D1D1F]",
      "border border-[#D2D2D7]",
      "shadow-[0_4px_20px_-2px_rgba(29,29,31,0.04),0_2px_6px_-1px_rgba(29,29,31,0.02)]",
    );
  } else {
    classes.push(
      "bg-white text-[#1D1D1F]",
      "shadow-[0_4px_20px_-2px_rgba(29,29,31,0.04),0_2px_6px_-1px_rgba(29,29,31,0.02)]",
    );
  }

  if (bordered && variant !== "bordered" && variant !== "dark") {
    classes.push("border border-[#D2D2D7]");
  }

  if (padding === "standard") {
    classes.push("p-6 md:p-8");
  } else if (padding === "compact") {
    classes.push("p-6");
  } else if (padding === "spacious") {
    classes.push("p-8 md:p-10");
  }

  if (interactive) {
    classes.push("cursor-pointer");

    if (!shouldReduceMotion) {
      classes.push(
        "hover:scale-[1.015]",
        "active:scale-[0.985]",
        "touch-manipulation",
      );

      if (variant === "dark") {
        classes.push(
          "hover:border-white/25",
          "hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.4)]",
        );
      } else {
        classes.push(
          "hover:border-[#0E4D3A]",
          "hover:shadow-[0_8px_26px_-4px_rgba(29,29,31,0.07),0_3px_8px_-2px_rgba(29,29,31,0.03)]",
        );
      }
    }

    if (isTouchPressed && !shouldReduceMotion) {
      classes.push("scale-[0.985]");
    }
  }

  const showHighlight =
    interactive &&
    cursorHighlight &&
    coords.active &&
    !shouldReduceMotion &&
    (isFinePointer || isTouchPressed);

  return (
    <Component
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      className={`${classes.join(" ")} ${className}`.trim()}
      {...props}
    >
      {showHighlight && (
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-200"
          style={{
            background:
              variant === "dark"
                ? `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(255,255,255,0.08), transparent 70%)`
                : `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(14,77,58,0.06), transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-20">{children}</div>
    </Component>
  );
}

export default Card;