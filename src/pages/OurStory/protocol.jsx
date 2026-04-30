import { Shield, Users, Activity, Zap, Globe, Check } from "lucide-react";
import sover from "@/assets/images/sover.png";
import corporate from "@/assets/images/corporate.png";
import maintenance from "@/assets/images/maintenance.png";
import prepkit from "@/assets/images/prepkit.png";
import precision from "@/assets/images/precision.png";
import environment from "@/assets/images/environment.png";
const brandGreen = "#1E7A3A";
const brandGold = "#C9A75B";

const protocols = [
  {
    gear: "GEAR 1",
    title: "Sovereign Protocols",
    desc: "Biological Sovereignty for the Elite",
    content: `The foundation of the DARSHAI experience is the Sovereign Protocol, a hyper-personalized 7-day luxury Geo-Wellness intervention conducted at our most exclusive partner sanctuaries. This gear is engineered for the elite performer who requires a total biological reset through precision-mapped Ayurvedic therapies and real-time biomarker synchronization. By isolating the individual within a certified healing coordinate, we facilitate a profound transition from reactive stress to biological sovereignty, ensuring that every cell is recalibrated to its peak state of performance.`,
    icon: Shield,
    img: sover,
  },
  {
    gear: "GEAR 2",
    title: "Corporate Ecology",
    desc: "Executive Reset & Team Vitality",
    content: `Recognizing that the modern leadership team is a collective biological unit, Gear 2 introduces the Corporate Ecology executive reset. This specialized 5-day intensive program is engineered for B2B leadership tiers and founders to reverse the compounding effects of decision fatigue and cognitive drain. By treating the executive team as a high-performance ecosystem, we utilize targeted clinical protocols to restore mental clarity and systemic resilience, ensuring that the organization’s brain trust operates with maximum precision and unified vitality.`,
    icon: Users,
    img: corporate,
  },

  {
    gear: "GEAR 3",
    title: "Maintenance Modules",
    desc: "Executive Reset & Team Vitality",
    content: `Longevity is a continuous practice rather than a static event, which is why Gear 3 focuses on the Maintenance Modules designed for sustainable sovereignty. This gear bridges the gap between the sanctuary and the city through precision habit tracking and exclusive access to the 'Vaidya' clinical video library. These digital assets provide users with a roadmap of high-level Ayurvedic science and longevity habits, ensuring that the biological gains achieved during the initial protocols are not just preserved, but compounded over time.`,
    icon: Activity,
    img: maintenance,
  },

  {
    gear: "GEAR 4",
    title: "Longevity Prep-Kits",
    desc: "Lab-Validated Wellness at Home.",
    content: `Currently available exclusively via our waitlist, Gear 4 represents the future of at-home biological optimization through the DARSHAI Longevity Prep-Kits. This upcoming vertical will feature a curated 'Neuro-Reset' collection and bio-validated Ayurvedic formulas designed to maintain the body’s architectural foundation between clinical interventions. These kits serve as the physical bridge for our community, providing the necessary tools to implement pharmaceutical-grade traditional wisdom within a modern, fast-paced lifestyle.`,
    icon: Zap,
    img: prepkit,
  },
  {
    gear: "GEAR 5",
    title: "Precision Tech Events",
    desc: "Community, Knowledge & Experience.",
    content: `This expands the DARSHAI philosophy into the world’s most influential innovation centres through Precision Tech Events. These consist of closed-door bio-hacking workshops, hackathons, and Geo-Wellness activations designed specifically for the global tech-elite. By fostering a community of high-performers who prioritize biological intelligence, we create a specialized forum where the latest in health-tech data meets the practical application of longevity science, establishing DARSHAI as the primary authority in the 'Architecture of Health'.`,
    icon: Check,
    img: precision,
  },
  {
    gear: "GEAR 6",
    title: "Precision Ecology & Corporate Auditing",
    desc: "Environmental Optimization for Organizations",
    content: `The final tier of our ecosystem, Gear 6, focuses on the environmental variables that dictate human health through Precision Ecology and Corporate Auditing. We move into the physical workspace to conduct exhaustive scientific audits of lighting, air quality, and acoustic frequency to reduce sympathetic nervous system activation. By integrating biophilic design and 'Agni'nutrition auditing into the corporate framework, we transform high-pressure offices into biologically superior environments, allowing organizations to achieve the DARSHAI standard of occupational vitality.`,
    icon: Globe,
    img: environment,
  },
];

export default function ProtocolPreview() {
  return (
    <section className="bg-[#f6f3ef] py-24 px-6">
      {/* TITLE */}
      <div className="flex flex-col items-center text-center mb-16 px-6">
        <h2
          className="text-[42px] md:text-[72px] font-serif leading-[1.05] tracking-[-0.02em]"
          style={{ color: brandGreen }}
        >
          The DARSHAI Ecology
        </h2>
      </div>

      <div className="max-w-7xl mx-auto space-y-32">
        {protocols.map((item, i) => (
          <div
            key={i}
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

                <span
                  className="text-sm tracking-[3px]"
                  style={{ color: brandGold }}
                >
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

              {/* ✅ NEW PARAGRAPH CONTENT */}
              <p className="text-[#1E7A3A]/70 leading-relaxed max-w-xl text-justify">
                {item.content}
              </p>
            </div>

            {/* IMAGE (ONLY HOVER EFFECT KEPT) */}
            <div className="flex-1 w-full group relative">
              <div className="rounded-[40px] overflow-hidden shadow-2xl relative">
                {/* IMAGE */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-[420px] object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />

                {/* GREEN OVERLAY */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(30,122,58,0.9), rgba(30,122,58,0.4), transparent)",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
