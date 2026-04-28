export default function ExploreHero({ title, image }) {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={image}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1E7A3A]/75 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-7xl text-white font-serif capitalize">
          {title}
        </h1>
      </div>
    </section>
  );
}