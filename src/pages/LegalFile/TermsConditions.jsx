// src/pages/Legal/TermsConditions.jsx

import { motion } from "framer-motion";
import hero from "@/assets/images/MainImg.png";
import { MapPin, Mail, Phone } from "lucide-react";

const easing = [0.16, 1, 0.3, 1];

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-[#f6f3ef]">
      {/* 🔥 HERO (SAME DESIGN SYSTEM) */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <motion.img
          src={hero}
          alt="terms"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: easing }}
        />

        {/* GREEN OVERLAY */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top right, rgba(30,122,58,0.82), rgba(23,78,166,0.55), rgba(0,0,0,0.45))",
          }}
        />

        {/* CONTENT */}
        <motion.div
          className="relative z-10 text-white max-w-4xl px-6 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: easing }}
        >
          {/* HEADING */}
          <h1 className="text-[42px] md:text-[72px] font-serif leading-[1.05] tracking-[-0.02em]">
            TERMS & CONDITIONS
          </h1>
        </motion.div>
      </section>

      {/* 🔥 CONTENT SECTION */}
      <section className="py-24 px-6 md:px-20 max-w-5xl mx-auto">
        {/* SECTION 1 */}
        <Section
          title="Acceptance of Terms & Services Provided"
          content="By accessing the DARSHAI platform, engaging our clinical consultations, or participating in our geo-wellness retreats, you explicitly agree to abide by these Terms and Conditions. DARSHAI provides elite wellness consultations, AI-driven health insights, proprietary geo-wellness lifestyle programs, and digital content designed to optimize longevity and biological vitality"
        />

        <Divider />

        {/* SECTION 2 */}
        <Section
          title="Medical Disclaimer & Liability"
          content="The services, AI-generated protocols, and biological insights provided by DARSHAI are intended for wellness optimization and longevity planning. They do not constitute, nor should they be used as a substitute for, professional medical advice, diagnosis, or emergency treatment. DARSHAI and its clinical partners are not liable for specific health outcomes, digital interruptions, or external environmental issues encountered during your journey."
        />

        <Divider />

        {/* SECTION 3 */}
        <Section
          title="User Responsibilities & Financial Terms"
          content="Clients are required to provide accurate and truthful health data to ensure the safety and efficacy of the prescribed protocols. Any misuse of the platform or unauthorized access to our proprietary systems is strictly prohibited. Financial commitments for all services and retreat bookings must be settled prior to the commencement of the service. Standard cancellation policies apply to all Pioneer packages and subsequent bookings."
        />

        <Divider />

        {/* SECTION 4 */}
        <Section
          title="Intellectual Property & Governing Law"
          content="All content, clinical decision tree logic, software algorithms, branding, and methodologies hosted on our platform are the exclusive intellectual property of the DARSHAI Group. These Terms and Conditions, and any disputes arising from your engagement with DARSHAI, shall be governed by and construed in accordance with the laws of India."
        />

        <Divider />

        {/* CONTACT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-serif text-[#1E7A3A] mb-6">
            To Know More
          </h3>

          <p className="text-[#5F756B] max-w-xl mx-auto leading-relaxed">
            For any questions regarding these terms, please contact our team at
            DARSHAI Group.
          </p>

          <div className="mt-6 space-y-4 text-[#2A4A3A]">
            {/* LOCATION */}
            <div className="flex flex-col items-center gap-2">
              <MapPin className="w-5 h-5 text-[#1F4D3E]" />

              <a
                href="https://maps.app.goo.gl/PXvRtH1gMRRHHEtV6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1F4D3E]/70 hover:text-[#C6A75E] transition leading-relaxed"
              >
                MILESTONE25, 5th Floor
                Shop No. 514, Door No. 15-5-223/140, Collectors Gate Junction
                Balmatta, Mangalore-575 001
              </a>
            </div>

            {/* EMAIL */}
            <div className="flex flex-col items-center gap-2">
              <Mail className="w-5 h-5 text-[#1F4D3E]" />

              <a
                href="mailto:info@darshaigroup.com"
                className="text-[#1F4D3E]/70 hover:text-[#C6A75E] transition"
              >
                info@darshaigroup.com
              </a>
            </div>

            {/* PHONE */}
            <div className="flex flex-col items-center gap-2">
              <Phone className="w-5 h-5 text-[#1F4D3E]" />

              <a
                href="tel:+917204190150"
                className="text-[#1F4D3E]/70 hover:text-[#C6A75E] transition"
              >
                +91-7204190150
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

/* 🔥 REUSABLE COMPONENTS (SAME AS PRIVACY) */

const Section = ({ title, content }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="mb-14"
  >
    <h2 className="text-3xl md:text-4xl font-serif text-[#1E7A3A] mb-4">
      {title}
    </h2>

    <p className="text-[#5F756B] text-lg leading-relaxed font-light">
      {content}
    </p>
  </motion.div>
);

const Divider = () => (
  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C6A75E]/40 to-transparent my-12" />
);
