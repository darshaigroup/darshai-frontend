import React from "react";
import { motion } from "motion/react";
import {
  ShieldCheck,
  Stethoscope,
  AlertCircle,
  Plane,
  CheckCircle2,
  HeartPulse,
} from "lucide-react";
export default function GuestInformationSafetySection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      },
    },
  };
  const paragraphVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
  return (
    <section className="py-20 sm:py-28 bg-white text-[#1D1D1F] relative overflow-hidden border-t border-[#E5E5EA]">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#0E4D3A]/5 blur-[160px] pointer-events-none rounded-full" />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="space-y-4 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2F2F7] border border-[#E5E5EA] text-[#0E4D3A] typography-caption uppercase tracking-wider font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0E4D3A]" />
            <span>GUEST INFORMATION & SAFETY</span>
          </div>
          <h2 className="typography-section-h2 text-[#1D1D1F]">
            Know before you begin.
          </h2>
          <p className="typography-lead text-[#6E6E73] max-w-2xl mx-auto font-normal text-base sm:text-lg">
            The final details should be confirmed for each programme and
            booking.
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-8 max-w-4xl mx-auto"
        >
          <motion.div
            variants={paragraphVariants}
            className="p-6 sm:p-8 rounded-[24px] bg-[#FBFBFD] border border-[#E5E5EA] shadow-xs hover:shadow-md transition-all duration-300 space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0E4D3A]/10 border border-[#0E4D3A]/20 text-[#0E4D3A] flex items-center justify-center shrink-0">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h3 className="typography-h3 text-[#1D1D1F] text-lg font-bold">
                Programme Suitability
              </h3>
            </div>
            <p className="typography-body text-[#3A3A3C] text-sm sm:text-base leading-relaxed pl-0 sm:pl-13">
              All programme and therapy choices remain subject to the centre’s
              professional assessment, available services and individual
              suitability. Not every modality is appropriate for every guest.
            </p>
          </motion.div>
          <motion.div
            variants={paragraphVariants}
            className="p-6 sm:p-8 rounded-[24px] bg-[#FBFBFD] border border-[#E5E5EA] shadow-xs hover:shadow-md transition-all duration-300 space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0E4D3A]/10 border border-[#0E4D3A]/20 text-[#0E4D3A] flex items-center justify-center shrink-0">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="typography-h3 text-[#1D1D1F] text-lg font-bold">
                Medical Information
              </h3>
            </div>
            <p className="typography-body text-[#3A3A3C] text-sm sm:text-base leading-relaxed pl-0 sm:pl-13">
              Guests should provide accurate information about current
              diagnoses, medications, allergies, relevant reports and ongoing
              treatment during the assessment process. Do not stop or change
              prescribed medication based on website content or a wellness
              programme; consult the treating clinician.
            </p>
          </motion.div>
          <motion.div
            variants={paragraphVariants}
            className="p-6 sm:p-8 rounded-[24px] bg-[#FBFBFD] border border-[#E5E5EA] shadow-xs hover:shadow-md transition-all duration-300 space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="typography-h3 text-[#1D1D1F] text-lg font-bold">
                When Medical Care is Needed
              </h3>
            </div>
            <p className="typography-body text-[#3A3A3C] text-sm sm:text-base leading-relaxed pl-0 sm:pl-13">
              Kanasu’s website states that its programmes are intended for
              overall wellness and that results vary. The centre profile must
              not imply emergency care, guarantee recovery, or replace care from
              a qualified medical professional. New, severe, worsening or urgent
              symptoms require appropriate medical attention.
            </p>
          </motion.div>
          <motion.div
            variants={paragraphVariants}
            className="p-6 sm:p-8 rounded-[28px] bg-[#F2F8F5] border border-[#D1E7DD] shadow-xs hover:shadow-md transition-all duration-300 space-y-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0E4D3A] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="typography-h3 text-[#1D1D1F] text-lg font-bold">
                  Before Travelling Checklist
                </h3>
                <p className="text-xs text-[#2C3E35]">
                  Essential preparation steps prior to your arrival at Kanasu
                  Sanctuary
                </p>
              </div>
            </div>
            <ul className="space-y-3.5 pl-0 sm:pl-13 text-sm text-[#2C3E35] font-medium">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#0E4D3A] shrink-0 mt-0.5" />
                <span>
                  Confirm the selected programme name, duration, room type,
                  occupancy, arrival/departure dates and written inclusions.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#0E4D3A] shrink-0 mt-0.5" />
                <span>
                  Confirm check-in/out times, meal/dietary arrangements,
                  accessibility and any practitioner consultation schedule.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#0E4D3A] shrink-0 mt-0.5" />
                <span>
                  Bring identification and any relevant health reports,
                  prescription list and treatment details requested by the
                  centre.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#0E4D3A] shrink-0 mt-0.5" />
                <span>
                  Ask the centre/DARSHAI coordinator about clothing, personal
                  items, weather, transfer and arrival instructions for the
                  confirmed dates.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#0E4D3A] shrink-0 mt-0.5" />
                <span>
                  Check the cancellation/rescheduling policy and all applicable
                  terms in the final booking documents.
                </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
