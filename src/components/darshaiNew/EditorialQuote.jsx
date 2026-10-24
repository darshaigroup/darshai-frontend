import React from "react";
/**
 * EditorialQuote: Large pull-quote treatment for existing statement lines.
 * Features high-contrast Inter typography (H3-H2 scale), thin green left rule (#0E4D3A),
 * and generous surrounding whitespace.
 * Adheres strictly to content freeze: used solely for existing copy statements.
 */
export function EditorialQuote({
  children,
  citation,
  variant = "light",
  className = "",
  id,
}) {
  const isDark = variant === "dark";
  return (
    <blockquote
      id={id}
      className={`border-l-2 pl-6 sm:pl-8 py-2 my-8 md:my-10 transition-colors ${
        isDark
          ? "border-[#0E4D3A] text-white/95"
          : "border-[#0E4D3A] text-[#1D1D1F]"
      } ${className}`.trim()}
    >
      <div className="font-display text-xl sm:text-2xl md:text-3xl font-light leading-snug tracking-tight">
        {children}
      </div>
      {citation && (
        <footer className="mt-3 text-xs sm:text-sm text-[#6E6E73] font-medium tracking-wider uppercase">
          {citation}
        </footer>
      )}
    </blockquote>
  );
}
export default EditorialQuote;
