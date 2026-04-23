const ReportCard = ({ title, value, color }) => {
  return (
    <div className={`p-4 rounded-2xl shadow-md text-white ${color}`}>
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
};

export default ReportCard;