import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// ----------------------------- FOREST CENTRES (with shortDescription for card) ---------------------------------
const forestCentres = [
  {
    name: "Kairali Ayurvedic Health Village",
    location: "Palakkad, Kerala",
    geoTag: "Forest/Hills",
    shortDescription: "The Ayurvedic Healing Village is located among the sweet-scented forests of Palakkad, just kilometres away from the world's biggest mountain pass between Kerala and Tamil Nadu.",
    overview: "A sprawling 50-acre Ayurvedic village set within a corridor of 600+ medicinal herbs in Palakkad's forested hills. Offers classical Panchakarma, personalised Ayurvedic treatments, yoga, and naturopathy under certified Ayurvedic physicians. Ideal for chronic disease management, detoxification, and long-stay rejuvenation programmes.",
    website: "https://www.ayurvedichealingvillage.com/"
  },
  {
    name: "CGH Earth – Kalari Kovilakom",
    location: "Kollengode, Palakkad, Kerala",
    geoTag: "Palace/Forest",   
    shortDescription: "Kalari Kovilakom is located near Kollangode in the Palghat District of Kerala by the majestic Western Ghat mountain ranges. The treatment centre is located in a 200-year-old palace where history meets natural tranquility.",
    overview: "A restored 19th-century palace surrounded by dense forest, offering India's most exclusive classical Ayurveda retreat with no minimum stay under 14 days. All treatments are physician-prescribed, following strict Ashtavaidya traditions, with fresh herbal formulations prepared on-site. Combines regal heritage architecture with deep therapeutic immersion in a serene forest-palace setting.",
    website: "http://www.cghearthayurveda.com/"
  },
  {
    name: "Softouch Ayurveda Village",
    location: "Chalakudy, Kerala",
    geoTag: "River/Forest",
    shortDescription: "Softouch is located on the tranquil banks of the Chalakudy River. Village offers a forest-like atmosphere that provides the ultimate 'digital detox' and a peaceful environment for profound healing.",
    overview: "Nestled at the fringe of the Chalakudy river-forest ecosystem, this centre blends riverside tranquility with authentic Ayurvedic healing. Specialises in Panchakarma detox, rejuvenation therapies, and stress management, drawing on the rich biodiversity of the Chalakudy riparian belt for fresh herbal preparations. Guests benefit from cool river breezes, forest bathing trails, and intimate, personalised treatment programmes.",
    website: "https://softouchayurveda.com/"
  },
  {
    name: "Ayurvedaloka",
    location: "Wayanad, Kerala",
    geoTag: "Forest/Hills",
    shortDescription: "Ayurveda Loka is located in the hills of Wayanad, Kerala, specifically described as being in an eco-friendly village setting surrounded by lush greenery, forest, and hills.",
    overview: "Situated deep in the Wayanad tribal forest zone with access to over 300 endemic plant species, Ayurvedaloka offers immersive Ayurvedic retreats rooted in local forest wisdom. Programmes cover detoxification, immunity building, and chronic condition management, incorporating rare tribal herbal formulations unavailable elsewhere. The high-altitude forest setting enhances pranayama efficacy and promotes profound physical and mental rejuvenation.",
    website: "https://www.ayurvedaloka.in/"
  },
  {
    name: "Ayurdhama Ayurveda",
    location: "Sullia, Karnataka",
    geoTag: "Forest/Rural",
    shortDescription: "Ayurdhama is located on the border of Kerala and Karnataka, which are famous for its magnificent natural beauty, extending from the palm forests, coconut trees and to the coffee plantations around.",
    overview: "Set in the rural-forest landscape of Sullia in Karnataka's Western Ghats foothills, Ayurdhama offers traditional Ayurvedic treatments in a calm, unhurried environment. Programmes include Panchakarma, weight management, orthopaedic therapies, and lifestyle disease protocols delivered by experienced Ayurvedic practitioners. The surrounding medicinal-herb-rich forests and clean Sullia air create an ideal backdrop for authentic, community-rooted healing.",
    website: "https://ayurdhama.com/"
  },
  {
    name: "Coorg Wilderness Resort & Spa",
    location: "Coorg (Kodagu), Karnataka",
    geoTag: "Coffee Forest/Hills",
    shortDescription: "Coorg Wilderness Resort & Spa is nestled within both dense forest and mountainous terrain, specifically located amid the hills and forests of the Western Ghats near Madikeri.",
    overview: "Perched at over 1,000 metres in Kodagu's famed coffee-estate forests, this resort combines luxurious spa therapies with the healing power of misty hill air and lush coffee and spice plantations. Offers Ayurvedic spa treatments, forest walks, bird-watching, and plantation tours alongside wellness programmes for stress relief and rejuvenation. The coffee-forest microclimate, rich in aromatic phytoncides, provides a uniquely invigorating healing environment.",
    website: "https://www.coorgwildernessresort.in/"
  },
  {
    name: "Hasanadka Wellness Centre",
    location: "Sullia Taluk, Karnataka",
    geoTag: "Forest/Rural",
    shortDescription: "Hasanadka wellness Centre, Naturopathy, Yogatherapy, Acupuncture treatment centre situated 14kms from Sullia town with natural greenery in the middle of nature, having 4 acres of land.",
    overview: "A quiet, family-run Ayurvedic wellness retreat in the forest-rural landscape of Sullia Taluk, specialising in personalised Panchakarma and chronic condition management. Treatments draw on locally sourced herbs and traditional Karnataka Ayurvedic methods, supported by qualified physicians in an intimate, non-commercialised setting. Well-suited for guests seeking unhurried, cost-effective, and authentic Ayurvedic care within a natural forest environment.",
    website: "https://www.hasanadkawellness.com/index"
  },
  {
    name: "RtAyu Ayurveda Wellness Home",
    location: "Sullia Taluk, Karnataka",
    geoTag: "Forest/Rural",
    shortDescription: "RtAyu Ayurveda Wellness Home is located in a rural, natural setting described as a farmland/ashram, Located near Sullia, Karnataka.",
    overview: "A home-style Ayurvedic wellness retreat in the forested heartland of Sullia Taluk, offering personalised detox, rejuvenation, and therapeutic programmes in a homely, distraction-free environment. Treatments follow classical Ayurvedic protocols using fresh, locally grown herbal ingredients, providing guests with genuine therapeutic outcomes. Ideal for first-time Ayurveda seekers and those looking for an intimate, nature-connected wellness stay.",
    website: "https://www.rtayuwellness.com/"
  },
  {
    name: "Maitreyi the Vedic Village",
    location: "Pollachi, Tamil Nadu",
    geoTag: "Eco-Cultural/Foothills",
    shortDescription: "The location is exceptional, right in the foothills of the Nilgiri Mountains, surrounded by lush coconut groves and organic farmland.",
    overview: "A unique eco-cultural wellness village at the foothills of the Anamalai range in Tamil Nadu, blending Vedic living, Ayurveda, and sustainable farming in a single immersive experience. Programmes encompass Panchakarma, Vedic rituals, organic farm activities, yoga, and classical arts, offering a holistic cultural-wellness journey. The setting within Tamil Nadu's bio-rich Anamalai foothills adds an ecological dimension rarely found at other wellness destinations.",
    website: "https://maitreyivedic.in/"
  },
  {
    name: "Niraamaya Retreats Samroha",
    location: "Thiruvananthapuram, Kerala",
    geoTag: "Forest",
    shortDescription: "Niraamaya Retreats Samroha is located in the mountains, specifically within the lush rainforests and rugged hills of the Sholayar ranges. Perched on a cliff, the retreat overlooks the majestic Athirappilly Waterfalls and the Chalakudy River.",
    overview: "A premium forest wellness retreat near Thiruvananthapuram combining luxury amenities with rigorous Ayurvedic treatment protocols designed by specialist physicians. Offers comprehensive Panchakarma, weight management, orthopaedic therapies, and mental wellness programmes within a lush, forested estate. Niraamaya's signature integrative approach merges classical Ayurveda with contemporary wellness science, delivering measurable health outcomes in a serene forest sanctuary.",
    website: "https://niraamaya.com/"
  }
];

// ----------------------------- COASTAL CENTRES (with shortDescription) ---------------------------------
const coastalCentres = [
  {
    name: "Kalari Rasayana",
    location: "Kollam, Kerala",
    geoTag: "Coastal",
    shortDescription: "Located in the heart of the backwater area of the erstwhile Venad kingdom in Kerala.",
    overview: "A classical Ayurveda retreat on the Kollam coastline where the therapeutic salinity of sea air and Kerala’s Ashtavaidya traditions converge. Offers physician-prescribed Panchakarma, Kalaripayattu-based therapies, and immunity-building programmes with sea-view treatment rooms. The coastal setting amplifies the bioavailability of Ayurvedic oils and enhances skin and respiratory treatment outcomes.",
    website: "https://www.cghearth.com/kalari-rasayana"
  },
  {
    name: "Somatheeram Ayurvedic Health Resort",
    location: "Trivandrum, Kerala",
    geoTag: "Coastal",
    shortDescription: "Somatheeram is located on the stunning Malabar beach in Kerala, India.",
    overview: "Internationally acclaimed as one of Kerala’s oldest and most awarded Ayurvedic resorts, Somatheeram sits on a clifftop overlooking the Arabian Sea near Kovalam. Offers comprehensive Panchakarma, rejuvenation, slimming, and specialized disease-management programmes under senior Ayurvedic physicians. The confluence of ocean breezes, Kerala’s rich herbal tradition, and world-class clinical care makes this a benchmark coastal wellness destination.",
    website: "https://www.somatheeram.in/"
  },
  {
    name: "Nattika Beach Ayurveda Resort",
    location: "Thrissur, Kerala",
    geoTag: "Coastal",
    shortDescription: "The Nattika Beach Ayurveda Resort is a ayurveda wellness retreat on the shores of the beautiful Nattika Beach, Thrissur, Kerala, South India.",
    overview: "Set on a tranquil, palm-fringed beach on the Thrissur coast with direct access to Lakshadweep Sea breezes, Nattika offers authentic Ayurvedic programmes in a serene seafront setting. Specialises in Panchakarma, anti-ageing, stress management, and orthopaedic therapies, with all treatments supervised by resident Ayurvedic doctors. The undisturbed beachside location away from crowded tourist zones provides an ideal environment for deep healing and recovery.",
    website: "https://www.nattikabeach.com/"
  },
  {
    name: "The LaLiT Resort & Spa",
    location: "Bekal, Kasaragod, Kerala",
    geoTag: "Coastal",
    shortDescription: "The LaLiT Resort & Spa Bekal is nestled between the tranquil Nombili River and the Arabian Sea. Surrounded by lush greenery, serene lagoons, and a white-sand beach, it offers the perfect environment for rejuvenation.",
    overview: "A luxury coastal resort and spa in Bekal, one of Kerala’s most pristine and least-commercialised beaches, blending five-star hospitality with classical Ayurvedic treatments. Offers Ayurvedic spa therapies, stress-relief programmes, yoga, and wellness consultations within expansive beachfront grounds. The Bekal coastline’s clean sea air and natural serenity create an unmatched environment for coastal rejuvenation and luxury wellness.",
    website: "https://www.thelalit.com/bekal/"
  },
  {
    name: "Kanasu Ayurvedic & Wellness Centre",
    location: "Udupi, Karnataka",
    geoTag: "Coastal (Udupi Zone)",
    shortDescription: "Kanasu Ayurvedic & Wellness Resort (also known as Kanasu Wellness) is located near the coastal region of Udupi, Karnataka, specifically in the coastal forest area of Kukkehalli, near Bailoor.",
    overview: "Located in Udupi’s coastal zone, Kanasu combines Karnataka’s Tulu and Ayurvedic heritage with the therapeutic benefits of the Arabian Sea’s coastal microclimate. Offers Panchakarma, Kerala-style oil treatments, and wellness programmes tailored for skin disorders, stress, and lifestyle diseases. The Udupi coastal environment, known for its clean sea air and rich local herb tradition, enhances the efficacy of all treatments offered.",
    website: "https://www.kanasuwellness.com/"
  },
  {
    name: "SwaSwara",
    location: "Gokarna, Karnataka",
    geoTag: "Coastal/Forest-Fringe",
    shortDescription: "Situated on Om Beach, SwaSwara is an eco-luxury wellness retreat where waves and birdsong create serenity.",
    overview: "Set on the sacred Om Beach in Gokarna where the forest meets the sea, SwaSwara offers a unique confluence of Ayurveda, yoga, and creative arts in a globally celebrated spiritual coastal setting. Physician-supervised Panchakarma, customised yoga and meditation programmes, and silent retreats are delivered within bespoke cottages overlooking the ocean. The pristine, unspoiled coastal-forest environment of Gokarna is unmatched for deep spiritual and physical restoration.",
    website: "https://www.cghearth.com/swaswara"
  },
  {
    name: "Chitrakoota Ayurveda",
    location: "Kundapur, Karnataka",
    geoTag: "Coastal (Kundapur Zone)",
    shortDescription: "Chithrakoota Ayurveda is located in the mountains/hilly region, specifically nestled deep within the verdant Western Ghats. While in the hills, it is approximately 12 km from the coastal village of Maravanthe and 50 km from Udupi.",
    overview: "A dedicated Ayurvedic treatment centre in the coastal Kundapur zone of Karnataka, offering classical Panchakarma and disease-specific treatment programmes in a calm coastal setting. Therapies include Shirodhara, Abhyanga, Kizhi, and specialised orthopaedic and neurological treatments, all supervised by qualified Ayurvedic physicians. The coastal Kundapur climate, with its gentle sea breeze and clean air, supports superior outcomes for skin, joint, and stress-related conditions.",
    website: "https://www.chitrakootaayurveda.com/"
  },
  {
    name: "Balakatmane Ayurveda Retreat",
    location: "Beloor, Udupi, Karnataka",
    geoTag: "Coastal (Udupi Zone)",
    shortDescription: "It is located near the coast (approximately 10 km from Udupi beaches) but is set inland amidst lush green, rural surroundings. Located in Beloor Village, Kundapur Taluk near Udupi, it provides a quiet, countryside, and forest-like atmosphere, rather than a high-altitude mountain setting.",
    overview: "A boutique Ayurvedic retreat in Beloor near Udupi, offering traditional Kerala and Karnataka-style Ayurvedic treatments within a heritage property close to the Udupi coast. Programmes cover detoxification, rejuvenation, and chronic pain management, with treatments tailored individually by resident physicians using fresh herbal preparations. The coastal Udupi zone’s clean maritime air and the property’s heritage charm create an intimate, culturally rich healing environment.",
    website: "https://www.balakatmane.com/"
  },
  {
    name: "Chariot Beach Resort",
    location: "Mahabalipuram, Chennai",
    geoTag: "Coastal",
    shortDescription: "Chariot Beach Resort is located near the coastal area of Mahabalipuram (Mamallapuram), near Chennai, directly on the Bay of Bengal.",
    overview: "A beachfront resort and wellness destination on the Bay of Bengal at Mahabalipuram, combining Tamil Nadu’s cultural heritage with Ayurvedic spa therapies and coastal relaxation. Offers Ayurvedic treatments, yoga, meditation, and wellness packages alongside the resort’s leisure amenities, with the ancient UNESCO World Heritage site of Mahabalipuram as a backdrop. The Bay of Bengal’s warm sea air and the region’s cultural richness make this a distinctive coastal wellness and heritage experience.",
    website: "https://www.chariotbeachresort.com/"
  },
  {
    name: "Mekosha",
    location: "Thiruvananthapuram, Kerala",
    geoTag: "Coastal",
    shortDescription: "Mekosha Trivandrum, situated on the banks of the river Attingal Aaru in Kerala.",
    overview: "A contemporary Ayurvedic wellness retreat near Thiruvananthapuram’s coast, combining modern luxury with classical Ayurvedic treatment protocols delivered by senior physicians. Programmes include Panchakarma, weight management, skin rejuvenation, and mental wellness therapies, all customised to individual health assessments. Melkosha’s proximity to the Kerala coast enhances treatment outcomes through the therapeutic coastal microclimate while offering high standards of comfort and clinical care.",
    website: "https://www.mekosha.com/"
  },
  {
    name: "Ayurjeevan Ayurveda Retreat",
    location: "Kasaragod, Kerala",
    geoTag: "Coastal-Forest Border",
    shortDescription: "Ayurjeevan Ayurveda is in Edayilakkadu, Valiyaparamba, Kerala, a peaceful riverside place surrounded by green nature, located in a coastal, backwater setting.",
    overview: "Uniquely positioned at the border of the coastal and forest ecosystems in Kasaragod, Ayurjeevan benefits from both the healing salinity of the sea air and the rich medicinal biodiversity of the adjoining forest belt. Offers traditional Panchakarma, detoxification, and chronic disease management programmes using locally sourced coastal and forest herbs. This rare dual-ecosystem advantage provides exceptional therapeutic inputs not available at purely coastal or purely forest wellness centres.",
    website: "https://www.ayurjeevan.com/"
  }
];

// ----------------------------- MOUNTAIN CENTRES (with shortDescription) ---------------------------------
const mountainCentres = [
  {
    name: "Sterling Kadumane Hills",
    location: "Sakleshpur, Karnataka",
    geoTag: "Western Ghats/Mountain (900m)",
    shortDescription: "Sterling Kadumane Hills is located in the Western Ghats mountain range in Sakleshpur, Karnataka. Nestled within the lush, rolling Kadumane hills, the resort is set amidst coffee plantations, tea estates, and dense forest.",
    overview: "A serene mountain wellness retreat at 900 metres in Sakleshpur’s tea-estate hills, adjacent to the Bisle Ghat forest reserve within the Western Ghats. Offers Ayurvedic spa therapies, yoga, and nature walks within the property’s lush tea and coffee estates, with breathtaking misty hill views. The cool, pollution-free hill climate, rich in forest phytoncides, enhances respiratory health and makes this an ideal destination for stress recovery and gentle rejuvenation.",
    website: "https://www.sterlingholidays.com/resorts/sakleshpur-kadumane-hills"
  },
  {
    name: "Ananda Spa",
    location: "Nilgiris, Tamil Nadu",
    geoTag: "Hills/Tea Country (2200m)",
    shortDescription: "Ananda in the Himalayas is a renowned luxury wellness retreat located directly in the Himalayan foothills in Northern India. Situated near Rishikesh, it sits on a 100-acre estate surrounded by forests.",
    overview: "Situated at 2,200 metres in the Nilgiri Biosphere Reserve — one of India’s most biodiverse high-altitude ecosystems — Ananda Spa delivers world-class Ayurvedic, Vedanta, and contemporary wellness therapies. The elevated altitude provides natural SpO₂ advantages for cardiovascular and respiratory therapies, while the extraordinary endemic Nilgiri herb diversity enriches all Ayurvedic formulations. Programmes include Panchakarma, yoga intensives, fitness training, and executive wellness retreats within a luxury mountain setting.",
    website: "https://www.anandaspa.com/"
  },
  {
    name: "Zacs Valley Resort & Wellness Retreat",
    location: "Kodaikanal, Tamil Nadu",
    geoTag: "Nature/Mountain (2100m)",
    shortDescription: "Kodaikanal – a beautiful hill station of the southern Indian state, Tamilnadu. Set amidst the forested valleys, lakes, waterfalls, granite cliffs & grassy hills, this beautiful town is situated 2,000 meters above the sea level.",
    overview: "A peaceful wellness retreat at 2,100 metres amid Kodaikanal’s cool pine and shola forests, offering classical Panchakarma, pain management, and detoxification within an unspoiled mountain environment. The high-altitude, naturally pollution-free Kodaikanal setting accelerates cellular rejuvenation and makes yoga and pranayama profoundly more effective than at lower elevations. Ideal for guests seeking a long-stay programme combining clinical Ayurvedic depth with the restorative quiet of South India’s most beloved hill station.",
    website: "https://www.zacsvalley.com/"
  }
];

// ----------------------------- CATEGORY META (complete with all fields) ---------------------------------
const categoryMeta = {
  forest: {
    title: "Forest Wellness Centres",
    
    heroDescription: "Explore forest geography with Ayurvedic centres designed for detoxification, immune resilience, and herbal restoration.",
    pageTitle: "FOREST",
    image: "/src/assets/images/herbs.jpg"
  },
  coastal: {
    title: "Coastal Wellness Centres",
    heroDescription: "Discover coastal sanctuaries where marine air and Ayurveda combine for radiant skin, respiratory strength, and deep relaxation.",
    pageTitle: "COASTAL",
    image: "/src/assets/images/Ecology.jpg"
  },
  mountain: {
    title: "Mountain Wellness Centres",
    heroDescription: "Find mountain retreats that support oxygen-rich breathing, nervous system reset, and lasting clarity.",
    pageTitle: "MOUNTAIN",
    image: "/src/assets/images/Protocols.jpg"
  }
};

// ----------------------------- CATEGORY CARDS (main page with all fields) ---------------------------------
const categoryCards = [
  {
    id: "forest",
    title: "FOREST",
    
    gradient: "from-green-900/80 to-black/60",
    image: "/src/assets/images/herbs.jpg",
    
  },
  {
    id: "coastal",
    title: "COASTAL",
    
    gradient: "from-blue-900/80 to-black/60",
    image: "/src/assets/images/Ecology.jpg",
    
  },
  {
    id: "mountain",
    title: "MOUNTAIN",
    
    gradient: "from-emerald-900/80 to-black/60",
    image: "/src/assets/images/Protocols.jpg",

  }
];

// ----------------------------- RESORT CARD (full shortDescription, no truncation) ---------------------------------
const ResortCard = ({ centre, categoryLabel, onOpen }) => {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);
    onOpen(centre, categoryLabel);
    setTimeout(() => setAnimate(false), 150);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative cursor-pointer rounded-2xl bg-white shadow-md hover:shadow-xl active:scale-[0.98] overflow-hidden transition-all duration-400"
    >
      {/* Light green gradient overlay (much lighter, so text stays readable) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-green-300 via-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out" />
      
      {/* Decorative white blob */}
      <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-white/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out pointer-events-none" />
      
      <div className="relative z-10 p-6">
        <h3 className={`text-2xl font-serif font-bold text-green-900 leading-tight mb-2 transition-all duration-150 ease-out ${animate ? '-translate-y-1 scale-105' : ''}`}>
          {centre.name}
        </h3>
        <div className="mb-4">
          <span className={`text-green-700 text-sm font-medium transition-all duration-150 ease-out inline-block ${animate ? '-translate-y-1 scale-105' : ''}`}>
            {centre.location}
          </span>
        </div>
        <p className={`text-green-800/80 text-sm leading-relaxed mb-6 transition-all duration-150 ease-out ${animate ? '-translate-y-1 scale-[1.01]' : ''}`}>
          {centre.shortDescription}
        </p>
        <div className="flex justify-end">
          <span className={`inline-block px-5 py-2 rounded-full bg-yellow-600 text-white text-sm font-semibold tracking-wide transition-all duration-150 ease-out group-hover:bg-white group-hover:text-green-700 ${animate ? '-translate-y-1 scale-105' : ''}`}>
            Click to explore 
          </span>
        </div>
      </div>
    </div>
  );
};

// ----------------------------- MAIN PAGE (GeoWellnessCenter) with hero settings -----------------------------
export default function GeoWellnessCenter() {
  const navigate = useNavigate();
  const [pageLoaded, setPageLoaded] = useState(false);
  const goToCategoryPage = (categoryId) => {
    navigate(`/program/geo-wellness/${categoryId}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => setPageLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">
      <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img src="/src/assets/images/DoctorHomepage.jpg" alt="Geo Wellness Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 via-green-800/80 to-black/50" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6 lg:px-20 pt-32 md:pt-40 pb-20">
          <div className={`transition-all duration-700 ease-out transform ${pageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-wide mb-6 drop-shadow-2xl">
              GEO-WELLNESS CENTERS
            </h1>
            <h2 className="text-lg md:text-xl lg:text-2xl font-light leading-snug mb-8 max-w-4xl mx-auto">
              Exclusive Partner Locations Optimized for Circadian and Environmental Correction.
            </h2>
            <p className="text-sm md:text-base leading-relaxed max-w-3xl mx-auto text-white/90">
              At DARSHAI, we believe that geography is a clinical variable. We do not own resorts; we certify Curated Sanctuaries. Each location is a white-labelled partner site that has undergone a rigorous DARSHAI audit to ensure it meets our standards for atmospheric purity, light spectrum, and geological frequency.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-gray-50 py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-24">
            {categoryCards.map((card, index) => (
              <div
                key={card.id}
                className={`relative h-[450px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 ease-out transform ${
                  pageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <img src={card.image} alt={card.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className={`absolute inset-0 bg-gradient-to-t ${card.gradient}`} />
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  <div>
                    <h3 className="text-5xl font-serif text-white mb-2 uppercase tracking-wider">{card.title}</h3>
                    {card.caption && <p className="text-sm uppercase tracking-[0.4em] text-yellow-700 mb-4">{card.caption}</p>}
                  </div>
                  <div className="flex justify-center">
                    <button onClick={() => goToCategoryPage(card.id)} className="px-6 py-3 bg-white text-black rounded-full font-medium tracking-wide hover:bg-yellow-500 hover:text-white transition-all duration-300">
                      Explore More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-6 text-green-700 italic">
        A vertical sanctuary optimized for circadian spectral light and high-altitude recovery.
      </p>
    </div>
  );
}

// ----------------------------- CATEGORY PAGE (GeoWellnessCategory) with modal unchanged (uses overview) -----------------------------
export function GeoWellnessCategory() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [activeSanctuary, setActiveSanctuary] = useState(null);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const categoryKey = category?.toLowerCase();
  const meta = categoryMeta[categoryKey];
  const categoryCard = categoryCards.find((card) => card.id === categoryKey);
  const centres = {
    forest: forestCentres,
    coastal: coastalCentres,
    mountain: mountainCentres
  }[categoryKey] ?? [];

  useEffect(() => {
    const timer = setTimeout(() => setPageLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  if (!meta || !categoryCard) {
    return <Navigate to="/program/geo-wellness" replace />;
  }

  const openModal = (centre) => {
    setActiveSanctuary(centre);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setActiveSanctuary(null), 300);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img src={categoryCard.image} alt={`${categoryCard.title} Hero`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 via-green-800/80 to-black/50" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center text-white px-6 lg:px-20 pt-40 pb-20">
          <div className={`transition-all duration-700 ease-out transform ${pageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-wide mb-8">{categoryCard.title}</h1>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-light leading-snug mb-8 max-w-4xl mx-auto">{categoryCard.caption}</h2>
            <p className="text-sm md:text-lg leading-relaxed max-w-5xl mx-auto text-white/90">{categoryCard.description}</p>
            <button
              onClick={() => navigate("/program/geo-wellness")}
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition hover:bg-yellow-500 hover:text-white"
            >
              Back to Geo Wellness
            </button>
          </div>
        </div>
      </section>

      {/* Resort Cards */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-xs tracking-[0.35em] text-yellow-700 uppercase mb-3">{meta.pageTitle}</p>
            <h2 className="text-4xl md:text-5xl font-serif text-green-800">{meta.title}</h2>
            <p className="mt-4 text-green-700/80 max-w-3xl mx-auto">{meta.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {centres.map((centre, index) => (
              <div
                key={centre.name}
                className={`transition-all duration-700 ease-[cubic-bezier(0.34,1.2,0.64,1)] transform ${
                  pageLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ResortCard
                  centre={centre}
                  categoryLabel={categoryCard.title}
                  onOpen={() => openModal(centre)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal - uses overview (long detailed text) */}
      {activeSanctuary && (
        <div
          className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto p-4 transition-opacity duration-300 ${
            modalOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeModal}
        >
          <div
            className="max-w-4xl mx-auto min-h-screen py-20 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`bg-white rounded-3xl shadow-2xl overflow-hidden w-full transform transition-all duration-500 ${
                modalOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
              }`}
            >
              <div className="p-8 md:p-12">
                <div className="flex justify-end mb-4">
                  <button onClick={closeModal} className="text-3xl text-green-800 hover:text-yellow-700 transition-colors">×</button>
                </div>
                <div className="animate-fade-up" style={{ animationDelay: '0ms' }}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-green-900 leading-tight mb-3">{activeSanctuary.name}</h1>
                </div>
                <div className="animate-fade-up" style={{ animationDelay: '50ms' }}>
                  <p className="text-green-700 text-base md:text-lg mb-8">{activeSanctuary.location}</p>
                </div>
                <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
                  <h3 className="text-sm uppercase tracking-[0.3em] text-yellow-700 mb-3 font-semibold">Overview</h3>
                  <p className="text-gray-900 leading-relaxed text-base md:text-lg">{activeSanctuary.overview}</p>
                </div>
                <div className="animate-fade-up mt-10 flex justify-end" style={{ animationDelay: '150ms' }}>
                  <a
                    href={activeSanctuary.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-full font-semibold tracking-wide hover:bg-yellow-700 transition-all duration-300 hover:scale-105"
                  >
                    Visit Website
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          opacity: 0;
          animation: fadeUp 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
}