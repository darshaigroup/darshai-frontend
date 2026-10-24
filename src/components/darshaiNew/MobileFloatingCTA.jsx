import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { track } from "../../lib/darshaiNew/analytics";

const BAR_CONTEXT = {
  corporate: {
    label: "Corporate Geo-Wellness",
    buttonText: "BEGIN YOUR JOURNEY",
    target: "contact",
  },
  programs: {
    label: "Precision Protocols",
    buttonText: "BEGIN YOUR JOURNEY",
    target: "contact",
  },
  centres: {
    label: "Sanctuary Network",
    buttonText: "BEGIN YOUR JOURNEY",
    target: "contact",
  },
  "geo-wellness": {
    label: "Geo-Wellness Intelligence",
    buttonText: "BEGIN YOUR JOURNEY",
    target: "contact",
  },
  insights: {
    label: "DARSHAI Research",
    buttonText: "BEGIN YOUR JOURNEY",
    target: "contact",
  },
  international: {
    label: "International Journeys",
    buttonText: "BEGIN YOUR JOURNEY",
    target: "contact",
  },
};

const DEFAULT_CONTEXT = {
  label: "DARSHAI Geo-Wellness",
  buttonText: "BEGIN YOUR JOURNEY",
  target: "contact",
};

export function MobileFloatingCTA({ currentPage, onNavigate }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      const heroThreshold = 480;

      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;

      const footerOffset = 500;

      const bottomThreshold = Math.max(
        0,
        documentHeight - viewportHeight - footerOffset
      );

      const visible =
        scrollY > heroThreshold &&
        scrollY < bottomThreshold;

      setIsVisible(visible);
    };

    let ticking = false;

    const handleWindowScroll = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleWindowScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);

  if (!isVisible) return null;

  const context =
    BAR_CONTEXT[currentPage] || DEFAULT_CONTEXT;

  const handleClick = () => {
    track("consultation_request", {
      source: `sticky_bar_${currentPage}`,
    });

    track("begin_journey", {
      source: `sticky_bar_${currentPage}`,
    });

    onNavigate(context.target);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };

  return (
    <div
      id="global-sticky-consultation-bar"
      className="
        fixed
        z-[50]

        bottom-3
        sm:bottom-4
        md:bottom-5
        lg:bottom-6

        left-1/2
        -translate-x-1/2

        box-border

        w-[calc(100vw-24px)]
        sm:w-[calc(100vw-40px)]
        md:w-[calc(100vw-64px)]
        lg:w-[560px]

        max-w-[560px]

        p-2
        sm:p-2.5

        rounded-full

        bg-[#1D1D1F]/95
        backdrop-blur-md

        border
        border-white/15

        shadow-2xl

        flex
        items-center
        justify-center

        overflow-hidden

        animate-fade-up
      "
    >
      {/* DESKTOP / TABLET LABEL */}
      <div
        className="
          hidden
          sm:flex

          flex-1
          min-w-0

          items-center

          pl-2
          md:pl-3
          lg:pl-4

          pr-2
        "
      >
        <span
          className="
            block
            max-w-full

            truncate

            text-xs
            md:text-xs
            lg:text-xs

            font-semibold
            text-white

            tracking-wider
            uppercase
          "
        >
          {context.label}
        </span>
      </div>

      {/* CTA BUTTON */}
      <button
        type="button"
        onClick={handleClick}
        className="
          darshai-btn-primary

          box-border

          flex
          shrink-0
          items-center
          justify-center

          gap-2

          !h-11

          w-full
          sm:w-auto

          sm:min-w-[210px]

          !px-5
          sm:!px-6

          text-[11px]
          sm:text-xs
          lg:text-sm

          uppercase
          tracking-wider

          whitespace-nowrap

          cursor-pointer
        "
      >
        <span>{context.buttonText}</span>

        <ArrowRight
          className="
            w-4
            h-4
            shrink-0
            text-[#C6A660]
          "
          aria-hidden="true"
        />
      </button>
    </div>
  );
}

export default MobileFloatingCTA;