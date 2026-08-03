import {NavLink,useNavigate} from "react-router-dom";
import {LayoutDashboard,Users,Settings,LogOut,ChevronRight,UserRound} from "lucide-react";
import {motion} from "framer-motion";

const NAV_ITEMS=[
  {label:"Overview",path:"/hr-dashboard/overview",icon:LayoutDashboard},
  {label:"Applications",path:"/hr-dashboard/applications",icon:Users},
  {label:"Settings",path:"/hr-dashboard/settings",icon:Settings}
];

const HRSidebar=({mobile=false,onNavigate})=>{
  const navigate=useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/login",{replace:true});
    onNavigate?.();
  };

  const handleProfile=()=>{
    navigate("/hr/profile");
    onNavigate?.();
  };

  return(
    <aside className={`flex h-full flex-col border-r border-[#E2E8E3] bg-white ${mobile?"w-full":"fixed inset-y-0 left-0 z-30 w-[280px]"}`}>
      <div className="flex h-[82px] shrink-0 items-center border-b border-[#EDF1EE] px-6">
        <button type="button" onClick={()=>{navigate("/hr/overview");onNavigate?.();}} className="flex items-center gap-3 text-left">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E7A3A] text-sm font-bold text-white shadow-sm">D</div>
          <div>
            <p className="font-serif text-xl font-semibold leading-none text-[#183022]">DARSHAI</p>
            <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[.18em] text-[#849087]">HR Workspace</p>
          </div>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[.18em] text-[#A0AAA3]">Workspace</p>

        <div className="space-y-1.5">
          {NAV_ITEMS.map(({label,path,icon:Icon})=>(
            <NavLink key={path} to={path} onClick={()=>onNavigate?.()} className={({isActive})=>`group relative flex h-12 items-center gap-3 rounded-xl px-3.5 text-sm font-medium transition-all duration-200 ${isActive?"bg-[#EDF7F0] text-[#17652F]":"text-[#657169] hover:bg-[#F6F8F6] hover:text-[#26362B]"}`}>
              {({isActive})=>(
                <>
                  {isActive&&<motion.span layoutId="hr-sidebar-active" className="absolute left-0 h-6 w-1 rounded-r-full bg-[#1E7A3A]" transition={{type:"spring",stiffness:450,damping:35}}/>}
                  <Icon className={`h-[19px] w-[19px] shrink-0 transition-colors ${isActive?"text-[#1E7A3A]":"text-[#8A958D] group-hover:text-[#526158]"}`}/>
                  <span className="flex-1">{label}</span>
                  {isActive&&<ChevronRight className="h-4 w-4 text-[#68A477]"/>}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="shrink-0 border-t border-[#EDF1EE] p-4">
        <button type="button" onClick={handleProfile} className="group mb-2 flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-[#F6F8F6]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E7F3EA] text-[#1E7A3A]">
            <UserRound className="h-[18px] w-[18px]"/>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#243128]">HR Administrator</p>
            <p className="mt-0.5 truncate text-xs text-[#89948C]">View profile</p>
          </div>
          <ChevronRight className="h-4 w-4 text-[#A4ADA7] transition-transform group-hover:translate-x-0.5"/>
        </button>

        <button type="button" onClick={handleLogout} className="flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-[#7A4949] transition hover:bg-red-50 hover:text-red-600">
          <LogOut className="h-[18px] w-[18px]"/>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default HRSidebar;