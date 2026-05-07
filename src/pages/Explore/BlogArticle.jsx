import { useParams } from "react-router-dom";
import { blogData } from "./Blog";

export default function BlogArticle() {
  const { slug } = useParams();

  const article = blogData.find(
    (item) => item.slug === slug
  );

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="bg-[#f6f3ef] min-h-screen">

      {/* HERO */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={article.img}
          alt={article.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-7xl font-serif text-white max-w-5xl leading-tight">
            {article.title}
          </h1>
        </div>
      </section>

      {/* ARTICLE */}
      <section className="max-w-4xl mx-auto px-6 py-24">

        <p className="text-lg leading-[2.1] text-[#1E293B] whitespace-pre-line">
          {article.content}
        </p>

      </section>
    </div>
  );
}