import { motion } from "framer-motion";
import { Shield, Users, Activity, Zap, Globe, Check } from "lucide-react";

const brandGreen = "#1E7A3A";
const brandGold = "#C9A75B";

const protocols = [
  {
    gear: "GEAR 1",
    title: "Sovereign Protocols",
    desc: "Biological Sovereignty for the Elite",
    icon: Shield,
    features: [
      "Hyper-Personalized Longevity Retreats",
      "Biological Sovereignty Dashboard + Bio-Hacking Kit",
      "Personalized Luxury Geo-Wellness Experience",
      
    ],
    img: "/images/protocol1.jpg",
  },
  {
    gear: "GEAR 2",
    title: "Corporate Ecology",
    desc: "Executive Reset & Team Vitality.",
    icon: Users,
    features: [
      "The '2+1' Executive Reset Program",
      "Corporate Longevity Audits",
      "Founders' Longevity Circle",
    ],
    img: "/images/protocol2.jpg",
  },
  {
    gear: "GEAR 3",
    title: "Maintenance Modules",
    desc: "Sustained Wellness at Your Fingertips.",
    icon: Activity,
    features: [
      "Digital Maintenance Plans",
      "Vaidhya Video Library",
      "Real-Time Guidance",
    ],
    img: "/images/protocol3.jpg",
  },
  {
    gear: "GEAR 4",
    title: "Longevity Prep-Kits",
    desc: "Lab-Validated Wellness at Home.",
    icon: Zap,
    features: [
      " Bio-Validated Herbal Kits",
      "Neuro-Reset Collection",
      "Precision Unboxing Experience",
    ],
    img: "/images/protocol4.jpg",
  },
  {
    gear: "GEAR 5",
    title: "Precision Tech Events",
    desc: "Community, Knowledge & Experience.",
    icon: Globe,
    features: [
      "Bio-Hacking Workshops",
      "Pop-Up Geo-Wellness Experiences",
      "Longevity Summits and ",
    ],
    img: "/images/protocol5.jpg",
  },
  {
    gear: "GEAR 6",
    title: "Precision Ecology & Corporate Auditing",
    desc: "Environmental Optimization for Organizations",
    icon: Globe,
    features: [
      "Periodic Office Auditing",
      "Biophilic Integration",
      "Corporate Nutrition & 'Agni' Auditing",
    ],
    img: "/images/protocol6.jpg",
  },
];

export default function ProtocolPreview() {
  return (
    <section className="bg-[#f6f3ef] py-24 px-6">

      <div className="flex flex-col items-center text-center mb-16 px-6">
        <h2
          className="text-[42px] md:text-[72px] font-serif leading-[1.05] tracking-[-0.02em]"
          style={{ color: brandGreen }}
        >
          Our Protocols
        </h2>

      </div>
      <div className="max-w-7xl mx-auto space-y-32">

        {protocols.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-16`}
          >

            {/* TEXT */}
            <div className="flex-1 space-y-6">

              {/* ICON + GEAR */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#1E7A3A] rounded-full flex items-center justify-center">
                  <item.icon className="text-white" size={24} />
                </div>

                <span className="text-sm tracking-[3px]" style={{ color: brandGold }}>
                  {item.gear}
                </span>
              </div>

              {/* TITLE */}
              <h2
                className="text-4xl md:text-6xl font-serif leading-tight"
                style={{ color: brandGreen }}
              >
                {item.title}
              </h2>

              {/* DESC */}
              <p className="text-lg text-[#1E7A3A]/70 leading-relaxed max-w-xl">
                {item.desc}
              </p>

              {/* FEATURES */}
              <ul className="space-y-4 pt-4">
                {item.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border border-[#C9A75B] flex items-center justify-center">
                      <Check size={14} color={brandGold} />
                    </div>
                    <span className="text-[#1E7A3A]/80 italic">{f}</span>
                  </li>
                ))}
              </ul>

            </div>

            {/* IMAGE */}
           <div className="flex-1 w-full group relative">
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.6 }}
    className="rounded-[40px] overflow-hidden shadow-2xl relative"
  >
    {/* IMAGE */}
    <img
      src={item.img}
      alt={item.title}
      className="w-full h-[420px] object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
    />

    {/* 🔥 GREEN OVERLAY */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700"
      style={{
        background:
          "linear-gradient(to top, rgba(30,122,58,0.9), rgba(30,122,58,0.4), transparent)",
      }}
    />
  </motion.div>
</div>

          </motion.div>
        ))}

      </div>
    </section>
  );
}