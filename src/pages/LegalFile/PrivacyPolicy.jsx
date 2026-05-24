// src/pages/Legal/PrivacyPolicy.jsx

import { motion } from "framer-motion";
import hero from "@/assets/images/MainImg.png";
import { MapPin, Mail, Phone } from "lucide-react";

const easing = [0.16, 1, 0.3, 1];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#f6f3ef]">
      {/* 🔥 HERO SECTION (SAME STYLE AS CONTACT) */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <motion.img
          src={hero}
          alt="privacy"
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
            PRIVACY POLICY
          </h1>
        </motion.div>
      </section>

      {/* 🔥 CONTENT SECTION */}
      <section className="py-24 px-6 md:px-20 max-w-5xl mx-auto">
        {/* INTRO */}
        <Section
          title="Introduction & Commitment to Privacy"
          content="At DARSHAI Group, we respect the sanctity of your personal and biological data. We are committed to protecting your privacy with the same rigor we apply to our clinical protocols. This Privacy Policy outlines our practices regarding the collection, utilization, and safeguarding of your information when you engage with our AI-native geo-wellness platform and physical sanctuaries."
        />

        <Divider />

        {/* INFO COLLECTION */}
        <Section
          title="Information Collection"
          content="To curate your Sovereign Journey, we require specific data points. We collect Personal Information, including your name, email address, phone number, and geographic location. Furthermore, to power our Predictive Longevity models and clinical decision trees, we collect deeply personal Health & Wellness Information. This includes lifestyle data, wellness goals, consultation inputs, and clinical biomarkers (such as Continuous Glucose Monitoring data and Bio-Impedance Analysis). We also collect Technical Data, including IP addresses, device types, browser specifications, and usage behaviour to optimize our digital dashboard experience."
        />

        <Divider />

        {/* DATA USAGE */}
        <Section
          title="Data Utilization & Sharing"
          content="Your data is exclusively used to provide and enhance your personalized wellness services, improve our AI algorithms, and facilitate clear communication. DARSHAI strictly adheres to a 'No-Sell' data policy; we will never sell your biological or personal data to third parties. Information is only shared with our internal clinical teams, secure cloud infrastructure providers necessary for our operations, and legal authorities if strictly required by law."
        />

        <Divider />

        {/* SECURITY */}
        <Section
          title="Data Security & User Rights"
          content="We deploy advanced encryption and secure systems to protect your data across our digital and physical touchpoints. While no system can guarantee absolute security, our standards reflect the elite nature of our clientele. You maintain full rights over your data, including the right to access, update, or request the deletion of your personal and health records. Our platform utilizes cookies for performance and analytics, which you may disable at your discretion"
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
            For any privacy-related inquiries or to exercise your data rights,
            please contact our Data Privacy Officer at DARSHAI Group
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
                href="tel:+918088171511"
                className="text-[#1F4D3E]/70 hover:text-[#C6A75E] transition"
              >
                +91-8088171511
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

/* 🔥 COMPONENTS */

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
