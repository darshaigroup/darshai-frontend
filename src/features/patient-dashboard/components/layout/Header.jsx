import {Search,Bell,Moon,Sun,Menu,HelpCircle,X} from "lucide-react";
import {useLocation} from "react-router-dom";
import {useState} from "react";
import useTour from "../onbaording/useTour";
import person from "@/assets/images/profile.jpg";

export default function Header({
  profile,report,assessment,progress,searchQuery,setSearchQuery,currentTab,
  isDarkMode,onToggleTheme,onOpenSidebar,setMobileSidebarOpen,searchResults=[],
  onSearchSelect
}) {
  const {pathname}=useLocation();
  const [mobileSearchOpen,setMobileSearchOpen]=useState(false);

  const patient=profile?.patient??profile??{},
        reportData=report?.patient??report??{},
        assessmentData=assessment?.data??assessment??{},
        finalAyurveda=reportData?.final_ayurveda_result??report?.final_ayurveda_result??{},
        prakriti=finalAyurveda?.prakriti??{},
        firstName=(patient?.name??patient?.full_name??"Patient").split(" ")[0],
        fullName=patient?.name??patient?.full_name??"Patient",
        riskTier=finalAyurveda?.risk_tier??reportData?.risk_tier??assessmentData?.risk_band??"--",
        prakritiType=prakriti?.prakriti_type??"Pending Analysis",
        completed=progress?.completed??false;

  const routeTab=pathname==="/patient-dashboard"
    ?"dashboard"
    :pathname.startsWith("/patient-dashboard/assessment")
    ?"assessment"
    :pathname.startsWith("/patient-dashboard/reports")
    ?"report"
    :pathname.startsWith("/patient-dashboard/results")
    ?"result"
    :pathname.startsWith("/patient-dashboard/settings")
    ?"settings"
    :currentTab;

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

  const page=titles[routeTab]??titles.dashboard,{startTour}=useTour();

  const handleStartTour=()=>{
    if(window.innerWidth<768){
      setMobileSidebarOpen(true);
      return setTimeout(startTour,350);
    }
    startTour();
  };

  const handleResultClick=item=>{
    if(!item)return;
    setSearchQuery("");
    setMobileSearchOpen(false);
    onSearchSelect?.(item);
  };

  const handleMobileSearch=()=>{
    setMobileSearchOpen(prev=>!prev);
    if(mobileSearchOpen)setSearchQuery("");
  };

  return(
    <>
      <header className="sticky top-0 z-30 border-b border-stone-200/70 bg-[#F8F6F1]/90 backdrop-blur-xl print:hidden">
        <div className="mx-auto flex h-24 max-w-[1520px] items-center justify-between gap-3 px-4 sm:gap-6 sm:px-6 lg:px-8">

          <button
            onClick={onOpenSidebar}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-stone-200 bg-white shadow-sm lg:hidden"
          >
            <Menu className="h-5 w-5 text-slate-700"/>
          </button>

          <div className="hidden min-w-[250px] md:block">
            <h2 className="font-serif text-[28px] font-bold leading-none text-slate-900">
              {page.title}
            </h2>
            <p className="mt-2 text-sm text-slate-500">{page.subtitle}</p>
          </div>

          {/* Desktop Search */}
          <div className="relative hidden max-w-xl flex-1 lg:flex">
            <div className="relative w-full">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400"/>

              <input
                value={searchQuery}
                onChange={e=>setSearchQuery(e.target.value)}
                placeholder="Search reports, appointments, recommendations..."
                className="h-12 w-full rounded-2xl border border-stone-200 bg-white pl-11 pr-4 text-sm outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
              />

              {searchQuery?.trim()&&(
                <SearchResults
                  results={searchResults}
                  onSelect={handleResultClick}
                />
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">

            {/* Mobile Search Icon */}
            <button
              onClick={handleMobileSearch}
              title="Search"
              className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all lg:hidden ${
                mobileSearchOpen
                  ?"border-emerald-400 bg-emerald-50"
                  :"border-stone-200 bg-white hover:bg-emerald-50"
              }`}
            >
              {mobileSearchOpen
                ?<X className="h-5 w-5 text-emerald-700"/>
                :<Search className="h-5 w-5 text-slate-700"/>}
            </button>

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
              {isDarkMode
                ?<Sun className="h-5 w-5 text-amber-500"/>
                :<Moon className="h-5 w-5 text-slate-700"/>}
            </button>

            <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-stone-200 bg-white transition-all hover:bg-emerald-50">
              <Bell className="h-5 w-5 text-slate-700"/>
            </button>

            <div className="hidden items-center gap-3 pl-2 md:flex">
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">{fullName}</p>

                  <div className="mt-1 flex items-center justify-end gap-2">
                    <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                      <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400/50"/>
                      <span className="absolute h-2.5 w-2.5 rounded-full bg-emerald-400/20 blur-sm"/>
                      <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500"/>
                    </span>

                    <span className="text-[11px] font-semibold text-slate-700">
                      {prakritiType}
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -inset-1 rounded-full bg-emerald-400/20 blur-md"/>
                  <img
                    src={person}
                    alt={fullName}
                    className="relative h-11 w-11 rounded-full border-2 border-emerald-500 bg-white object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Panel */}
      {mobileSearchOpen&&(
        <div className="sticky top-24 z-20 border-b border-stone-200/70 bg-[#F8F6F1]/95 px-4 py-3 shadow-sm backdrop-blur-xl lg:hidden">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400"/>

            <input
              autoFocus
              value={searchQuery}
              onChange={e=>setSearchQuery(e.target.value)}
              placeholder="Search reports, assessments..."
              className="h-12 w-full rounded-2xl border border-stone-200 bg-white pl-11 pr-4 text-sm outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
            />

            {searchQuery?.trim()&&(
              <SearchResults
                results={searchResults}
                onSelect={handleResultClick}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

function SearchResults({results,onSelect}){
  return(
    <div className="absolute left-0 right-0 top-14 z-50 max-h-96 overflow-y-auto rounded-2xl border border-stone-200 bg-white p-2 shadow-xl">
      {results.length>0?(
        results.map((item,index)=>(
          <button
            key={`${item.type}-${item.title}-${index}`}
            type="button"
            onClick={()=>onSelect(item)}
            className="w-full rounded-xl px-4 py-3 text-left transition hover:bg-emerald-50"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {item.title}
                </p>

                {item.description&&(
                  <p className="mt-1 truncate text-xs text-slate-500">
                    {item.description}
                  </p>
                )}

                <p className="mt-1 break-words text-sm text-emerald-700">
                  {item.value}
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-emerald-700">
                {item.type}
              </span>
            </div>
          </button>
        ))
      ):(
        <div className="px-4 py-8 text-center">
          <Search className="mx-auto h-5 w-5 text-slate-300"/>
          <p className="mt-2 text-sm font-medium text-slate-600">
            No matching information
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Try searching your profile, reports or wellness data.
          </p>
        </div>
      )}
    </div>
  );
}