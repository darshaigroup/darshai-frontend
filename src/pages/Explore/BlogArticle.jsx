import { useParams } from "react-router-dom";
import { blogData } from "./Blog";

const brandGreen = "#1E7A3A";
const brandBlue = "#174EA6";
const brandGold = "#C9A75B";

export default function BlogArticle() {
  const { slug } = useParams();

  const article = blogData.find(
    (item) => item.slug === slug
  );

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="bg-[#f6f3ef] min-h-screen overflow-hidden">
      {/* HERO */}
      <section className="relative h-[75vh] overflow-hidden">
        <img
          src={article.img}
          alt={article.title}
          className="w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(23,78,166,0.82), rgba(0,0,0,0.35), rgba(0,0,0,0.15))",
          }}
        />

        {/* CONTENT */}
        <div className="absolute inset-0 flex items-center justify-center text-center">
  <div className="max-w-6xl px-6">
    

    {/* TITLE */}
    <h1 className="text-[42px] md:text-[82px] leading-[0.95] tracking-[-0.04em] font-serif text-white max-w-5xl mx-auto mb-8">
      {article.title}
    </h1>

    {/* DESC */}
    <p className="text-lg md:text-2xl text-white/80 max-w-3xl leading-[1.8] mx-auto">
      {article.desc}
    </p>
  </div>
</div>
      </section>

      {/* ARTICLE BODY */}
      <section className="relative py-28">
  <div className="max-w-5xl mx-auto px-6">
    {/* INTRO */}
    <div className="mb-28 text-center">
      <p
        className="text-[24px] md:text-[34px] leading-[1.9] font-light max-w-4xl mx-auto"
        style={{ color: "#1E7A3A" }}
      >
        {article.intro}
      </p>
    </div>

    {/* ARTICLE SECTIONS */}
    <div className="space-y-32">
      {article.sections.map((section, i) => (
        <div
          key={i}
          className="max-w-4xl mx-auto"
        >
          {/* SECTION TAG */}
          <p className="text-[18px] tracking-[0.35em] uppercase text-[#C9A75B] mb-5 text-center">
            {section.tag}
          </p>

          {/* HEADING */}
          <h2
            className="text-[38px] md:text-[62px] leading-[1.02] tracking-[-0.03em] font-serif mb-12 text-center"
            style={{ color: brandGreen }}
          >
            {section.heading}
          </h2>

          {/* TEXT */}
          <div className="space-y-8">
            {section.paragraphs.map((para, idx) => (
              <p
                key={idx}
                className="text-[18px] md:text-[21px] leading-[2.1] text-justify"
                style={{ color: "#1E7A3A" }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* QUOTE */}
          {section.quote && (
            <div className="my-24 max-w-3xl mx-auto">
              <div className="border-l-2 border-[#174EA6]/30 pl-8">
                <p className="text-[28px] md:text-[42px] italic leading-[1.6] text-[#C9A75B] font-serif">
                  “{section.quote}”
                </p>
              </div>
            </div>
          )}

          {/* TABLE */}
          {section.table && (
            <div className="mt-20 overflow-hidden rounded-[32px] border border-[#174EA6]/10 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.06)]">
              <table className="w-full">
                <thead className="bg-[#174EA6]/8">
                  <tr>
                    {section.table.headers.map((head, idx) => (
                      <th
                        key={idx}
                        className="text-left px-8 py-6 text-sm uppercase tracking-[0.25em] text-[#174EA6]"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {section.table.rows.map((row, idx) => (
                    <tr
                      key={idx}
                      className="border-t border-[#174EA6]/8"
                    >
                      {row.map((cell, cellIdx) => (
                        <td
                          key={cellIdx}
                          className="px-8 py-6 text-[#1E293B] leading-relaxed"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* LIST */}
          {section.list && (
            <div className="mt-14 space-y-6 max-w-3xl mx-auto">
              {section.list.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4"
                >
                  <div className="w-2 h-2 rounded-full bg-[#174EA6] mt-4" />

                  <p
                    className="text-[18px] leading-[1.9]"
                    style={{ color: "#1E7A3A" }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>

    {/* CONCLUSION */}
    <div className="mt-36 pt-24 border-t border-[#174EA6]/10 max-w-4xl mx-auto text-center">
      <p className="text-[34px] md:text-[56px] leading-[1.25] font-serif italic text-[#C9A75B] mb-12">
        “The medicine of tomorrow will not wait for you to fall sick.”
      </p>

      <p
        className="text-[20px] md:text-[22px] leading-[2.1]"
        style={{ color: "#1E7A3A" }}
      >
        {article.conclusion}
      </p>
    </div>
  </div>
</section>
    </div>
  );
}