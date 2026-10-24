import React from "react";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";
import { track } from "../../lib/darshaiNew/analytics";
import { ArrowRight, MapPin } from "lucide-react";
export const THREE_CURATED_CENTRES = [
  {
    id: "chithrakoota",
    num: "01",
    name: "Chithrakoota Ayurveda",
    location: "Aloor, Kundapur, Udupi District, Karnataka",
    specialties: "Ayurveda · Panchakarma",
    shortPoints: "18-Acre Green Campus • 150+ Medicinal Plant Varieties",
    description:
      "An 18-acre green campus with over 150 medicinal plant varieties, an in-house Ayurvedic pharmacy, a Desi cow farm, and daily yoga and meditation. Residential Panchakarma programmes range from 7 to 21 days.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=1200&fit=crop&auto=format&q=85",
    slug: "chithrakoota",
  },
  {
    id: "shathayu",
    num: "02",
    name: "Shathayu Retreat",
    location: "Avathi, Devanahalli, Bengaluru, Karnataka",
    specialties: "Ayurveda · Panchakarma · Yoga · Naturopathy",
    shortPoints: "Hills & Lake Surroundings • 20+ Rooms & Spiritual Garden",
    description:
      "A serene retreat surrounded by greenery, hills, and a lake, featuring dedicated therapy spaces, a yoga pavilion, and spiritual gardens.",
    image:
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1200&h=1200&fit=crop&auto=format&q=85",
    slug: "shathayu",
  },
  {
    id: "kanasu",
    num: "03",
    name: "Kanasu Wellness",
    location: "Udupi, Karnataka",
    specialties: "Ayurveda · Naturopathy · Yoga",
    shortPoints: "Coastal Nature-Led Campus • Doctor-Supervised Programmes",
    description:
      "A coastal, nature-led campus featuring doctor-supervised personalised programmes and dedicated spaces for Ayurvedic therapies, yoga, meditation, and sound-based relaxation.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=1200&fit=crop&auto=format&q=85",
    slug: "kanasu",
  },
];
export function CuratedEnvironmentsShowcase({ onNavigate }) {
  return (
    <section
      id="curated-geo-wellness-environments-section"
      aria-label="Curated Geo-Wellness Environments"
      className="section-editorial bg-white border-b border-[#D2D2D7] py-20 md:py-28 overflow-hidden text-[#1D1D1F]"
    >
      <div className="darshai-container">
        <Reveal>
          <div className="max-w-3xl mb-10 md:mb-14">
            <p
              id="curated-environments-eyebrow"
              className="typography-eyebrow text-[#0E4D3A] mb-3 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D3A]" />
              <span>CURATED GEO-WELLNESS ENVIRONMENTS</span>
            </p>
            <h2
              id="curated-environments-heading"
              className="typography-section-h2 tracking-tight mb-5 text-[#1D1D1F]"
            >
              <span className="block">We Help You Find</span>
              <span className="text-[#0E4D3A] block mt-1 sm:mt-1.5">
                The Right Environment
              </span>
              <span className="block mt-1 sm:mt-1.5">For Your Journey.</span>
            </h2>
            <p className="typography-body-large text-[#48484A] max-w-2xl leading-relaxed font-normal">
              Three genuinely useful centre cards will be better than six
              narrow, unreadable cards. Avoid presenting partner centres as
              interchangeable or suggesting that all centres deliver every
              protocol.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {THREE_CURATED_CENTRES.map((centre) => (
              <div
                onClick={() => {
                  track("centre_view", {
                    centre: centre.name,
                    environment: centre.slug,
                  });
                  onNavigate(`centres?environment=${centre.slug}`);
                }}
                className="relative h-[500px] sm:h-[540px] rounded-[28px] overflow-hidden bg-[#1D1D1F] border border-[#D2D2D7] hover:border-[#0E4D3A] shadow-xl group cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between p-6 sm:p-8"
                key={centre.id}
              >
                <div className="absolute inset-0 z-0 bg-[#0A1612] overflow-hidden">
                  <SmartImage
                    src={centre.image}
                    alt={centre.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute inset-0 bg-[#0A1A14]/95 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out p-6 sm:p-8 flex flex-col justify-between z-10">
                    <div className="space-y-3 pt-2">
                      <span className="text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-[#0E4D3A] text-white uppercase tracking-wider inline-block">
                        CENTRE {centre.num} · OVERVIEW
                      </span>
                      <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                        {centre.name}
                      </h3>
                      <p className="text-xs font-mono text-[#34D399] uppercase tracking-wider font-semibold">
                        {centre.specialties}
                      </p>
                      <div className="pt-2 border-t border-white/20">
                        <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-normal">
                          {centre.description}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4">
                      <span className="w-full py-3 rounded-full bg-white text-[#1D1D1F] font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 group-hover:bg-[#34D399] group-hover:text-black transition-colors shadow-md">
                        <span>EXPLORE CENTRE PROFILE</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 flex items-center justify-between group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 uppercase tracking-wider">
                    {centre.num} / 03
                  </span>
                  <span className="text-xs font-mono text-[#34D399] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-[#34D399]/30 uppercase tracking-wider font-semibold">
                    PARTNER SANCTUARY
                  </span>
                </div>
                <div className="relative z-10 space-y-2 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                  <p className="text-xs font-mono text-[#34D399] uppercase tracking-wider font-semibold">
                    {centre.specialties}
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                    {centre.name}
                  </h3>
                  <p className="text-xs font-mono text-white/80 flex items-start gap-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#34D399] shrink-0 mt-0.5" />
                    <span>{centre.location}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => {
              track("explore_all_centres", {
                source: "curated_environments_section",
              });
              onNavigate("centres");
            }}
            className="darshai-btn-primary uppercase inline-flex items-center gap-2 text-xs sm:text-sm px-8 py-4 shadow-lg cursor-pointer group"
          >
            <span>VIEW ALL CURATED CENTRES</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
export default CuratedEnvironmentsShowcase;
