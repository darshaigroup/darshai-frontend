import { motion } from "framer-motion";
import { Cpu, MapPinned, HeartPulse, ShieldCheck } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const sectionClass = "relative overflow-hidden bg-[#FBF8F1] py-28 lg:py-36";

const containerClass = "relative z-10 mx-auto max-w-7xl px-6 lg:px-10";

const pillars = [
  {
    id: 1,
    icon: Cpu,
    label: "PROPRIETARY DIAGNOSTIC LLM",
    title: "AI-Native",
    description:
      "DarshAI translates 5,000 years of classical Ayurvedic diagnostic scriptures into quantifiable, algorithmic health protocols.",
    pill: "Continuous Machine Learning",
  },
  {
    id: 2,
    icon: MapPinned,
    label: "THE SCIENCE OF WHERE",
    title: "Geo-Wellness",
    description:
      "Human optimization dynamically adapted to geographical location, ambient climate, bio-telemetry, and environmental rhythms.",
    pill: "Environmental Optimization",
  },
  {
    id: 3,
    icon: HeartPulse,
    label: "BIO-SOVEREIGNTY FIRST",
    title: "Preventive Healthcare",
    description:
      "Moving beyond symptom suppression to proactive longevity, predicting physiological imbalances before symptoms emerge.",
    pill: "Precision Longevity",
  },
  {
    id: 4,
    icon: ShieldCheck,
    label: "CLINICAL & SCIENTIFIC VALIDATION",
    title: "Trusted Wellness Network",
    description:
      "An elite ecosystem unifying certified Ayurvedic scholars, clinical researchers, and data-backed medical protocols.",
    pill: "Evidence-Based Ayurveda",
  },
];

const FourPillars = () => (
  <section className={sectionClass}>
    {/* Background */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#EEF7EC_0%,#FBF8F1_42%,#FBF8F1_100%)]" />
    <div className="absolute inset-0 opacity-[.035] [background-image:linear-gradient(to_right,#166534_1px,transparent_1px),linear-gradient(to_bottom,#166534_1px,transparent_1px)] [background-size:72px_72px]" />
    <div className="absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-emerald-200/20 blur-[140px]" />
    <div className="absolute right-0 top-20 h-[24rem] w-[24rem] rounded-full bg-lime-100/20 blur-[120px]" />
    <div className={containerClass}>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mx-auto max-w-4xl text-center"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#C89A2B]">
          OUR CORE ARCHITECTURE
        </span>

        <motion.h2
          variants={fadeUp}
          className="mt-5 font-serif text-4xl font-semibold text-[#18251D] sm:text-5xl"
        >
          The Four Pillars of DARSHAI
        </motion.h2>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger}
        className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4"
      >
        {pillars.map((pillar) => {
          const Icon = pillar.icon;

          return (
            <motion.article
              key={pillar.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative overflow-hidden rounded-[28px] border border-[#DCE8DD] bg-white px-8 pt-8 pb-1 shadow-[0_15px_45px_rgba(16,24,40,.05)] transition-all duration-500 hover:border-emerald-200 hover:shadow-[0_25px_60px_rgba(16,24,40,.08)]"
            >
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-emerald-50/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF5EE]">
                <Icon size={26} strokeWidth={1.8} className="text-[#1E7A3A]" />
              </div>
              <p className="mt-8 text-[11px] font-semibold uppercase tracking-[.18em] text-[#C89A2B]">
                {pillar.label}
              </p>
              <h3 className="mt-3 font-serif text-[2rem] font-semibold leading-tight text-[#18251D]">
                {pillar.title}
              </h3>
              <p className="mt-5 text-[16px] leading-8 text-[#4E5C58]">
                {pillar.description}
              </p>
              <div className="mt-10 flex items-center justify-between">
                <span className="rounded-full bg-[#EEF7EE] px-4 py-2 text-[12px] font-medium text-[#1E7A3A]">
                  {pillar.pill}
                </span>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </div>
    <motion.div
      animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.2, 0.12] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-emerald-300 blur-[130px]"
    />

    <motion.div
      animate={{ scale: [1.05, 1, 1.05], opacity: [0.08, 0.18, 0.08] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-lime-200 blur-[150px]"
    />
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FBF8F1] to-transparent" />
  </section>
);

export default FourPillars;
