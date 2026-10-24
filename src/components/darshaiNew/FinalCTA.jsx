import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import SmartImage from "./SmartImage";
export function FinalCTA({
  variant = "black",
  eyebrow = "THE DARSHAI DESTINATION",
  heading,
  description,
  descriptionClassName,
  buttonText = "BEGIN YOUR JOURNEY",
  buttonOnClick,
  secondaryButtonText,
  secondaryButtonOnClick,
  bgImage = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&auto=format&fit=crop&q=80",
  id = "final-cta-section",
  className = "",
}) {
  const sectionRef = useRef(null);
  // Triggers once when section comes into view
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isLight = variant === "light";
  const isBlack = variant === "black";
  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative text-center py-28 md:py-36 overflow-hidden ${
        isLight
          ? "bg-[#F5F5F7] border-t border-[#D2D2D7] text-[#111111]"
          : isBlack
            ? "bg-[#000000] border-t border-white/10 text-white"
            : "bg-[#1D1D1F] border-t border-white/10 text-white"
      } ${className}`}
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ scale: 1.05, opacity: isLight ? 0.15 : 0.3 }}
          animate={
            isInView
              ? { scale: 1.0, opacity: isLight ? 0.25 : 0.45 }
              : { scale: 1.05, opacity: isLight ? 0.15 : 0.3 }
          }
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full will-change-transform"
        >
          <SmartImage
            src={bgImage}
            alt="Atmospheric sanctuary background"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        {isLight ? (
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5F7] via-[#F5F5F7]/85 to-[#F5F5F7]/70" />
        ) : isBlack ? (
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/75 to-[#000000]/90" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F] via-[#1D1D1F]/70 to-[#1D1D1F]/85" />
        )}
      </div>
      <div className="relative z-10 darshai-container max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`typography-eyebrow ${isLight ? "text-[#0E4D3A]" : "text-[#C6A660]"} mb-4 text-center`}
          >
            {eyebrow}
          </motion.div>
        )}
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`typography-section-h2 ${isLight ? "text-[#111111]" : "text-white"} max-w-3xl mx-auto mb-6 text-center`}
        >
          {heading}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={
            isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }
          }
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`w-12 h-[2px] ${isLight ? "bg-[#0E4D3A]" : "bg-[#C6A660]"} mx-auto mb-6 origin-center`}
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={
            descriptionClassName ||
            `typography-lead ${isLight ? "text-[#4A4A4A] font-normal" : "text-white/72 font-normal"} max-w-2xl mx-auto mb-10 text-center`
          }
        >
          {description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center mx-auto"
        >
          <button
            type="button"
            onClick={buttonOnClick}
            className="inline-flex items-center justify-center gap-2 bg-[#0E4D3A] hover:bg-[#0A3B2C] text-white px-8 py-4 rounded-full typography-ui-button font-semibold tracking-wider uppercase transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer group mx-auto"
          >
            <span>{buttonText}</span>
            <span
              aria-hidden="true"
              className="group-hover:translate-x-1 transition-transform"
            >
              →
            </span>
          </button>
          {secondaryButtonText && secondaryButtonOnClick && (
            <button
              type="button"
              onClick={secondaryButtonOnClick}
              className={`rounded-full px-7 py-4 text-xs sm:text-sm tracking-wider font-semibold transition-all uppercase cursor-pointer inline-flex items-center gap-2 ${
                isLight
                  ? "border border-[#D2D2D7] hover:border-[#0E4D3A] text-[#1D1D1F] bg-white hover:bg-[#F5F5F7]"
                  : "border border-white/35 hover:border-white/70 text-white hover:bg-white/10"
              }`}
            >
              <span>{secondaryButtonText}</span>
              <span aria-hidden="true">→</span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
export default FinalCTA;
