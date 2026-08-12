import {useMemo,useState} from "react";
import {Mail,Phone,MapPin,Briefcase,Settings,Globe,Clock,Sun,Moon,Leaf,Sparkles,ArrowRight,CheckCircle2} from "lucide-react";
import person from "@/assets/images/profile.jpg";
const getLifestyleAnswers=patientData=>{
  const sources=[
    patientData?.matrix_answers,
    patientData?.patient?.matrix_answers,
    patientData?.lifestyleMatrix?.matrix_answers,
    patientData?.lifestyle_matrix?.matrix_answers,
    patientData?.report?.patient?.matrix_answers,
    patientData?.report?.matrix_answers,
    patientData?.report?.lifestyleMatrix?.matrix_answers,
    patientData?.report?.lifestyle_matrix?.matrix_answers,
    patientData?.report?.data?.patient?.matrix_answers,
    patientData?.report?.data?.matrix_answers,
    patientData?.report?.data?.lifestyleMatrix?.matrix_answers,
    patientData?.report?.data?.lifestyle_matrix?.matrix_answers,
    patientData?.assessment?.patient?.matrix_answers,
    patientData?.assessment?.matrix_answers,
    patientData?.assessment?.lifestyleMatrix?.matrix_answers,
    patientData?.assessment?.lifestyle_matrix?.matrix_answers,
    patientData?.assessment?.data?.patient?.matrix_answers,
    patientData?.assessment?.data?.matrix_answers,
    patientData?.assessment?.data?.lifestyleMatrix?.matrix_answers,
    patientData?.assessment?.data?.lifestyle_matrix?.matrix_answers,
    patientData?.data?.patient?.matrix_answers,
    patientData?.data?.matrix_answers,
    patientData?.data?.lifestyleMatrix?.matrix_answers,
    patientData?.data?.lifestyle_matrix?.matrix_answers
  ];

  const source=sources.find(value=>value!==undefined&&value!==null);

  if(Array.isArray(source)){
    return source.reduce((acc,item)=>{
      const id=item?.question_id??item?.questionId??item?.id;
      if(id){
        acc[id]=item?.answer??item?.value??item?.selected??item?.selected_options;
      }
      return acc;
    },{});
  }

  return source&&typeof source==="object"?source:{};
};

const getGoalValues=patientData=>{
  const answers=getLifestyleAnswers(patientData);
  const value=answers?.retreat_goal??answers?.retreatGoal??answers?.wellness_goal??answers?.wellness_goals;

  if(Array.isArray(value)) return value.filter(Boolean);
  if(typeof value==="string"&&value.trim()) return [value.trim()];
  return [];
};

const initials=name=>
  (name||"Patient")
    .split(" ")
    .filter(Boolean)
    .slice(0,2)
    .map(v=>v[0])
    .join("")
    .toUpperCase();

export default function SettingsView({
  activePatient,
  patientData,
  onUpdatePatient,
  isDarkMode=false,
  onToggleTheme
}){
  const patient=activePatient??{};
  const [language,setLanguage]=useState(patient?.language??"English");
  const [timezone,setTimezone]=useState(patient?.timezone??"Asia/Kolkata (IST)");

  const fullName=patient?.full_name??patient?.name??"Patient";
  const email=patient?.email??"";
  const phone=patient?.phone??"";
  const location=patient?.location??"";
  const occupation=patient?.occupation??"";
  const avatar=patient?.profile_image??"";

  const goals=useMemo(()=>getGoalValues(patientData),[patientData]);

  const profileFields=[
    {label:"Full Name",value:fullName},
    {label:"Email",value:email},
    {label:"Phone",value:phone},
    {label:"Location",value:location},
    {label:"Occupation",value:occupation}
  ];

  const profileCompletion=Math.round(
    (profileFields.filter(item=>item.value).length/profileFields.length)*100
  );

  const savePreferences=()=>{
    onUpdatePatient?.({
      ...patient,
      language,
      timezone,
      theme:isDarkMode?"dark":"light"
    });
  };

  return(
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
          Profile & Settings
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Manage your profile, preferences and wellness journey.
        </p>
      </div>

      {/* PROFILE */}
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#06152A] via-[#08223D] to-[#064E4A] p-6 text-white shadow-[0_20px_60px_rgba(6,21,42,.16)] sm:p-8">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-emerald-300/30"/>
          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full border border-emerald-300/20"/>
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[1fr_330px] lg:items-center">
        <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center">
          <div className="relative shrink-0">
            <img
              src={person}
              alt={fullName}
              className="h-24 w-24 rounded-full border-4 border-white/20 object-cover sm:h-28 sm:w-28"
            />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-serif text-3xl font-bold sm:text-4xl">{fullName}</h2>
            </div>

            <div className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
              {email&&(
                <div className="flex min-w-0 items-center gap-2">
                  <Mail size={16} className="shrink-0 text-emerald-300"/>
                  <span className="truncate">{email}</span>
                </div>
              )}

              {phone&&(
                <div className="flex items-center gap-2">
                  <Phone size={16} className="shrink-0 text-emerald-300"/>
                  <span>{phone}</span>
                </div>
              )}

              {location&&(
                <div className="flex min-w-0 items-center gap-2">
                  <MapPin size={16} className="shrink-0 text-emerald-300"/>
                  <span className="truncate">{location}</span>
                </div>
              )}

              {occupation&&(
                <div className="flex min-w-0 items-center gap-2">
                  <Briefcase size={16} className="shrink-0 text-emerald-300"/>
                  <span className="truncate">{occupation}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/15">
              <Sparkles className="text-emerald-300" size={22}/>
            </div>

            <div>
              <p className="font-semibold">Wellness Journey</p>
              <p className="text-xs text-slate-300">Your profile progress</p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Profile completion</p>
              <p className="mt-1 text-2xl font-bold">{profileCompletion}%</p>
            </div>

            <div
              className="relative flex h-20 w-20 items-center justify-center rounded-full"
              style={{background:`conic-gradient(#22C55E ${profileCompletion}%,rgba(255,255,255,.12) 0)`}}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#102B43]">
                <CheckCircle2 className="text-emerald-400" size={24}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* PREFERENCES + GOALS */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50">
              <Settings className="text-emerald-600" size={21}/>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">Preferences</h2>
              <p className="text-sm text-slate-500">Customize your dashboard experience.</p>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex flex-col gap-3 border-b border-slate-100 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50">
                  <Globe size={18} className="text-slate-600"/>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">Language</p>
                  <p className="text-xs text-slate-500">Choose your preferred language</p>
                </div>
              </div>

              <select
                value={language}
                onChange={e=>setLanguage(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 sm:w-48"
              >
                <option>English</option>
              </select>
            </div>

            <div className="flex flex-col gap-3 border-b border-slate-100 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50">
                  <Clock size={18} className="text-slate-600"/>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">Time Zone</p>
                  <p className="text-xs text-slate-500">Select your local time zone</p>
                </div>
              </div>

              <select
                value={timezone}
                onChange={e=>setTimezone(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 sm:w-48"
              >
                <option>Asia/Kolkata (IST)</option>
              </select>
            </div>

            <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50">
                  {isDarkMode?<Moon size={18} className="text-indigo-500"/>:<Sun size={18} className="text-amber-500"/>}
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">Theme</p>
                  <p className="text-xs text-slate-500">Customize your viewing experience</p>
                </div>
              </div>

              <button
                type="button"
                onClick={onToggleTheme}
                className="flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 sm:w-48"
              >
                <span>{isDarkMode?"Dark":"Light"}</span>
                {isDarkMode?<Moon size={17} className="text-indigo-500"/>:<Sun size={17} className="text-amber-500"/>}
              </button>
            </div>
          </div>
        </section>

        {/* WELLNESS GOALS */}
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50">
              <Leaf className="text-emerald-600" size={21}/>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">Wellness Goals</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Goals selected from your Lifestyle Matrix.
              </p>
            </div>
          </div>

          {goals.length?(
            <div className="mt-7 flex flex-wrap gap-3">
              {goals.map((goal,index)=>(
                <div
                  key={`${goal}-${index}`}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700"
                >
                  <Leaf size={15}/>
                  {goal}
                </div>
              ))}
            </div>
          ):(
            <div className="mt-7 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
              <Leaf className="mx-auto text-slate-400" size={26}/>
              <p className="mt-3 text-sm font-semibold text-slate-700">No plans</p>
              <p className="mt-1 text-xs text-slate-500">
                Complete the Lifestyle Matrix to define your wellness goals.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* WELLNESS COMPANION */}
      <section className="overflow-hidden rounded-[28px] border border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-teal-50 p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-100 sm:h-20 sm:w-20">
              <Leaf className="text-emerald-600" size={34}/>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-slate-900 sm:text-2xl">
                Your Wellness Companion
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Continue your wellness journey to receive more personalized
                recommendations and track your progress.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={()=>window.location.href="/patient-dashboard/assessment"}
            className="group flex w-full shrink-0 items-center justify-center gap-3 rounded-full bg-[#06152A] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0B2442] hover:shadow-lg sm:w-auto"
          >
            Take New Assessment
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1"/>
          </button>
        </div>
      </section>
    </div>
  );
}