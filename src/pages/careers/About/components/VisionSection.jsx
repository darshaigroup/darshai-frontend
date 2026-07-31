import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import visionImg from "@/assets/images/ceo1.jpeg";

const fadeUp = {
    hidden: { opacity: 0, y: 35 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  },
  fadeLeft = {
    hidden: { opacity: 0, x: -40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  },
  container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.18 } },
  };

const vision = {
  badge: "THE VISIONARY",
  title1: "Architecting",
  title2: "Biological Sovereignty.",
  quote:
    "Health is not a luxury you purchase, but a biological sovereignty you reclaim through mathematical precision.",
  name: "Veekshitha V",
  role: "Founder & Bio-Luxury Strategist",
  award: "Silver Jubilee Year Award Journalist & Science Scholar",
};

const VisionSection = () => (
  <section className="relative overflow-hidden bg-[#FBF8F1] py-20 lg:py-28">
    <div className="mx-auto max-w-[1450px] px-6 lg:px-10">
      <div className="mb-14 h-px bg-[#DDD7CE]" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid items-center gap-12 lg:grid-cols-[520px_minmax(0,1fr)] xl:grid-cols-[560px_minmax(0,1fr)]"
      >
        <motion.div
          variants={fadeLeft}
          className="relative mx-auto w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[560px]"
        >
          <div className="absolute -bottom-3 right-[-12px] h-16 w-16 rounded-br-[18px] rounded-tl-[18px] border border-[#D8B24D] sm:-bottom-5 sm:right-[-18px] sm:h-24 sm:w-24 sm:rounded-br-[22px] sm:rounded-tl-[22px]" />

          <div className="overflow-hidden rounded-[26px] shadow-[0_35px_70px_rgba(0,0,0,.14)] sm:rounded-[34px]">
            <img
              src={visionImg}
              alt={vision.name}
              className="h-[420px] w-full object-cover sm:h-[560px] lg:h-[700px]"
            />
          </div>

          <div className="absolute bottom-4 left-4 right-4 rounded-[18px] border border-white/10 bg-[#121512]/90 px-5 py-5 backdrop-blur-xl sm:bottom-7 sm:left-7 sm:right-7 sm:rounded-[20px] sm:px-6 sm:py-6">
            <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-[#D8B24D] sm:text-[11px]">
              {vision.role}
            </p>

            <h3 className="mt-3 font-['Playfair_Display'] text-[1.75rem] font-semibold leading-tight text-white sm:text-[2rem] lg:text-[2.5rem]">
              {vision.name}
            </h3>

            <p className="mt-3 text-[13px] leading-7 text-white/70 sm:text-[14px]">
              {vision.award}
            </p>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col">
          <div className="inline-flex w-fit items-center rounded-full border border-[#BFD5BF] bg-[#EEF5EE] px-6 py-3">
            <span className="text-[11px] font-semibold uppercase tracking-[.35em] text-[#C99A35]">
              {vision.badge}
            </span>
          </div>

          <h2 className="mt-8 font-['Playfair_Display'] text-[2.8rem] font-semibold leading-[1.02] tracking-[-.04em] text-[#132C1D] sm:text-[3.6rem] lg:text-[4.6rem] xl:text-[5.2rem]">
            {vision.title1}
            <span className="mt-2 block text-[#2F964A]">{vision.title2}</span>
          </h2>

          <motion.div
            variants={fadeUp}
            className="mt-8 relative rounded-[22px] border-l-4 border-[#2F964A] bg-[#EEF0EC] px-7 py-7"
          >
            <Quote className="absolute right-7 top-5 h-9 w-9 text-[#D7BC6B]" />
            <p className="max-w-[780px] font-['Playfair_Display'] text-[1.55rem] italic leading-[1.45] text-[#18301F] sm:text-[1.75rem] lg:text-[2rem]">
              “{vision.quote}”
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 space-y-7 text-[17px] leading-[2.05] text-[#27322C]"
          >
            <p>
              <strong className="font-semibold text-[#132C1D]">
                Veekshitha V
              </strong>{" "}
              is an Innovator in science communication and a bio-luxury
              strategist dedicated to bridging the significant gap between
              ancient Ayurvedic wisdom and modern clinical data.
            </p>

            <p>
              As a Silver Jubilee Year Award journalist and science scholar, she
              recognized that the greatest crisis in modern health was not a
              lack of information, but a lack of integration.
            </p>

            <p>
              Under her leadership, DARSHAI has evolved from a startup concept
              into an elite ecosystem where{" "}
              <strong className="font-semibold text-[#132C1D]">Darsh AI</strong>
              - our proprietary diagnostic engine-translates thousands of years
              of traditional medicine into quantifiable, data - backed longevity
              protocols.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-9 rounded-[18px] border border-[#E7C86E] bg-[#FFFDF7] px-7 py-6"
          >
            <p className="text-[17px] leading-[1.8] text-[#1F2E22]">
              Her work focuses on the <strong>'Science of Where'</strong>, a
              concept that explores the relationship between human optimization
              and environment. She is not just building a wellness company; she
              is architecting a new standard for human performance.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default VisionSection;
