import { Link, useParams } from "react-router-dom";

import { programData } from "./programData";

export default function ProgramDetail() {
  const { slug } = useParams();

  const program = programData.find((item) => item.slug === slug);

  if (!program) return null;

  return (
    <div className="bg-[#f6f3ef] min-h-screen">
      {/* HERO */}
      <section className="relative h-[65vh] overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top right, rgba(30,122,58,0.82), rgba(23,78,166,0.55), rgba(0,0,0,0.45))",
          }}
        />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
          <p className="text-[11px] tracking-[0.4em] uppercase text-[#C9A75B] mb-6">
            {program.tag}
          </p>

          <h1 className="text-[48px] md:text-[90px] leading-[0.95] tracking-[-0.04em] font-serif mb-8 max-w-6xl">
            {program.title}
          </h1>

          <p className="text-lg md:text-2xl text-white/80 leading-[1.9] max-w-4xl">
            {program.description}
          </p>
        </div>
      </section>

      {/* IMAGE */}

      {/* CONTENT */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <p className="text-[11px] tracking-[0.35em] uppercase text-[#C9A75B] mb-8">
          DARSHAI PROTOCOL
        </p>

        <h2 className="text-4xl md:text-6xl font-serif text-[#1E7A3A] leading-tight mb-12">
          {program.quote}
        </h2>

        <div className="space-y-10">
          <p className="text-lg md:text-xl leading-[2.1] text-[#1E7A3A]/75 border-l border-[#174EA6]/20 pl-8 italic whitespace-pre-line">
            {program.content}
          </p>

          {/* FEATURES */}
          <div className="grid md:grid-cols-2 gap-6 pt-10">
            {program.features.map((feature, i) => (
              <div
                key={i}
                className="p-8 rounded-[28px] bg-white border border-[#1E7A3A]/10 shadow-[0_15px_50px_rgba(0,0,0,0.05)]"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#1E7A3A] text-white flex items-center justify-center text-lg">
                    ✦
                  </div>

                  <div>
                    <p className="text-[#1E7A3A] text-lg leading-[1.8]">
                      {feature}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BUTTONS */}
        {/* BUTTONS */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-24">
          {/* CONFIRM BUTTON */}
          <Link to="/register">
            <button
              className="
        relative

        overflow-hidden

        px-12
        py-5

        rounded-full

        bg-[#1E7A3A]

        text-white

        text-[11px]
        md:text-[12px]

        tracking-[0.38em]
        uppercase

        shadow-[0_25px_70px_rgba(30,122,58,0.28)]

        border
        border-white/10

        backdrop-blur-xl

        transition-all
        duration-500

        hover:scale-[1.02]
      "
            >
              {/* GOLD LIGHT */}
              <div
                className="
          absolute
          inset-0

          opacity-30
        "
                style={{
                  background:
                    "linear-gradient(to right, rgba(201,167,91,0.28), transparent, rgba(201,167,91,0.15))",
                }}
              />

              <span className="relative z-10">Confirm Registration</span>
            </button>
          </Link>

          {/* BACK BUTTON */}
          <Link to="/program">
            <button
              className="
        relative

        overflow-hidden

        px-12
        py-5

        rounded-full

        border
        border-[#1E7A3A]/15

        bg-white/70
        backdrop-blur-xl

        text-[#1E7A3A]

        text-[11px]
        md:text-[12px]

        tracking-[0.38em]
        uppercase

        shadow-[0_15px_50px_rgba(0,0,0,0.05)]

        transition-all
        duration-500

        hover:bg-white
      "
            >
              {/* SOFT GLOW */}
              <div
                className="
          absolute
          inset-0

          opacity-20
        "
                style={{
                  background:
                    "linear-gradient(to right, rgba(201,167,91,0.12), transparent)",
                }}
              />

              <span className="relative z-10">Back to Wellness Program</span>
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
