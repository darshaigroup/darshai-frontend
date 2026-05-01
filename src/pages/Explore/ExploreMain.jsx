import { useParams } from "react-router-dom";

import ExploreHero from "@/components/Explore/ExploreHero";
import ExploreGrid from "@/components/Explore/ExploreGrid";


import { videoData } from "./Video";
import { imageData } from "./Image";
import { brochureData } from "./Brochure";
import { blogData } from "./Blog";
import { journalData } from "./Journal";

/* ✅ Use public paths instead of imports */
const HERO = {
  all: "/assets/images/logoEffect.gif",
  video: "/assets/images/logoEffect.gif",
  image: "/assets/images/watch.jpg",
  brochure: "/assets/images/watch.jpg",
  blog: "/assets/images/watch.jpg",
  journal: "/assets/images/watch.jpg",
};

export default function ExploreMain() {
  const { category = "all" } = useParams();

  const getData = () => {
    switch (category) {
      case "video":
        return videoData;
      case "image":
        return imageData;
      case "brochure":
        return brochureData;
      case "blog":
        return blogData;
      case "journal":
        return journalData;
      default:
        return [
          ...videoData,
          ...imageData,
          ...brochureData,
          ...blogData,
          ...journalData,
        ];
    }
  };

  return (
    <div className="bg-[#f6f3ef] min-h-screen">
      <ExploreHero title={category} image={HERO[category]} />
      {category === "journal" && (
  <div className="max-w-7xl mx-auto px-6 mt-12 flex justify-center">

  <a
    href="/pdfs/longevity-journal.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#C9A75B]/40 bg-white/10 backdrop-blur-md text-[#1E7A3A] font-serif text-lg md:text-xl overflow-hidden transition duration-500 hover:border-[#C9A75B]"
  >

    {/* 🔥 subtle glow pulse */}
    <span className="absolute inset-0 rounded-full bg-[#C9A75B]/10 opacity-0 group-hover:opacity-100 transition duration-700 animate-pulse" />

    {/* TEXT */}
    <span className="relative z-10">
      Open Your Sovereignty Guidebook
    </span>

    {/* 👉 CLICK HERE (animated) */}
    <span className="relative z-10 text-sm tracking-wide text-[#C9A75B] opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition duration-500">
      Click here
    </span>

    {/* ➡️ ARROW */}
    <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-2">
      →
    </span>

  </a>

</div>
)}
      <ExploreGrid data={getData()} />
    </div>
  );
}