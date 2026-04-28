import hero from "@/assets/images/DoctorHomepage.jpg";
import brain from "@/assets/images/dosha.jpg";
import herb from "@/assets/images/herb.jpg";
import Protocol from "./protocol.jsx";

const brandGreen = "#1E7A3A";

const OurStory = () => {
  return (
    <div className="bg-[#f6f3ef] text-gray-800 overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">

        {/* IMAGE */}
        <img
          src={hero}
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: brandGreen, opacity: 0.75 }}
        />

        {/* CONTENT */}
        <div className="relative z-10 text-white max-w-3xl px-6">

          <div className="mb-6 flex justify-center">
            <span className="text-[11px] tracking-[4px] text-[#C6A75E] px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
              THE GENESIS
            </span>
          </div>

          <h1 className="text-[42px] md:text-[72px] font-serif mb-6 leading-[1.05] tracking-[-0.02em]">
            Why DARSHAI Exists
          </h1>

          <p className="text-lg opacity-90 font-light">
            Bridging 5,000 years of wisdom with 21st-century biomarker science.
          </p>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div className="space-y-6">
          <p className="text-xs tracking-[3px] text-yellow-700">
            THE PHILOSOPHY
          </p>

          <h2
            className="text-[42px] md:text-[72px] font-serif leading-[1.05]"
            style={{ color: brandGreen }}
          >
            The Science of Sovereignty
          </h2>

          <p className="text-[#1E7A3A]/70 text-lg font-light">
            Most wellness companies ask you to "relax."
            <span className="font-semibold" style={{ color: brandGreen }}>
              {" "}DARSHI asks you to reclaim.
            </span>
          </p>

          <p className="text-[#1E7A3A]/70 text-lg font-light">
            We founded DARSHAI because we noticed a dangerous gap in modern health.
          </p>

          <p className="text-[#1E7A3A]/70 text-lg font-light">
            We saw high-performers burnout not because they lacked ambition.
          </p>
        </div>

        {/* RIGHT IMAGE (HOVER EFFECT KEPT) */}
        <div className="rounded-[40px] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.15)] group relative">

          <img
            src={brain}
            alt="wellness"
            className="w-full h-[500px] object-cover transition-all duration-[1200ms] group-hover:scale-110"
          />

          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700"
            style={{
              background:
                "linear-gradient(to top, rgba(30,122,58,0.85), rgba(30,122,58,0.4), transparent)",
            }}
          />
        </div>
      </section>

      {/* BRAIN TRUST */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-6">
          <p className="text-xs tracking-[3px] text-yellow-700">
            OUR LEADER
          </p>
        </div>

        <h2
          className="text-[42px] md:text-[72px] font-serif text-center mb-20"
          style={{ color: brandGreen }}
        >
          The Brain Trust
        </h2>

        <div className="grid md:grid-cols-2 gap-16">

          {/* CARD */}
          {[{
            name: "Veekshitha V",
            role: "FOUNDER & CEO"
          },{
            name: "Dr Renjith N Raj",
            role: "FOUNDER & CEO"
          }].map((person, i) => (
            <div key={i} className="group">
              <div className="rounded-[40px] overflow-hidden relative shadow-xl">

                <img
                  src="/images/founder.jpg"
                  alt="founder"
                  className="w-full h-[500px] object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1200ms]"
                />

                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(30,122,58,0.9), transparent)"
                  }}
                />

                <div className="absolute bottom-8 left-8 text-white">
                  <h4 className="text-2xl font-serif">{person.name}</h4>
                  <p className="text-xs tracking-[4px] text-yellow-400">
                    {person.role}
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* FINAL BLOCK */}
      <section className="max-w-5xl mx-auto px-6 pb-24">

        <div className="rounded-[40px] overflow-hidden relative shadow-[0_50px_120px_rgba(0,0,0,0.4)]">

          <img
            src={herb}
            alt="herb"
            className="w-full h-[520px] object-cover"
          />

          <div
            className="absolute inset-0"
            style={{ backgroundColor: brandGreen, opacity: 0.85 }}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">

            <p className="text-xs tracking-[4px] text-[#C6A75E] mb-6 uppercase">
              Our North Star
            </p>

            <h2 className="text-[32px] md:text-[64px] font-serif leading-[1.1] max-w-4xl">
              To restore biological sovereignty through the{" "}
              <span className="italic">
                fusion of ancient ecology and modern AI.
              </span>
            </h2>

            <p className="mt-6 text-sm md:text-lg text-white/80 max-w-2xl">
              We solve the crisis of modern burnout by recalibrating the human system at its architectural foundation.
            </p>

          </div>
        </div>
      </section>

      {/* BIO LUXURY */}
      <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        <h3 className="text-3xl font-serif text-yellow-700">
          Bio-Luxury
        </h3>

        <p className="text-xs tracking-[4px] text-yellow-600 mt-2">
          A NEW CATEGORY
        </p>
      </div>

      <Protocol />
    </div>
  );
};

export default OurStory;