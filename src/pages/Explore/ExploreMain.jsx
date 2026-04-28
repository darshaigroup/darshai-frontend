import { useParams } from "react-router-dom";

import ExploreHero from "@/components/Explore/ExploreHero";
import ExploreGrid from "@/components/Explore/ExploreGrid";

import { videoData } from "./Video";
import { imageData } from "./Image";
import { brochureData } from "./Brochure";
import { blogData } from "./Blog";
import { journalData } from "./Journal";

import videoImg from "@/assets/images/logoEffect.gif";
import imageImg from "@/assets/images/watch.jpg";

const HERO = {
  all: videoImg,
  video: videoImg,
  image: imageImg,
  brochure: imageImg,
  blog: imageImg,
  journal: imageImg,
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
      <ExploreGrid data={getData()} />
    </div>
  );
}