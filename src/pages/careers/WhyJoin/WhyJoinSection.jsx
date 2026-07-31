import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  GraduationCap,
  Rocket,
  ShieldCheck,
} from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 35 }, show: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

const features = [
  {
    icon: Rocket,
    title: "Accelerate Your Career",
    description:
      "Join one of India's emerging AI-powered healthcare startups and build meaningful solutions alongside visionary leaders.",
    points: [
      "Work directly with the Founder & Leadership Team.",
      "Build one of India's emerging AI-powered Geo-Wellness platforms.",
      "Gain exposure to startups, healthcare, wellness, AI, and strategic partnerships.",
    ],
  },
  {
    icon: GraduationCap,
    title: "Grow Beyond Your Role",
    description:
      "Develop leadership skills while contributing to a mission that transforms preventive healthcare through innovation.",
    points: [
      "Contribute to meaningful social impact through preventive wellness.",
      "Learn across multiple business functions in a high-growth environment.",
      "Participate in leadership development and continuous learning initiatives.",
    ],
  },
];

const WhyJoinSection = () => {
  return (
    <section id="why-join" className="relative overflow-hidden bg-[#f8f8f8] py-24">

      <div className="relative mx-auto max-w-[1450px] px-6 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#CFE2D4] bg-[#EEF8F2] px-5 py-2">
            <Brain size={15} className="text-[#C89C37]" />

            <span className="text-[11px] font-semibold uppercase tracking-[.22em] text-[#1E7A3A]">
              Why Join DarshAI
            </span>
          </div>

          <h2 className="mt-8 font-['Playfair_Display'] text-[2.8rem] font-semibold leading-none tracking-[-.03em] text-[#162A1E] sm:text-[3.7rem] lg:text-[4.4rem]">
            Build Your Career.
            <span className="block mt-2 text-[#1E7A3A]">
              Create Meaningful Impact.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-[17px] leading-8 text-[#66746B]">
            Join an ambitious team combining Artificial Intelligence, preventive
            healthcare, longevity science, and Ayurveda to build one of India's
            most innovative wellness platforms.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-20 grid gap-8 lg:grid-cols-2"
        >
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-[30px] border border-[#E6ECE8] bg-white p-10 shadow-[0_12px_40px_rgba(16,24,40,.05)] transition-all duration-300 hover:border-[#1E7A3A]/30 hover:shadow-[0_28px_70px_rgba(30,122,58,.12)]"
              >
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#EEF8F2] blur-3xl opacity-70" />

                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF8F2] transition-all duration-300 group-hover:bg-[#1E7A3A]">
                    <Icon
                      size={30}
                      className="text-[#1E7A3A] transition-all duration-300 group-hover:text-white"
                    />
                  </div>

                  <h3 className="mt-8 font-['Playfair_Display'] text-[2rem] font-semibold text-[#162A1E]">
                    {item.title}
                  </h3>

                  <p className="mt-5 text-[16px] leading-8 text-[#66746B]">
                    {item.description}
                  </p>

                  <div className="mt-8 space-y-5">
                    {item.points.map((point) => (
                      <motion.div
                        key={point}
                        whileHover={{ x: 4 }}
                        className="flex items-start gap-4"
                      >
                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF8F2] transition-all duration-300 group-hover:bg-[#1E7A3A]">
                          <ShieldCheck
                            size={16}
                            className="text-[#1E7A3A] transition-all duration-300 group-hover:text-white"
                          />
                        </div>

                        <p className="leading-7 text-[#4F5F55]">{point}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyJoinSection;
