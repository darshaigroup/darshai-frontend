const QuestionnaireCard = ({ data }) => {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition">

      {/* Duration */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
          {data.duration}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-lg text-[#1E293B]">
        {data.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 mt-1">
        {data.description}
      </p>

      {/* Category */}
      <span className="inline-block mt-3 text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
        {data.category}
      </span>

      {/* Button */}
      <button className="mt-5 w-full py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm">
        Assign to Patient →
      </button>
    </div>
  );
};

export default QuestionnaireCard;