import {Menu,Bell,Search,UserRound} from "lucide-react";
import {useLocation,useNavigate} from "react-router-dom";

const PAGE_META={
  "/hr/overview":{title:"Overview",subtitle:"Recruitment workspace"},
  "/hr/applications":{title:"Applications",subtitle:"Candidate management"},
  "/hr/profile":{title:"My Profile",subtitle:"Account information"},
  "/hr/settings":{title:"Settings",subtitle:"Workspace preferences"}
};

const HRHeader=({onMenuClick})=>{
  const {pathname}=useLocation(),navigate=useNavigate();
  const meta=PAGE_META[pathname]||{title:"HR Workspace",subtitle:"Human Resources"};

  return(
    <header className="sticky top-0 z-30 border-b border-[#E6EBE7] bg-white/90 backdrop-blur-xl">
      <div className="flex h-[68px] items-center gap-3 px-4 sm:h-[74px] sm:px-6 lg:h-[82px] lg:px-8 xl:px-10">
        <button type="button" onClick={onMenuClick} aria-label="Open navigation" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E2E8E3] text-[#526158] transition hover:bg-[#F4F7F4] active:scale-95 lg:hidden">
          <Menu className="h-5 w-5"/>
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-semibold tracking-[-.02em] text-[#1D2D22] sm:text-xl lg:text-[22px]">{meta.title}</h1>
          <p className="mt-0.5 hidden text-xs text-[#89948C] sm:block">{meta.subtitle}</p>
        </div>

        <div className="hidden w-full max-w-[320px] md:block lg:max-w-[360px]">
          <div className="flex h-10 items-center rounded-xl border border-[#E2E8E3] bg-[#F8FAF8] px-3 transition focus-within:border-[#8EB99A] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1E7A3A]/5">
            <Search className="mr-2.5 h-[17px] w-[17px] shrink-0 text-[#929D95]"/>
            <input type="search" placeholder="Search workspace..." className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#243128] outline-none placeholder:text-[#A2ABA5]"/>
            <kbd className="hidden rounded-md border border-[#DDE4DF] bg-white px-1.5 py-0.5 text-[10px] font-medium text-[#8A958D] xl:block">⌘ K</kbd>
          </div>
        </div>

        <div className="ml-1 flex items-center gap-1.5 sm:gap-2">
          <button type="button" aria-label="Search" className="flex h-10 w-10 items-center justify-center rounded-xl text-[#68756C] transition hover:bg-[#F4F7F4] md:hidden">
            <Search className="h-[19px] w-[19px]"/>
          </button>

          <button type="button" aria-label="Notifications" className="relative flex h-10 w-10 items-center justify-center rounded-xl text-[#68756C] transition hover:bg-[#F4F7F4]">
            <Bell className="h-[19px] w-[19px]"/>
            <span className="absolute right-[9px] top-[8px] h-2 w-2 rounded-full border-2 border-white bg-[#1E7A3A]"/>
          </button>

          <div className="mx-1 hidden h-7 w-px bg-[#E5EAE6] sm:block"/>

          <button type="button" onClick={()=>navigate("/hr/profile")} className="flex items-center gap-2 rounded-xl p-1 transition hover:bg-[#F4F7F4] sm:pr-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8F3EA] text-[#1E7A3A]">
              <UserRound className="h-[17px] w-[17px]"/>
            </div>
            <div className="hidden max-w-[130px] text-left xl:block">
              <p className="truncate text-xs font-semibold text-[#26362B]">HR Administrator</p>
              <p className="mt-0.5 truncate text-[10px] text-[#929D95]">HR Workspace</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HRHeader;