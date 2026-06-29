import { useEffect,useState } from "react";
import { useNavigate,Navigate,useLocation } from "react-router-dom";
import { Sparkles,Leaf,HeartPulse,Mountain } from "lucide-react";

export default function WellnessBlueprint() {
   const { state } = useLocation();
  const navigate = useNavigate();

  const answers = state?.answers || {};

  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const timer=setTimeout(()=>{
      setLoading(false);
    },3000);

    return()=>clearTimeout(timer);
  },[]);

  useEffect(()=>{
    const handleBack=()=>{
      navigate("/register",{replace:true});
    };

    window.history.pushState(null,"",window.location.href);
    window.addEventListener("popstate",handleBack);

    return()=>{
      window.removeEventListener("popstate",handleBack);
    };
  },[navigate]);

  if(!Object.keys(answers).length){
    return <Navigate to="/register" replace />;
  }


  if(loading){
    return (
      <div className="min-h-screen bg-[#F4EFE6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full border-4 border-[#1E7A3A] border-t-transparent animate-spin mx-auto mb-8" />
          <h2 className="text-4xl font-serif text-[#173C68]">
            Generating Your Blueprint
          </h2>
          <p className="text-slate-500 mt-3">
            Personalizing your wellness experience...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4EFE6] py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-[48px] p-10 shadow-[0_30px_100px_rgba(0,0,0,0.08)]">

        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-[#1E7A3A]/10 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="text-[#1E7A3A]" size={34} />
          </div>

          <h1 className="text-5xl font-serif text-[#173C68]">
            Your Wellness Blueprint
          </h1>

          <p className="text-slate-500 mt-4">
            A personalized recommendation based on your lifestyle preferences.
          </p>
        </div>

        {/* <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="p-8 rounded-[32px] bg-[#F8FAF8]">
            <Leaf className="text-[#1E7A3A] mb-4" size={28} />
            <h3 className="font-semibold text-[#173C68] mb-2">Lifestyle Focus</h3>
            <p className="text-slate-500">Balanced nutrition, movement and recovery.</p>
          </div>

          <div className="p-8 rounded-[32px] bg-[#F8FAF8]">
            <HeartPulse className="text-[#1E7A3A] mb-4" size={28} />
            <h3 className="font-semibold text-[#173C68] mb-2">Mind & Body</h3>
            <p className="text-slate-500">Meditation, breathwork and stress reduction.</p>
          </div>

          <div className="p-8 rounded-[32px] bg-[#F8FAF8]">
            <Mountain className="text-[#1E7A3A] mb-4" size={28} />
            <h3 className="font-semibold text-[#173C68] mb-2">Retreat Match</h3>
            <p className="text-slate-500">Recommended nature-based healing retreat.</p>
          </div>

        </div> */}
        {/* THANK YOU SECTION */}
  <div className="rounded-[32px] bg-[#F8FAF8] p-8">
          <h3 className="text-2xl font-semibold text-[#173C68] mb-6">
            Wellness Analysis
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            {Object.entries(answers).map(([key,value])=>(
              <div key={key} className="bg-white rounded-2xl p-5 border border-slate-100">
                <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">
                  {key.replaceAll("_"," ")}
                </p>
                <p className="font-medium text-[#173C68]">
                  {Array.isArray(value)?value.join(", "):String(value)}
                </p>
              </div>
            ))}
          </div>
        </div>
<div className="mt-12 rounded-[40px] bg-gradient-to-br from-[#173C68] to-[#1E7A3A] text-white p-8 sm:p-10 lg:p-14 text-center">

  <div className="w-20 h-20 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-6">
    <Sparkles size={36} />
  </div>

  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight">
    Thank You for Beginning Your
    <span className="block text-[#E8D7A5] italic mt-2">
      Wellness Journey
    </span>
  </h2>

  <p className="max-w-3xl mx-auto mt-6 text-base sm:text-lg leading-8 text-white/90">
    We've successfully received your Lifestyle Assessment and your personalized
    wellness profile has been securely submitted to our Darshai Wellness Team.
  </p>

  <p className="max-w-3xl mx-auto mt-4 text-base sm:text-lg leading-8 text-white/90">
    One of our Wellness Advisors will carefully review your responses and
    contact you within the next <strong>2–3 business days</strong> to discuss
    the retreat experience that best aligns with your wellness goals.
  </p>

  <p className="max-w-3xl mx-auto mt-4 text-base sm:text-lg leading-8 text-white/90">
    While we prepare your personalized recommendation, we invite you to explore
    our wellness programs, discover our philosophy, and learn how Darshai blends
    Ayurveda, nature, and modern longevity science to create transformative
    healing experiences.
  </p>

  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">

    <button
      onClick={()=>navigate("/program")}
      className="px-8 py-4 rounded-full bg-white text-[#173C68] font-semibold hover:scale-105 transition"
    >
      Explore Wellness Programs
    </button>

    <button
      onClick={()=>navigate("/")}
      className="px-8 py-4 rounded-full border border-white/30 hover:bg-white/10 transition"
    >
      Back to Home
    </button>

  </div>

</div>
      

      </div>
    </div>
  );
}