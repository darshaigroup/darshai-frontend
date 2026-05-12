import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const howItWorksSteps = [
  {
    id: "step-1",
    step: "Step 1",
    title: "Discover your biome and biological driver.",
    description:
      "We begin with a precision assessment that combines lifestyle signals, biomarker inputs, and personalized geography to define the right wellness path for your body.",
    cta: "Start assessment",
    mediaType: "image",
    mediaSrc: "/src/assets/images/how-it-works-1.jpg",
    accent: "bg-emerald-400/10",
  },
  {
    id: "step-2",
    step: "Step 2",
    title: "Translate data into a bespoke treatment map.",
    description:
      "Every recommendation is derived from physiological need, not trends — creating a plan that balances recovery, circadian rhythm, and regenerative travel.",
    cta: "View the protocol",
    mediaType: "image",
    mediaSrc: "/src/assets/images/how-it-works-2.jpg",
    accent: "bg-emerald-500/10",
  },
  {
    id: "step-3",
    step: "Step 3",
    title: "Elevate your environment with curated sanctuary design.",
    description:
      "We select the right climate, geology and light spectrum for the exact biology you are optimizing — from highland recovery to oceanic circulation support.",
    cta: "Explore sanctuaries",
    mediaType: "image",
    mediaSrc: "/src/assets/images/how-it-works-3.jpg",
    accent: "bg-emerald-600/10",
  },
  {
    id: "step-4",
    step: "Step 4",
    title: "Guide your body through measured, phased progress.",
    description:
      "Your timeline is broken into high-impact phases with adaptive feedback loops, so each step builds meaningfully instead of repeating generic recovery rituals.",
    cta: "See the phases",
    mediaType: "image",
    mediaSrc: "/src/assets/images/how-it-works-4.jpg",
    accent: "bg-emerald-500/10",
  },
  {
    id: "step-5",
    step: "Step 5",
    title: "Sustain performance with science-backed rhythm maintenance.",
    description:
      "We lock the results in with an ongoing plan that keeps your recovery aligned with circadian rhythm, hormonal balance, and environmental intelligence.",
    cta: "Join the movement",
    mediaType: "image",
    mediaSrc: "/src/assets/images/how-it-works-5.jpg",
    accent: "bg-emerald-400/10",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setActiveIndex(index);
          }
        });
      },
      {
        root: null,
        threshold: 0.55,
      }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#023a34] text-white">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="inline-flex rounded-full border border-emerald-200/30 bg-emerald-200/10 px-4 py-2 text-sm uppercase tracking-[0.35em] text-emerald-200">
              How it works
            </p>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              A premium, scroll-driven journey for modern wellness discovery.
            </h2>
            <p className="max-w-2xl text-slate-200/90 text-base leading-8 sm:text-lg">
              Experience every step as a refined chapter — with smooth transitions, sticky media presentation, and intelligent progress feedback that feels calm and premium.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-3xl bg-white/5 px-5 py-4 text-sm text-slate-200 shadow-xl shadow-black/20 sm:px-6">
            <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_0_10px_rgba(16,185,129,0.08)]" />
            <span className="font-medium">Scroll to reveal each step</span>
          </div>
        </div>

        <div className="mt-16 grid gap-12 xl:grid-cols-[90px_minmax(0,1fr)_420px] xl:items-start">
          <div className="hidden xl:block">
            <div className="sticky top-36 flex h-[calc(100vh-8rem)] flex-col items-center justify-center gap-5">
              {howItWorksSteps.map((step, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => {
                      stepRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                    className="group flex items-center justify-center"
                  >
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full transition-all duration-500 ${
                        isActive
                          ? "scale-110 bg-white text-[#023a34] ring-2 ring-white"
                          : "bg-slate-700 text-slate-400"
                      }`}
                    >
                      <span className={`block h-2.5 w-2.5 rounded-full ${isActive ? "bg-[#023a34]" : "bg-slate-400"}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-16">
            <div className="xl:hidden">
              <div className="flex w-full items-center justify-center gap-3 overflow-x-auto pb-2">
                {howItWorksSteps.map((_, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        stepRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                      className={`flex h-4 w-4 items-center justify-center rounded-full transition-all duration-500 ${
                        isActive ? "scale-110 bg-white" : "bg-slate-700"
                      }`}
                    >
                      <span className={`h-2 w-2 rounded-full ${isActive ? "bg-[#023a34]" : "bg-slate-500"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {howItWorksSteps.map((step, index) => (
              <motion.article
                key={step.id}
                ref={(el) => (stepRefs.current[index] = el)}
                data-index={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.45 }}
                variants={fadeUp}
                transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.05 }}
                className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-10"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/90">{step.step}</p>
                    <h3 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                      {step.title}
                    </h3>
                  </div>
                  {step.cta ? (
                    <button className="mt-6 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-emerald-300/40 hover:bg-emerald-500/10 lg:mt-0">
                      {step.cta}
                    </button>
                  ) : null}
                </div>
                <p className="mt-6 max-w-2xl text-slate-200/90 leading-8">
                  {step.description}
                </p>
              </motion.article>
            ))}
          </div>

          <div className="xl:sticky xl:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={howItWorksSteps[activeIndex].id}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.98 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/95 p-4 shadow-2xl shadow-black/40"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent" />
                <div className="rounded-[28px] overflow-hidden border border-white/5 bg-slate-900">
                  <img
                    src={howItWorksSteps[activeIndex].mediaSrc}
                    alt={howItWorksSteps[activeIndex].title}
                    className="h-[420px] w-full object-cover sm:h-[500px]"
                  />
                </div>
                <div className="mt-6 flex flex-col gap-3 rounded-[24px] bg-white/10 p-6 text-slate-200 shadow-inner shadow-black/20">
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/80">
                    {howItWorksSteps[activeIndex].step}
                  </p>
                  <h4 className="text-xl font-semibold text-white">
                    {howItWorksSteps[activeIndex].title}
                  </h4>
                  <p className="text-sm leading-7 text-slate-300">
                    {howItWorksSteps[activeIndex].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
