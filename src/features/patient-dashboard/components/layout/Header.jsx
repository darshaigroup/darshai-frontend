import { Search,Bell,Moon,Sun,Menu,LogOut,HelpCircle } from "lucide-react";
import useTour from "../onbaording/useTour";

export default function Header({
  profile,
  report,
  assessment,
  progress,
  searchQuery,
  setSearchQuery,
  onLogout,
  currentTab,
  isDarkMode,
  onToggleTheme,
  onOpenSidebar,
  setMobileSidebarOpen,
}) {
  const patient=profile?.patient??profile??{},
        reportData=report?.patient??report??{},
        assessmentData=assessment?.data??assessment??{},
        finalAyurveda=reportData?.final_ayurveda_result??{},
        firstName=(patient?.name??patient?.full_name??"Patient").split(" ")[0],
        fullName=patient?.name??patient?.full_name??"Patient",
        riskTier=finalAyurveda?.risk_tier??reportData?.risk_tier??assessmentData?.risk_band??"--",
        dosha=finalAyurveda?.primary_dosha??reportData?.primary_dosha??finalAyurveda?.prakriti?.dominant_dosha??"TriDosha",
        avatar=patient?.profile_image||`https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=10b981&color=fff`,
        alerts=[],
        completed=progress?.completed??false;

  const titles={
    dashboard:{
      title:`Good Morning ${firstName}!`,
      subtitle:completed
        ?"Your personalized longevity companion is monitoring your wellness."
        :"Complete your wellness journey to unlock personalized insights."
    },
    assessment:{
      title:"Clinical Assessment",
      subtitle:"Continue your Geo-Prakriti assessment."
    },
    report:{
      title:"Health Reports",
      subtitle:"View your latest wellness reports."
    },
    result:{
      title:"Health Insights",
      subtitle:`Current Risk Tier • ${riskTier}`
    },
    settings:{
      title:"Profile Settings",
      subtitle:"Manage your preferences and account."
    }
  };

  const page=titles[currentTab]??titles.dashboard,
        {startTour}=useTour();

  const handleStartTour=()=>{
    if(window.innerWidth<768){
      setMobileSidebarOpen(true);
      return setTimeout(startTour,350);
    }
    startTour();
  };

  return(
    <header className="sticky top-0 z-30 border-b border-stone-200/70 bg-[#F8F6F1]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-24 max-w-[1520px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">

        <button onClick={onOpenSidebar} className="flex h-11 w-11 items-center justify-center rounded-xl border border-stone-200 bg-white shadow-sm lg:hidden">
          <Menu className="h-5 w-5 text-slate-700"/>
        </button>

        <div className="hidden min-w-[250px] md:block">
          <h2 className="font-serif text-[28px] font-bold leading-none text-slate-900">{page.title}</h2>
          <p className="mt-2 text-sm text-slate-500">{page.subtitle}</p>
        </div>

        <div className="hidden max-w-xl flex-1 lg:flex">
          <div className="relative w-full">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400"/>
            <input
              value={searchQuery}
              onChange={e=>setSearchQuery(e.target.value)}
              placeholder="Search reports, appointments, recommendations..."
              className="h-12 w-full rounded-2xl border border-stone-200 bg-white pl-11 pr-4 text-sm outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">

         

          <button
            id="tour-start-btn"
            onClick={handleStartTour}
            title="Start Dashboard Tour"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-stone-200 bg-white transition-all hover:bg-emerald-50"
          >
            <HelpCircle className="h-5 w-5 text-slate-600"/>
          </button>

          <button
            onClick={onToggleTheme}
            title="Toggle Theme"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-stone-200 bg-white transition-all hover:bg-emerald-50"
          >
            {isDarkMode?<Sun className="h-5 w-5 text-amber-500"/>:<Moon className="h-5 w-5 text-slate-700"/>}
          </button>

          <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-stone-200 bg-white transition-all hover:bg-emerald-50">
            <Bell className="h-5 w-5 text-slate-700"/>
            {alerts.length>0&&<span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-500"/>}
          </button>

          <div className="hidden items-center gap-3 pl-2 md:flex">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">{fullName}</p>
              <p className="text-[11px] uppercase tracking-[0.15em] text-emerald-600">{dosha}</p>
            </div>

            <img
              src={avatar}
              alt={fullName}
              className="h-11 w-11 rounded-full border-2 border-emerald-500 object-cover"
            />
          </div>

          <button
            onClick={onLogout}
            title="Logout"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-stone-200 bg-white transition-all hover:border-rose-300 hover:bg-rose-50"
          >
            <LogOut className="h-5 w-5 text-slate-700 hover:text-rose-600"/>
          </button>

        </div>
      </div>
    </header>
  );
}