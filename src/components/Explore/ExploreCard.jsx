import { useNavigate } from "react-router-dom";

export default function ExploreCard({
  item,
  category,
}) {
  const navigate = useNavigate();

  const handleClick = () => {

    /*
    ✅ VIDEO PAGE
    */
    if (category === "video") {
      navigate("/coming-soon/video");
      return;
    }

    /*
    ✅ IMAGE PAGE
    */
    if (category === "image") {
      navigate("/coming-soon/image");
      return;
    }

    /*
    ✅ BLOG → ARTICLE PAGE
    */
    if (category === "blog") {
      navigate(`/blog/${item.slug}`);
      return;
    }

    /*
    ✅ BROCHURE → FLIPBOOK
    */
    if (category === "brochure") {
      if (!item.pdf) return;

      let fileName = item.pdf;

      if (fileName.includes("/")) {
        fileName = fileName.split("/").pop();
      }

      fileName = fileName.replace(".pdf", "");

      navigate(`/pdf/${fileName}`);

      return;
    }

    /*
    ✅ JOURNAL → NORMAL PDF
    */
    if (category === "journal") {
      window.open(item.pdf, "_blank");
      return;
    }
  };

  return (
    <div
      onClick={handleClick}
      className="
        relative
        rounded-[30px]
        overflow-hidden
        shadow-xl
        group
        cursor-pointer
      "
    >

      {/* IMAGE */}
      <img
        src={item.img}
        alt={item.title}
        className="
          w-full
          h-[420px]
          object-cover

          transition-all
          duration-[1400ms]
          ease-[cubic-bezier(0.16,1,0.3,1)]

          group-hover:scale-110
        "
      />

      {/* PREMIUM OVERLAY */}
      <div
        className="
          absolute inset-0

          opacity-0
          group-hover:opacity-100

          transition duration-700
        "
        style={{
          background:
            "linear-gradient(to top,rgba(23,78,166,0.92),rgba(23,78,166,0.45),transparent)",
        }}
      />

      {/* TEXT */}
      <div
        className="
          absolute bottom-6 left-6

          opacity-0
          translate-y-8

          group-hover:opacity-100
          group-hover:translate-y-0

          transition-all
          duration-700
        "
      >

        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A75B] mb-2">
          DARSHAI Archive
        </p>

        <h3 className="text-3xl font-serif text-white mb-3">
          {item.title}
        </h3>

        <p className="text-white/80 text-sm max-w-sm leading-relaxed">
          {item.desc}
        </p>

      </div>

    </div>
  );
}