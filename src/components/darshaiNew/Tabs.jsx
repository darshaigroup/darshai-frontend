import React, { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
/**
 * Universal DARSHAI Tab Component
 *
 * Design System Specifications:
 * - Purpose: Used for the four program frameworks and category navigation
 * - Height: 40–48 px (40 px mobile, 44–48 px desktop)
 * - Selected state: DARSHAI green (#0E4D3A) or strong contrast
 * - Keyboard accessible: Native button focus, ARIA role="tab", arrow key navigation
 * - Mobile: Horizontal scrolling strictly preferred to wrapping into multiple rows
 */
export function Tabs({
  items,
  activeTab,
  onChange,
  variant = "light",
  ariaLabel = "Navigation Tabs",
  className = "",
  layoutId,
}) {
  const containerRef = useRef(null);
  const tabRefs = useRef(new Map());
  const shouldReduceMotion = useReducedMotion();
  // Ensure active tab scrolls smoothly into visible scroll container on mobile
  useEffect(() => {
    const activeEl = tabRefs.current.get(activeTab);
    if (activeEl && containerRef.current) {
      const container = containerRef.current;
      const elRect = activeEl.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      if (
        elRect.left < containerRect.left ||
        elRect.right > containerRect.right
      ) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeTab]);
  // Keyboard navigation across tablist (WAI-ARIA compliance)
  const handleKeyDown = (e, index) => {
    let nextIndex = -1;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextIndex = (index + 1) % items.length;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      nextIndex = (index - 1 + items.length) % items.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = items.length - 1;
    }
    if (nextIndex >= 0) {
      const nextTab = items[nextIndex];
      onChange(nextTab.id);
      const nextEl = tabRefs.current.get(nextTab.id);
      if (nextEl) {
        nextEl.focus();
      }
    }
  };
  const isDark = variant === "dark";
  return (
    <div
      className={`relative w-full ${className}`.trim()}
      role="region"
      aria-label={ariaLabel}
    >
      <div
        ref={containerRef}
        role="tablist"
        aria-label={ariaLabel}
        className="darshai-tabs-container py-1 px-0.5"
      >
        {items.map((tab, idx) => {
          const isSelected = activeTab === tab.id;
          let btnClasses = isDark
            ? "darshai-tab-item-dark"
            : "darshai-tab-item";
          if (isSelected) {
            btnClasses += isDark
              ? " darshai-tab-item-dark-selected font-semibold text-white"
              : " darshai-tab-item-selected font-semibold text-white";
          }
          return (
            <button
              ref={(el) => {
                if (el) tabRefs.current.set(tab.id, el);
                else tabRefs.current.delete(tab.id);
              }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isSelected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`relative z-10 ${btnClasses}`}
              key={tab.id}
            >
              {layoutId && isSelected && (
                <motion.span
                  layoutId={layoutId}
                  className="absolute inset-0 rounded-full bg-[#0E4D3A] shadow-sm -z-10"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
                  }
                />
              )}
              <span className="relative z-10">{tab.label}</span>
              {tab.badge && (
                <span
                  className={`relative z-10 ml-2 px-2 py-0.5 text-[11px] tabular-nums uppercase font-semibold tracking-wider rounded-full ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : isDark
                        ? "bg-white/10 text-white/70"
                        : "bg-[#0E4D3A]/10 text-[#0E4D3A]"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default Tabs;
