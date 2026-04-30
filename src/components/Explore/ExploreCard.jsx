export default function ExploreCard({ item }) {
  const Wrapper = ({ children }) => {
    if (item.pdf) {
      return (
        <a
          href={item.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {children}
        </a>
      );
    }

    if (item.link) {
      return (
        <a href={item.link} className="block">
          {children}
        </a>
      );
    }

    return <>{children}</>;
  };

  return (
    <Wrapper>
      <div className="relative rounded-[30px] overflow-hidden shadow-xl group cursor-pointer">

        {/* IMAGE */}
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-[400px] object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        />

        {/* OVERLAY */}
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
    </Wrapper>
  );
}