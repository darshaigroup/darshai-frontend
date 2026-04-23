const StatCard = ({ title, value, icon, change, color }) => {
  return (
   <div className="bg-white rounded-[28px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
      
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>

        <h2 className="text-3xl font-semibold text-[#1E293B] mt-2">
          {value}
        </h2>

        <span
          className={`text-xs mt-2 inline-block px-2 py-1 rounded-full ${
            change > 0
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-500"
          }`}
        >
          {change > 0 ? "+" : ""}
          {change}%
        </span>
      </div>

      <div className={`text-2xl ${color} opacity-80`}>
        {icon}
      </div>
    </div>
  );
};

export default StatCard;