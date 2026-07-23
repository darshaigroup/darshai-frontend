import GeoHeader from "../../geo/GeoHeader";
import RetreatCard from "../../geo/RetreatCard";
import PlacementTable from "../../geo/PlacementTable";
import { retreats, placements } from "../../../data/geoData";

const GeoWellness = () => {
  return (
    <div className="space-y-8">

      <GeoHeader />

      {/* Retreats */}
      <div>
        <h2 className="mb-4 font-semibold text-primary">
          Available Retreats
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {retreats.map((item, i) => (
            <RetreatCard key={i} item={item} />
          ))}
        </div>
      </div>

      {/* Placements */}
      <PlacementTable data={placements} />

    </div>
  );
};

export default GeoWellness;