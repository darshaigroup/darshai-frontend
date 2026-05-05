import { useNavigate } from "react-router-dom";

export default function ExploreCard({ item }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!item.pdf) return;

    // 🔥 Extract filename safely
    let fileName = item.pdf;

    // Remove full URL if exists
    if (fileName.includes("/")) {
      fileName = fileName.split("/").pop();
    }

    // Remove extension
    fileName = fileName.replace(".pdf", "");

    // Navigate to flipbook route
    navigate(`/pdf/${fileName}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative rounded-[30px] overflow-hidden shadow-xl group cursor-pointer"
    >
      {/* IMAGE */}
      <img
        src={item.img}
        alt={item.title}
        className="w-full h-[400px] object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-700" />

      {/* TEXT */}
      <div className="absolute bottom-6 left-6 text-white opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">
        <h3 className="text-2xl font-serif">{item.title}</h3>
        <p className="text-sm">{item.desc}</p>
      </div>
    </div>
  );
}