import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  HeartPulse,
  Sun,
  Brain,
  Award,
  Sparkles,
  Activity,
  TreePine,
} from "lucide-react";
const EXPLORE_ITEMS = [
  { num: "01", title: "Ayurveda Programmes", icon: HeartPulse },
  { num: "02", title: "Wellness Retreats", icon: Sun },
  { num: "03", title: "Stress Recovery Experiences", icon: Brain },
  { num: "04", title: "Executive Wellness Programmes", icon: Award },
  { num: "05", title: "Rejuvenation Journeys", icon: Sparkles },
  { num: "06", title: "Mind-Body Wellness Experiences", icon: Activity },
  { num: "07", title: "Nature-Based Environments", icon: TreePine },
];
export function WhyIndiaWellnessBentoSection({ onScrollToForm, onNavigate }) {
  const containerRef = useRef(null);
  const offeringsCardRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => {
      mediaQuery.removeEventListener("change", handler);
      window.removeEventListener("resize", checkDesktop);
    };
  }, []);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const bentoGridOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.4, 1],
    prefersReducedMotion ? [1, 1, 1] : [0, 1, 1],
  );
  const bentoGridY = useTransform(
    scrollYProgress,
    [0.2, 0.4, 1],
    prefersReducedMotion ? [0, 0, 0] : [30, 0, 0],
  );
  const bottomStripOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.6, 1],
    prefersReducedMotion ? [1, 1, 1] : [0, 1, 1],
  );
  const bottomStripY = useTransform(
    scrollYProgress,
    [0.4, 0.6, 1],
    prefersReducedMotion ? [0, 0, 0] : [30, 0, 0],
  );
  // Image Unveil transforms (0.2 - 0.5)
  const imageClipPath = useTransform(
    scrollYProgress,
    [0.2, 0.5],
    ["inset(0 14% 0 14%)", "inset(0 0% 0 0%)"],
  );
  const imageScale = useTransform(scrollYProgress, [0.2, 0.5], [1.08, 1.0]);
  const handleMouseMove = (e) => {
    if (!offeringsCardRef.current || !isDesktop) return;
    const rect = offeringsCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    offeringsCardRef.current.style.setProperty("--mouse-x", `${x}px`);
    offeringsCardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };
  return (
    <section
      ref={containerRef}
      id="why-india"
      className="bg-[#F5F5F7] border-b border-[#D2D2D7] relative overflow-hidden py-16 sm:py-20 lg:py-0 lg:h-[120vh]"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-center lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-10 sm:mb-12 text-center"
        >
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#0E4D3A] uppercase mb-2">
            WHY INDIA FOR WELLNESS
          </p>
          <h2 className="typography-section-h2 font-bold text-[#111111] leading-[1.1] tracking-tight mb-4">
            A Tradition of Wellness. <br />
            <span className="text-[#0E4D3A]">A Destination for Renewal.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#2C2C2E] font-medium leading-relaxed max-w-2xl mx-auto">
            Home to Ayurveda, Yoga and centuries of wellness wisdom.
          </p>
        </motion.div>
        <motion.div
          style={{
            opacity: isDesktop ? bentoGridOpacity : 1,
            y: isDesktop ? bentoGridY : 0,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8 text-left items-stretch max-w-5xl w-full"
        >
          <div
            ref={offeringsCardRef}
            onMouseMove={handleMouseMove}
            className="order-2 lg:order-1 lg:col-span-7 rounded-[26px] sm:rounded-[30px] bg-white border border-[#D2D2D7] p-6 sm:p-8 flex flex-col justify-between shadow-xs text-left relative overflow-hidden group"
          >
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
              style={{
                background:
                  "radial-gradient(400px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(14,77,58,0.10), transparent 80%)",
              }}
            />
            <div className="relative z-10">
              <p className="text-base sm:text-[17px] font-bold text-[#0E4D3A] mb-5 tracking-tight">
                Today, wellness travellers from around the world explore India
                for:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {EXPLORE_ITEMS.map((item, idx) => (
                  <motion.div
                    custom={idx}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: idx * 0.05,
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    tabIndex={0}
                    className={`flex flex-col p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#0E4D3A] group/item relative bg-white ${
                      idx === 6
                        ? "sm:col-span-2 bg-[#F9FBF9] border-[#0E4D3A]/30"
                        : "border-[#D2D2D7]/70"
                    }`}
                    key={item.num}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center shrink-0 w-7 h-7 rounded-lg bg-[#F5F5F7] group-hover/item:bg-[#0E4D3A] group-focus-visible/item:bg-[#0E4D3A] group-hover/item:text-white group-focus-visible/item:text-white text-[#0E4D3A] font-mono text-xs font-bold shadow-2xs transition-colors duration-200">
                        {item.num}
                      </div>
                      <span className="font-semibold text-[#111111] text-xs sm:text-sm">
                        {item.title}
                      </span>
                    </div>
                    <div className="mt-2.5 h-[1px] bg-[#C6A660] scale-x-0 group-hover/item:scale-x-100 group-focus-visible/item:scale-x-100 transition-transform duration-300 origin-left" />
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative z-10 pt-5 border-t border-[#D2D2D7]/60 mt-6 flex items-center justify-between text-xs sm:text-sm font-mono text-[#2C2C2E] font-semibold">
              <span>7 Verified Wellness Categories</span>
              <span className="text-[#0E4D3A] font-bold">100% Curated</span>
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5 rounded-[26px] sm:rounded-[30px] relative overflow-hidden min-h-[300px] sm:min-h-[380px] lg:min-h-full bg-[#111111] border border-[#D2D2D7] shadow-xs flex flex-col justify-between p-6 sm:p-7 text-white">
            {isDesktop ? (
              <motion.img
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&auto=format&fit=crop&q=80"
                alt="Authentic traditional Ayurvedic wellness in India"
                style={{
                  clipPath: imageClipPath,
                  scale: imageScale,
                }}
                className="w-full h-full object-cover absolute inset-0 brightness-[0.82] contrast-[1.05]"
              />
            ) : (
              <motion.img
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&auto=format&fit=crop&q=80"
                alt="Authentic traditional Ayurvedic wellness in India"
                initial={
                  prefersReducedMotion
                    ? {}
                    : { clipPath: "inset(0 14% 0 14%)", scale: 1.08 }
                }
                whileInView={
                  prefersReducedMotion
                    ? {}
                    : { clipPath: "inset(0 0% 0 0%)", scale: 1 }
                }
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
                className="w-full h-full object-cover absolute inset-0 brightness-[0.82] contrast-[1.05]"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20 pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#C6A660]" />
                <span>AUTHENTIC ORIGINS</span>
              </div>
            </div>
            <div className="relative z-10 space-y-2.5">
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#C6A660]">
                UNBROKEN TRADITIONAL LINEAGE
              </p>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                Living Classical Science & Rejuvenation
              </h3>
              <p className="text-sm text-white/90 leading-relaxed font-normal">
                Authentic botanical therapies, individualized physician
                consultations, and bio-climatic environments.
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div
          style={{
            opacity: isDesktop ? bottomStripOpacity : 1,
            y: isDesktop ? bottomStripY : 0,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4 sm:gap-6 py-5 px-4 sm:px-6 text-left max-w-4xl w-full rounded-2xl bg-white border border-[#D2D2D7]/80 shadow-xs"
        >
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-[#111111] tracking-tight flex items-center gap-2.5">
              <motion.span
                initial={{ scale: 0.6 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
                className="w-4 h-4 rounded-full bg-[#0E4D3A] inline-block shadow-2xs"
              />
              DARSHAI
            </span>
          </div>
          <div className="w-full sm:w-[2px] h-px sm:h-12 bg-[#0E4D3A]/30 shrink-0" />
          <div className="space-y-1 text-left">
            <p className="text-xl sm:text-2xl lg:text-[26px] font-display font-bold text-[#111111] tracking-tight leading-snug">
              DARSHAI helps make that journey effortless.
            </p>
            <p className="text-sm sm:text-[15px] text-[#2C2C2E] font-medium leading-relaxed">
              Curated partner recommendations, individualized programme
              matching, and complete on-ground care coordination.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
export default WhyIndiaWellnessBentoSection;
