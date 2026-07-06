import { useEffect,useState } from "react";
import { motion,AnimatePresence } from "framer-motion";
import { X,Loader2,Heart,Leaf,Trees,Utensils,IndianRupee,Plane,UserRound,Mail,Phone,MapPin,CalendarDays } from "lucide-react";
import { getLifestyleAssessment } from "../../services/salesService";

export default function LifestyleModal({ open,lead,onClose }){

  const [loading,setLoading]=useState(false);
  const [lifestyle,setLifestyle]=useState({});

  useEffect(()=>{

    if(open&&lead) loadLifestyle();

  },[open,lead]);

  const loadLifestyle=async()=>{

    try{

      setLoading(true);

      const data=await getLifestyleAssessment(lead.id);

      setLifestyle(data?.matrix_answers||data||{});

    }catch(err){

      console.error(err);

    }finally{

      setLoading(false);

    }

  };

  const getValue=key=>{

    const value=lifestyle?.[key];

    if(!value) return "Not Provided";

    if(Array.isArray(value)) return value.join(", ");

    return value;

  };

  if(!open) return null;

  return(

    <AnimatePresence>

      <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >

        <motion.div
          initial={{scale:.95,y:40}}
          animate={{scale:1,y:0}}
          exit={{scale:.95,y:40}}
          className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[36px] bg-white shadow-[0_35px_100px_rgba(0,0,0,.25)]"
        >

          <div className="flex items-center justify-between border-b border-[#ECE7DD] bg-gradient-to-r from-[#173C68] to-[#1E7A3A] px-8 py-6">

            <div>

              <p className="text-sm uppercase tracking-[3px] text-white/70">
                Lifestyle Assessment
              </p>

              <h2 className="mt-2 font-serif text-4xl text-white">
                {lead?.name}
              </h2>

            </div>

            <button
              onClick={onClose}
              className="rounded-full bg-white/20 p-3 text-white transition hover:bg-white hover:text-[#173C68]"
            >
              <X size={22}/>
            </button>

          </div>

          {loading?(
            <div className="flex flex-1 items-center justify-center py-24">
              <Loader2 size={40} className="animate-spin text-[#1E7A3A]"/>
            </div>
          ):(
            <div className="flex-1 overflow-y-auto p-7">

              {/* Patient Overview */}

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-[26px] border border-[#ECE7DD] bg-[#FCFBF9] p-5">
                  <UserRound className="text-[#1E7A3A]" size={24}/>
                  <p className="mt-3 text-xs uppercase text-slate-500">Patient</p>
                  <h3 className="mt-1 font-semibold text-[#173C68]">{lead?.name}</h3>
                </div>

                <div className="rounded-[26px] border border-[#ECE7DD] bg-[#FCFBF9] p-5">
                  <Mail className="text-[#1E7A3A]" size={24}/>
                  <p className="mt-3 text-xs uppercase text-slate-500">Email</p>
                  <h3 className="mt-1 break-all font-semibold text-[#173C68]">
                    {lead?.email}
                  </h3>
                </div>

                <div className="rounded-[26px] border border-[#ECE7DD] bg-[#FCFBF9] p-5">
                  <Phone className="text-[#1E7A3A]" size={24}/>
                  <p className="mt-3 text-xs uppercase text-slate-500">Phone</p>
                  <h3 className="mt-1 font-semibold text-[#173C68]">
                    {lead?.phone}
                  </h3>
                </div>

                <div className="rounded-[26px] border border-[#ECE7DD] bg-[#FCFBF9] p-5">
                  <CalendarDays className="text-[#1E7A3A]" size={24}/>
                  <p className="mt-3 text-xs uppercase text-slate-500">Registered</p>
                  <h3 className="mt-1 font-semibold text-[#173C68]">
                    {new Date(lead?.created_at).toLocaleDateString()}
                  </h3>
                </div>

              </div>

              {/* Lifestyle Summary */}

              <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                <div className="rounded-[26px] border border-[#ECE7DD] bg-[#FCFBF9] p-6">
                  <Heart className="text-[#1E7A3A]" size={26}/>
                  <h3 className="mt-4 font-semibold text-[#173C68]">Retreat Goal</h3>
                  <p className="mt-2 text-slate-600">{getValue("retreat_goal")}</p>
                </div>

                <div className="rounded-[26px] border border-[#ECE7DD] bg-[#FCFBF9] p-6">
                  <Leaf className="text-[#1E7A3A]" size={26}/>
                  <h3 className="mt-4 font-semibold text-[#173C68]">Preferred Program</h3>
                  <p className="mt-2 text-slate-600">{getValue("preferred_experience")}</p>
                </div>

                <div className="rounded-[26px] border border-[#ECE7DD] bg-[#FCFBF9] p-6">
                  <IndianRupee className="text-[#1E7A3A]" size={26}/>
                  <h3 className="mt-4 font-semibold text-[#173C68]">Budget</h3>
                  <p className="mt-2 text-slate-600">{getValue("budget_range")}</p>
                </div>

                <div className="rounded-[26px] border border-[#ECE7DD] bg-[#FCFBF9] p-6">
                  <Plane className="text-[#1E7A3A]" size={26}/>
                  <h3 className="mt-4 font-semibold text-[#173C68]">Travel Timeline</h3>
                  <p className="mt-2 text-slate-600">{getValue("travel_timeline")}</p>
                </div>

                <div className="rounded-[26px] border border-[#ECE7DD] bg-[#FCFBF9] p-6">
                  <Utensils className="text-[#1E7A3A]" size={26}/>
                  <h3 className="mt-4 font-semibold text-[#173C68]">Food Preference</h3>
                  <p className="mt-2 text-slate-600">{getValue("food_style")}</p>
                </div>

                <div className="rounded-[26px] border border-[#ECE7DD] bg-[#FCFBF9] p-6">
                  <Trees className="text-[#1E7A3A]" size={26}/>
                  <h3 className="mt-4 font-semibold text-[#173C68]">Natural Environment</h3>
                  <p className="mt-2 text-slate-600">{getValue("natural_environment")}</p>
                </div>

              </div>
                            {/* Wellness Preferences */}

              <div className="mt-8 rounded-[30px] border border-[#ECE7DD] bg-[#FCFBF9] p-7">

                <h3 className="font-serif text-2xl text-[#173C68]">
                  Wellness Preferences
                </h3>

                <div className="mt-6 grid gap-6 md:grid-cols-2">

                  <div>
                    <p className="font-semibold text-[#173C68]">
                      Mind Body Practice
                    </p>
                    <p className="mt-2 text-slate-600">
                      {getValue("mind_body_practice")}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-[#173C68]">
                      Therapeutic Experience
                    </p>
                    <p className="mt-2 text-slate-600">
                      {getValue("therapeutic_experience")}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-[#173C68]">
                      Creative Activity
                    </p>
                    <p className="mt-2 text-slate-600">
                      {getValue("creative_activity")}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-[#173C68]">
                      Wellness Learning
                    </p>
                    <p className="mt-2 text-slate-600">
                      {getValue("wellness_learning")}
                    </p>
                  </div>

                </div>

              </div>

              {/* Environment & Lifestyle */}

              <div className="mt-8 rounded-[30px] border border-[#ECE7DD] bg-[#FCFBF9] p-7">

                <h3 className="font-serif text-2xl text-[#173C68]">
                  Lifestyle & Environment
                </h3>

                <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                  <div>
                    <p className="font-semibold text-[#173C68]">Work Posture</p>
                    <p className="mt-2 text-slate-600">{getValue("work_posture")}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-[#173C68]">Alcohol</p>
                    <p className="mt-2 text-slate-600">{getValue("alcohol_consumption")}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-[#173C68]">Tobacco</p>
                    <p className="mt-2 text-slate-600">{getValue("tobacco_use")}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-[#173C68]">Living Environment</p>
                    <p className="mt-2 text-slate-600">{getValue("living_environment")}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-[#173C68]">Climate</p>
                    <p className="mt-2 text-slate-600">{getValue("climate_type")}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-[#173C68]">Terrain</p>
                    <p className="mt-2 text-slate-600">{getValue("terrain_type")}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-[#173C68]">Sunlight</p>
                    <p className="mt-2 text-slate-600">{getValue("sunlight_exposure")}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-[#173C68]">Pollution</p>
                    <p className="mt-2 text-slate-600">{getValue("pollution_exposure")}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-[#173C68]">Travel Frequency</p>
                    <p className="mt-2 text-slate-600">{getValue("travel_frequency")}</p>
                  </div>

                </div>

              </div>

              {/* Sales Insight */}

              <div className="mt-8 rounded-[30px] bg-gradient-to-r from-[#173C68] to-[#1E7A3A] p-7 text-white">

                <h3 className="font-serif text-2xl">
                  Sales Recommendation
                </h3>

                <p className="mt-4 leading-8 text-white/90">

                  This patient is interested in

                  <span className="font-semibold">
                    {" "}{getValue("preferred_experience")}
                  </span>

                  {" "}with a budget of

                  <span className="font-semibold">
                    {" "}{getValue("budget_range")}
                  </span>

                  . Recommend presenting wellness packages aligned with

                  <span className="font-semibold">
                    {" "}{getValue("retreat_goal")}
                  </span>

                  {" "}and schedule consultation within

                  <span className="font-semibold">
                    {" "}{getValue("travel_timeline")}
                  </span>.

                </p>

              </div>

            </div>
          )}

          <div className="flex justify-end border-t border-[#ECE7DD] bg-[#FCFBF9] p-6">

            <button
              onClick={onClose}
              className="rounded-full bg-[#173C68] px-8 py-3 font-semibold text-white transition hover:bg-[#1E7A3A]"
            >
              Close
            </button>

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>

  );

}