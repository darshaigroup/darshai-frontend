const GeoHeader = () => {
  return (
    <div className="flex justify-between items-start">

      <div>
        <h1 className="text-3xl font-semibold text-primary">
          Geo Wellness Centers
        </h1>
        <p className="text-gray-500">
          Curated luxury wellness retreats and patient placements
        </p>
      </div>

      <div className="flex gap-3">
       

        <button className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow">
          Add New Center
        </button>
      </div>

    </div>
  );
};

export default GeoHeader;