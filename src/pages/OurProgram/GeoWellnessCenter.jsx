import React from "react";
import { motion } from "framer-motion";

export default function GeoWellnessCenter() {
  const [activeSanctuary, setActiveSanctuary] = React.useState(null);

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img src="/src/assets/images/Geo-wellness.jpg" alt="Geo Wellness Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 via-green-800/80 to-black/50"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6 lg:px-20 py-20">
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-wide mb-8 drop-shadow-2xl">
            GEO-WELLNESS CENTERS
          </motion.h1>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl md:text-3xl lg:text-4xl font-light leading-snug mb-8 max-w-4xl mx-auto px-4">
            Exclusive Partner Locations Optimized for Circadian and Environmental Correction.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg md:text-xl leading-loose max-w-3xl mx-auto text-white/90">
            At DARSHAI, we believe that geography is a clinical variable. We do not own resorts; we certify <em className="font-serif italic">Curated Sanctuaries</em>. Each location is a white-labelled partner site that has undergone a rigorous DARSHAI audit.
          </motion.p>
        </div>
      </section>

      {/* Ragdima - Image Left */}
      <section className="bg-[#e9e4db] py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <img src="/src/assets/images/Ecology.jpg" alt="Ragdima Sanctuary" className="w-full h-[500px] object-cover rounded-[40px] group-hover:scale-[1.02] transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent rounded-[40px]" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl md:text-3xl font-serif">Ragdima Sanctuary</h3>
              <p className="text-sm opacity-90">Udupi, Karnataka</p>
            </div>
            <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/30 backdrop-blur flex items-center justify-center text-white text-xl">🌊</div>
          </div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-700 rounded-2xl flex items-center justify-center text-white text-xl">🌊</div>
              <p className="text-xs tracking-[0.2em] text-yellow-700 uppercase">Coastal Bio-Hub</p>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-green-800 leading-tight">The Coastal Bio-Hub</h2>
            <ul className="text-green-800/80 text-lg leading-relaxed space-y-4">
              <li className="flex items-start gap-3 p-3 bg-white/50 rounded-xl backdrop-blur-sm">
                <span className="text-green-700 font-semibold min-w-[200px]">Geo-Wellness Factor:</span> High negative ion concentration and Vastu-integrated maritime airflow.
              </li>
              <li className="flex items-start gap-3 p-3 bg-white/50 rounded-xl backdrop-blur-sm">
                <span className="text-green-700 font-semibold min-w-[200px]">Primary Intervention:</span> Vagus Nerve Stimulation and rapid reduction of oxidative stress.
              </li>
            </ul>
            <button onClick={() => setActiveSanctuary({
              title: "Ragdima Sanctuary | Udupi, Karnataka",
              subtitle: "The Coastal Bio-Hub",
              image: "/src/assets/images/Ecology.jpg",
              description: "Located in the pristine coastal belt of Udupi, Ragdima is a sanctuary optimized for high-ionization air and transdermal mineral absorption. The proximity to the Arabian Sea provides a constant flow of salt-dense, negative-ion-rich air that acts as a natural nebulizer for systemic inflammation and respiratory clarity.",
              factor: "High negative ion concentration and Vastu-integrated maritime airflow.",
              intervention: "Vagus Nerve Stimulation and rapid reduction of oxidative stress."
            })} className="group flex items-center gap-4 px-8 py-4 bg-green-700 text-white rounded-full font-medium tracking-wide hover:bg-green-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-lg">
              DISCOVER RAGDIMA
              <motion.span className="group-hover:translate-x-2 transition-transform">→</motion.span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Kanasu - Content Left */}
      <section className="bg-[#e9e4db] py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="order-2 md:order-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-700 rounded-2xl flex items-center justify-center text-white text-xl">⛰️</div>
              <p className="text-xs tracking-[0.2em] text-yellow-700 uppercase">Circadian Blueprint</p>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-green-800 leading-tight">Kanasu Sanctuary</h2>
            <ul className="text-green-800/80 text-lg leading-relaxed space-y-4">
              <li className="flex items-start gap-3 p-3 bg-white/50 rounded-xl backdrop-blur-sm">
                <span className="text-green-700 font-semibold min-w-[200px]">Geo-Wellness Factor:</span> High-altitude oxygen density and total absence of "Technological Noise."
              </li>
              <li className="flex items-start gap-3 p-3 bg-white/50 rounded-xl backdrop-blur-sm">
                <span className="text-green-700 font-semibold min-w-[200px]">Primary Intervention:</span> Sleep Architecture Restoration and cognitive performance optimization.
              </li>
            </ul>
            <button onClick={() => setActiveSanctuary({
              title: "Kanasu Sanctuary | Karnataka Highlands",
              subtitle: "The Circadian Blueprint",
              image: "/src/assets/images/Section.jpg",
              description: "Kanasu is our premier vertical sanctuary, situated far above urban light pollution and atmospheric haze. This highland coordinate is specifically selected for its spectral light integrity, allowing for the precise recalibration of the pineal gland and the restoration of natural cortisol rhythms.",
              factor: "High-altitude oxygen density and total absence of 'Technological Noise.'",
              intervention: "Sleep Architecture Restoration and cognitive performance optimization."
            })} className="group flex items-center gap-4 px-8 py-4 bg-green-700 text-white rounded-full font-medium tracking-wide hover:bg-green-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-lg">
              DISCOVER KANASU
              <motion.span className="group-hover:translate-x-2 transition-transform">→</motion.span>
            </button>
          </motion.div>
          <div className="order-1 md:order-2 relative group">
            <img src="/src/assets/images/Section.jpg" alt="Kanasu Sanctuary" className="w-full h-[500px] object-cover rounded-[40px] group-hover:scale-[1.02] transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent rounded-[40px]" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl md:text-3xl font-serif">Kanasu Sanctuary</h3>
              <p className="text-sm opacity-90">Karnataka Highlands</p>
            </div>
            <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/30 backdrop-blur flex items-center justify-center text-white text-xl">⛰️</div>
          </div>
        </div>
      </section>

      {/* Malabar - Image Left */}
      <section className="bg-[#e9e4db] py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <img src="/src/assets/images/herbs.jpg" alt="Malabar Botanical Corridor" className="w-full h-[500px] object-cover rounded-[40px] group-hover:scale-[1.02] transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent rounded-[40px]" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl md:text-3xl font-serif">Malabar Botanical Corridor</h3>
              <p className="text-sm opacity-90">Palakkad, Kerala</p>
            </div>
            <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/30 backdrop-blur flex items-center justify-center text-white text-xl">🌿</div>
          </div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-700 rounded-2xl flex items-center justify-center text-white text-xl">🌿</div>
              <p className="text-xs tracking-[0.2em] text-yellow-700 uppercase">Metabolic Reset</p>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-green-800 leading-tight">The Metabolic Reset</h2>
            <ul className="text-green-800/80 text-lg leading-relaxed space-y-4">
              <li className="flex items-start gap-3 p-3 bg-white/50 rounded-xl backdrop-blur-sm">
                <span className="text-green-700 font-semibold min-w-[200px]">Geo-Wellness Factor:</span> Natural temperature regulation and high phytoncide (forest aerosol) density.
              </li>
              <li className="flex items-start gap-3 p-3 bg-white/50 rounded-xl backdrop-blur-sm">
                <span className="text-green-700 font-semibold min-w-[200px]">Primary Intervention:</span> Agni (Metabolic Fire) Activation and deep-tissue systemic detox.
              </li>
            </ul>
            <button onClick={() => setActiveSanctuary({
              title: "Malabar Botanical Corridor | Palakkad, Kerala",
              subtitle: "The Metabolic Reset",
              image: "/src/assets/images/herbs.jpg",
              description: "Located in the unique Palakkad Gap; this sanctuary sits in a rare low-humidity micro-climate within the Western Ghats biodiversity corridor. The air here is a dense 'bio-aerosol' of healing compounds from over 600 species of endemic medicinal herbs.",
              factor: "Natural temperature regulation and high phytoncide (forest aerosol) density.",
              intervention: "Agni (Metabolic Fire) Activation and deep-tissue systemic detox."
            })} className="group flex items-center gap-4 px-8 py-4 bg-green-700 text-white rounded-full font-medium tracking-wide hover:bg-green-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-lg">
              DISCOVER MALABAR
              <motion.span className="group-hover:translate-x-2 transition-transform">→</motion.span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Western Ghats - Content Left */}
      <section className="bg-[#e9e4db] py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="order-2 md:order-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-700 rounded-2xl flex items-center justify-center text-white text-xl">🏔️</div>
              <p className="text-xs tracking-[0.2em] text-yellow-700 uppercase">Circadian Blueprint</p>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-green-800 leading-tight">Western Ghats Highlands</h2>
            <ul className="text-green-800/80 text-lg leading-relaxed space-y-4">
              <li className="flex items-start gap-3 p-3 bg-white/50 rounded-xl backdrop-blur-sm">
                <span className="text-green-700 font-semibold min-w-[200px]">Geo-Wellness Factor:</span> Rare mountain silence and high-altitude oxygen density.
              </li>
              <li className="flex items-start gap-3 p-3 bg-white/50 rounded-xl backdrop-blur-sm">
                <span className="text-green-700 font-semibold min-w-[200px]">Primary Intervention:</span> Sleep Architecture Restoration and cognitive clarity protocols.
              </li>
            </ul>
            <button onClick={() => setActiveSanctuary({
              title: "Western Ghats Highlands | Coorg & Wayanad",
              subtitle: "The Circadian Blueprint Network",
              image: "/src/assets/images/Protocols.jpg",
              description: "A vertical sanctuary network optimized for high-altitude recovery and spectral light integrity. Far above urban light pollution and atmospheric haze, these coordinates allow for the precise recalibration of the pineal gland and cortisol rhythms.",
              factor: "Rare mountain silence and high-altitude oxygen density.",
              intervention: "Sleep Architecture Restoration and cognitive clarity protocols."
            })} className="group flex items-center gap-4 px-8 py-4 bg-green-700 text-white rounded-full font-medium tracking-wide hover:bg-green-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-lg">
              DISCOVER GHATS
              <motion.span className="group-hover:translate-x-2 transition-transform">→</motion.span>
            </button>
          </motion.div>
          <div className="order-1 md:order-2 relative group">
            <img src="/src/assets/images/Protocols.jpg" alt="Western Ghats" className="w-full h-[500px] object-cover rounded-[40px] group-hover:scale-[1.02] transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent rounded-[40px]" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl md:text-3xl font-serif">Western Ghats Highlands</h3>
              <p className="text-sm opacity-90">Coorg & Wayanad, Karnataka/Kerala</p>
            </div>
            <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/30 backdrop-blur flex items-center justify-center text-white text-xl">🏔️</div>
          </div>
        </div>
      </section>

      {/* DARSHAI Audit - Last Visible Section */}
      <section className="bg-gradient-to-b from-[#e9e4db] to-white py-32 px-6 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-serif text-green-800 mb-6">The DARSHAI Audit</h2>
          <p className="text-lg md:text-xl text-green-700/80 max-w-3xl mx-auto mb-20">Every South Indian sanctuary is vetted across four proprietary metrics before integration into the Dharsh AI engine.</p>
          <div className="relative">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full bg-green-700/30"></div>
            {/* 1 */}
            <div className="mb-20 flex items-center justify-between w-full">
              <div className="w-1/2 pr-10 text-right">
                <h3 className="text-2xl font-semibold text-green-800">1. Atmospheric Density</h3>
                <p className="text-green-700/70 mt-2">Purity and ionization levels of the local micro-climate.</p>
              </div>
              <div className="z-10 w-5 h-5 bg-green-700 rounded-full border-4 border-white animate-pulse"></div>
              <div className="w-1/2"></div>
            </div>
            {/* 2 */}
            <div className="mb-20 flex items-center justify-between w-full">
              <div className="w-1/2"></div>
              <div className="z-10 w-5 h-5 bg-green-700 rounded-full border-4 border-white animate-pulse"></div>
              <div className="w-1/2 pl-10 text-left">
                <h3 className="text-2xl font-semibold text-green-800">2. Spectral Light Integrity</h3>
                <p className="text-green-700/70 mt-2">Natural infrared and UV-A/B availability for hormonal balance.</p>
              </div>
            </div>
            {/* 3 */}
            <div className="mb-20 flex items-center justify-between w-full">
              <div className="w-1/2 pr-10 text-right">
                <h3 className="text-2xl font-semibold text-green-800">3. Acoustic Baseline</h3>
                <p className="text-green-700/70 mt-2">The absence of "Technological Noise" to ensure deep-brain silence.</p>
              </div>
              <div className="z-10 w-5 h-5 bg-green-700 rounded-full border-4 border-white animate-pulse"></div>
              <div className="w-1/2"></div>
            </div>
            {/* 4 */}
            <div className="flex items-center justify-between w-full">
              <div className="w-1/2"></div>
              <div className="z-10 w-5 h-5 bg-green-700 rounded-full border-4 border-white animate-pulse"></div>
              <div className="w-1/2 pl-10 text-left">
                <h3 className="text-2xl font-semibold text-green-800">4. Geological Resonance</h3>
                <p className="text-green-700/70 mt-2">The mineral profile of the local soil and water (Ojas-factor).</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 md:px-20 bg-gradient-to-t from-green-900 to-green-800 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-400/10 via-transparent to-transparent"></div>
        <div className="relative z-10">
          <motion.h2 initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="text-4xl md:text-6xl lg:text-7xl font-serif mb-8 drop-shadow-2xl">
            Ready to Transform?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Book your sanctuary stay and experience geo-validated wellness at certified Darshai locations.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-6 max-w-md mx-auto">
            <a href="/contact" className="block w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-green-900 font-serif text-xl py-8 px-12 rounded-3xl tracking-wide font-medium shadow-2xl hover:shadow-3xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 relative overflow-hidden group">
              <span className="relative z-10">BOOK YOUR SANCTUARY</span>
              <div className="absolute inset-0 bg-green-900 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </a>
            <p className="text-green-200/80 text-sm italic">or begin your journey with a consultation</p>
            <a href="/login" className="inline-flex items-center gap-3 text-green-200/90 hover:text-white font-medium tracking-wide group hover:gap-4 transition-all">
              Start Consultation <motion.span initial={{ x: 0 }} whileHover={{ x: 8 }} className="inline-block">→</motion.span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      {activeSanctuary && (
        <div className="fixed inset-0 z-50 bg-[#e9e4db] overflow-y-auto p-4">
          <button onClick={() => setActiveSanctuary(null)} className="absolute top-8 right-8 text-3xl text-green-800 hover:text-yellow-700 font-serif z-50">×</button>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center min-h-screen py-20">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative rounded-[40px] overflow-hidden shadow-2xl">
              <img src={activeSanctuary.image} alt={activeSanctuary.title} className="w-full h-[600px] object-cover md:h-[70vh]" />
              <div className="absolute inset-0 bg-gradient-to-r from-green-900/50 to-transparent" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
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
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
