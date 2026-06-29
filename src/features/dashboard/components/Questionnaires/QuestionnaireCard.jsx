const QuestionnaireCard = ({ data }) => {
  const colors = {
    Risk:"bg-red-50 text-red-600",
    Ayurveda:"bg-emerald-50 text-emerald-600",
    Clinical:"bg-blue-50 text-blue-600",
    Lifestyle:"bg-violet-50 text-violet-600"
  };

  return (
    <div
      className="
        bg-white/90 backdrop-blur
        rounded-[28px]
        p-6
        shadow-[0_10px_30px_rgba(0,0,0,0.05)]
        hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]
        hover:-translate-y-1
        transition-all duration-300
      "
    >
      <div className="flex justify-between items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-[#E8F5EC] flex items-center justify-center text-[#1E7A3A]">
          ✔
        </div>

        <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-medium text-gray-600">
          {data.duration}
        </span>
      </div>

      <h3 className="text-[18px] font-semibold text-[#1E293B]">
        {data.title}
      </h3>

      <p className="text-sm text-gray-500 mt-2">
        {data.description}
      </p>

      <span
        className={`
          inline-block mt-4 px-3 py-1 rounded-full text-xs font-medium
          ${colors[data.category]}
        `}
      >
        {data.category}
      </span>

      <button
        className="
          mt-6 w-full py-2.5 rounded-full
          bg-[#F3F5F4]
          hover:bg-[#E8ECEA]
          text-sm font-medium
          transition
        "
      >
        Start Assessment →
      </button>
    </div>
  );
};

export default QuestionnaireCard;