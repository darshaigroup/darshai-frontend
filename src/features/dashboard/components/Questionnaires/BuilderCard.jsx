const BuilderCard = () => {
  return (
    <div className="bg-[#1E2F4D] text-white rounded-[32px] p-8 flex flex-col items-center justify-center text-center">

      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 text-2xl">
        +
      </div>

      <h3 className="text-lg font-semibold mb-2">
        Form Builder
      </h3>

      <p className="text-sm text-gray-300 mb-6">
        Create custom AI-enhanced questionnaires for specific patient needs.
      </p>

      <button className="px-6 py-2 rounded-full bg-white text-[#1E2F4D]">
        Launch Builder
      </button>

    </div>
  );
};

export default BuilderCard;