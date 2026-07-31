import { useState } from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  Search,
  ClipboardCheck,
  Users,
  FileBadge,
  Rocket,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    id: "01",
    icon: UserPlus,
    title: "Candidate Registration",
    description:
      "Submit your profile, educational background, and resume through our direct career portal.",
    duration: "Immediate",
    chips: ["Instant Registration ID", "Direct Talent Committee Dispatch"],
  },
  {
    id: "02",
    icon: Search,
    title: "Resume Screening",
    description:
      "Our talent acquisition leads and technical domain heads evaluate your application against open role prerequisites.",
    duration: "24–48 Hours",
    chips: ["Domain Match Check", "Fast-Track Evaluation"],
  },
  {
    id: "03",
    icon: ClipboardCheck,
    title: "Written Assessment",
    description:
      "Complete a practical task, coding challenge, research case study, or problem-solving assignment relevant to your discipline.",
    duration: "3–5 Days",
    chips: ["Practical Task / Case Study", "Fair Technical Grading"],
  },
  {
    id: "04",
    icon: Users,
    title: "Interview Process",
    description:
      "Engage in 2–3 focused rounds with technical leads, department heads, and cross-functional teams to explore mutual fit.",
    duration: "5–7 Days",
    chips: ["Technical Deep-Dive", "Leadership & Culture Alignment"],
  },
  {
    id: "05",
    icon: FileBadge,
    title: "Letter of Intent (LOI)",
    description:
      "Receive your formal Letter of Intent detailing your role parameters, compensation structure, and start date.",
    duration: "24 Hours",
    chips: ["Transparent Compensation", "Equity & Growth Plan"],
  },
  {
    id: "06",
    icon: Rocket,
    title: "Onboarding",
    description:
      "Welcome to DARSHAI! Begin personalized orientation, mentorship alignment, and immediate integration into active innovation projects.",
    duration: "Day 1 & Beyond",
    chips: ["Mentorship", "AI Innovation"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

const RecruitmentSection = () => {
  const [active, setActive] = useState(2);

  return (
    <section
      id="recruitment"
      className="relative overflow-hidden bg-[#FBF8F1] py-28"
    >
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#CFE6D5] bg-[#EEF8F1] px-4 py-1.5">
            <CheckCircle2 size={14} className="text-[#2F8A49]" />

            <span className="text-[11px] font-semibold uppercase tracking-[.18em] text-[#2F8A49]">
              Recruitment Journey
            </span>
          </div>

          <h2 className="mt-5 font-serif text-4xl font-bold text-[#1C2A22] md:text-6xl">
            Your Path to DARSHAI
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-[#68756D]">
            A transparent, 6-stage progression designed for speed, fairness, and
            mutual discovery.
          </p>
        </motion.div>

        <div className="relative mx-auto mt-24 max-w-3xl">
          <div className="absolute left-[27px] top-2 bottom-0 w-px bg-[#6EB67C]">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
              className="w-full bg-[#2F8A49]"
            />
          </div>

          <div className="space-y-14">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = active === index;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.6 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => setActive(index)}
                  onViewportEnter={() => setActive(index)}
                  whileHover={{ x: 6 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative flex cursor-pointer items-start gap-5"
                >
                  {/* Timeline Icon */}

                  <div className="relative z-20 flex w-12 justify-center">
                    <motion.div
                      animate={{
                        scale: isActive ? 1.08 : 1,
                        borderColor: isActive ? "#2F8A49" : "#8BB989",
                        backgroundColor: isActive ? "#2F8A49" : "#FFFFFF",
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-sm"
                    >
                      <Icon
                        size={18}
                        strokeWidth={2.2}
                        className={isActive ? "text-white" : "text-[#2F8A49]"}
                      />
                    </motion.div>

                    <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4A62A] text-[9px] font-bold text-white shadow">
                      {step.id}
                    </div>
                  </div>

                  {/* Content */}

                  <motion.div
                    animate={{
                      paddingLeft:
                        window.innerWidth >= 768 ? (isActive ? 18 : 12) : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-full p-4 md:py-1 md:pr-2"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`font-serif text-[28px] leading-tight font-bold transition-colors duration-300 md:text-[22px] ${
                            isActive ? "text-[#2F8A49]" : "text-[#213126]"
                          }`}
                        >
                          {step.title}
                        </h3>

                        <p className="mt-4 w-full max-w-none text-[15px] leading-7 text-[#68756D] md:max-w-[430px]">
                          {step.description}
                        </p>

                        <div className="mt-6 flex items-center gap-2">
                          <motion.div
                            animate={{
                              backgroundColor: isActive ? "#2F8A49" : "#C9D7CC",
                            }}
                            transition={{ duration: 0.3 }}
                            className="h-px flex-1"
                          />

                          <span
                            className={`whitespace-nowrap text-[10px] font-bold uppercase tracking-[.18em] transition-colors duration-300 ${
                              isActive ? "text-[#2F8A49]" : "text-[#8A9890]"
                            }`}
                          >
                            NEXT STAGE
                          </span>

                          <motion.div
                            animate={isActive ? { x: [0, 4, 0] } : { x: 0 }}
                            transition={{
                              repeat: Infinity,
                              duration: 1.4,
                            }}
                          >
                            <ChevronRight
                              size={14}
                              className={`transition-colors duration-300 ${
                                isActive ? "text-[#2F8A49]" : "text-[#8A9890]"
                              }`}
                            />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                 
                </motion.div>
              );
            })}
          </div>

          {/* Background Glow */}
          <motion.div
            animate={{
              opacity: active >= 0 ? 0.25 : 0.1,
              scale: active >= 0 ? 1 : 0.9,
            }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none absolute inset-0 -z-10 rounded-[48px] bg-[radial-gradient(circle_at_center,rgba(53,138,73,.10),transparent_70%)]"
          />
        </div>
      </div>
    </section>
  );
};

export default RecruitmentSection;
