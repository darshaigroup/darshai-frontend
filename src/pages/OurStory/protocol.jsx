import { motion } from "framer-motion";
import { Shield, Users, Activity, Zap, Globe, Check } from "lucide-react";

const brandGreen = "#1E7A3A";
const brandGold = "#C9A75B";

const protocols = [
  {
    gear: "GEAR 1",
    title: "Sovereign Protocols",
    desc: "Hyper-personalized longevity retreats. 7-day bespoke interventions at exclusive partner Geo-Wellness centers.",
    icon: Shield,
    features: [
      "Bespoke Interventions",
      "Vitality Score Tracking",
      "Concierge Bio-Butler",
    ],
    img: "/images/protocol1.jpg",
  },
  {
    gear: "GEAR 2",
    title: "Corporate Ecology",
    desc: "Specialized 5-day intensive programs to reverse burnout and decision fatigue for executive teams.",
    icon: Users,
    features: [
      "Executive Reset",
      "Vitality Audits",
      "Longevity Circle",
    ],
    img: "/images/protocol2.jpg",
  },
  {
    gear: "GEAR 3",
    title: "Maintenance Modules",
    desc: "Post-retreat diet and lifestyle guidance delivered through the DARSHAI App and expert video library.",
    icon: Activity,
    features: [
      "Digital Plans",
      "Vaidhya Library",
      "Real-Time Guidance",
    ],
    img: "/images/protocol3.jpg",
  },
  {
    gear: "GEAR 4",
    title: "Longevity Prep-Kits",
    desc: "Bio-validated herbal kits and the 'Neuro-Reset' collection for stress recovery and gut health.",
    icon: Zap,
    features: [
      "Lab-Tested Formulas",
      "Clinical Truth Dossier",
      "Precision Unboxing",
    ],
    img: "/images/protocol4.jpg",
  },
  {
    gear: "GEAR 5",
    title: "Precision Tech Events",
    desc: "Bio-hacking workshops and limited-edition wellness activations in major tech hubs.",
    icon: Globe,
    features: [
      "Bio-Hacking Workshops",
      "Pop-Up Experiences",
      "Longevity Summits",
    ],
    img: "/images/protocol5.jpg",
  },
  {
    gear: "GEAR 6",
    title: "Precision Ecology & Corporate Auditing",
    desc: "Environmental Optimization for Organizations. We redesign workspaces into biologically optimized hubs.",
    icon: Globe,
    features: [
      "Office Auditing (Light, Air, Acoustic)",
      "Biophilic HRV Integration",
      "Corporate Nutrition Auditing",
      "Longevity Certification",
    ],
    img: "/images/protocol6.jpg",
  },
];

export default function ProtocolPreview() {
  return (
    <section className="bg-[#F1ECE2] py-24 px-6">

      <div className="max-w-7xl mx-auto space-y-32">

        {protocols.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className={`flex flex-col ${
              i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
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
            <div className="flex-1 w-full group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className="rounded-[40px] overflow-hidden shadow-2xl"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-[420px] object-cover grayscale group-hover:grayscale-0 transition duration-700"
                />
              </motion.div>
            </div>

          </motion.div>
        ))}

      </div>
    </section>
  );
}