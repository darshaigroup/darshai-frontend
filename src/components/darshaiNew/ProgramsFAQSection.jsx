import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "./Reveal";
import { track } from "../../lib/darshaiNew/analytics";
const FAQ_ITEMS = [
  {
    q: "How much does a DARSHAI journey cost?",
    a: "Costs depend on the DARSHAI Management scope, selected centre programme, accommodation, duration and any additional requirements. A personalised proposal outlining the applicable fees and costs is shared before confirmation.",
  },
  {
    q: "Does DARSHAI Management include the wellness-centre programme and accommodation?",
    a: "No. Centre programme charges and accommodation are priced separately and specified in the proposal.",
  },
  {
    q: "How is a programme selected?",
    a: "DARSHAI considers your goals, wellness context, preferences, intended duration, budget, environment and partner-centre suitability and availability.",
  },
  {
    q: "Are travel expenses included?",
    a: "Travel guidance, arrival planning and transfer coordination form part of the agreed management scope. Tickets, private transfers, airport transfers, travel insurance, visa costs and personal expenses are additional.",
  },
  {
    q: "Can my journey be personalised?",
    a: "Yes. A personalised journey can be considered around your goals, preferred duration, budget, suitability and available partner-centre programmes.",
  },
  {
    q: "Does DARSHAI diagnose or treat medical conditions?",
    a: "DARSHAI's platform does not replace a qualified healthcare professional or independently provide medical diagnosis or treatment. Where appropriate, programme suitability should be reviewed by qualified practitioners and the selected partner centre.",
  },
  {
    q: "What happens after my programme ends?",
    a: "Follow-up and continuity options depend on the agreed service. DARSHAI BEYOND provides a separate ongoing membership pathway.",
  },
];
export function ProgramsFAQSection({ id = "programs-faq" }) {
  const [openFaq, setOpenFaq] = useState(0);
  const handleToggle = (idx) => {
    const nextState = openFaq === idx ? null : idx;
    setOpenFaq(nextState);
    track("faq_accordion_toggle", {
      questionIndex: idx,
      question: FAQ_ITEMS[idx].q,
    });
  };
  return (
    <section
      id={id}
      className="section-editorial py-20 md:py-28 bg-white border-y border-[#D2D2D7]"
    >
      <div className="darshai-container">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="typography-eyebrow text-[#0E4D3A] mb-3 uppercase tracking-[0.2em] font-semibold text-xs">
              QUESTIONS, ANSWERED
            </p>
            <h2 className="typography-section-h2 text-[#1D1D1F] tracking-tight mb-4">
              Before You Begin.
            </h2>
            <div className="w-12 h-[2px] bg-[#0E4D3A] mx-auto" />
          </div>
        </Reveal>
        <div className="space-y-4 max-w-4xl mx-auto text-left">
          {FAQ_ITEMS.map((faq, idx) => (
            <Reveal delay={idx * 0.04} key={faq.q}>
              <div className="border border-[#D2D2D7] rounded-[16px] overflow-hidden bg-[#F5F5F7]">
                <button
                  id={`program-faq-btn-${idx}`}
                  aria-expanded={openFaq === idx}
                  aria-controls={`program-faq-panel-${idx}`}
                  onClick={() => handleToggle(idx)}
                  className="w-full text-left p-5 sm:p-6 text-sm sm:text-base font-medium text-[#1D1D1F] flex items-center justify-between gap-4 cursor-pointer hover:bg-white/60 transition-colors"
                >
                  <span>{faq.q}</span>
                  <div className="w-8 h-8 rounded-full bg-[#0E4D3A]/10 border border-[#0E4D3A]/20 flex items-center justify-center text-[#0E4D3A] shrink-0 transition-colors group-hover:bg-[#0E4D3A] group-hover:text-white">
                    {openFaq === idx ? (
                      <Minus className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    )}
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      id={`program-faq-panel-${idx}`}
                      role="region"
                      aria-labelledby={`program-faq-btn-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 sm:p-6 pt-3 text-base sm:text-lg text-[#2C2C2E] leading-relaxed border-t border-[#D2D2D7]/50 bg-white font-medium">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
export default ProgramsFAQSection;
