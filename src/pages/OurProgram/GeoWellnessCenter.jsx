// src/pages/GeoWellnessCenter.jsx

import React from "react";

const GeoWellnessCenter = () => {
  return (
    <div>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      {/* HERO SECTION */}
      <section className="relative h-[420px] flex items-center justify-center text-center">
  <img
    src="/images/herb.jpg"
    alt="Geo Wellness"
    className="absolute inset-0 w-full h-full object-cover"
  />

        {/* overlay */}
        <div className="absolute inset-0 bg-slate-950/70"></div>


        <div className="relative z-10 text-white px-6">
          <h1 className="text-4xl md:text-6xl font-serif leading-tight animate-[fadeIn_1s_ease-in-out]">
            Geo-Wellness Centers
          </h1>
          <p className="mt-5 text-base md:text-xl max-w-3xl mx-auto opacity-90 animate-[fadeIn_1.2s_ease-in-out]">
            Exclusive partner locations optimized for circadian and environmental correction.
          </p>
          <p className="mt-6 text-sm md:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed animate-[fadeIn_1.4s_ease-in-out]">
            At DARSHAI, we believe that geography is a clinical variable. We do not own resorts; we
            certify Curated Sanctuaries. Each location is a white-labelled partner site that has
            undergone a rigorous DARSHAI audit to ensure it meets our standards for atmospheric
            purity, light spectrum, and geological frequency.
          </p>
        </div>
      </section>

    {/* ================= CURATED SANCTUARIES (FULL SECTION) ================= */}
      <section className="bg-[#f7f3ec] py-24 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.35em] text-amber-700 mb-4">
              CURATED SANCTUARIES
            </p>
  <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-slate-900 leading-tight">
              Certified South Indian sanctuaries designed to restore rhythm, balance, and metabolic resilience.
            </h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
<article className="rounded-[32px] border border-slate-200 shadow-sm overflow-hidden relative hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent group-hover:from-black/30">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
                  alt="Ragdima Sanctuary"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/60"></div>
              </div>
              <div className="relative z-10 p-8 text-white">
                <p className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-3">
                  Ragdima Sanctuary
                </p>
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 group-hover:text-amber-100 transition-colors">
                  Udupi, Karnataka
                </h3>
                <p className="text-slate-200 leading-relaxed mb-5">
                  The Coastal Bio-Hub located in the pristine coastal belt of Udupi. Ragdima is a sanctuary optimized for high-ionization air and transdermal mineral absorption.
                  The proximity to the Arabian Sea provides constant salt-dense, negative-ion-rich air that acts as a natural nebulizer for systemic inflammation and respiratory clarity.
                </p>
                <ul className="space-y-3 text-slate-200 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-amber-300"></span>
                    <strong>Geo-Wellness Factor:</strong> High negative ion concentration and Vastu-integrated maritime airflow.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-amber-300"></span>
                    <strong>Primary Intervention:</strong> Vagus nerve stimulation and rapid reduction of oxidative stress.
                  </li>
                </ul>
              </div>
            </article>

            <article className="rounded-[32px] border border-slate-200 shadow-sm overflow-hidden relative">
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1464822759844-d150f39a97d3"
                  alt="Kanasu Sanctuary"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/60"></div>
              </div>
              <div className="relative z-10 p-8 text-white">
                <p className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-3">
                  Kanasu Sanctuary
                </p>
                <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 group-hover:text-amber-100 transition-colors">
                  Karnataka Highlands
                </h3>
                <p className="text-slate-200 leading-relaxed mb-5">
                  The Circadian Blueprint. Kanasu is our premier vertical sanctuary, situated far above urban light pollution and atmospheric haze. This highland coordinate is selected for its spectral light integrity, allowing precise recalibration of the pineal gland and restoration of natural cortisol rhythms.
                </p>
                <ul className="space-y-3 text-slate-200 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-amber-300"></span>
                    <strong>Geo-Wellness Factor:</strong> High-altitude oxygen density and total absence of technological noise.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-amber-300"></span>
                    <strong>Primary Intervention:</strong> Sleep architecture restoration and cognitive performance optimization.
                  </li>
                </ul>
              </div>
            </article>

            <article className="rounded-[32px] border border-slate-200 shadow-sm overflow-hidden relative">
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
                  alt="Malabar Botanical Corridor"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/60"></div>
              </div>
              <div className="relative z-10 p-8 text-white">
                <p className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-3">
                  Malabar Botanical Corridor
                </p>
                <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 group-hover:text-amber-100 transition-colors">
                  Palakkad, Kerala
                </h3>
                <p className="text-slate-200 leading-relaxed mb-5">
                  The Metabolic Reset. Located in the unique Palakkad Gap, this sanctuary sits in a rare low-humidity micro-climate within the Western Ghats biodiversity corridor. The air here is a dense bio-aerosol of healing compounds from over 600 species of endemic medicinal herbs.
                </p>
                <ul className="space-y-3 text-slate-200 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-amber-300"></span>
                    <strong>Geo-Wellness Factor:</strong> Natural temperature regulation and high phytoncide (forest aerosol) density.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-amber-300"></span>
                    <strong>Primary Intervention:</strong> Agni (metabolic fire) activation and deep-tissue systemic detox.
                  </li>
                </ul>
              </div>
            </article>

            <article className="rounded-[32px] border border-slate-200 shadow-sm overflow-hidden relative">
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1464822759844-d150f39a97d3"
                  alt="Western Ghats Highlands"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/60"></div>
              </div>
              <div className="relative z-10 p-8 text-white">
                <p className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-3">
                  Western Ghats Highlands
                </p>
                <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 group-hover:text-amber-100 transition-colors">
                  Coorg & Wayanad
                </h3>
                <p className="text-slate-200 leading-relaxed mb-5">
                  The Circadian Blueprint. A vertical sanctuary network optimized for high-altitude recovery and spectral light integrity. Far above urban pollution, these coordinates allow precise recalibration of the pineal gland and cortisol rhythms.
                </p>
                <ul className="space-y-3 text-slate-200 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-amber-300"></span>
                    <strong>Geo-Wellness Factor:</strong> Rare mountain silence and high-altitude oxygen density.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-amber-300"></span>
                    <strong>Primary Intervention:</strong> Sleep architecture restoration and cognitive clarity protocols.
                  </li>
                </ul>
              </div>
            </article>
          </div>

          <div className="mt-20 rounded-[32px] border border-slate-200 bg-slate-950 px-8 py-12 text-white">
            <div className="max-w-4xl mx-auto">
              <p className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-3">
                The DARSHAI Audit
              </p>
              <h3 className="text-3xl font-serif text-white mb-6 animate-[fadeInUp_1s_ease-in-out]">
                Every sanctuary is vetted across four proprietary metrics before integration into the Dharsh AI engine.
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <p className="font-semibold text-amber-300">1. Atmospheric Density</p>
                  <p className="text-slate-300 leading-relaxed">
                    Purity and ionization levels of the local micro-climate.
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="font-semibold text-amber-300">2. Spectral Light Integrity</p>
                  <p className="text-slate-300 leading-relaxed">
                    Natural infrared and UV-A/B availability for hormonal balance.
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="font-semibold text-amber-300">3. Acoustic Baseline</p>
                  <p className="text-slate-300 leading-relaxed">
                    The absence of technological noise to ensure deep-brain silence.
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="font-semibold text-amber-300">4. Geological Resonance</p>
                  <p className="text-slate-300 leading-relaxed">
                    The mineral profile of the local soil and water (Ojas-factor).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default GeoWellnessCenter;

