import React, { useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";

const categoryCards = [
  {
    id: "forest",
    title: "FOREST",
    image: "/src/assets/images/herbs.jpg",
    gradient: "from-black/80 via-black/40 to-black/20",
    caption: " WELLNESS CENTER",
    description:
      "Nestled amidst the lush, biodiverse forests of South India's Western Ghats and river corridors, forest-side wellness centres harness the pristine, high-oxygen air and unmatched biodiversity of India's richest medicinal herb ecosystems. Spanning Kerala's Palakkad Gap, Chalakudy river belt, and Wayanad tribal forest zones, to Karnataka's deep Sullia forests, Kodagu coffee estates at 1000m+, and Tamil Nadu's Anamalai foothills, these centres offer cool, mist-laden climates that support deeper detoxification, enhance pranayama therapies, and amplify the bioavailability of Ayurvedic formulations. Kairali Ayurvedic Health Village sits within a corridor of 600+ medicinal herbs; Ayurvedaloka draws on 300+ endemic Wayanad plants; Softouch taps the Chalakudy river-forest fringe. Guests can expect comprehensive Panchakarma, forest bathing (Shinrin-yoku), silence retreats, and tribal herb-based treatments  ideal for those seeking authentic healing, deep rejuvenation, and genuine disconnection from modern urban life.",
    stats: ["10+ Forest centres", "Panchakarma immersion", "Biodiversity therapy"],
  },
  {
    id: "coastal",
    title: "COASTAL",
    image: "/src/assets/images/Ecology.jpg",
    gradient: "from-blue-900/80 via-blue-800/40 to-blue-600/20",
    caption: "SEA-AIR AYURVEDA",
    description: "Coastal wellness centres along India's southwestern and southeastern shores create a healing environment where the therapeutic salinity of sea air, rhythmic ocean waves, and gentle sea breezes converge to optimise Ayurvedic outcomes. Spanning the Arabian Sea coastline from Trivandrum to Bekal in Kerala, the sacred Om Beach at Gokarna in Karnataka, the Udupi–Kundapur western coastal belt, and the Bay of Bengal at Mahabalipuram in Tamil Nadu, these centres leverage coastal microclimates for superior skin and respiratory health, enhanced Panchakarma outcomes, and nervous system restoration. Somatheeram near Kovalam is internationally acclaimed for classical Ayurveda integrated with coastal ecology; SwaSwara at Gokarna blends spiritual geography with clinical excellence; Nattika Beach in Thrissur benefits from the Lakshadweep Sea breeze and the Thrissur cultural ecosystem. Coastal humidity at these latitudes is especially beneficial for skin disorders, respiratory ailments, anti-ageing protocols, and stress recovery.",
    stats: ["11+ Coastal centres", "Marine air therapy", "Skin & stress recovery"],
  },
  {
    id: "mountain",
    title: "MOUNTAIN",
    image: "/src/assets/images/Protocols.jpg",
    gradient: "from-slate-900/80 via-slate-700/40 to-slate-600/20",
    caption: "ALTITUDE HEALING",
    description: "Perched at elevations from 900 to 2,200 metres above sea level, mountain wellness centres in South India combine altitude-enhanced healing, cool temperate climates, and breathtaking landscapes. Sterling Kadumane Hills in Sakleshpur's Western Ghats (900m) offers misty tea-estate rejuvenation adjacent to the Bisle Ghat forest. Ananda Spa in the Nilgiri Biosphere (2,200m) draws on extraordinary endemic Nilgiri herbs and the SpO2 advantages of high altitude for respiratory and cardiovascular therapies. Zacs Valley at Kodaikanal (2,100m) weaves cool pine forest with classical Panchakarma, pain management, and detoxification. At these elevations, enhanced atmospheric conditions accelerate cellular rejuvenation, make yoga and pranayama profoundly more effective, and create naturally serene, pollution-free environments ideal for deep healing and long-stay wellness programmes.",
    stats: ["3+ Mountain centres", "Altitude reset", "Clarity & longevity"],
  }
];

const forestCentres = [
  {
    name: "Kairali Ayurvedic Health Village",
    location: "Palakkad, Kerala",
    description: "50-acre Ayurvedic village with 600+ medicinal herbs, classical Panchakarma, long-stay rejuvenation.",
    key: ["600+ medicinal herbs", "Forest bathing", "Panchakarma detoxification"]
  },
  {
    name: "CGH Earth – Kalari Kovilakom",
    location: "Kollengode, Kerala",
    description: "19th-century palace with Ashtavaidya protocols, 14+ day therapeutic immersion.",
    key: ["Ashtavaidya protocols", "Nervous system reset", "Tribal herbal medicine"]
  },
  {
    name: "Softouch Ayurveda Village",
    location: "Chalakudy, Kerala",
    description: "River-forest ecosystem with Panchakarma + riverside healing.",
    key: ["River-forest ecosystem", "Digital detox", "Long-stay rejuvenation"]
  },
  {
    name: "Ayurvedaloka",
    location: "Wayanad, Kerala",
    description: "Tribal forest biodiversity with 300+ endemic medicinal plants.",
    key: ["Tribal forest biodiversity", "Medicinal plants", "Forest healing"]
  },
  {
    name: "Ayurdhama Ayurveda",
    location: "Sullia, Karnataka",
    description: "Rural Western Ghats with lifestyle + orthopaedic healing.",
    key: ["Rural Western Ghats", "Orthopaedic healing", "Lifestyle Ayurveda"]
  },
  {
    name: "Coorg Wilderness Resort & Spa",
    location: "Coorg, Karnataka",
    description: "Coffee forests with luxury + phytoncide healing.",
    key: ["Coffee forests", "Luxury wellness", "Phytoncide healing"]
  },
  {
    name: "Hasanadka Wellness Centre",
    location: "Hasanadka, Karnataka",
    description: "Personalised forest Ayurveda retreat.",
    key: ["Personalised Ayurveda", "Forest retreat", "Custom healing"]
  },
  {
    name: "RtAyu Ayurveda Wellness Home",
    location: "Karnataka",
    description: "Homestyle therapeutic retreat.",
    key: ["Homestyle retreat", "Therapeutic care", "Ayurvedic home"]
  },
  {
    name: "Maitreyi the Vedic Village",
    location: "Karnataka",
    description: "Foothills + Vedic + organic farm.",
    key: ["Foothills location", "Vedic practices", "Organic farm"]
  },
  {
    name: "Niraamaya Retreats Samroha",
    location: "Karnataka",
    description: "Luxury forest wellness retreat.",
    key: ["Luxury forest", "Wellness retreat", "Premium Ayurveda"]
  }
];

const coastalCentres = [
  {
    name: "Kalari Rasayana",
    location: "Kollam, Kerala",
    image: "/src/assets/images/Ecology.jpg",
    description: "Coastal Ashtavaidya with Kalaripayattu integration.",
    key: ["Coastal Ashtavaidya", "Kalaripayattu", "Sea-air therapy"]
  },
  {
    name: "Somatheeram",
    location: "Trivandrum, Kerala",
    image: "/src/assets/images/Protocols.jpg",
    description: "Global Ayurveda benchmark on Kovalam coast.",
    key: ["Global benchmark", "Kovalam coast", "Skin vitality"]
  },
  {
    name: "Nattika Beach",
    location: "Thrissur, Kerala",
    image: "/src/assets/images/herbs.jpg",
    description: "Lakshadweep Sea healing retreat.",
    key: ["Lakshadweep Sea", "Stress relief", "Sleep optimisation"]
  },
  {
    name: "The LaLiT Bekal",
    location: "Bekal, Kerala",
    image: "/src/assets/images/Section.jpg",
    description: "Luxury beach wellness resort.",
    key: ["Luxury beach", "Wellness resort", "Anti-ageing"]
  },
  {
    name: "Kanasu Wellness",
    location: "Udupi, Karnataka",
    image: "/src/assets/images/Ecology.jpg",
    description: "Coastal Karnataka Ayurveda centre.",
    key: ["Coastal Karnataka", "Ayurveda centre", "Panchakarma"]
  },
  {
    name: "SwaSwara",
    location: "Gokarna, Karnataka",
    image: "/src/assets/images/Protocols.jpg",
    description: "Om Beach spiritual + Ayurveda + Art retreat.",
    key: ["Om Beach", "Spiritual retreat", "Ayurveda + Art"]
  },
  {
    name: "Chitrakoota Ayurveda",
    location: "Kundapur, Karnataka",
    image: "/src/assets/images/herbs.jpg",
    description: "Coastal heritage and Ayurveda.",
    key: ["Coastal heritage", "Ayurveda", "Marine climate"]
  },
  {
    name: "Balakatmane Retreat",
    location: "Karnataka",
    image: "/src/assets/images/Section.jpg",
    description: "Heritage coastal retreat.",
    key: ["Heritage retreat", "Coastal location", "Traditional healing"]
  },
  {
    name: "Chariot Beach Resort",
    location: "Mahabalipuram, Tamil Nadu",
    image: "/src/assets/images/Ecology.jpg",
    description: "Bay of Bengal beach resort.",
    key: ["Bay of Bengal", "Beach resort", "Ayurvedic therapies"]
  },
  {
    name: "Mekosha",
    location: "Kerala",
    image: "/src/assets/images/Protocols.jpg",
    description: "Modern Ayurvedic luxury.",
    key: ["Modern Ayurveda", "Luxury", "Contemporary wellness"]
  },
  {
    name: "Ayurjeevan Ayurveda Retreat",
    location: "Kerala",
    image: "/src/assets/images/herbs.jpg",
    description: "Coastal + forest border retreat.",
    key: ["Coastal + forest", "Border location", "Integrated healing"]
  }
];

const mountainCentres = [
  {
    name: "Sterling Kadumane Hills",
    location: "Sakleshpur, Karnataka",
    image: "/src/assets/images/Protocols.jpg",
    description: "Tea estate + forest altitude healing.",
    key: ["Tea estate", "Altitude healing", "Forest biodiversity"]
  },
  {
    name: "Ananda Spa",
    location: "Nilgiris, Tamil Nadu",
    image: "/src/assets/images/herbs.jpg",
    description: "2,200m luxury executive wellness.",
    key: ["2,200m altitude", "Executive wellness", "SpO2 optimisation"]
  },
  {
    name: "Zacs Valley",
    location: "Kodaikanal, Tamil Nadu",
    image: "/src/assets/images/Section.jpg",
    description: "2,100m pine forest Panchakarma.",
    key: ["2,100m altitude", "Pine forest", "Panchakarma"]
  }
];

const categoryMeta = {
  forest: {
    title: "Forest Wellness Centres",
    subtitle: "Lush Western Ghats sanctuaries for deep detox, nervous-system reset, and tribal herbal healing.",
    heroDescription: "Explore forest geography with Ayurvedic centres designed for detoxification, immune resilience, and herbal restoration.",
    pageTitle: "FOREST",
    image: "/src/assets/images/herbs.jpg"
  },
  coastal: {
    title: "Coastal Wellness Centres",
    subtitle: "Sea-air enhanced Ayurveda for skin, respiratory health, anti-ageing, and stress recovery.",
    heroDescription: "Discover coastal sanctuaries where marine air and Ayurveda combine for radiant skin, respiratory strength, and deep relaxation.",
    pageTitle: "COASTAL",
    image: "/src/assets/images/Ecology.jpg"
  },
  mountain: {
    title: "Mountain Wellness Centres",
    subtitle: "High-altitude healing for mental clarity, respiratory optimization, and longevity rejuvenation.",
    heroDescription: "Find mountain retreats that support oxygen-rich breathing, nervous system reset, and lasting clarity.",
    pageTitle: "MOUNTAIN",
    image: "/src/assets/images/Protocols.jpg"
  }
};

const CentreCard = ({ centre, categoryLabel, onOpen }) => (
  <button
    type="button"
    onClick={() => onOpen(centre, categoryLabel)}
    className="text-left group relative rounded-[20px] overflow-hidden bg-gradient-to-br from-white via-green-50 to-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 transform hover:-rotate-1"
  >
    {/* Background decorative element */}
    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-yellow-200/20 to-green-200/20 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    {/* Top accent bar with gradient */}
    <div className="h-1 bg-gradient-to-r from-yellow-600 via-yellow-500 to-green-600" />
    
    <div className="p-6 relative z-10">
      {/* Category label with icon */}
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block w-2 h-2 bg-yellow-600 rounded-full" />
        <p className="text-xs tracking-[0.3em] text-yellow-700 uppercase font-bold">{categoryLabel}</p>
      </div>
      
      {/* Centre name with dynamic styling */}
      <h4 className="text-xl font-serif text-green-900 mb-1 group-hover:text-green-700 transition-colors duration-300 leading-tight">
        {centre.name}
      </h4>
      
      {/* Location with icon */}
      <div className="flex items-center gap-1 mb-4">
        <span className="text-xs text-yellow-700">📍</span>
        <p className="text-xs text-green-700 font-medium">{centre.location}</p>
      </div>
      
      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-yellow-300 via-green-300 to-transparent mb-4" />
      
      {/* Description */}
      <p className="text-green-800/80 text-sm leading-relaxed mb-5 line-clamp-3 group-hover:text-green-800 transition-colors duration-300">
        {centre.description}
      </p>
      
      {/* Key features with badges */}
      <div className="space-y-2">
        <p className="text-xs text-green-700 font-bold uppercase tracking-wider">✓ Key Features</p>
        <div className="flex flex-wrap gap-2">
          {centre.key.map((k, i) => (
            <span 
              key={i} 
              className="text-xs bg-gradient-to-r from-yellow-100 to-green-100 text-green-800 px-3 py-1.5 rounded-full font-medium border border-yellow-200 group-hover:border-yellow-400 group-hover:from-yellow-200 group-hover:to-green-200 transition-all duration-300"
            >
              {k}
            </span>
          ))}
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  </button>
);

export function GeoWellnessCenter() {
  const navigate = useNavigate();
  const goToCategoryPage = (categoryId) => {
    navigate(`/program/geo-wellness/${categoryId}`);
  };

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img src="/src/assets/images/DoctorHomepage.jpg" alt="Geo Wellness Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 via-green-800/80 to-black/50" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6 lg:px-20 py-20">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-wide mb-8 drop-shadow-2xl transition-all duration-700">
            Geo-Wellness Centres
          </h1>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-light leading-snug mb-8 max-w-4xl mx-auto px-4 transition-all duration-700">
            Categorised by geographical intelligence — Forest, Coastal, and Mountain healing ecosystems across South India.
          </h2>
          <p className="text-lg md:text-xl leading-loose max-w-3xl mx-auto text-white/90 transition-all duration-700">
            DARSHAI's Geo-Wellness framework maps Ayurvedic destinations by ecology, altitude, biodiversity, and therapeutic environment to help individuals discover the most effective geography for healing, detoxification, rejuvenation, and transformation.
          </p>
        </div>
      </section>

      {/* Geo Wellness Categories - 3 Card Design */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-24">
            {categoryCards.map((card) => (
              <div key={card.id} className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500 group">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className={`absolute inset-0 bg-gradient-to-t ${card.gradient}`} />

                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  <div>
                    <h3 className="text-5xl font-serif text-white mb-2 uppercase tracking-wider">{card.title}</h3>
                    {card.caption && (
                      <p className="text-sm uppercase tracking-[0.4em] text-yellow-700 mb-4">{card.caption}</p>
                    )}
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => goToCategoryPage(card.id)}
                      className="px-6 py-3 bg-white text-black rounded-full font-medium tracking-wide hover:bg-yellow-500 hover:text-white transition-all duration-300"
                    >
                      Explore More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function GeoWellnessCategory() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [activeSanctuary, setActiveSanctuary] = useState(null);

  const categoryKey = category?.toLowerCase();
  const meta = categoryMeta[categoryKey];
  const categoryCard = categoryCards.find((card) => card.id === categoryKey);
  const centres = {
    forest: forestCentres,
    coastal: coastalCentres,
    mountain: mountainCentres
  }[categoryKey] ?? [];

  if (!meta || !categoryCard) {
    return <Navigate to="/program/geo-wellness" replace />;
  }

  const toModalModel = (centre) => ({
    title: centre.name,
    subtitle: `${centre.location} • ${categoryCard.title}`,
    factor: Array.isArray(centre.key) && centre.key.length ? centre.key.join(" • ") : centre.description,
    intervention: centre.description,
    image: centre.image,
    description: centre.description
  });

  return (
    <div className="w-full">
     <section className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img src={categoryCard.image} alt={`${categoryCard.title} Hero`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 via-green-800/80 to-black/50" />
        </div>
       <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center text-white px-6 lg:px-20 pt-40 pb-20">
         <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-wide mb-8 drop-shadow-2xl">
            {categoryCard.title}
          </h1>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-light leading-snug mb-8 max-w-4xl mx-auto px-4">
            {categoryCard.caption}
          </h2>
         <p className="text-sm md:text-lg leading-relaxed max-w-5xl mx-auto text-white/90 px-4">
  {categoryCard.description}
</p>
          <button
            type="button"
            onClick={() => navigate("/program/geo-wellness")}
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition hover:bg-yellow-500 hover:text-white"
          >
            Back to Geo Wellness
          </button>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-gray-50 py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-xs tracking-[0.35em] text-yellow-700 uppercase mb-3">{meta.pageTitle}</p>
            <h2 className="text-4xl md:text-5xl font-serif text-green-800">{meta.title}</h2>
            <p className="mt-4 text-green-700/80 max-w-3xl mx-auto">{meta.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {centres.map((centre) => (
              <CentreCard key={centre.name} centre={centre} categoryLabel={categoryCard.title} onOpen={(centreData) => setActiveSanctuary(toModalModel(centreData))} />
            ))}
          </div>
        </div>
      </section>

      {activeSanctuary && (
        <div className="fixed inset-0 z-50 bg-[#e9e4db] overflow-y-auto p-4">
          <button
            type="button"
            onClick={() => setActiveSanctuary(null)}
            className="absolute top-8 right-8 text-3xl text-green-800 hover:text-yellow-700 font-serif z-50"
          >
            ×
          </button>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center min-h-screen py-20">
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl transition-all duration-500">
              <img src={activeSanctuary.image} alt={activeSanctuary.title} className="w-full h-[600px] object-cover md:h-[70vh]" />
              <div className="absolute inset-0 bg-gradient-to-r from-green-900/50 to-transparent" />
            </div>
            <div className="space-y-8 transition-all duration-500">
              <div>
                <p className="text-xs tracking-[0.4em] text-yellow-700 uppercase mb-4">Sanctuary Details</p>
                <h1 className="text-5xl md:text-7xl font-serif text-green-800 leading-tight mb-6">{activeSanctuary.title}</h1>
                <p className="text-2xl font-light italic text-yellow-700">{activeSanctuary.subtitle}</p>
              </div>
              <p className="text-green-800/90 leading-relaxed text-lg max-w-lg">{activeSanctuary.description}</p>
              <div className="grid md:grid-cols-2 gap-6 pt-8 border-t border-green-200">
                <div>
                  <h3 className="text-green-700 font-semibold text-lg mb-2">Geo-Wellness Factor</h3>
                  <p className="text-green-800/80">{activeSanctuary.factor}</p>
                </div>
                <div>
                  <h3 className="text-green-700 font-semibold text-lg mb-2">Primary Intervention</h3>
                  <p className="text-green-800/80">{activeSanctuary.intervention}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GeoWellnessCenter;
  

