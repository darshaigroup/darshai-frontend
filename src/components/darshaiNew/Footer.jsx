import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { track } from "../../lib/darshaiNew/analytics";
const footerSections = [
  {
    title: "Explore",
    links: [
      { label: "Geo-Wellness", page: "geo-wellness" },
      { label: "Programs", page: "programs" },
      { label: "Centres", page: "centres" },
      { label: "Insights", page: "insights" },
    ],
  },
  {
    title: "Journeys & Services",
    links: [
      { label: "Journey Investment", page: "journey-investment" },
      { label: "Corporate", page: "corporate" },
      { label: "International", page: "international" },
    ],
  },
  {
    title: "Company & Partnerships",
    links: [
      { label: "About DARSHAI", page: "about" },
      { label: "Contact", page: "contact" },
      { label: "Careers", page: "careers" },
      { label: "Partner with DARSHAI", page: "partner" },
    ],
  },
  {
    title: "Trust & Legal",
    links: [
      { label: "Booking & Cancellation", page: "cancellation-policy" },
      { label: "Clinical & Wellness Disclaimer", page: "disclaimer" },
    ],
  },
];
export function Footer({ onNavigate }) {
  const [openAccordion, setOpenAccordion] = useState(null);
  const navigateTo = (page) => {
    onNavigate(page);
    if (!page.includes("#")) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  return (
    <footer className="bg-[#131315] text-white border-t border-white/10 pt-12 sm:pt-16 pb-10 sm:pb-12">
      <div className="darshai-container px-6 sm:px-8 lg:px-12 max-w-[1320px] mx-auto">
        <div className="mb-8 sm:mb-10">
          <button
            onClick={() => navigateTo("home")}
            className="flex items-center gap-3 text-left cursor-pointer group mb-5"
          >
            <div className="flex flex-col">
              <span className="text-white font-bold tracking-[0.18em] text-base sm:text-lg leading-tight group-hover:text-[#C5A059] transition-colors">
                DARSHAI
              </span>
              <span className="text-[#C5A059] typography-eyebrow font-semibold uppercase leading-tight mt-0.5">
                GEO-WELLNESS
              </span>
            </div>
          </button>
          <p className="typography-body text-white/62 leading-relaxed max-w-2xl mb-6 font-normal">
            An AI-native Geo-Wellness platform connecting individuals with
            personalised wellness journeys through structured assessment,
            environmental intelligence and curated wellness environments.
          </p>
          <button
            onClick={() => {
              track("begin_journey", { source: "footer" });
              navigateTo("contact");
            }}
            className="text-[#C5A059] hover:text-[#dabe78] transition-colors font-semibold typography-ui-button uppercase flex items-center gap-2 cursor-pointer group w-fit"
          >
            <span>BEGIN YOUR JOURNEY</span>
            <span className="transition-transform group-hover:translate-x-1 text-base">
              →
            </span>
          </button>
        </div>
        <div className="border-t border-white/10 my-8 sm:my-10" />
        <div className="block sm:hidden border-y border-white/10 my-6 divide-y divide-white/10">
          {footerSections.map((section) => {
            const isOpen = openAccordion === section.title;
            return (
              <div className="py-3.5" key={section.title}>
                <button
                  type="button"
                  onClick={() =>
                    setOpenAccordion(isOpen ? null : section.title)
                  }
                  className="w-full flex items-center justify-between text-left text-white font-medium text-base sm:text-lg cursor-pointer py-1 group"
                >
                  <span className="group-hover:text-[#C5A059] transition-colors">
                    {section.title}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-white/70 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#C5A059]" : ""}`}
                  />
                </button>
                {isOpen && (
                  <ul className="mt-3 pb-2 space-y-3 text-sm text-white/75 pl-1">
                    {section.links.map(({ label, page }) => (
                      <li key={label}>
                        <button
                          onClick={() => navigateTo(page)}
                          className="hover:text-white transition-colors text-left cursor-pointer py-0.5 block w-full"
                        >
                          {label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-[#C5A059] text-xs font-semibold tracking-[0.2em] uppercase mb-4 sm:mb-5">
                {section.title}
              </h3>
              <ul className="space-y-3 text-sm sm:text-[15px] text-white/75">
                {section.links.map(({ label, page }) => (
                  <li key={label}>
                    <button
                      onClick={() => navigateTo(page)}
                      className="hover:text-white transition-colors text-left cursor-pointer"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 my-8 sm:my-10" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-xs text-white/60 pt-2">
          <p className="text-white/50">
            © 2026 DARSHAI Group Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-white/70">
            <button
              onClick={() => navigateTo("privacy")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigateTo("terms-of-service")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => navigateTo("governance")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Trust & Governance
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-white/70">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
