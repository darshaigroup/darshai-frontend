import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

/* ✅ IMPORT LOCAL IMAGES */
import videoImg from "@/assets/images/logoEffect.gif";
import imageImg from "@/assets/images/watch.jpg";
import brochureImg from "@/assets/images/watch.jpg";
import blogImg from "@/assets/images/watch.jpg";

const CATEGORIES = [
  { id: "all", name: "All", img: videoImg },
  { id: "video", name: "Video", img: videoImg },
  { id: "image", name: "Image", img: imageImg },
  { id: "brochure", name: "Brochure", img: brochureImg },
  { id: "blog", name: "Blog", img: blogImg },
];

const CONTENT = [
  {
    id: 1,
    title: "Digital Brain",
    category: "video",
    img: videoImg,
    desc: "AI monitoring biomarkers."
  },
  {
    id: 2,
    title: "Bio-Luxury Retreat",
    category: "image",
    img: imageImg,
    desc: "Visual highlights."
  },
  {
    id: 3,
    title: "Protocol Guide",
    category: "brochure",
    img: brochureImg,
    desc: "Download system."
  },
  {
    id: 4,
    title: "Burnout Blog",
    category: "blog",
    img: blogImg,
    desc: "Modern burnout solution."
  },
];

export default function Explore() {
  const { category } = useParams();
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    setActiveCategory(category || "all");
  }, [category]);

  const currentCat =
    CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];

  const filteredContent =
    activeCategory === "all"
      ? CONTENT
      : CONTENT.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-[#f6f3ef] min-h-screen">

      {/* HERO (STATIC — NO ANIMATION) */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0">
          <img
            src={currentCat.img}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-[#1E7A3A]/75 backdrop-blur-sm" />
        </div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl text-white font-serif mb-4 capitalize">
            {currentCat.name}
          </h1>
        </div>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {filteredContent.map((item) => (
            <div
              key={item.id}
              className="relative rounded-[30px] overflow-hidden shadow-xl group cursor-pointer"
            >
              {/* IMAGE */}
              <img
                src={item.img}
                className="w-full h-[400px] object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />

              {/* GREEN OVERLAY */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700"
                style={{
                  background:
                    "linear-gradient(to top, rgba(30,122,58,0.9), rgba(30,122,58,0.4), transparent)",
                }}
              />

              {/* TEXT */}
              <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">
                <h3 className="text-2xl font-serif">{item.title}</h3>
                <p className="text-sm opacity-80">{item.desc}</p>
              </div>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
}