const QuestionnaireCard = ({ data }) => {
  return (
    <div className="bg-white/90 backdrop-blur rounded-[28px] p-6 
    shadow-[0_10px_30px_rgba(0,0,0,0.05)] 
    hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]
    transition-all duration-300">

      {/* Top Row */}
      <div className="flex justify-between items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-[#E8F5EC] flex items-center justify-center text-[#1E7A3A]">
          ✔
        </div>

        <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-medium text-gray-600">
          {data.duration}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-[18px] font-semibold text-[#1E293B] leading-snug">
        {data.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 mt-2 leading-relaxed">
        {data.description}
      </p>

      {/* Tag */}
      <span className="inline-block mt-4 text-xs bg-[#E8F5EC] text-[#1E7A3A] px-3 py-1 rounded-full">
        {data.category}
      </span>

      {/* Button */}
      <button className="mt-6 w-full py-2.5 rounded-full bg-[#F3F5F4] 
      hover:bg-[#E8ECEA] text-sm font-medium transition">
        Assign to Patient →
      </button>
    </div>
  );
};

export default QuestionnaireCard;