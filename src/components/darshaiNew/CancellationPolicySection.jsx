import React from "react";
import { motion } from "motion/react";
import {
  FileText,
  CalendarX,
  RefreshCw,
  Clock,
  Mail,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Building,
} from "lucide-react";
export default function CancellationPolicySection() {
  return (
    <section className="py-20 sm:py-28 bg-white text-[#1D1D1F] relative overflow-hidden border-t border-[#E5E5EA]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#0E4D3A]/5 blur-[160px] pointer-events-none rounded-full" />
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2F2F7] border border-[#E5E5EA] text-[#0E4D3A] typography-caption uppercase tracking-wider font-semibold">
            <FileText className="w-3.5 h-3.5 text-[#0E4D3A]" />
            <span>12 | CANCELLATION & RESCHEDULING</span>
          </div>
          <h2 className="typography-section-h2 text-[#1D1D1F]">
            Kanasu Wellness centre-booking policy
          </h2>
          <p className="typography-lead text-[#48484A] max-w-2xl mx-auto font-normal">
            We understand that plans can change. All cancellations must be
            communicated via official channels — email or WhatsApp only.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-[#FBFBFD] border border-[#E5E5EA] rounded-[28px] p-6 sm:p-8 space-y-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E5EA]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0E4D3A]/10 border border-[#0E4D3A]/20 text-[#0E4D3A] flex items-center justify-center">
                  <CalendarX className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="typography-h3 text-[#1D1D1F] text-lg font-bold">
                    Cancellation by Guest
                  </h3>
                  <p className="text-xs text-[#6E6E73]">
                    Refund timeline based on notice prior to arrival date
                  </p>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-[#E5E5EA] bg-white shadow-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F2F2F7] border-b border-[#E5E5EA] text-xs font-mono uppercase text-[#0E4D3A] tracking-wider font-bold">
                    <th className="py-3.5 px-4 sm:px-6">
                      Notice Period Before Arrival
                    </th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">
                      Refund Policy
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5EA] text-sm font-medium">
                  <tr className="hover:bg-[#F9F9FB] transition-colors">
                    <td className="py-4 px-4 sm:px-6 text-[#1D1D1F] flex items-center gap-2 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                      <span>30+ days before arrival</span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right text-[#059669] font-bold">
                      Full refund, minus processing fees
                    </td>
                  </tr>
                  <tr className="hover:bg-[#F9F9FB] transition-colors">
                    <td className="py-4 px-4 sm:px-6 text-[#1D1D1F] flex items-center gap-2 font-semibold">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>15–29 days before arrival</span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right text-amber-700 font-bold">
                      50% refund
                    </td>
                  </tr>
                  <tr className="hover:bg-[#F9F9FB] transition-colors">
                    <td className="py-4 px-4 sm:px-6 text-[#1D1D1F] flex items-center gap-2 font-semibold">
                      <Clock className="w-4 h-4 text-orange-600 shrink-0" />
                      <span>7–14 days before arrival</span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right text-orange-700 font-bold">
                      25% refund
                    </td>
                  </tr>
                  <tr className="hover:bg-[#F9F9FB] transition-colors">
                    <td className="py-4 px-4 sm:px-6 text-[#1D1D1F] flex items-center gap-2 font-semibold">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Less than 7 days / no-show</span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right text-rose-600 font-bold">
                      No refund
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 rounded-xl bg-[#F2F8F5] border border-[#D1E7DD] space-y-2">
              <div className="flex items-center gap-2 text-[#0E4D3A] text-xs font-bold uppercase tracking-wider">
                <Building className="w-4 h-4" />
                <span>Cancellation by Kanasu Wellness</span>
              </div>
              <p className="text-xs text-[#2C3E35] leading-relaxed font-normal">
                If Kanasu must cancel a booking due to unforeseen circumstances,
                the guest will be offered a <strong>full refund</strong> or the
                option to reschedule at no additional cost.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-[#FBFBFD] border border-[#E5E5EA] rounded-[28px] p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C6A660]/15 border border-[#C6A660]/30 text-[#8B6B1B] flex items-center justify-center">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h3 className="typography-h3 text-[#1D1D1F] text-lg font-bold">
                  Rescheduling Guidelines
                </h3>
              </div>
              <p className="text-xs text-[#3A3A3C] leading-relaxed font-normal">
                Guests may reschedule <strong>once</strong>, subject to
                availability, if the request is made at least{" "}
                <strong>15 days</strong> before the original arrival date.
                Rescheduled dates must fall within <strong>6 months</strong> of
                the original booking.
              </p>
            </div>
            <div className="bg-[#FBFBFD] border border-[#E5E5EA] rounded-[28px] p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0E4D3A] flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>Early Departure Policy</span>
                </h4>
                <p className="text-xs text-[#3A3A3C] leading-relaxed">
                  If a guest chooses to leave before completing the programme,
                  no refund is provided for remaining days. Exceptional medical
                  circumstances may be reviewed by Kanasu case by case.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E5E5EA] space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B6B1B] flex items-center gap-1.5">
                  <CalendarX className="w-4 h-4" />
                  <span>Early Arrival Policy</span>
                </h4>
                <p className="text-xs text-[#3A3A3C] leading-relaxed">
                  Arrival before the scheduled check-in date is treated as an
                  additional stay with applicable daily charges.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="bg-[#F5F5F7] border border-[#E5E5EA] rounded-[28px] p-8 space-y-6 max-w-4xl mx-auto shadow-sm">
          <div className="text-center space-y-2">
            <h3 className="typography-h3 text-[#1D1D1F] text-xl font-bold">
              How to Request a Cancellation or Reschedule
            </h3>
            <p className="text-xs text-[#636366]">
              Official requests must be communicated in writing via Kanasu
              Wellness contact channels:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="mailto:info@kanasuwellness.com"
              className="p-4 rounded-2xl bg-white border border-[#E5E5EA] hover:border-[#0E4D3A] transition-all flex items-center gap-4 group shadow-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0E4D3A] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-[#8E8E93] uppercase">
                  Official Email
                </p>
                <p className="text-sm font-bold text-[#1D1D1F] group-hover:text-[#0E4D3A] transition-colors">
                  info@kanasuwellness.com
                </p>
              </div>
            </a>
            <a
              href="https://wa.me/919019126470"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-white border border-[#E5E5EA] hover:border-[#0E4D3A] transition-all flex items-center gap-4 group shadow-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0E4D3A] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-[#8E8E93] uppercase">
                  WhatsApp & Phone Support
                </p>
                <p className="text-sm font-bold text-[#1D1D1F] group-hover:text-[#0E4D3A] transition-colors">
                  +91 90191 26470
                </p>
              </div>
            </a>
          </div>
          <div className="pt-2 text-center text-[11px] text-[#8E8E93] italic">
            Kanasu published policy verified for DARSHAI Sanctuary directory.
            Contact details confirmed.
          </div>
        </div>
      </div>
    </section>
  );
}
