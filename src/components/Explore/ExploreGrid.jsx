import ExploreCard from "./ExploreCard";

export default function ExploreGrid({
  data,
  category,
}) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.map((item) => (
          <ExploreCard
            key={item.id}
            item={item}
            category={category}
          />
        ))}
      </div>
    </section>
  );
}