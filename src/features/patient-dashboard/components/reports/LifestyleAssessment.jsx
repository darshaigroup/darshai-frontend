import { motion } from "framer-motion";
import { CheckCircle2, User, HeartHandshake, Leaf, Utensils, Trees, Sparkles } from "lucide-react";

const value=v=>{
  if(v==null||v==="") return "--";
  if(Array.isArray(v)) return v.filter(Boolean).join(", ");
  if(typeof v==="object") return Object.values(v).flat().filter(Boolean).join(", ");
  return String(v);
};

const field=(label,val)=>({label,value:value(val)});

const Section=({title,icon:Icon,fields=[]})=>(
  <motion.div
    initial={{opacity:0,y:20}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    className="rounded-3xl bg-white p-6 shadow-lg"
  >
    <div className="mb-6 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
        <Icon className="h-5 w-5 text-emerald-600"/>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-slate-900">
          {title}
        </h3>
      </div>
    </div>

    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {fields.map(item=>(
        <div
          key={item.label}
          className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4"
        >
          <p className="text-xs uppercase tracking-wide text-slate-500">
            {item.label}
          </p>

          <p className="mt-2 font-semibold leading-7 text-slate-900 break-words">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  </motion.div>
);

export default function LifestyleAssessment({lifestyle={}}){

  const{
    lifestyle_score,
    lifestyle_grade,
    food_style,
    diet_type,
    nutrition_score,
    meal_frequency,
    water_intake,
    physical_activity,
    exercise_frequency,
    sleep_duration,
    sleep_quality,
    stress_level,
    work_posture,
    work_life_balance,
    sunlight_exposure,
    pollution_exposure,
    travel_frequency,
    living_environment,
    climate_type,
    terrain_type,
    natural_environment,
    tobacco_use,
    smoking,
    alcohol_consumption,
    alcohol,
    mind_body_practice,
    creative_activity,
    therapeutic_experience,
    wellness_learning,
    retreat_goal,
    retreat_for,
    retreat_experience,
    comfort_level,
    activity_intensity,
    mental_wellbeing,
    room_count,
    adult_count,
    children_count
  }=lifestyle;

  const responses=Object.values(lifestyle).filter(v=>{
    if(Array.isArray(v)) return v.length;
    return v!==null&&v!==undefined&&v!=="";
  }).length;

  const sections=[
    {
      title:"Retreat Profile",
      icon:HeartHandshake,
      fields:[
        field("Retreat For",retreat_for),
        field("Adults",adult_count),
        field("Children",children_count),
        field("Rooms",room_count),
        field("Retreat Goal",retreat_goal),
        field("Retreat Experience",retreat_experience)
      ]
    },
    {
      title:"Wellness Preferences",
      icon:Sparkles,
      fields:[
        field("Mind Body Practice",mind_body_practice),
        field("Creative Activity",creative_activity),
        field("Therapeutic Experience",therapeutic_experience),
        field("Activity Intensity",activity_intensity),
        field("Wellness Learning",wellness_learning),
        field("Mental Wellbeing",mental_wellbeing)
      ]
    },
    {
      title:"Food & Lifestyle",
      icon:Utensils,
      fields:[
        field("Food Style",food_style),
        field("Diet Type",diet_type),
        field("Nutrition Score",nutrition_score),
        field("Meals Per Day",meal_frequency),
        
        
        field("Comfort Level",comfort_level)
      ]
    },
    {
      title:"Environment & Exposure",
      icon:Trees,
      fields:[
        field("Living Environment",living_environment),
        field("Natural Environment",natural_environment),
        field("Climate Type",climate_type),
        field("Terrain Type",terrain_type),
        field("Travel Frequency",travel_frequency),
        field("Sunlight Exposure",sunlight_exposure),
        field("Pollution Exposure",pollution_exposure)
      ]
    },
    {
      title:"Lifestyle Habits",
      icon:Leaf,
      fields:[
        field("Exercise",exercise_frequency??physical_activity),
        field("Sleep Duration",sleep_duration),
        field("Sleep Quality",sleep_quality),
        field("Stress Level",stress_level),
        field("Work Posture",work_posture),
        field("Work Life Balance",work_life_balance),
        field("Smoking",tobacco_use??smoking),
        field("Alcohol",alcohol_consumption??alcohol)
      ]
    }
  ];

  return(
    <motion.section
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      transition={{duration:.35}}
      className="space-y-6"
    >

      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 p-7 text-white shadow-xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
              <CheckCircle2 className="h-5 w-5"/>
              Assessment Completed
            </div>

            <h2 className="text-4xl font-bold">
              Lifestyle Matrix Result
            </h2>

            <p className="mt-3 max-w-2xl text-white/90">
              Review wellness preferences before proceeding to the Ayurvedic assessment.
            </p>
          </div>

          <div className="rounded-3xl bg-white/15 p-6 backdrop-blur">
            <p className="text-xs uppercase tracking-wider text-white/80">
              Responses Captured
            </p>

            <p className="mt-2 text-5xl font-black">
              {responses}
            </p>

            <div className="mt-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              {lifestyle_grade??"Completed"}
            </div>
          </div>

        </div>
      </div>
            {sections.map(section=>(
        <Section
          key={section.title}
          title={section.title}
          icon={section.icon}
          fields={section.fields.filter(f=>f.value!=="--")}
        />
      ))}

      {lifestyle_score!=null&&(
        <motion.div
          initial={{opacity:0,y:20}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          className="rounded-3xl bg-white p-6 shadow-lg"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                Lifestyle Summary
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Overall wellness and lifestyle assessment.
              </p>
            </div>

            <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              {lifestyle_grade??"--"}
            </span>
          </div>

          <div className="grid gap-5 lg:grid-cols-[220px_1fr]">

            <div className="flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 p-8 text-white">

              <p className="text-sm uppercase tracking-[.2em] opacity-80">
                Score
              </p>

              <h2 className="mt-4 text-6xl font-black">
                {lifestyle_score}
              </h2>

              <p className="mt-2 text-lg font-semibold">
                /100
              </p>

            </div>

            <div className="flex flex-col justify-center">

              <div className="mb-3 flex justify-between text-sm font-medium text-slate-500">
                <span>Lifestyle Wellness</span>
                <span>{lifestyle_score}/100</span>
              </div>

              <div className="h-4 overflow-hidden rounded-full bg-slate-200">
                <motion.div
                  initial={{width:0}}
                  animate={{width:`${Math.min(100,Number(lifestyle_score)||0)}%`}}
                  transition={{duration:1}}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500"
                />
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Grade
                  </p>

                  <p className="mt-2 text-xl font-bold text-emerald-700">
                    {lifestyle_grade??"--"}
                  </p>
                </div>

                <div className="rounded-2xl border border-sky-100 bg-sky-50 p-4">
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Exercise
                  </p>

                  <p className="mt-2 font-bold text-slate-900">
                    {value(exercise_frequency??physical_activity)}
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Mental Wellness
                  </p>

                  <p className="mt-2 font-bold text-slate-900">
                    {value(mental_wellbeing)}
                  </p>
                </div>

              </div>

            </div>

          </div>
        </motion.div>
      )}

    </motion.section>
  );
}