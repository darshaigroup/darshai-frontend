// import {Search,Bell,Moon,Sun,Menu,HelpCircle,X} from "lucide-react";
// import {useLocation} from "react-router-dom";
// import {useState} from "react";
// import useTour from "../onbaording/useTour";
// import person from "@/assets/images/profile.jpg";

// export default function Header({
//   profile,report,assessment,progress,searchQuery,setSearchQuery,currentTab,
//   isDarkMode,onToggleTheme,onOpenSidebar,setMobileSidebarOpen,searchResults=[],
//   onSearchSelect
// }) {
//   const {pathname}=useLocation();
//   const [mobileSearchOpen,setMobileSearchOpen]=useState(false);
//   const [notificationOpen,setNotificationOpen]=useState(false);

//   const patient=profile?.patient??profile??{},
//         reportData=report?.patient??report??{},
//         assessmentData=assessment?.data??assessment??{},
//         finalAyurveda=reportData?.final_ayurveda_result??report?.final_ayurveda_result??{},
//         prakriti=finalAyurveda?.prakriti??{},
//         firstName=(patient?.name??patient?.full_name??"Patient").split(" ")[0],
//         fullName=patient?.name??patient?.full_name??"Patient",
//         riskTier=finalAyurveda?.risk_tier??reportData?.risk_tier??assessmentData?.risk_band??"--",
//         prakritiType=prakriti?.prakriti_type??"Pending Analysis",
//         completed=progress?.completed??false;

//   const routeTab=pathname==="/patient-dashboard"
//     ?"dashboard"
//     :pathname.startsWith("/patient-dashboard/assessment")
//     ?"assessment"
//     :pathname.startsWith("/patient-dashboard/reports")
//     ?"report"
//     :pathname.startsWith("/patient-dashboard/results")
//     ?"result"
//     :pathname.startsWith("/patient-dashboard/settings")
//     ?"settings"
//     :currentTab;

//   const titles={
//     dashboard:{
//       title:`Good Morning ${firstName}!`,
//       subtitle:completed
//         ?"Your personalized longevity companion is monitoring your wellness."
//         :"Complete your wellness journey to unlock personalized insights."
//     },
//     assessment:{
//       title:"Clinical Assessment",
//       subtitle:"Continue your Geo-Prakriti assessment."
//     },
//     report:{
//       title:"Health Reports",
//       subtitle:"View your latest wellness reports."
//     },
//     result:{
//       title:"Health Insights",
//       subtitle:`Current Risk Tier • ${riskTier}`
//     },
//     settings:{
//       title:"Profile Settings",
//       subtitle:"Manage your preferences and account."
//     }
//   };

//   const page=titles[routeTab]??titles.dashboard,{startTour}=useTour();

//   const handleStartTour=()=>{
//     if(window.innerWidth<768){
//       setMobileSidebarOpen(true);
//       return setTimeout(startTour,350);
//     }
//     startTour();
//   };

//   const handleResultClick=item=>{
//     if(!item)return;
//     setSearchQuery("");
//     setMobileSearchOpen(false);
//     onSearchSelect?.(item);
//   };

//   const handleMobileSearch=()=>{
//     setMobileSearchOpen(prev=>!prev);
//     if(mobileSearchOpen)setSearchQuery("");
//   };

//   return(
//     <>
//       <header className="sticky top-0 z-30 border-b border-stone-200/70 bg-[#F8F6F1]/90 backdrop-blur-xl print:hidden">
//         <div className="mx-auto flex h-24 max-w-[1520px] items-center justify-between gap-3 px-4 sm:gap-6 sm:px-6 lg:px-8">

//           <button
//             onClick={onOpenSidebar}
//             className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-stone-200 bg-white shadow-sm lg:hidden"
//           >
//             <Menu className="h-5 w-5 text-slate-700"/>
//           </button>

//           <div className="hidden min-w-[250px] md:block">
//             <h2 className="font-serif text-[28px] font-bold leading-none text-slate-900">
//               {page.title}
//             </h2>
//             <p className="mt-2 text-sm text-slate-500">{page.subtitle}</p>
//           </div>

//           {/* Desktop Search */}
//           <div className="relative hidden max-w-xl flex-1 lg:flex">
//             <div className="relative w-full">
//               <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400"/>

//               <input
//                 value={searchQuery}
//                 onChange={e=>setSearchQuery(e.target.value)}
//                 placeholder="Search reports, appointments, recommendations..."
//                 className="h-12 w-full rounded-2xl border border-stone-200 bg-white pl-11 pr-4 text-sm outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
//               />

//               {searchQuery?.trim()&&(
//                 <SearchResults
//                   results={searchResults}
//                   onSelect={handleResultClick}
//                 />
//               )}
//             </div>
//           </div>

//           <div className="flex shrink-0 items-center gap-2 sm:gap-3">

//             {/* Mobile Search */}
//             <button
//               onClick={handleMobileSearch}
//               title="Search"
//               className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all lg:hidden ${
//                 mobileSearchOpen
//                   ?"border-emerald-400 bg-emerald-50"
//                   :"border-stone-200 bg-white hover:bg-emerald-50"
//               }`}
//             >
//               {mobileSearchOpen
//                 ?<X className="h-5 w-5 text-emerald-700"/>
//                 :<Search className="h-5 w-5 text-slate-700"/>
//               }
//             </button>

//             {/* Tour */}
//             <button
//               id="tour-start-btn"
//               onClick={handleStartTour}
//               title="Start Dashboard Tour"
//               className="flex h-11 w-11 items-center justify-center rounded-xl border border-stone-200 bg-white transition-all hover:bg-emerald-50"
//             >
//               <HelpCircle className="h-5 w-5 text-slate-600"/>
//             </button>

//             {/* Theme */}
//             <button
//               onClick={onToggleTheme}
//               title="Toggle Theme"
//               className="flex h-11 w-11 items-center justify-center rounded-xl border border-stone-200 bg-white transition-all hover:bg-emerald-50"
//             >
//               {isDarkMode
//                 ?<Sun className="h-5 w-5 text-amber-500"/>
//                 :<Moon className="h-5 w-5 text-slate-700"/>
//               }
//             </button>

//             {/* Notifications */}
//             <div className="relative">
//               <button
//                 onClick={()=>setNotificationOpen(prev=>!prev)}
//                 title="Notifications"
//                 className={`relative flex h-11 w-11 items-center justify-center rounded-xl border transition-all ${
//                   notificationOpen
//                     ?"border-emerald-400 bg-emerald-50"
//                     :"border-stone-200 bg-white hover:bg-emerald-50"
//                 }`}
//               >
//                 <Bell className={`h-5 w-5 ${
//                   notificationOpen
//                     ?"text-emerald-700"
//                     :"text-slate-700"
//                 }`}/>
//               </button>

//               {notificationOpen&&(
//                 <div className="absolute right-0 top-14 z-[100] w-[340px] overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,.15)]">

//                   <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
//                     <div>
//                       <h3 className="text-sm font-semibold text-slate-900">
//                         Notifications
//                       </h3>
//                       <p className="mt-0.5 text-xs text-slate-400">
//                         Your latest wellness updates
//                       </p>
//                     </div>

//                     <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-emerald-700">
//                       0 New
//                     </span>
//                   </div>

//                   <div className="px-5 py-8 text-center">
//                     <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
//                       <Bell className="h-6 w-6 text-emerald-600"/>
//                     </div>

//                     <h4 className="mt-4 text-sm font-semibold text-slate-800">
//                       You're all caught up
//                     </h4>

//                     <p className="mx-auto mt-2 max-w-[240px] text-xs leading-5 text-slate-400">
//                       There are no new notifications at the moment. We'll let you know when something important happens.
//                     </p>
//                   </div>

//                   <div className="border-t border-stone-100 bg-slate-50/70 px-5 py-3 text-center">
//                     <span className="text-[10px] font-medium uppercase tracking-[.15em] text-slate-400">
//                       DarshAI Wellness Intelligence
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Profile */}
//             <div className="hidden items-center gap-3 pl-2 md:flex">
//               <div className="flex items-center gap-3">

//                 <div className="text-right">
//                   <p className="text-sm font-semibold text-slate-900">
//                     {fullName}
//                   </p>

//                   <div className="mt-1 flex items-center justify-end gap-2">
//                     <span className="relative flex h-2.5 w-2.5 items-center justify-center">
//                       <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400/50"/>
//                       <span className="absolute h-2.5 w-2.5 rounded-full bg-emerald-400/20 blur-sm"/>
//                       <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500"/>
//                     </span>

//                     <span className="text-[11px] font-semibold text-slate-700">
//                       {prakritiType}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="relative">
//                   <span className="absolute -inset-1 rounded-full bg-emerald-400/20 blur-md"/>

//                   <img
//                     src={person}
//                     alt={fullName}
//                     className="relative h-11 w-11 rounded-full border-2 border-emerald-500 bg-white object-cover"
//                   />
//                 </div>

//               </div>
//             </div>

//           </div>
//         </div>
//       </header>

//       {/* Mobile Search Panel */}
//       {mobileSearchOpen&&(
//         <div className="sticky top-24 z-20 border-b border-stone-200/70 bg-[#F8F6F1]/95 px-4 py-3 shadow-sm backdrop-blur-xl lg:hidden">
//           <div className="relative">

//             <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400"/>

//             <input
//               autoFocus
//               value={searchQuery}
//               onChange={e=>setSearchQuery(e.target.value)}
//               placeholder="Search reports, assessments..."
//               className="h-12 w-full rounded-2xl border border-stone-200 bg-white pl-11 pr-4 text-sm outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
//             />

//             {searchQuery?.trim()&&(
//               <SearchResults
//                 results={searchResults}
//                 onSelect={handleResultClick}
//               />
//             )}

//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// function SearchResults({results,onSelect}){
//   return(
//     <div className="absolute left-0 right-0 top-14 z-50 max-h-96 overflow-y-auto rounded-2xl border border-stone-200 bg-white p-2 shadow-xl">
//       {results.length>0?(
//         results.map((item,index)=>(
//           <button
//             key={`${item.type}-${item.title}-${index}`}
//             type="button"
//             onClick={()=>onSelect(item)}
//             className="w-full rounded-xl px-4 py-3 text-left transition hover:bg-emerald-50"
//           >
//             <div className="flex items-start justify-between gap-3">
//               <div className="min-w-0">
//                 <p className="truncate text-sm font-semibold text-slate-900">
//                   {item.title}
//                 </p>

//                 {item.description&&(
//                   <p className="mt-1 truncate text-xs text-slate-500">
//                     {item.description}
//                   </p>
//                 )}

//                 <p className="mt-1 break-words text-sm text-emerald-700">
//                   {item.value}
//                 </p>
//               </div>

//               <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-emerald-700">
//                 {item.type}
//               </span>
//             </div>
//           </button>
//         ))
//       ):(
//         <div className="px-4 py-8 text-center">
//           <Search className="mx-auto h-5 w-5 text-slate-300"/>

//           <p className="mt-2 text-sm font-medium text-slate-600">
//             No matching information
//           </p>

//           <p className="mt-1 text-xs text-slate-400">
//             Try searching your profile, reports or wellness data.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

import {Search,Bell,Moon,Sun,Menu,HelpCircle,X,CheckCheck,ClipboardCheck,FileText,Stethoscope,UserCheck} from "lucide-react";
import {useLocation} from "react-router-dom";
import {useEffect,useRef,useState} from "react";
import useTour from "../onbaording/useTour";
import person from "@/assets/images/profile.jpg";
import {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead 
} from "../../services/patientDashboardService";

export default function Header({
  profile,report,assessment,progress,searchQuery,setSearchQuery,currentTab,
  isDarkMode,onToggleTheme,onOpenSidebar,setMobileSidebarOpen,searchResults=[],
  onSearchSelect
}) {
  const {pathname}=useLocation();
  const [mobileSearchOpen,setMobileSearchOpen]=useState(false);
  const [notificationOpen,setNotificationOpen]=useState(false);
  const [notifications,setNotifications]=useState([]);
  const [unreadCount,setUnreadCount]=useState(0);
  const notificationRef=useRef(null);

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

  useEffect(()=>{
    const loadNotifications=async()=>{
      try{
        const [notificationResult,countResult]=await Promise.all([
          getNotifications(20),
          getUnreadNotificationCount()
        ]);

        setNotifications(notificationResult?.notifications??[]);
        setUnreadCount(Number(countResult?.count??0));
      }catch(error){
        if(error?.message!=="SESSION_EXPIRED")
          console.error("Failed to load notifications:",error);
      }
    };

    loadNotifications();

    const interval=setInterval(loadNotifications,60000);

    return()=>clearInterval(interval);
  },[]);

  useEffect(()=>{
    const handleOutsideClick=event=>{
      if(
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ){
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown",handleOutsideClick);

    return()=>document.removeEventListener("mousedown",handleOutsideClick);
  },[]);

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

    if(mobileSearchOpen)
      setSearchQuery("");
  };

  const handleNotificationRead=async notification=>{
    if(!notification)return;

    try{
      if(!notification.is_read){
        await markNotificationAsRead(notification.id);

        setNotifications(prev=>
          prev.map(item=>
            item.id===notification.id
              ?{...item,is_read:true}
              :item
          )
        );

        setUnreadCount(prev=>Math.max(0,prev-1));
      }
    }catch(error){
      console.error("Failed to mark notification as read:",error);
    }
  };

  const handleMarkAllRead=async()=>{
    if(!unreadCount)return;

    try{
      await markAllNotificationsAsRead();

      setNotifications(prev=>
        prev.map(item=>({...item,is_read:true}))
      );

      setUnreadCount(0);
    }catch(error){
      console.error("Failed to mark notifications as read:",error);
    }
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

            <p className="mt-2 text-sm text-slate-500">
              {page.subtitle}
            </p>
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

            {/* Mobile Search */}
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
                :<Search className="h-5 w-5 text-slate-700"/>
              }
            </button>

            {/* Tour */}
            <button
              id="tour-start-btn"
              onClick={handleStartTour}
              title="Start Dashboard Tour"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-stone-200 bg-white transition-all hover:bg-emerald-50"
            >
              <HelpCircle className="h-5 w-5 text-slate-600"/>
            </button>

            {/* Theme */}
            <button
              onClick={onToggleTheme}
              title="Toggle Theme"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-stone-200 bg-white transition-all hover:bg-emerald-50"
            >
              {isDarkMode
                ?<Sun className="h-5 w-5 text-amber-500"/>
                :<Moon className="h-5 w-5 text-slate-700"/>
              }
            </button>

            {/* Notifications */}
            <div ref={notificationRef} className="relative">
              <button
                onClick={()=>setNotificationOpen(prev=>!prev)}
                title="Notifications"
                className={`relative flex h-11 w-11 items-center justify-center rounded-xl border transition-all ${
                  notificationOpen
                    ?"border-emerald-400 bg-emerald-50"
                    :"border-stone-200 bg-white hover:bg-emerald-50"
                }`}
              >
                <Bell className={`h-5 w-5 ${
                  notificationOpen
                    ?"text-emerald-700"
                    :"text-slate-700"
                }`}/>

                {unreadCount>0&&(
                  <span className="absolute -right-1 -top-1 flex min-w-5 h-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white shadow-md">
                    {unreadCount>99?"99+":unreadCount}
                  </span>
                )}
              </button>

              {notificationOpen&&(
                <NotificationPanel
                  notifications={notifications}
                  unreadCount={unreadCount}
                  onRead={handleNotificationRead}
                  onMarkAllRead={handleMarkAllRead}
                />
              )}
            </div>

            {/* Profile */}
            <div className="hidden items-center gap-3 pl-2 md:flex">
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">
                    {fullName}
                  </p>

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

function NotificationPanel({
  notifications,
  unreadCount,
  onRead,
  onMarkAllRead
}) {
  return(
    <div className="absolute right-0 top-14 z-[100] w-[340px] overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,.15)]">

      <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Notifications
          </h3>

          <p className="mt-0.5 text-xs text-slate-400">
            Your latest wellness updates
          </p>
        </div>

        {unreadCount>0&&(
          <button
            onClick={onMarkAllRead}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 transition hover:text-emerald-700"
          >
            <CheckCheck className="h-4 w-4"/>
            Mark all read
          </button>
        )}

        {!unreadCount&&(
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-emerald-700">
            All read
          </span>
        )}
      </div>

      <div className="max-h-[420px] overflow-y-auto">
        {notifications.length>0?(
          notifications.map(notification=>{
            const unread=!notification.is_read;

            return(
              <button
                key={notification.id}
                type="button"
                onClick={()=>onRead(notification)}
                className={`flex w-full gap-3 border-b border-stone-100 px-5 py-4 text-left transition hover:bg-emerald-50/60 ${
                  unread
                    ?"bg-emerald-50/30"
                    :"bg-white"
                }`}
              >
                <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                  unread
                    ?"bg-emerald-100 text-emerald-600"
                    :"bg-slate-100 text-slate-400"
                }`}>
                  <NotificationIcon type={notification.type}/>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm ${
                      unread
                        ?"font-semibold text-slate-900"
                        :"font-medium text-slate-700"
                    }`}>
                      {notification.title}
                    </p>

                    {unread&&(
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500"/>
                    )}
                  </div>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {notification.message}
                  </p>

                  <p className="mt-2 text-[10px] font-medium text-slate-400">
                    {formatNotificationDate(notification.created_at)}
                  </p>
                </div>
              </button>
            );
          })
        ):(
          <div className="px-6 py-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
              <Bell className="h-6 w-6 text-emerald-600"/>
            </div>

            <h4 className="mt-4 text-sm font-semibold text-slate-800">
              You're all caught up
            </h4>

            <p className="mx-auto mt-2 max-w-[240px] text-xs leading-5 text-slate-400">
              There are no new notifications at the moment. We'll let you know when something important happens.
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-stone-100 bg-slate-50/70 px-5 py-3 text-center">
        <span className="text-[10px] font-medium uppercase tracking-[.15em] text-slate-400">
          DarshAI Wellness Intelligence
        </span>
      </div>
    </div>
  );
}

function NotificationIcon({type}) {
  if(type?.includes("ASSESSMENT"))
    return <ClipboardCheck className="h-4 w-4"/>;

  if(type?.includes("REPORT"))
    return <FileText className="h-4 w-4"/>;

  if(type?.includes("DOCTOR")||type?.includes("CLINICAL"))
    return <Stethoscope className="h-4 w-4"/>;

  if(type?.includes("PROFILE"))
    return <UserCheck className="h-4 w-4"/>;

  return <Bell className="h-4 w-4"/>;
}

function formatNotificationDate(date) {
  if(!date)return "";

  const value=new Date(date);

  if(Number.isNaN(value.getTime()))return "";

  return value.toLocaleDateString("en-IN",{
    day:"2-digit",
    month:"short",
    year:"numeric"
  });
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