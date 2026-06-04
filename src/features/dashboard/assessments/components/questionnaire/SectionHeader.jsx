const SectionHeader = ({ title, description }) => {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold text-gray-800">
        {title}
      </h2>

      {description && (
        <p className="text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;