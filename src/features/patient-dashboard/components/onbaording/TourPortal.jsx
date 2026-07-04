import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function TourPortal({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[999] pointer-events-none">
      <div className="pointer-events-auto h-full w-full">
        {children}
      </div>
    </div>,
    document.body
  );
}