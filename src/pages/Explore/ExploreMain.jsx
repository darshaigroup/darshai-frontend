import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ✅ IMPORT LOCAL IMAGES */
import videoImg from "../../assets/images/logoEffect.gif";
import imageImg from "../../assets/images/watch.jpg";
import brochureImg from "../../assets/images/watch.jpg";
import blogImg from "../../assets/images/watch.jpg";

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
    <div className="bg-[#F1ECE2] min-h-screen">

      {/* HERO */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={currentCat.img}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-[#1E7A3A]/75 backdrop-blur-sm" />
          </motion.div>
        </AnimatePresence>

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
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              className="relative rounded-[30px] overflow-hidden shadow-xl group"
            >
              <img
                src={item.img}
                className="w-full h-[400px] object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1E7A3A]/90 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-serif">{item.title}</h3>
                <p className="text-sm opacity-80">{item.desc}</p>
              </div>
            </motion.div>
          ))}

        </div>
      </section>
    </div>
  );
}