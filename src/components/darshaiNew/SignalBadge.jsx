import React from "react";
/**
 * SignalBadge: A quiet, restrained pill/label component for trust markers.
 * Enterprise-grade contrast: graphite text on hairline white/canvas default;
 * white text on subtle 8% white surface on dark sections.
 * Replaces loud gold/glow badge treatments with understated credibility markers.
 */
export function SignalBadge({
  children,
  variant = "light",
  dot = false,
  className = "",
  id,
  icon,
}) {
  const isDark = variant === "dark";
  return (
    <span
      id={id}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-colors whitespace-nowrap ${
        isDark
          ? "bg-white/[0.08] text-white/90 border border-white/15"
          : "bg-white text-[#1D1D1F] border border-[#D2D2D7] shadow-2xs"
      } ${className}`.trim()}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${isDark ? "bg-[#C6A660]" : "bg-[#0E4D3A]"}`}
          aria-hidden="true"
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
export default SignalBadge;
