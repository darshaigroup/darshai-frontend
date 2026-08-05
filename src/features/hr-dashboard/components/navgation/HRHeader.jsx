import {Menu,Bell,UserRound,ChevronDown,LayoutDashboard,Users,Settings,ShieldCheck} from "lucide-react";
import {useLocation,useNavigate} from "react-router-dom";

const PAGE_META={
  "/hr-dashboard":{title:"Recruitment Overview",subtitle:"Monitor hiring activity and manage your recruitment pipeline.",icon:LayoutDashboard},
  "/hr-dashboard/overview":{title:"Recruitment Overview",subtitle:"Monitor hiring activity and manage your recruitment pipeline.",icon:LayoutDashboard},
  "/hr-dashboard/applications":{title:"Candidate Applications",subtitle:"Review, evaluate and manage candidate applications.",icon:Users},
  "/hr-dashboard/profile":{title:"My Profile",subtitle:"Manage your personal and professional information.",icon:UserRound},
  "/hr-dashboard/settings":{title:"Workspace Settings",subtitle:"Manage your HR workspace preferences and security.",icon:Settings}
};

const HRHeader=({onMenuClick})=>{
  const {pathname}=useLocation(),navigate=useNavigate();
  const meta=PAGE_META[pathname]||{title:"HR Workspace",subtitle:"Human Resources Management",icon:LayoutDashboard};
  const PageIcon=meta.icon;

  return(
    <header className="sticky top-0 z-30 border-b border-[#E5EBE6] bg-white/95 shadow-[0_1px_12px_rgba(28,62,39,.025)] backdrop-blur-xl">
      <div className="flex min-h-[76px] items-center gap-3 px-4 py-3 sm:min-h-[82px] sm:px-6 lg:min-h-[92px] lg:px-8 xl:px-10">

        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E1E8E3] bg-white text-[#526158] shadow-sm transition hover:border-[#C9DACE] hover:bg-[#F4F8F5] active:scale-95 lg:hidden"
        >
          <Menu className="h-5 w-5"/>
        </button>

        {/* Page Information */}
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
          <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-[#D6E8DA] bg-gradient-to-br from-[#EDF8F0] to-[#F7FBF8] text-[#1E7A3A] shadow-sm sm:flex">
            <PageIcon className="h-5 w-5"/>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <h1 className="truncate font-serif text-[19px] font-bold tracking-[-.025em] text-[#182A1F] sm:text-[22px] lg:text-[25px]">
                {meta.title}
              </h1>

              <div className="hidden items-center gap-1.5 rounded-full border border-[#D5E8DA] bg-[#F0F8F2] px-2.5 py-1 md:flex">
                <ShieldCheck className="h-3 w-3 text-[#1E7A3A]"/>
                <span className="text-[9px] font-bold uppercase tracking-[.13em] text-[#1E7A3A]">
                  HR Management
                </span>
              </div>
            </div>

            <p className="mt-1 hidden max-w-[600px] truncate text-[12px] leading-5 text-[#7C8980] sm:block lg:text-[13px]">
              {meta.subtitle}
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">

          {/* Notification */}
          <button
            type="button"
            aria-label="Notifications"
            className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-transparent text-[#68756C] transition-all duration-200 hover:border-[#E1E8E3] hover:bg-[#F5F8F6] hover:text-[#1E7A3A]"
          >
            <Bell className="h-[19px] w-[19px] transition-transform duration-200 group-hover:-rotate-6"/>

            <span className="absolute right-[9px] top-[8px] flex h-[9px] w-[9px]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1E7A3A] opacity-30"/>
              <span className="relative inline-flex h-[9px] w-[9px] rounded-full border-2 border-white bg-[#1E7A3A]"/>
            </span>
          </button>

          <div className="hidden h-9 w-px bg-[#E5EAE6] sm:block"/>

          {/* HR Profile */}
          <button
            type="button"
            onClick={()=>navigate("/hr-dashboard/profile")}
            className="group flex items-center gap-3 rounded-2xl border border-transparent p-1.5 transition-all duration-200 hover:border-[#E1E9E3] hover:bg-[#F7F9F7] sm:pr-3"
          >
            <div className="relative">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#E3F2E7] to-[#F0F8F2] text-[#1E7A3A] shadow-[0_2px_10px_rgba(30,122,58,.12)] sm:h-11 sm:w-11">
                <UserRound className="h-[18px] w-[18px]"/>
              </div>

              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#31A354]"/>
            </div>

            <div className="hidden min-w-0 text-left md:block">
              <div className="flex items-center gap-1.5">
                <p className="max-w-[145px] truncate text-[13px] font-bold text-[#25362B]">
                  HR Administrator
                </p>

                <ChevronDown className="h-3.5 w-3.5 text-[#9AA49D] transition-transform duration-200 group-hover:translate-y-0.5"/>
              </div>

              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#31A354]"/>

                <p className="text-[10px] font-medium text-[#8A968E]">
                  Human Resources
                </p>
              </div>
            </div>
          </button>

        </div>
      </div>
    </header>
  );
};

export default HRHeader;