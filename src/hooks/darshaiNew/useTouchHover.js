import { useCallback, useEffect, useRef, useState } from "react";

export default function useTouchHover() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isTouchActive, setIsTouchActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const coarsePointer = window.matchMedia(
      "(hover: none), (pointer: coarse)"
    );

    const updatePointerType = () => {
      setIsTouchDevice(coarsePointer.matches);
    };

    updatePointerType();

    coarsePointer.addEventListener?.("change", updatePointerType);

    return () => {
      coarsePointer.removeEventListener?.("change", updatePointerType);
    };
  }, []);

  const handleTouchStart = useCallback(
    (event) => {
      if (!isTouchDevice) return;

      setIsTouchActive(true);
    },
    [isTouchDevice]
  );

  const handleTouchEnd = useCallback(
    (event) => {
      if (!isTouchDevice) return;

      const target = event.currentTarget;

      window.setTimeout(() => {
        if (!target?.matches(":focus")) {
          setIsTouchActive(false);
        }
      }, 180);
    },
    [isTouchDevice]
  );

  const handleTouchCancel = useCallback(() => {
    if (!isTouchDevice) return;

    setIsTouchActive(false);
  }, [isTouchDevice]);

  return {
    ref,
    isTouchDevice,
    isTouchActive,
    touchProps: {
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      onTouchCancel: handleTouchCancel,
    },
  };
}