import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import SearchModal from "./SearchModal";
import { track } from "../../lib/darshaiNew/analytics";
// Strictly primary navigation items — Our Story, Contact, Careers, and Dashboards are intentionally excluded
const navItems = [
  { label: "Geo-Wellness", page: "geo-wellness", id: "nav-link-geo-wellness" },
  { label: "Programs", page: "programs", id: "nav-link-programs" },
  //   { label: "Centres", page: "centres", id: "nav-link-centres" },
  //   { label: "Corporate", page: "corporate", id: "nav-link-corporate" },
  //   {
  //     label: "International",
  //     page: "international",
  //     id: "nav-link-international",
  //   },
  //   { label: "Insights", page: "insights", id: "nav-link-insights" },
];
// Pages with dark hero media where transparency is contrast-verified
const darkHeroPages = [
  "home",
  "centres",
  "programs",
  "corporate",
  "international",
  "about",
  "geo-wellness",
  "insights",
  "governance",
  "contact",
  "careers",
  "privacy",
  "terms",
];
function Navbar({ currentPage, onNavigate }) {
  const [scrolledTop, setScrolledTop] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolledTop(scrollY > 75);
      // Find hero section bottom position dynamically to detect when user leaves hero
      const heroEl = document.querySelector(
        ".section-hero, #hero-section, [id$='-hero']",
      );
      let heroThreshold = window.innerHeight * 0.85;
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // Since rect.top decreases as we scroll, when rect.bottom <= 70 the hero has ended
        heroThreshold = scrollY + rect.bottom - 70;
      }
      setScrolledPastHero(scrollY >= Math.max(heroThreshold, 300));
      const totalScrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollable > 0) {
        setScrollProgress((scrollY / totalScrollable) * 100);
      }
    };
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [currentPage]);
  // Lock body scroll when mobile sheet is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [mobileMenuOpen]);
  // Global Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);
  const navigateTo = (page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const { scrollY } = useScroll();
  const navHeight = useTransform(scrollY, [0, 100], [64, 52]);
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.95)"],
  );
  const navBorderOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.92]);
  // Determine whether the navbar is currently over a dark hero section
  const isDarkHeroPage = darkHeroPages.includes(currentPage);
  const isOverHero = isDarkHeroPage && !scrolledPastHero && !scrolledTop;
  return (
    <>
      <motion.nav
        id="main-header"
        style={{
          height: navHeight,
          backgroundColor: navBackground,
        }}
        className="fixed top-0 left-0 right-0 w-full backdrop-blur-md transition-shadow z-50 flex items-center"
      >
        <div className="darshai-container flex items-center justify-between w-full h-full relative">
          <motion.div style={{ scale: logoScale }} className="origin-left">
            <button
              id="nav-logo"
              onClick={() => navigateTo("home")}
              className="group flex items-center gap-2.5 md:gap-3 text-left focus-visible:ring-2 focus-visible:ring-[#0E4D3A] rounded-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
              aria-label="DARSHAI Home"
            >
              <div className="flex flex-col">
                <span
                  className={`font-display font-semibold leading-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    scrolledTop
                      ? "text-base md:text-lg tracking-[0.16em]"
                      : "text-lg md:text-xl tracking-[0.18em]"
                  } ${
                    isOverHero
                      ? "text-white group-hover:text-white/90"
                      : "text-[#1D1D1F] group-hover:text-[#0E4D3A]"
                  }`}
                >
                  DARSHAI
                </span>
                <span
                  className={`uppercase font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    scrolledTop
                      ? "text-[9px] md:text-[10px] tracking-[0.18em] mt-0.5"
                      : "text-[10px] md:text-[11px] tracking-[0.22em] mt-1"
                  } ${isOverHero ? "text-[#C6A660]" : "text-[#0E4D3A]"}`}
                >
                  Geo-Wellness
                </span>
              </div>
            </button>
          </motion.div>
          <nav
            id="nav-links-desktop"
            className="hidden md:flex items-center gap-3 lg:gap-6 xl:gap-8"
            aria-label="Primary Navigation"
          >
            {navItems.map(({ label, page, id }) => {
              const isActive = currentPage === page;
              return (
                <button
                  id={id}
                  onClick={() => navigateTo(page)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative py-2.5 px-1.5 text-xs lg:text-sm tracking-wide transition-colors duration-200 ease-out group flex flex-col items-center cursor-pointer ${
                    isOverHero
                      ? isActive
                        ? "text-white font-semibold"
                        : "text-white/80 font-medium hover:text-white"
                      : isActive
                        ? "text-[#0E4D3A] font-semibold"
                        : "text-[#6E6E73] font-medium hover:text-[#1D1D1F]"
                  }`}
                  key={page}
                >
                  <span className="relative z-10 transition-colors duration-200">
                    {label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                        mass: 0.8,
                      }}
                      className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${isOverHero ? "bg-[#C6A660]" : "bg-[#0E4D3A]"}`}
                      aria-hidden="true"
                    />
                  )}
                  {!isActive && (
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full group-hover:w-full transition-all duration-200 ease-out ${isOverHero ? "bg-white/35" : "bg-[#1D1D1F]/20"}`}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <button
              id="nav-begin-journey-btn"
              onClick={() => {
                track("consultation_request", { source: "navbar_header" });
                track("begin_journey", { source: "navbar_header" });
                navigateTo("contact");
              }}
              className={`hidden md:inline-flex darshai-btn-primary transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                scrolledTop
                  ? "!h-[38px] md:!h-[42px] !px-3.5 md:!px-5 !text-[11px] md:!text-xs !tracking-[0.05em]"
                  : "!h-[42px] md:!h-[48px] !px-4 md:!px-6 !text-xs !tracking-[0.06em]"
              } ${isOverHero ? "!border-white/30" : ""}`}
            >
              <span>BEGIN YOUR JOURNEY</span>
              <ArrowRight
                className="w-3.5 h-3.5 text-[#C6A660] group-hover:translate-x-0.5 transition-transform"
                aria-hidden="true"
              />
            </button>
            <button
              id="nav-mobile-menu-toggle"
              className={`md:hidden p-2 rounded-xs transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#0E4D3A] ${
                isOverHero
                  ? "text-white border border-white/30 bg-black/20 hover:bg-black/30 backdrop-blur-xs"
                  : "text-[#1D1D1F] border border-[#D2D2D7] bg-white hover:border-[#1D1D1F]"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
          <div
            className="absolute bottom-0 left-0 h-[2px] bg-[#0E4D3A] transition-[width] duration-150 ease-out pointer-events-none"
            style={{ width: `${scrollProgress}%` }}
            aria-hidden="true"
          />
        </div>
        <motion.div
          style={{ opacity: navBorderOpacity }}
          className="absolute bottom-0 left-0 right-0 h-px bg-[#D2D2D7]"
        />
      </motion.nav>
      {mobileMenuOpen && (
        <div
          id="mobile-backdrop"
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-xs transition-opacity animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close navigation overlay"
        />
      )}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-sheet"
          className="fixed top-0 right-0 bottom-0 h-full w-1/2 min-w-[280px] max-w-[480px] z-50 bg-[#F5F5F7] border-l border-[#D2D2D7] shadow-2xl flex flex-col justify-between overflow-y-auto animate-slide-in-right"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div className="h-[60px] flex items-center justify-between px-5 sm:px-8 border-b border-[#D2D2D7]/60">
            <button
              onClick={() => navigateTo("home")}
              className="font-display text-sm font-semibold tracking-[0.16em] text-[#1D1D1F] text-left cursor-pointer hover:text-[#0E4D3A] transition-colors"
            >
              DARSHAI
            </button>
            <div className="flex items-center gap-1">
              <button
                id="mobile-drawer-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#1D1D1F] hover:text-[#0E4D3A] rounded-xs transition-colors focus-visible:ring-2 focus-visible:ring-[#0E4D3A]"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <nav
            className="flex flex-col px-5 sm:px-8 py-6 divide-y divide-[#D2D2D7]/50"
            aria-label="Mobile destinations"
          >
            {navItems.map(({ label, page, id }) => {
              const isActive = currentPage === page;
              return (
                <button
                  id={`mobile-${id}`}
                  onClick={() => navigateTo(page)}
                  aria-current={isActive ? "page" : undefined}
                  className="flex items-center justify-between py-3.5 group text-left transition-colors"
                  key={page}
                >
                  <span
                    className={`font-display text-base sm:text-lg tracking-tight transition-colors ${
                      isActive
                        ? "text-[#0E4D3A] font-semibold"
                        : "text-[#1D1D1F] group-hover:text-[#0E4D3A]"
                    }`}
                  >
                    {label}
                  </span>
                  {isActive ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-xs bg-[#0E4D3A]/10 text-[#0E4D3A] border border-[#0E4D3A]/25">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A]"
                        aria-hidden="true"
                      />
                      Current
                    </span>
                  ) : (
                    <ArrowRight
                      className="w-4 h-4 text-[#6E6E73] group-hover:text-[#1D1D1F] group-hover:translate-x-1 transition-all"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </nav>
          <div className="p-5 sm:p-8 mt-auto border-t border-[#D2D2D7]/60 bg-white/50">
            <button
              id="mobile-nav-begin-journey-btn"
              onClick={() => {
                track("consultation_request", { source: "mobile_drawer" });
                track("begin_journey", { source: "mobile_drawer" });
                navigateTo("contact");
              }}
              className="w-full darshai-btn-primary"
            >
              <span>BEGIN YOUR JOURNEY</span>
              <ArrowRight
                className="w-4 h-4 text-[#C6A660]"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      )}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={navigateTo}
      />
    </>
  );
}
export default Navbar;
