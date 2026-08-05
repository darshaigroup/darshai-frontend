import {NavLink,useNavigate} from "react-router-dom";
import {LayoutDashboard,Users,Settings,LogOut,ChevronRight,UserRound} from "lucide-react";
import {motion} from "framer-motion";
import logo from "@/assets/images/logo.png";
const NAV_ITEMS=[
  {label:"Overview",path:"/hr-dashboard/overview",icon:LayoutDashboard},
  {label:"Applications",path:"/hr-dashboard/applications",icon:Users},
  {label:"Profile",path:"/hr-dashboard/profile",icon:UserRound},
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

  return(
    <aside className={`flex h-full flex-col border-r border-[#E2E8E3] bg-white ${mobile?"w-full":"fixed inset-y-0 left-0 z-30 w-[280px]"}`}>
      
      {/* Logo */}
      <div className="flex h-[90px] shrink-0 items-center border-b border-[#EDF1EE] px-6">
        <button
          type="button"
          onClick={()=>{
            navigate("/hr-dashboard/overview");
            onNavigate?.();
          }}
          className="flex w-full items-center"
        >
          <img
            src={logo}
            alt="DARSHAI"
            className="h-12 w-auto object-contain"
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[.18em] text-[#A0AAA3]">
          Workspace
        </p>

        <div className="space-y-1.5">
          {NAV_ITEMS.map(({label,path,icon:Icon})=>(
            <NavLink
              key={path}
              to={path}
              onClick={()=>onNavigate?.()}
              className={({isActive})=>`group relative flex h-12 items-center gap-3 rounded-xl px-3.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ?"bg-[#EDF7F0] text-[#17652F]"
                  :"text-[#657169] hover:bg-[#F6F8F6] hover:text-[#26362B]"
              }`}
            >
              {({isActive})=>(
                <>
                  {isActive&&(
                    <motion.span
                      layoutId="hr-sidebar-active"
                      className="absolute left-0 h-6 w-1 rounded-r-full bg-[#1E7A3A]"
                      transition={{type:"spring",stiffness:450,damping:35}}
                    />
                  )}

                  <Icon
                    className={`h-[19px] w-[19px] shrink-0 transition-colors ${
                      isActive
                        ?"text-[#1E7A3A]"
                        :"text-[#8A958D] group-hover:text-[#526158]"
                    }`}
                  />

                  <span className="flex-1">{label}</span>

                  {isActive&&(
                    <ChevronRight className="h-4 w-4 text-[#68A477]"/>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Logout */}
      <div className="shrink-0 border-t border-[#EDF1EE] p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-[#7A4949] transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-[18px] w-[18px]"/>
          Logout
        </button>
      </div>

    </aside>
  );
};

export default HRSidebar;