import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { ArrowLeft,ArrowRight } from "lucide-react";
import ReviewCard from "@/components/onboarding/ReviewCard";
import { saveLifestyleMatrix } from "@/services/onboardingService";

export default function Review(){
  const navigate=useNavigate();
  const {state}=useLocation();

  const answers=state?.answers||{};
  const step=state?.step||0;
  const [loading,setLoading]=useState(false);

  const handleGenerate=async()=>{

    setLoading(true);

    const res=await saveLifestyleMatrix(answers);

    setLoading(false);

    if(!res.success){
      alert(res.message||"Unable to save lifestyle questionnaire.");
      return;
    }
    sessionStorage.removeItem( "lifestyleAnswers");


    navigate(
      "/lifestyle/wellness-blueprint",
      {
        replace:true,
        state:{answers}
      }
    );

  };

  return(
    <div className="min-h-screen bg-[#F4EFE6] py-6 sm:py-8 lg:py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-3xl lg:rounded-[48px] p-5 sm:p-7 md:p-8 lg:p-10 shadow-[0_30px_100px_rgba(0,0,0,.08)]">

          <h1 className="font-serif text-[#173C68] text-3xl sm:text-4xl lg:text-5xl mb-3">
            Your Wellness Profile
          </h1>

          <p className="text-slate-500 text-sm sm:text-base mb-8 sm:mb-10">
            Review your wellness preferences before generating your personalized wellness blueprint.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {Object.entries(answers).map(([key,value])=>(
              <ReviewCard
                key={key}
                title={key.replaceAll("_"," ")}
                value={Array.isArray(value)?value.join(", "):value}
              />
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">

            <button
              onClick={()=>
                navigate(
                  "/lifestyle/onboard",
                  {
                    state:{answers,step}
                  }
                )
              }
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-slate-300 hover:border-[#1E7A3A] hover:text-[#1E7A3A] transition"
            >
              <ArrowLeft size={18}/>
              Back
            </button>

            <button
              disabled={loading}
              onClick={handleGenerate}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-3 rounded-full bg-[#1E7A3A] text-white hover:bg-[#14532d] disabled:opacity-60 disabled:cursor-not-allowed transition shadow-lg"
            >
              {loading?"Generating...":"Generate Blueprint"}
              {!loading&&<ArrowRight size={18}/>}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}