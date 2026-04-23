const StatCard = ({ title, value, icon, color }) => {
  return (
    <div
      className={`rounded-2xl p-5 text-white shadow-lg ${color} flex justify-between items-center`}
    >
      <div>
        <p className="text-sm opacity-80">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>

      <div className="text-3xl opacity-80">{icon}</div>
    </div>
  );
};

export default StatCard;