import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle, Mail } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };
const accordion = {
  hidden: { opacity: 0, height: 0 },
  show: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
};

const faqs = [
  {
    category: "GENERAL",
    question:
      "What makes DARSHAI different from traditional HealthTech companies?",
    answer:
      "DARSHAI is India's first AI-native healthcare company built upon thousands of years of validated Ayurvedic science combined with modern biometrics and Generative AI. We focus on preventive, hyper-personalized wellness rather than reactive disease management.",
  },
  {
    category: "HIRING PROCESS",
    question:
      "How long does the entire selection process take from application to offer?",
    answer:
      "The recruitment process typically takes between 1–3 weeks depending on the role. It generally includes application review, an initial screening, technical or functional interviews, an HR discussion, and finally the offer and onboarding process.",
  },
  {
    category: "CULTURE & BENEFITS",
    question: "Are remote or hybrid work arrangements available at DARSHAI?",
    answer:
      "Some positions may offer hybrid flexibility depending on business requirements. However, many roles require on-site collaboration to foster innovation, cross-functional teamwork, and high-quality healthcare delivery.",
  },
  {
    category: "AI & TECH",
    question:
      "Do non-engineering candidates need prior experience in AI or Ayurveda?",
    answer:
      "No. Prior AI or Ayurveda experience is not mandatory for non-engineering roles. We value curiosity, adaptability, domain expertise, and a willingness to learn. Role-specific training is provided whenever required.",
  },
  {
    category: "CULTURE & BENEFITS",
    question: "What wellness benefits and ESOP plans does DARSHAI offer?",
    answer:
      "DARSHAI promotes employee well-being through a collaborative culture, continuous learning opportunities, preventive healthcare initiatives, and role-specific benefits. ESOP eligibility and additional benefits depend on the position and company policy.",
  },
  {
    category: "HIRING PROCESS",
    question: "Can I apply for multiple open positions simultaneously?",
    answer:
      "Yes. You are welcome to apply for multiple roles that align with your skills and interests. Our hiring team will review your profile and consider you for the opportunity that best matches your qualifications.",
  },
  {
    category: "CAREER GROWTH",
    question: "What kind of career growth opportunities does DARSHAI provide?",
    answer:
      "We encourage continuous learning, cross-functional collaboration, mentorship, and ownership. Employees have opportunities to work on cutting-edge AI, healthcare, and product initiatives while growing both technically and professionally.",
  },
  {
    category: "WORK CULTURE",
    question: "What is it like working at DARSHAI?",
    answer:
      "Our culture emphasizes innovation, transparency, ownership, and collaboration. We bring together experts from healthcare, AI, engineering, business, and wellness to build impactful preventive healthcare solutions.",
  },
];
const GREEN_BADGE="bg-[#EEF8F2] border-[#CFE3D4] text-[#1E7A3A]";

const badgeStyle={
  GENERAL:GREEN_BADGE,
  "HIRING PROCESS":GREEN_BADGE,
  "CULTURE & BENEFITS":GREEN_BADGE,
  "AI & TECH":GREEN_BADGE,
  "CAREER GROWTH":GREEN_BADGE,
  "WORK CULTURE":GREEN_BADGE
};
const FAQItem = ({ faq, active, onClick, index }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    transition={{ delay: index * 0.06 }}
    className={`overflow-hidden rounded-2xl border bg-white shadow-[0_8px_30px_rgba(16,24,40,.04)] transition-all ${active ? "border-[#1E7A3A]" : "border-[#E6ECE8]"}`}
  >
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left lg:px-6"
    >
      <div className="flex min-w-0 items-center gap-4">
        <span
          className={`hidden shrink-0 rounded-md border px-3 py-1 text-[10px] font-bold uppercase tracking-[.18em] sm:inline-flex ${badgeStyle[faq.category]}`}
        >
          {faq.category}
        </span>

        <h3 className="font-['Playfair_Display'] text-[18px] font-semibold leading-snug text-[#162A1E] lg:text-[1.45rem]">
          {faq.question}
        </h3>
      </div>

      <motion.div
        animate={{ rotate: active ? 180 : 0 }}
        transition={{ duration: 0.25 }}
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${active ? "bg-[#1E7A3A] text-white" : "bg-[#F5F7F6] text-[#7A857E]"}`}
      >
        {active ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </motion.div>
    </button>

    <AnimatePresence initial={false}>
      {active && (
        <motion.div
          variants={accordion}
          initial="hidden"
          animate="show"
          exit="exit"
          transition={{ duration: 0.28 }}
          className="overflow-hidden"
        >
          <div className="border-t border-[#EDF2EE] px-5 py-6 lg:px-6">
            <p className="leading-8 text-[#66746B]">{faq.answer}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FAQSection = () => {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-[#fcfcfc] py-24">
      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#CFE2D4] bg-[#e1f8e5] px-5 py-2">
            <HelpCircle size={14} className="text-[#C89C37]" />

            <span className="text-[11px] font-bold uppercase tracking-[.18em] text-[#C89C37]">
              Got Questions?
            </span>
          </div>

          <h2 className="mt-7 font-['Playfair_Display'] text-[2.6rem] font-semibold leading-none tracking-[-.03em] text-[#162A1E] sm:text-[3.4rem]">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-8 text-[#66746B]">
            Quick insights into working at DARSHAI, recruitment timelines, team
            culture, benefits, and opportunities.
          </p>
        </motion.div>

        <div className="mt-16 space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              index={index}
              active={open === index}
              onClick={() => setOpen(open === index ? -1 : index)}
            />
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-10 overflow-hidden rounded-[24px] bg-[#1E7A3A] shadow-[0_18px_50px_rgba(30,122,58,.22)]"
        >
          <div className="flex flex-col items-start justify-between gap-8 px-7 py-7 md:flex-row md:items-center">
            <div className="flex items-start gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2E8E4A]">
                <HelpCircle size={22} className="text-[#D7F3DF]" />
              </div>

              <div>
                <h3 className="font-['Playfair_Display'] text-[1.6rem] font-semibold text-white">
                  Have a specific question?
                </h3>

                <p className="mt-2 text-[15px] leading-7 text-white/80">
                  Reach out directly to our Talent Acquisition team and we'll
                  get back to you as soon as possible.
                </p>
              </div>
            </div>

            <a
              href="mailto:careers@darshai.in"
              className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#D5A623] px-7 py-3 text-sm font-semibold text-[#1F2A22] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E5B63B]"
            >
              <Mail size={18} />
              careers@darshai.in
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
