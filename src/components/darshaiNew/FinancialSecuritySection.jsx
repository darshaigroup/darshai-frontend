import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  FileCheck,
  Check,
} from "lucide-react";
export function FinancialSecuritySection({ onScrollToForm }) {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const sectionRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  // Step progression sequence: Proposal (0) -> Secure Payment (1) -> Payment Verified (2) -> Booking Confirmed (3)
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.3) {
        setActiveStep(1); // Proposal & Secure Payment
      } else if (latest < 0.7) {
        setActiveStep(2); // Payment Verified
      } else {
        setActiveStep(3); // Booking Confirmed
      }
    });
  }, [scrollYProgress]);
  return (
    <section
      ref={sectionRef}
      id="payments"
      className="py-20 md:py-28 bg-[#18181A] text-white border-y border-white/10 relative overflow-hidden text-left"
    >
      <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[#0E4D3A]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="darshai-container relative z-10 text-left">
        <div className="max-w-3xl mb-10 sm:mb-12">
          <p className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] text-[#C6A660] uppercase mb-2">
            FINANCIAL CLARITY & SECURITY
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3 leading-[1.12]">
            Secure Payments. <br />
            <span className="text-white/90">Clear from the Start.</span>
          </h2>
          <p className="text-base sm:text-lg text-white/85 font-medium leading-relaxed">
            Simple, secure payment options with clear documentation for your
            DARSHAI journey.
          </p>
        </div>
        <div className="rounded-[24px] sm:rounded-[32px] border border-white/15 bg-[#232326] shadow-2xl p-6 sm:p-8 md:p-10 mb-8 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C6A660] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>VERIFIED DOCUMENTATION PROCESS</span>
              </div>
              <div className="space-y-3 pt-2">
                {[
                  {
                    step: 1,
                    title: "Proposal",
                    desc: "Detailed breakdown of stay, inclusions & schedule",
                  },
                  {
                    step: 2,
                    title: "Secure Payment",
                    desc: "256-bit SSL encrypted transaction verification",
                  },
                  {
                    step: 3,
                    title: "Booking Confirmed",
                    desc: "Official confirmation voucher & concierge liaison",
                  },
                ].map((item) => {
                  const isCurrent = activeStep === item.step;
                  const isDone = activeStep >= item.step;
                  return (
                    <div
                      onClick={() => setActiveStep(item.step)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isCurrent
                          ? "bg-[#0E4D3A]/30 border-[#34D399] shadow-md ring-1 ring-[#34D399]/30"
                          : isDone
                            ? "bg-white/5 border-white/15 text-white/80"
                            : "bg-white/2 border-white/5 text-white/40"
                      }`}
                      key={item.step}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`w-7 h-7 rounded-full text-xs font-mono font-bold flex items-center justify-center shrink-0 transition-colors ${
                            isCurrent
                              ? "bg-[#34D399] text-black"
                              : isDone
                                ? "bg-[#0E4D3A] text-white"
                                : "bg-white/10 text-white/40"
                          }`}
                        >
                          {isDone ? (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          ) : (
                            `0${item.step}`
                          )}
                        </span>
                        <div className="min-w-0">
                          <p
                            className={`text-sm font-bold truncate ${isCurrent ? "text-white" : ""}`}
                          >
                            {item.title}
                          </p>
                          <p className="text-xs sm:text-sm text-white/80 truncate">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${isCurrent ? "bg-[#34D399] animate-pulse" : isDone ? "bg-[#C6A660]" : "bg-white/10"}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="lg:col-span-6 bg-[#18181A] rounded-2xl p-6 sm:p-7 border border-white/12 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4 text-xs font-mono text-white/60">
                <span className="flex items-center gap-1.5 text-[#34D399] font-bold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-BIT ENCRYPTED</span>
                </span>
                <span className="text-[#C6A660] font-bold uppercase">
                  {activeStep === 1
                    ? "Proposal Active"
                    : activeStep === 2
                      ? "Payment Verified"
                      : "Journey Confirmed"}
                </span>
              </div>
              <AnimatePresence mode="wait">
                {activeStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="space-y-3"
                    key={"step1"}
                  >
                    <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                      <p className="text-[11px] font-mono text-[#C6A660] uppercase font-bold tracking-wider">
                        DARSHAI WELLNESS PROPOSAL
                      </p>
                      <p className="font-display text-base font-bold text-white mt-1">
                        Comprehensive Programme & Sanctuary Stay
                      </p>
                      <p className="text-xs text-white/70 mt-0.5">
                        Clear itemized breakdown prior to any payment
                        authorization.
                      </p>
                    </div>
                  </motion.div>
                )}
                {activeStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="space-y-3"
                    key={"step2"}
                  >
                    <div className="bg-[#0E4D3A]/30 p-3.5 rounded-xl border border-[#34D399]/40">
                      <p className="text-[11px] font-mono text-[#34D399] uppercase font-bold tracking-wider flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>PAYMENT VERIFIED</span>
                      </p>
                      <p className="font-display text-base font-bold text-white mt-1">
                        Official Transaction Authenticated
                      </p>
                      <p className="text-xs text-white/80 mt-0.5">
                        Instant digital receipt & secured institutional
                        authorization.
                      </p>
                    </div>
                  </motion.div>
                )}
                {activeStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="space-y-3"
                    key={"step3"}
                  >
                    <div className="bg-gradient-to-r from-[#0E4D3A]/60 to-[#0A382A] p-3.5 rounded-xl border border-[#C6A660]">
                      <p className="text-[11px] font-mono text-[#C6A660] uppercase font-bold tracking-wider flex items-center gap-1">
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>JOURNEY CONFIRMED</span>
                      </p>
                      <p className="font-display text-base font-bold text-white mt-1">
                        Full Documentation Issued
                      </p>
                      <p className="text-xs text-white/90 mt-0.5">
                        Concierge briefing, airport liaison & retreat itinerary
                        active.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-white/50">
                Supported currencies depend on the payment method and enabled
                payment infrastructure.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default FinancialSecuritySection;
