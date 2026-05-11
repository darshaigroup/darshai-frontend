import { useParams } from "react-router-dom";

import ExploreHero from "@/components/Explore/ExploreHero";
import ExploreGrid from "@/components/Explore/ExploreGrid";

import { videoData } from "./Video";
import { imageData } from "./Image";
import { brochureData } from "./Brochure";
import { blogData } from "./Blog";
import { journalData } from "./Journal";

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

      {/* JOURNAL FEATURE */}
      {category === "journal" && (
        <div className="max-w-7xl mx-auto px-6 mt-12 flex justify-center">

          <a
            href="/pdfs/longevity-journal.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-4 px-8 md:px-10 py-5 rounded-full border border-[#C9A75B]/40 bg-white/20 backdrop-blur-xl overflow-hidden transition-all duration-700 hover:border-[#C9A75B] hover:scale-[1.02] shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
          >

            {/* GLOW */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700"
              style={{
                background:
                  "linear-gradient(to right, rgba(23,78,166,0.08), rgba(30,122,58,0.08))",
              }}
            />

            {/* ICON */}
            <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-[#1E7A3A] to-[#174EA6] flex items-center justify-center text-white text-lg shadow-[0_10px_30px_rgba(23,78,166,0.25)]">
              ✦
            </div>

            {/* TEXT */}
            <div className="relative z-10 flex flex-col">

              <span className="text-[11px] uppercase tracking-[0.35em] text-[#C9A75B] mb-1">
                DARSHAI Archive
              </span>

              <span className="font-serif text-lg md:text-2xl text-[#1E7A3A]">
                Open Your Sovereignty Guidebook
              </span>

            </div>

            {/* ARROW */}
            <span className="relative z-10 text-[#174EA6] text-xl transition-all duration-500 group-hover:translate-x-2">
              →
            </span>

          </a>

        </div>
      )}

    

      <ExploreGrid data={getData()} category={category} />

    </div>
  );
}