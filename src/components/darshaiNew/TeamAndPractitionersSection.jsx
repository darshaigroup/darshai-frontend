import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  UserCheck,
  GraduationCap,
  Sparkles,
  BadgeCheck,
  CheckCircle2,
} from "lucide-react";
import SmartImage from "./SmartImage";
const CORE_TEAM = [
  {
    id: "dr-aiman",
    name: "Dr Aiman A Nisarudeen",
    role: "Ayurvedic Physician",
    category: "core",
    categoryLabel: "Core Wellness Team",
    degrees: "BAMS - RGUHS Bengaluru; C.Y.Ed - Manipal; DHT - Mumbai",
    biography:
      "Kanasu lists his areas as Panchakarma, detox, Sandigata rogas and pulse diagnosis. His current role, exact credential abbreviations and registration details should be confirmed before publication.",
    disclaimerNote: "Resident Ayurvedic Physician & Clinical Lead",
    imageSrc:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&h=1000&fit=crop&auto=format",
  },
  {
    id: "dr-ganapathi",
    name: "Dr. Ganapathi J Hebbarahithlu",
    role: "Yoga Practitioner",
    category: "core",
    categoryLabel: "Core Wellness Team",
    degrees:
      "Ph.D. (Yoga); M.Sc. (Mathematics); Hon. Professor of Yoga, Central Univ. of Kerala",
    biography:
      "Kanasu’s profile describes more than four decades in Yoga study, teaching and practice, including yoga therapy, pranayama, yogic anatomy and mind-body philosophy. The supplied biography also references teaching and academic roles at institutions in Karnataka and Kerala.",
    disclaimerNote: "Senior Yoga Master & Mind-Body Mentor",
    imageSrc:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=1000&fit=crop&auto=format",
  },
  {
    id: "mr-manish",
    name: "Mr. Manish Kumar",
    role: "Pranic Healer",
    category: "core",
    categoryLabel: "Core Wellness Team",
    degrees: "Certified Pranic Healer; Licensed Trainer (Karnataka & Manila)",
    biography:
      "Kanasu describes his background in engineering and IT, training in Reiki/Pranic Healing, and work as a life coach and wellness trainer. Verify current title and foundation affiliations before publishing.",
    disclaimerNote: "Energy & Subtle Body Healing Specialist",
    imageSrc:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1000&fit=crop&auto=format",
  },
];
const ADVISORY_BOARD = [
  {
    id: "dr-krishna",
    name: "Dr. Krishna R Hebbar",
    role: "Advisory Board Member",
    category: "advisory",
    categoryLabel: "Advisory Board",
    degrees:
      "B.A.M.S.; M.Sc. (Yoga Therapy); M.D. (Ayurveda); Assoc. Professor, CIMR, Manipal Univ.",
    biography:
      "Kanasu presents him as an Ayurveda, yoga-therapy and integrative-wellness academic with more than two decades of academic and clinical experience, contributing to programme and wellness guidance.",
    disclaimerNote:
      "Non-clinical Advisory Guidance — Does not provide daily direct consultations",
    imageSrc:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800&h=1000&fit=crop&auto=format",
  },
  {
    id: "dr-udaya",
    name: "Dr. H. N. Udaya Shankar",
    role: "Advisory Board Member - Environmental Science",
    category: "advisory",
    categoryLabel: "Advisory Board",
    degrees:
      "Ph.D. (Geology); Professor (Retd.), Manipal Institute of Technology",
    biography:
      "Kanasu describes his work in environmental geology, groundwater, climate and sustainable water-resource management. He is a non-clinical environmental-science advisor; do not present him as a treating physician.",
    disclaimerNote: "Environmental Sustainability Advisor — Non-clinical Role",
    imageSrc:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=1000&fit=crop&auto=format",
  },
];
const VISITING_PRACTITIONERS = [
  {
    id: "dr-shyam",
    name: "Dr Shyam Nidugala",
    role: "Visiting Practitioner",
    category: "visiting",
    categoryLabel: "Visiting Specialist",
    degrees: "BNYS, MSc, PGDP, MBA; 25+ Years Experience",
    biography:
      "Kanasu describes his work across integrative wellness, lifestyle medicine, clinical frameworks and wellness-destination development. Public profile focuses on approved credentials and professional scope.",
    disclaimerNote:
      "Periodic Resident Specialist — Confirm schedule before booking",
    imageSrc:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=1000&fit=crop&auto=format",
  },
  {
    id: "dr-arun",
    name: "Dr Arun Upendran",
    role: "Visiting Practitioner - Integrative Medicine / Functional Wellness Consultant",
    category: "visiting",
    categoryLabel: "Visiting Specialist",
    degrees: "BNYS; 18 Years Experience",
    biography:
      "Kanasu describes cross-disciplinary work across naturopathy, Ayurveda wellness, functional medicine and wellness operations, including developing structured wellness programmes.",
    disclaimerNote:
      "Consultant Specialist — Available during specific seasonal modules",
    imageSrc:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=1000&fit=crop&auto=format",
  },
  {
    id: "dr-deepthi",
    name: "Dr Deepthi Konamme",
    role: "Visiting Practitioner - Integrated Medicine / Diet & Nutrition Consultant",
    category: "visiting",
    categoryLabel: "Visiting Specialist",
    degrees: "BNYS, PGDP; 17 Years Experience",
    biography:
      "Kanasu describes work in nutrition, functional medicine, dietary and lifestyle interventions, and integrated wellness practices. Confirm exact name spelling, credentials and appointment availability.",
    disclaimerNote:
      "Dietary & Functional Medicine Consultant — Scheduled Visits",
    imageSrc:
      "https://images.unsplash.com/photo-1594824813566-78a05f15d861?w=800&h=1000&fit=crop&auto=format",
  },
];
export default function TeamAndPractitionersSection() {
  const [activeTab, setActiveTab] = useState("all");
  const filteredMembers =
    activeTab === "all"
      ? [...CORE_TEAM, ...ADVISORY_BOARD, ...VISITING_PRACTITIONERS]
      : activeTab === "core"
        ? CORE_TEAM
        : activeTab === "advisory"
          ? ADVISORY_BOARD
          : VISITING_PRACTITIONERS;
  return (
    <section className="py-20 sm:py-28 bg-[#0F0F11] text-white relative overflow-hidden border-t border-[#1F1F23]">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#0E4D3A]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A1E] border border-[#2D2D35] text-[#34D399] typography-caption uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5" />
            <span>10 | OUR TEAM & PRACTITIONERS</span>
          </div>
          <h2 className="typography-section-h2 text-white">
            Meet the people behind the experience.
          </h2>
          <p className="typography-lead text-white/70 max-w-2xl mx-auto font-normal">
            Distinguished clinicians, yoga masters, healers, and academic
            advisors driving constitution-aware recalibration at Kanasu
            Sanctuary.
          </p>
          ""
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {[
            { id: "all", label: "All Members", count: 8 },
            { id: "core", label: "Core Wellness Team", count: 3 },
            { id: "advisory", label: "Advisory Board", count: 2 },
            { id: "visiting", label: "Visiting Practitioners", count: 3 },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full typography-ui-button text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-[#0E4D3A] text-white shadow-lg shadow-[#0E4D3A]/40 border border-[#34D399]/40"
                    : "bg-[#18181B] text-white/70 hover:text-white hover:bg-[#222226] border border-[#27272A]"
                }`}
                key={tab.id}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${isActive ? "bg-white/20 text-white" : "bg-white/10 text-white/50"}`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredMembers.map((member, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex flex-col h-full"
                key={member.id}
              >
                <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-[#1D1D21] border border-[#2D2D33] shadow-xl group-hover:border-[#0E4D3A] group-hover:shadow-[0_20px_50px_rgba(14,77,58,0.25)] transition-all duration-500 ease-out">
                  <SmartImage
                    src={member.imageSrc}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md border ${
                        member.category === "core"
                          ? "bg-[#0E4D3A]/80 text-[#34D399] border-[#34D399]/30"
                          : member.category === "advisory"
                            ? "bg-[#1A1A1E]/80 text-[#C6A660] border-[#C6A660]/30"
                            : "bg-[#25252B]/80 text-sky-300 border-sky-400/30"
                      }`}
                    >
                      {member.categoryLabel}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 group-hover:text-white group-hover:border-[#34D399] transition-colors">
                      <BadgeCheck className="w-4 h-4 text-[#34D399]" />
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-semibold text-white/80 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#34D399]" />
                      <span>{member.disclaimerNote}</span>
                    </p>
                  </div>
                </div>
                <div className="pt-5 flex-1 flex flex-col space-y-3 px-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="typography-caption text-[#C6A660] uppercase tracking-wider font-semibold">
                      {member.role}
                    </p>
                  </div>
                  <h3 className="typography-h3 text-white text-xl font-bold group-hover:text-[#34D399] transition-colors">
                    {member.name}
                  </h3>
                  <div className="p-3 rounded-xl bg-[#1A1A1E] border border-[#2A2A32] text-xs font-medium text-white/90 space-y-1">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-white/50 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-[#34D399]" />
                      <span>Verified Qualifications</span>
                    </div>
                    <p className="text-white/90 leading-snug font-semibold">
                      {member.degrees}
                    </p>
                  </div>
                  <div className="pt-1 flex-1">
                    <p className="text-xs text-white/80 leading-relaxed font-semibold">
                      {member.biography}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#222228] flex items-center gap-1.5 text-[11px] text-white/50 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
                    <span>DARSHAI Verified Practitioner Profile</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        ""
      </div>
    </section>
  );
}
