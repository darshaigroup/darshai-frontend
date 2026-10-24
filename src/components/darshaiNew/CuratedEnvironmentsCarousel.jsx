import React, { useState, useRef, useEffect } from "react";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";
import { track } from "../../lib/darshaiNew/analytics";
import { ArrowRight, MapPin } from "lucide-react";
import CarouselPillControls from "./CarouselPillControls";
import { motion } from "motion/react";

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
    specialties: "Ayurveda · Panchakarma · Yoga",
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

export function CuratedEnvironmentsCarousel({ onNavigate }) {
  const [activeCentreIndex, setActiveCentreIndex] = useState(0);
  const [touchActiveIndex, setTouchActiveIndex] = useState(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const centresScrollRef = useRef(null);
  const sectionRef = useRef(null);
  const isSectionVisible = useRef(false);

  const scrollToCentre = (index) => {
    const safeIndex =
      (index + THREE_CURATED_CENTRES.length) %
      THREE_CURATED_CENTRES.length;

    setActiveCentreIndex(safeIndex);

    if (!centresScrollRef.current) return;

    const cards = centresScrollRef.current.children;
    const card = cards[safeIndex];

    if (card) {
      card.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const handleScroll = () => {
    if (!centresScrollRef.current) return;

    const container = centresScrollRef.current;
    const cards = Array.from(container.children);

    if (!cards.length) return;

    const containerCenter =
      container.getBoundingClientRect().left + container.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(containerCenter - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveCentreIndex(closestIndex);
  };

  const handleCardTouch = (index) => {
    setTouchActiveIndex(index);
    setIsInteracting(true);
    setActiveCentreIndex(index);
  };

  const handleCardPointerEnter = (index) => {
    setTouchActiveIndex(index);
    setIsInteracting(true);
  };

  const handleCardPointerLeave = () => {
    setTouchActiveIndex(null);
    setIsInteracting(false);
  };

  const handleCardPointerDown = (index) => {
    setTouchActiveIndex(index);
    setActiveCentreIndex(index);
    setIsInteracting(true);
  };

  const handleExploreCentre = (centre) => {
    track("centre_view", {
      centre: centre.name,
      environment: centre.slug,
    });

    onNavigate(`centres?environment=${centre.slug}`);
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isSectionVisible.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          setTouchActiveIndex(null);
          setIsInteracting(false);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const isMobileOrTablet = window.matchMedia("(max-width: 1023px)").matches;

    if (!isMobileOrTablet) return;

    const interval = setInterval(() => {
      if (!isSectionVisible.current || isInteracting) return;

      const nextIndex =
        activeCentreIndex === THREE_CURATED_CENTRES.length - 1
          ? 0
          : activeCentreIndex + 1;

      scrollToCentre(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeCentreIndex, isInteracting]);

  return (
    <section
      ref={sectionRef}
      id="curated-geo-wellness-environments-section"
      aria-label="Curated Geo-Wellness Environments"
      className="section-editorial bg-[#F5F5F7] border-b border-[#D2D2D7] py-20 md:py-28 overflow-hidden text-[#1D1D1F]"
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
              <span className="block mt-1 sm:mt-1.5">
                For Your Journey.
              </span>
            </h2>

            <p className="typography-lead text-[#4A4A4A] max-w-2xl leading-relaxed font-normal">
              Three genuinely useful centre cards will be better than six
              narrow, unreadable cards. Avoid presenting partner centres as
              interchangeable or suggesting that all centres deliver every
              protocol.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div>
            <div
              ref={centresScrollRef}
              onScroll={handleScroll}
              className="flex md:grid md:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth no-scrollbar touch-pan-x pb-4 px-1 -mx-1"
            >
              {THREE_CURATED_CENTRES.map((centre, index) => {
                const isTouchActive = touchActiveIndex === index;

                return (
                  <div
                    key={centre.id}
                    onPointerEnter={() => handleCardPointerEnter(index)}
                    onPointerLeave={handleCardPointerLeave}
                    onPointerDown={() => handleCardPointerDown(index)}
                    className={`relative min-w-[85vw] sm:min-w-[380px] md:min-w-0 h-[500px] sm:h-[540px] rounded-[28px] overflow-hidden bg-[#1D1D1F] border border-white shadow-xl group snap-start shrink-0 md:shrink flex flex-col justify-between p-6 sm:p-8 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isTouchActive
                        ? "border-[#34D399] -translate-y-1.5 shadow-[0_0_30px_rgba(52,211,153,0.35)]"
                        : "hover:border-[#34D399] hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(52,211,153,0.35)]"
                    }`}
                  >
                    <div className="absolute inset-0 z-0 bg-[#0A1612] overflow-hidden">
                      <SmartImage
                        src={centre.image}
                        alt={centre.name}
                        className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                          isTouchActive
                            ? "scale-105"
                            : "group-hover:scale-105"
                        }`}
                      />

                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 transition-opacity duration-500 pointer-events-none ${
                          isTouchActive
                            ? "opacity-0"
                            : "opacity-100 group-hover:opacity-0"
                        }`}
                      />

                      <div
                        className={`absolute inset-0 bg-[#0A1A14]/95 backdrop-blur-xs p-6 sm:p-8 flex flex-col justify-between items-center text-center z-10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isTouchActive
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0"
                        }`}
                      >
                        <div className="space-y-3.5 pt-1 w-full flex flex-col items-center">
                          <span className="typography-caption font-semibold px-3.5 py-1.5 rounded-full bg-[#0E4D3A] text-white uppercase tracking-wider inline-block">
                            CENTRE {centre.num} · OVERVIEW
                          </span>

                          <h3 className="typography-card-title sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                            {centre.name}
                          </h3>

                          <p className="typography-eyebrow text-[#34D399] uppercase tracking-wider font-semibold">
                            {centre.specialties}
                          </p>

                          <div className="pt-3 border-t border-white/20 w-full">
                            <p className="typography-body text-white/95 leading-relaxed font-normal text-center">
                              {centre.description}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 w-full flex justify-center">
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleExploreCentre(centre);
                            }}
                            className="py-3 px-8 rounded-full bg-white text-[#1D1D1F] typography-ui-button font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-2 hover:bg-[#34D399] hover:text-black active:scale-[0.98] transition-all duration-300 shadow-md cursor-pointer group/cta"
                          >
                            <span>EXPLORE CENTRE PROFILE</span>
                            
                          </button>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`relative z-10 flex items-center justify-between w-full transition-all duration-500 pointer-events-none ${
                        isTouchActive
                          ? "opacity-0 -translate-y-2"
                          : "opacity-100 group-hover:opacity-0 group-hover:-translate-y-2"
                      }`}
                    >
                      <span className="typography-caption font-semibold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 uppercase tracking-wider">
                        {centre.num} / 03
                      </span>

                      <span className="typography-caption text-[#34D399] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-[#34D399]/30 uppercase tracking-wider font-semibold">
                        PARTNER SANCTUARY
                      </span>
                    </div>

                    <div
                      className={`relative z-10 space-y-2 text-center flex flex-col items-center my-auto transition-all duration-500 pointer-events-none ${
                        isTouchActive
                          ? "opacity-0 translate-y-2"
                          : "opacity-100 group-hover:opacity-0 group-hover:translate-y-2"
                      }`}
                    >
                      <p className="typography-eyebrow text-[#34D399] uppercase tracking-wider font-semibold">
                        {centre.specialties}
                      </p>

                      <h3 className="typography-card-title sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-snug">
                        {centre.name}
                      </h3>

                      <p className="typography-metadata text-white/80 flex items-center justify-center gap-1.5 pt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#34D399] shrink-0 mt-0.5" />
                        <span>{centre.location}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="md:hidden mt-4">
              <CarouselPillControls
                total={THREE_CURATED_CENTRES.length}
                currentIndex={activeCentreIndex}
                onChange={scrollToCentre}
                onPrev={() =>
                  scrollToCentre(
                    activeCentreIndex === 0
                      ? THREE_CURATED_CENTRES.length - 1
                      : activeCentreIndex - 1,
                  )
                }
                onNext={() =>
                  scrollToCentre(
                    activeCentreIndex === THREE_CURATED_CENTRES.length - 1
                      ? 0
                      : activeCentreIndex + 1,
                  )
                }
                layout="split"
                variant="light"
                showBorder
                className="px-1"
              />
            </div>
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
    <motion.div
      animate={{ x: [-2, 5, -2] }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="inline-flex items-center"
    >
      <ArrowRight className="w-4 h-4" />
    </motion.div>
  </button>
</div>
      </div>
    </section>
  );
}

export default CuratedEnvironmentsCarousel;