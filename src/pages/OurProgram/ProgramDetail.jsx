import { Link, useParams } from "react-router-dom";

import { programData } from "./programData";

export default function ProgramDetail() {
  const { slug } = useParams();

  const program = programData.find(
    (item) => item.slug === slug
  );

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

        {/* PREMIUM OVERLAY */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top right, rgba(30,122,58,0.82), rgba(23,78,166,0.55), rgba(0,0,0,0.45))",
          }}
        />

        {/* HERO CONTENT */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">

          <div className="mb-6 flex justify-center">

            <span className="text-[11px] tracking-[4px] text-[#d1c957] px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgba(255,255,255,0.08)]">
              {program.tag}
            </span>

          </div>

          <h1 className="text-[48px] md:text-[90px] leading-[0.95] tracking-[-0.04em] font-serif mb-8 max-w-6xl">
            {program.title}
          </h1>

          <p className="text-lg md:text-2xl text-white/80 leading-[1.9] max-w-4xl">
            {program.description}
          </p>

        </div>

      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-24">

        {/* LABEL */}
        <div className="flex justify-center mb-8">

          <span className="text-[11px] tracking-[0.38em] uppercase text-[#C9A75B] px-6 py-2 rounded-full bg-[#1E7A3A]/5 border border-[#1E7A3A]/10">
            DARSHAI PROTOCOL
          </span>

        </div>

        {/* QUOTE */}
        <h2 className="text-4xl md:text-6xl font-serif text-[#1E7A3A] text-center leading-tight mb-14">
          {program.quote}
        </h2>

        {/* DESCRIPTION */}
        <div className="max-w-5xl mx-auto">

          <p className="text-lg md:text-xl leading-[2.1] text-[#1E7A3A]/75 text-center whitespace-pre-line">
            {program.content}
          </p>

        </div>

        {/* PROGRAMME INCLUDES */}
        <div className="mt-24">

          <div className="flex items-center justify-center mb-6">

            <span className="text-[11px] tracking-[0.38em] uppercase text-[#C9A75B] px-6 py-2 rounded-full bg-[#1E7A3A]/5 border border-[#1E7A3A]/10">
              Programme Includes
            </span>

          </div>

          <h3 className="text-3xl md:text-5xl font-serif text-[#1E7A3A] text-center leading-tight mb-14">
            Precision Wellness
            <br />
            Interventions
          </h3>

          <div className="grid md:grid-cols-2 gap-6">

            {program.programmeIncludes.map((item, i) => (

              <div
                key={i}
                className="group relative overflow-hidden rounded-[30px] bg-white border border-[#1E7A3A]/10 p-8 shadow-[0_15px_50px_rgba(0,0,0,0.05)]"
              >

                {/* PREMIUM OVERLAY */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700"
                  style={{
                    background:
                      "linear-gradient(to top right, rgba(30,122,58,0.82), rgba(23,78,166,0.55), rgba(0,0,0,0.18))",
                  }}
                />

                {/* CONTENT */}
                <div className="relative z-10 flex items-start gap-5">

                  {/* ICON */}
                  <div className="w-14 h-14 rounded-2xl bg-[#1E7A3A] flex items-center justify-center text-white text-xl shadow-[0_10px_30px_rgba(30,122,58,0.22)] group-hover:bg-white group-hover:text-[#174EA6] transition-all duration-500">
                    ✦
                  </div>

                  {/* TEXT */}
                  <div>

                    <p className="text-[#1E7A3A] text-lg leading-[1.8] group-hover:text-white transition-all duration-500">
                      {item}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* BENEFITS */}
        <div className="mt-28">

          <div className="flex items-center justify-center mb-6">

            <span className="text-[11px] tracking-[0.38em] uppercase text-[#C9A75B] px-6 py-2 rounded-full bg-[#1E7A3A]/5 border border-[#1E7A3A]/10">
              Benefits
            </span>

          </div>

          <h3 className="text-3xl md:text-5xl font-serif text-[#1E7A3A] text-center leading-tight mb-14">
            Measurable
            <br />
            Biological Outcomes
          </h3>

          <div className="grid md:grid-cols-2 gap-6">

            {program.benefits.map((benefit, i) => (

              <div
                key={i}
                className="group relative overflow-hidden rounded-[30px] bg-white border border-[#1E7A3A]/10 p-8 shadow-[0_15px_50px_rgba(0,0,0,0.05)]"
              >

                {/* PREMIUM OVERLAY */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700"
                  style={{
                    background:
                      "linear-gradient(to top right, rgba(30,122,58,0.82), rgba(23,78,166,0.55), rgba(0,0,0,0.18))",
                  }}
                />

                {/* CONTENT */}
                <div className="relative z-10 flex items-start gap-5">

                  {/* ICON */}
                  <div className="w-14 h-14 rounded-2xl bg-[#1E7A3A] flex items-center justify-center text-white text-xl shadow-[0_10px_30px_rgba(30,122,58,0.22)] group-hover:bg-white group-hover:text-[#174EA6] transition-all duration-500">
                    ✦
                  </div>

                  {/* TEXT */}
                  <div>

                    <p className="text-[#1E7A3A] text-lg leading-[1.8] group-hover:text-white transition-all duration-500">
                      {benefit}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* BUTTONS */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-24">

          {/* CONFIRM */}
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
              "
            >

              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    "linear-gradient(to right, rgba(201,167,91,0.28), transparent, rgba(201,167,91,0.15))",
                }}
              />

              <span className="relative z-10">
                Confirm Registration
              </span>

            </button>

          </Link>

          {/* BACK */}
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
              "
            >

              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background:
                    "linear-gradient(to right, rgba(201,167,91,0.12), transparent)",
                }}
              />

              <span className="relative z-10">
                Back to Wellness Program
              </span>

            </button>

          </Link>

        </div>

      </section>

    </div>
  );
}