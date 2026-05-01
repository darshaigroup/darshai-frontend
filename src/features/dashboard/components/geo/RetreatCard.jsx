const RetreatCard = ({ item }) => {
  return (
    <div className="bg-cardBg rounded-[32px] shadow-soft overflow-hidden">

      {/* Image */}
      <div className="relative">
        <img
          src={item.image}
          className="w-full h-48 object-cover"
        />

        <span className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs shadow">
          ⭐ {item.rating}
        </span>

        <span className="absolute bottom-3 left-3 bg-accent text-white text-xs px-3 py-1 rounded-full">
          {item.tag}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-2">

        <h3 className="font-semibold text-primary">
          {item.name}
        </h3>

        <p className="text-xs text-gray-500">
          📍 {item.location}
        </p>

        <p className="text-sm text-gray-600">
          {item.description}
        </p>

        <button className="mt-3 w-full py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm">
          View Details
        </button>

      </div>
    </div>
  );
};

export default RetreatCard;