import { useLocation,useNavigate } from "react-router-dom";
import ReviewCard from "@/components/onboarding/ReviewCard";

export default function Review() {
  const navigate=useNavigate();
  const { state }=useLocation();

  const answers=state?.answers||{};

  return (
    <div className="min-h-screen bg-[#F4EFE6] py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-[48px] p-10 shadow-[0_30px_100px_rgba(0,0,0,0.08)]">
          <h1 className="text-5xl font-serif text-[#173C68] mb-3">
            Your Wellness Profile
          </h1>

          <p className="text-slate-500 mb-10">
            Review your wellness preferences before generating your blueprint.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(answers).map(([key,value])=>(
              <ReviewCard
                key={key}
                title={key.replaceAll("_"," ")}
                value={Array.isArray(value)?value.join(", "):value}
              />
            ))}
          </div>

          <div className="flex justify-end mt-10">
            <button
              onClick={()=>navigate("/lifestyle/wellness-blueprint",{ state:{ answers } })}
              className="px-10 py-4 rounded-full bg-[#1E7A3A] text-white hover:bg-[#14532d] transition-all"
            >
              Generate Blueprint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}