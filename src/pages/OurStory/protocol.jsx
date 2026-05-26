import { Shield, Users, Activity, Zap, Globe, Check } from "lucide-react";
import sover from "@/assets/images/health.jpeg";
import corporate from "@/assets/images/nature.jpeg";
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
    desc: "Personalized Wellness for High Performers",
    content: `The foundation of the DARSHAI experience is the Sovereign Protocol, a hyper-personalized 7-day luxury Geo-Wellness intervention conducted at our most exclusive partner sanctuaries. This gear is engineered for the elite performer who requires a total biological reset through precision-mapped Ayurvedic therapies and real-time biomarker synchronization. By isolating the individual within a certified healing coordinate, we facilitate a profound transition from reactive stress to biological sovereignty.`,
    icon: Shield,
    img: sover,
  },
  {
    gear: "GEAR 2",
    title: "Corporate Wellness Reset ",
    desc: "Executive Recovery & Team Vitality ",
    content: `Leadership comes with stress, burnout, and constant decision-making. Our executive wellness program is designed for founders and leadership teams to restore energy, improve focus, reduce stress, and strengthen team performance. Through guided wellness experiences, recovery practices, and personalized support, we help leaders think clearly, perform better, and lead with renewed energy.`,
    icon: Users,
    img: corporate,
  },

  {
    gear: "GEAR 3",
    title: "Long-Term Wellness Support",
    desc: "Sustaining Your Health Journey",
    content: `Wellness is not a one-time experience — it is a long-term journey. After completing the program, DARSHAI helps you maintain your progress through guided wellness practices, habit tracking, personalized recommendations, and expert-led resources. Our goal is to help you sustain better health, energy, and balance in everyday life.`,
    icon: Activity,
    img: maintenance,
  },

  {
    gear: "GEAR 4",
    title: "Longevity Wellness Kits",
    desc: "Personalized Wellness at Home",
    content: `Our wellness kits are designed to help you continue your health journey from the comfort of your home. Carefully curated with expert-guided wellness essentials, personalized recommendations, and supportive resources, these kits help you maintain better energy, recovery, and everyday well-being between wellness programs.`,
    icon: Zap,
    img: prepkit,
  },
  {
    gear: "GEAR 5",
    title: "Wellness & Innovation Events",
    desc: "Community, Learning & Growth",
    content: `DARSHAI hosts wellness-focused events, workshops, and expert sessions designed to help professionals improve health, reduce stress, and learn practical ways to perform better in daily life. By bringing together wellness experts, leaders, and like-minded individuals, we create experiences that combine learning, connection, and long-term well-being.`,
    icon: Check,
    img: precision,
  },
  {
    gear: "GEAR 6",
    title: "Corporate Wellness Optimization",
    desc: "Creating Healthier Work Environments",
    content: `We help organizations create healthier and more productive workplaces by assessing office environments, wellness practices, and employee well-being. From workspace design and air quality to wellness routines and stress reduction, our approach helps improve focus, productivity, energy, and overall workplace health.`,
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
            {/* PREMIUM TEXT SECTION */}
            <div className="flex-1 relative">
              {/* BACKGROUND NUMBER */}
              <div className="absolute -top-10 -left-2 text-[120px] md:text-[180px] font-serif leading-none text-[#1E7A3A]/5 pointer-events-none select-none">
                0{i + 1}
              </div>

              <div className="relative z-10 max-w-2xl">
                {/* ICON + GEAR */}
                <div className="flex items-center gap-5 mb-8">
                  {/* ICON */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1E7A3A] to-[#174EA6] flex items-center justify-center shadow-[0_15px_40px_rgba(23,78,166,0.25)] border border-white/10">
                    <item.icon
                      className="text-white"
                      size={28}
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* GEAR LABEL */}
                  <div>
                    <span className="text-sm tracking-[0.28em] uppercase text-[#174EA6]/75">
                      {item.gear}
                    </span>
                  </div>
                </div>

                {/* TITLE */}
                <h2
                  className="text-[42px] md:text-[68px] leading-[1.02] tracking-[-0.03em] font-serif mb-8"
                  style={{ color: brandGreen }}
                >
                  {item.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-[20px] leading-[1.8] text-yellow-700 italic border-l border-[#174EA6]/20 pl-6 mb-8 max-w-xl">
                  {item.desc}
                </p>

                {/* CONTENT */}
                <p className="text-[16px] md:text-[18px] leading-[2] text-[#1E7A3A]/75 max-w-2xl text-justify">
                  {item.content}
                </p>
              </div>
            </div>

            {/* IMAGE */}
            <div className="flex-1">
              <div className="relative rounded-[40px] overflow-hidden group shadow-[0_40px_100px_rgba(0,0,0,0.18)]">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-[700px] object-cover transition duration-[1400ms] group-hover:scale-105"
                />

                {/* BLUE PREMIUM OVERLAY */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(23,78,166,0.92), rgba(23,78,166,0.45), transparent)",
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
