const InsightCard = ({ title, value, change }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
      <p className="text-green-500 text-sm">{change}</p>
    </div>
  );
};

export default InsightCard;