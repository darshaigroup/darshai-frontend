import React from "react";
import { Check, ArrowRight, ShieldCheck } from "lucide-react";
import { Reveal } from "./Reveal";
import { track } from "../../lib/darshaiNew/analytics";
export function BeyondProgramContinuitySection({
  id = "beyond-program",
  onNavigate,
}) {
  const handleCTAClick = (action) => {
    track("beyond_program_cta_click", { action });
    onNavigate("contact");
  };
  return (
    <section
      id={id}
      className="section-editorial py-24 md:py-32 bg-white border-b border-[#E5E5EA] scroll-mt-24"
    >
      <div className="darshai-container">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <Reveal>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0E4D3A] bg-[#0E4D3A]/10 px-4 py-1.5 rounded-full border border-[#0E4D3A]/20 mb-4 inline-block">
              BEYOND THE PROGRAM
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="typography-section-h2 text-[#1D1D1F] tracking-tight font-semibold mb-4">
              The Journey Doesn't End At Checkout.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="typography-body text-[#6E6E73] font-normal leading-relaxed">
              Real wellness is built through sustained care and continuous
              integration. We support your transition home with structured
              post-journey guidance.
            </p>
          </Reveal>
        </div>
        <div className="space-y-12 max-w-[1280px] mx-auto">
          <Reveal>
            <div className="bg-[#F5F5F7] border border-[#E5E5EA] rounded-[28px] p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0E4D3A] bg-[#0E4D3A]/10 px-3 py-1 rounded-full border border-[#0E4D3A]/20">
                      STANDARD JOURNEY INCLUSION
                    </span>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0E4D3A] bg-[#0E4D3A]/20 px-3 py-1 rounded-full font-semibold">
                      INCLUDED WITH EVERY JOURNEY
                    </span>
                  </div>
                  <h3 className="typography-subsection-h3 font-semibold text-[#1D1D1F] mb-3">
                    30-Day Transition Support Included.
                  </h3>
                  <p className="typography-body text-[#6E6E73] mb-6 max-w-2xl font-normal">
                    Every Darshai journey includes structured post-journey
                    support to ensure smooth integration into daily routines
                    upon return.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "Post-Journey Clinical Summary",
                      "Integration Action Plan",
                      "Diet & Lifestyle Transition Guide",
                      "30-Day Follow-Up Review",
                    ].map((item) => (
                      <div
                        className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-[#2C2C2E]"
                        key={item}
                      >
                        <Check className="w-4 h-4 text-[#0E4D3A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#D2D2D7] text-center flex flex-col justify-between h-full shadow-xs">
                  <div>
                    <div className="w-12 h-12 rounded-full bg-[#0E4D3A]/10 text-[#0E4D3A] flex items-center justify-center mx-auto mb-3">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0E4D3A] block mb-1">
                      INCLUDED BENEFIT
                    </span>
                    <h4 className="font-display text-base font-bold text-[#1D1D1F] mb-2">
                      30-Day Post-Journey Continuity
                    </h4>
                    <p className="text-xs text-[#6E6E73] leading-relaxed mb-6">
                      Automatically active upon journey completion for all
                      guests.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCTAClick("learn-included-30day")}
                    className="w-full py-3 px-4 rounded-full bg-[#0E4D3A] text-white hover:bg-[#0A382A] text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer shadow-xs"
                  >
                    LEARN ABOUT CONTINUITY →
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal delay={0.1}>
              <div className="bg-[#F5F5F7] border border-[#D2D2D7] rounded-[28px] p-6 sm:p-8 flex flex-col justify-between h-full shadow-md hover:shadow-lg transition-shadow">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0E4D3A] bg-[#0E4D3A]/10 px-3 py-1 rounded-full border border-[#0E4D3A]/20">
                      EXTENDED CONTINUITY
                    </span>
                  </div>
                  <h3 className="typography-card-title font-semibold text-[#1D1D1F] mb-2">
                    90-DAY CONTINUITY
                  </h3>
                  <p className="text-xs text-[#6E6E73] mb-6 font-medium">
                    Comprehensive quarter-long maintenance & clinical
                    monitoring.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Scheduled follow-up reviews",
                      "Personalised maintenance updates",
                      "Diet / lifestyle adjustments",
                      "Personalised maintenance videos",
                      "Wellness tracking",
                      "Clinical consultation/review where appropriate",
                      "Continuity recommendations",
                    ].map((item) => (
                      <li
                        className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-[#2C2C2E]"
                        key={item}
                      >
                        <Check className="w-4 h-4 text-[#0E4D3A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => handleCTAClick("90-day-continuity")}
                  className="w-full py-3.5 px-4 rounded-full bg-[#0E4D3A] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#0A382A] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>SELECT 90-DAY CONTINUITY</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="bg-[#F5F5F7] border border-[#D2D2D7] rounded-[28px] p-6 sm:p-8 flex flex-col justify-between h-full shadow-md hover:shadow-lg transition-shadow">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0E4D3A] bg-[#0E4D3A]/10 px-3 py-1 rounded-full border border-[#0E4D3A]/20">
                      EXTENDED CONTINUITY
                    </span>
                  </div>
                  <h3 className="typography-card-title font-semibold text-[#1D1D1F] mb-2">
                    180-DAY CONTINUITY
                  </h3>
                  <p className="text-xs text-[#0E4D3A] font-semibold mb-6">
                    Includes everything in 90-Day, extended to six months with:
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Periodic plan revisions",
                      "Ongoing tracking",
                      "Progress reviews",
                      "Extended maintenance guidance",
                    ].map((item) => (
                      <li
                        className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-[#2C2C2E]"
                        key={item}
                      >
                        <Check className="w-4 h-4 text-[#0E4D3A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => handleCTAClick("180-day-continuity")}
                  className="w-full py-3.5 px-4 rounded-full bg-[#0E4D3A] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#0A382A] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>SELECT 180-DAY CONTINUITY</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.3}>
            <div className="bg-[#1D1D1F] text-white border border-[#0E4D3A] rounded-[28px] p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#34D399] bg-[#0E4D3A]/40 px-3 py-1 rounded-full border border-[#34D399]/30">
                      SOVEREIGN
                    </span>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-black bg-[#C6A660] px-3 py-1 rounded-full font-semibold">
                      INCLUDED
                    </span>
                  </div>
                  <h3 className="typography-subsection-h3 font-semibold text-white mb-2">
                    Continuity Is Built into The Journey.
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-6 max-w-2xl font-normal">
                    Sovereign includes extended post-journey management and
                    continuity planning as part of the complete DARSHAI journey.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {[
                      "Post-Journey Review",
                      "Follow-Up",
                      "Continuity Plan",
                      "Extended Wellness Tracking",
                    ].map((item) => (
                      <div
                        className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-white/90"
                        key={item}
                      >
                        <Check className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-4 bg-white/5 border border-white/15 rounded-2xl p-6 text-center flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#34D399] block mb-2">
                      SOVEREIGN EXTENSION
                    </span>
                    <h4 className="font-display text-lg font-bold text-white mb-2">
                      180-Day Extension
                    </h4>
                    <p className="text-xs text-white/70 leading-relaxed mb-6">
                      Extended 6-month continuous Sovereign concierge &
                      biological tracking.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleCTAClick("sovereign-180-day-extension")
                    }
                    className="w-full py-3 px-4 rounded-full bg-[#0E4D3A] text-white hover:bg-[#12634B] text-xs font-bold tracking-wider uppercase transition-all cursor-pointer shadow-md"
                  >
                    ADD 180-DAY EXTENSION →
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
export default BeyondProgramContinuitySection;
